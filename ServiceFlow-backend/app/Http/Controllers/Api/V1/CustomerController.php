<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Http\Resources\NotificationResource;
use App\Models\Booking;
use App\Models\PlatformNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $customerId = $request->user()->id;

        $active = Booking::with(['technician.technicianProfile', 'service'])
            ->where('customer_id', $customerId)
            ->whereNotIn('status', [BookingStatus::Completed, BookingStatus::Cancelled])
            ->latest()
            ->first();

        $upcoming = Booking::with(['service'])
            ->where('customer_id', $customerId)
            ->whereIn('status', [BookingStatus::Pending, BookingStatus::Assigned])
            ->orderBy('scheduled_date')
            ->limit(5)
            ->get();

        $recent = Booking::with(['service', 'technician', 'payment', 'review'])
            ->where('customer_id', $customerId)
            ->latest()
            ->limit(5)
            ->get();

        $unread = PlatformNotification::where('user_id', $customerId)
            ->where('is_read', false)
            ->count();

        $stats = Booking::where('customer_id', $customerId)
            ->selectRaw('count(*) as total_bookings')
            ->selectRaw('sum(case when status = ? then 1 else 0 end) as completed', [BookingStatus::Completed->value])
            ->selectRaw('sum(case when status not in (?, ?) then 1 else 0 end) as active', [BookingStatus::Completed->value, BookingStatus::Cancelled->value])
            ->first();

        return response()->json([
            'active_booking' => $active ? new BookingResource($active) : null,
            'upcoming' => BookingResource::collection($upcoming),
            'recent' => BookingResource::collection($recent),
            'stats' => [
                'total_bookings' => (int) ($stats->total_bookings ?? 0),
                'completed' => (int) ($stats->completed ?? 0),
                'active' => (int) ($stats->active ?? 0),
                'unread_notifications' => $unread,
            ],
            'notifications' => NotificationResource::collection(
                PlatformNotification::where('user_id', $customerId)->latest()->limit(5)->get(),
            ),
        ]);
    }
}
