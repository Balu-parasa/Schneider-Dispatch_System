<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\TechnicianProfile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $roleValue = $request->role === 'business' ? 'customer' : $request->role;
        $role = UserRole::from($roleValue);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
            'role' => $role,
        ]);

        if ($role === UserRole::Technician) {
            TechnicianProfile::create([
                'user_id' => $user->id,
                'specialty' => $request->specialty ?? 'General Maintenance',
                'status' => 'offline',
            ]);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user->load('technicianProfile')),
            'token' => $token,
            'redirect' => $role->dashboardPath(),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user->load('technicianProfile')),
            'token' => $token,
            'redirect' => $user->role->dashboardPath(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()->load('technicianProfile')),
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email']
        ]);

        $otp = (string) rand(100000, 999999);

        \Illuminate\Support\Facades\DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => \Illuminate\Support\Facades\Hash::make($otp),
                'created_at' => now(),
            ]
        );

        try {
            \Illuminate\Support\Facades\Mail::html("
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;'>
                    <div style='text-align: center; margin-bottom: 24px;'>
                        <h2 style='color: #2563eb; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;'>ServiceFlow</h2>
                        <p style='color: #718096; margin-top: 4px; font-size: 14px;'>Real-Time Dispatch & Service Management Platform</p>
                    </div>
                    <div style='padding: 24px; background-color: #f7fafc; border-radius: 8px;'>
                        <h3 style='color: #2d3748; margin-top: 0; font-size: 20px; font-weight: 600;'>Reset Your Password</h3>
                        <p style='color: #4a5568; font-size: 16px; line-height: 1.6;'>You requested a password reset for your ServiceFlow account. Use the following 6-digit verification code (OTP) to reset your password. This code will expire in 60 minutes.</p>
                        <div style='text-align: center; margin: 32px 0;'>
                            <span style='display: inline-block; font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background-color: #ebf8ff; padding: 12px 32px; border: 1px dashed #bee3f8; border-radius: 8px;'>{$otp}</span>
                        </div>
                        <p style='color: #e53e3e; font-size: 14px; font-weight: 500;'>If you did not request a password reset, please ignore this email or secure your account.</p>
                    </div>
                    <div style='text-align: center; margin-top: 24px; color: #a0aec0; font-size: 12px;'>
                        &copy; " . date('Y') . " ServiceFlow. All rights reserved.
                    </div>
                </div>
            ", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject('ServiceFlow Password Reset Verification Code (OTP)');
            });
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('SMTP Mail send failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to send OTP via email. Please check your SMTP configuration in your .env file. Error: ' . $e->getMessage(),
                'otp' => $otp,
            ], 500);
        }

        return response()->json([
            'message' => 'Verification code sent to your email address.',
            'otp' => $otp, // Expose for easy testing and copy-pasting locally
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'otp' => ['required', 'string', 'size:6'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $record = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (! $record) {
            return response()->json([
                'message' => 'No active password reset request found for this email.',
            ], 422);
        }

        // Verify token expiration (60 minutes)
        $createdAt = \Carbon\Carbon::parse($record->created_at);
        if ($createdAt->addMinutes(60)->isPast()) {
            \Illuminate\Support\Facades\DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->delete();

            return response()->json([
                'message' => 'Verification code has expired. Please request a new one.',
            ], 422);
        }

        // Verify OTP code
        if (! \Illuminate\Support\Facades\Hash::check($request->otp, $record->token)) {
            return response()->json([
                'message' => 'Invalid verification code. Please try again.',
            ], 422);
        }

        // OTP is correct! Reset the password
        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
        ]);

        // Clean up the token
        \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json([
            'message' => 'Your password has been successfully reset. You can now log in.',
        ]);
    }
}
