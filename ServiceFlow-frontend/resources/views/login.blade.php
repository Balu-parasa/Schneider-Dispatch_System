@extends('layouts.app')

@section('title', 'Sign In - ServiceFlow Dispatch Platform')

@section('content')
<div class="flex min-h-[90vh] items-stretch">

    <!-- Left Side: Login Form -->
    <div class="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 z-10">
        <div class="mx-auto w-full max-w-md bg-[#0f1422]/60 p-8 rounded-2xl border border-white/5 backdrop-blur-md">

            <div class="mb-8">
                <a href="{{ route('home') }}" class="flex items-center gap-2 group">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 glow-blue">
                        <i data-lucide="zap" class="h-6 w-6 text-white"></i>
                    </div>
                    <span class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        ServiceFlow
                    </span>
                </a>
            </div>

            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-white">
                    Welcome back
                </h1>
                <p class="mt-2 text-sm text-slate-400">
                    Sign in to your monolithic portal to continue
                </p>
            </div>

            <!-- Error Alerts -->
            @if ($errors->any())
                <div class="mt-6 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-lg">
                    <div class="flex items-center gap-3">
                        <i data-lucide="alert-triangle" class="h-5 w-5 text-rose-400 shrink-0"></i>
                        <p class="text-xs text-rose-300 font-semibold leading-relaxed">
                            {{ $errors->first() }}
                        </p>
                    </div>
                </div>
            @endif

            <!-- Form -->
            <form method="POST" action="{{ url('/login') }}" class="mt-8 space-y-6" x-data="{ showPass: false }">
                @csrf

                <div class="space-y-4">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-400">Email address</label>
                        <div class="relative mt-2">
                            <i data-lucide="mail" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"></i>
                            <input id="email"
                                   type="email"
                                   name="email"
                                   placeholder="you@example.com"
                                   value="{{ old('email') }}"
                                   class="block w-full rounded-xl bg-white/5 border border-white/10 px-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                                   required />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                            <button type="button" id="forgot-password-btn" class="text-xs text-emerald-400 hover:underline cursor-pointer bg-transparent border-0 p-0">Forgot password?</button>
                        </div>
                        <div class="relative mt-2">
                            <i data-lucide="lock" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"></i>
                            <input id="password"
                                   :type="showPass ? 'text' : 'password'"
                                   name="password"
                                   placeholder="••••••••"
                                   class="block w-full rounded-xl bg-white/5 border border-white/10 px-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all pr-10"
                                   required />

                            <!-- Show Hide Eye -->
                            <button type="button" @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer">
                                <i data-lucide="eye" class="h-4 w-4" x-show="!showPass"></i>
                                <i data-lucide="eye-off" class="h-4 w-4" x-show="showPass"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg glow-blue cursor-pointer">
                    Sign In
                    <i data-lucide="arrow-right" class="h-4 w-4"></i>
                </button>

                <!-- Divider -->
                <div class="relative flex py-2 items-center">
                    <div class="flex-grow border-t border-white/5"></div>
                    <span class="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider font-mono">Or continue with</span>
                    <div class="flex-grow border-t border-white/5"></div>
                </div>

                <!-- Google OAuth -->
                <a href="{{ url('/auth/google') }}" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
                    <i data-lucide="chrome" class="h-5 w-5 text-red-400"></i>
                    Google Client OAuth
                </a>
            </form>

            <p class="mt-8 text-center text-xs text-slate-400">
                Don't have an account?
                <a href="#" class="text-emerald-400 font-semibold hover:underline">Create one now</a>
            </p>

        </div>
    </div>

    <!-- Right Side: Decorative Immersive Panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <!-- Visual highlights overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10 z-0"></div>
        <div class="absolute inset-0 gradient-mesh opacity-40 z-0"></div>
        <div class="absolute inset-0 grid-pattern opacity-20 z-0"></div>

        <div class="relative z-10 px-12 max-w-xl">
            <h2 class="text-3xl font-extrabold text-white leading-snug">
                AI-Driven Enterprise Service Dispatch Control
            </h2>
            <p class="mt-4 text-slate-400 text-sm leading-relaxed">
                Connect directly with thousands of verified residential and industrial engineers. Track dispatch schedules, check route compliance, and monitor fleet logistics instantly in one full-stack dashboard.
            </p>

            <!-- Small visual details list -->
            <div class="mt-8 space-y-4">
                <div class="flex gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                        <i data-lucide="shield" class="h-4 w-4"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-white uppercase tracking-wider">Certified Network</h4>
                        <p class="text-xs text-slate-400">Every tech is fully background-screened and license-validated.</p>
                    </div>
                </div>

                <div class="flex gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                        <i data-lucide="clock" class="h-4 w-4"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-white uppercase tracking-wider">Guaranteed response times</h4>
                        <p class="text-xs text-slate-400">Average ETA of dispatch is less than 15 minutes.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

{{-- ============================================================ --}}
{{-- FORGOT PASSWORD MODAL — 3-Step OTP Verified Flow             --}}
{{-- ============================================================ --}}
<div id="fp-overlay"
     style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.78); backdrop-filter:blur(10px); align-items:center; justify-content:center; padding:16px;">

    <div id="fp-modal"
         style="position:relative; width:100%; max-width:440px; border-radius:20px; border:1px solid rgba(255,255,255,0.08); box-shadow:0 30px 60px rgba(0,0,0,0.6); overflow:hidden; background:linear-gradient(145deg,#1a2235,#0f172a);">

        <!-- Glowing top bar -->
        <div style="height:3px; background:linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa,#6366f1);"></div>

        <!-- Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:24px 24px 16px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:8px; border-radius:10px;">
                    <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div>
                    <div style="font-size:17px; font-weight:700; color:white;">Reset Password</div>
                    <div id="fp-subtitle" style="font-size:12px; color:#94a3b8;">Enter your email to get started</div>
                </div>
            </div>
            <button id="fp-close-btn" style="background:none; border:none; cursor:pointer; color:#64748b; padding:6px; border-radius:8px;" onmouseenter="this.style.background='rgba(255,255,255,0.08)'; this.style.color='white';" onmouseleave="this.style.background='none'; this.style.color='#64748b';">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
        </div>

        <!-- Step Indicators -->
        <div style="padding:0 24px 16px;">
            <div style="display:flex; align-items:center; gap:6px;">
                <div id="fp-dot1" style="height:6px; width:36px; border-radius:3px; background:#6366f1; transition:all 0.3s;"></div>
                <div id="fp-dot2" style="height:6px; width:18px; border-radius:3px; background:rgba(255,255,255,0.12); transition:all 0.3s;"></div>
                <div id="fp-dot3" style="height:6px; width:18px; border-radius:3px; background:rgba(255,255,255,0.12); transition:all 0.3s;"></div>
                <span id="fp-step-lbl" style="margin-left:8px; font-size:11px; color:#64748b; font-family:monospace;">Step 1 of 3</span>
            </div>
        </div>

        <!-- Divider -->
        <div style="height:1px; background:linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent); margin:0 24px;"></div>

        <!-- ─── STEP 1: Email ─────────────────────── -->
        <div id="fp-s1" style="padding:24px;">
            <p style="font-size:14px; color:#cbd5e1; margin:0 0 20px;">We'll send a 6-digit verification code to your email address.</p>
            <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Email Address</label>
            <div style="position:relative;">
                <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#64748b;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                <input id="fp-email-inp" type="email" placeholder="you@example.com"
                       style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 12px 12px 42px; font-size:14px; color:white; outline:none;"
                       onfocus="this.style.borderColor='#6366f1';" onblur="this.style.borderColor='rgba(255,255,255,0.1)';"/>
            </div>
            <div id="fp-s1-err" style="display:none; margin-top:12px; padding:10px 14px; border-radius:10px; font-size:12px; color:#fca5a5; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2);"></div>
            <button id="fp-send-btn" onclick="fpSendOtp()"
                    style="margin-top:20px; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px; border-radius:12px; border:none; cursor:pointer; font-size:14px; font-weight:600; color:white; background:linear-gradient(135deg,#6366f1,#8b5cf6);">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z"/></svg>
                <span id="fp-send-txt">Send Verification Code</span>
            </button>
        </div>

        <!-- ─── STEP 2: Verify OTP ────────────────── -->
        <div id="fp-s2" style="display:none; padding:24px;">
            <p style="font-size:14px; color:#cbd5e1; margin:0 0 4px;">Code sent to</p>
            <p id="fp-s2-email" style="font-size:14px; font-weight:600; color:#818cf8; margin:0 0 20px; word-break:break-all;"></p>

            <!-- 6 individual OTP digit boxes -->
            <div style="display:flex; justify-content:center; gap:10px; margin-bottom:20px;">
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
                <input class="fp-otp-box" maxlength="1" inputmode="numeric" pattern="[0-9]"
                       style="width:46px; height:56px; text-align:center; font-size:22px; font-weight:800; color:white; background:rgba(99,102,241,0.1); border:2px solid rgba(99,102,241,0.3); border-radius:12px; outline:none;" />
            </div>

            <div style="text-align:center; margin-bottom:16px;">
                <span style="font-size:12px; color:#64748b;">Code expires in </span>
                <span id="fp-timer" style="font-size:13px; font-weight:700; color:#818cf8; font-family:monospace;">60:00</span>
            </div>

            <div id="fp-s2-err" style="display:none; margin-bottom:14px; padding:10px 14px; border-radius:10px; font-size:12px; color:#fca5a5; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2);"></div>

            <button id="fp-verify-btn" onclick="fpVerifyOtp()"
                    style="width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px; border-radius:12px; border:none; cursor:pointer; font-size:14px; font-weight:600; color:white; background:linear-gradient(135deg,#6366f1,#8b5cf6);">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span id="fp-verify-txt">Verify Code</span>
            </button>

            <button onclick="fpResendOtp()"
                    style="margin-top:12px; width:100%; background:none; border:none; cursor:pointer; font-size:12px; color:#64748b; text-decoration:underline;"
                    onmouseenter="this.style.color='#818cf8';" onmouseleave="this.style.color='#64748b';">
                Didn't receive it? Resend code
            </button>
        </div>

        <!-- ─── STEP 3: New Password (LOCKED until OTP verified) ── -->
        <div id="fp-s3" style="display:none; padding:24px;">
            <!-- Verified badge -->
            <div style="display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); margin-bottom:20px;">
                <svg width="16" height="16" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span style="font-size:12px; font-weight:600; color:#34d399;">Identity verified — create your new password</span>
            </div>

            <div style="margin-bottom:16px;">
                <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">New Password</label>
                <div style="position:relative;">
                    <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#64748b;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input id="fp-newpass" type="password" placeholder="Min. 8 characters"
                           style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 12px 12px 42px; font-size:14px; color:white; outline:none;"
                           onfocus="this.style.borderColor='#6366f1';" onblur="this.style.borderColor='rgba(255,255,255,0.1)';"/>
                </div>
            </div>

            <div style="margin-bottom:16px;">
                <label style="display:block; font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Confirm Password</label>
                <div style="position:relative;">
                    <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#64748b;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input id="fp-confpass" type="password" placeholder="Re-enter password"
                           style="width:100%; box-sizing:border-box; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 12px 12px 42px; font-size:14px; color:white; outline:none;"
                           onfocus="this.style.borderColor='#6366f1';" onblur="this.style.borderColor='rgba(255,255,255,0.1)';"/>
                </div>
            </div>

            <div id="fp-s3-err" style="display:none; margin-bottom:14px; padding:10px 14px; border-radius:10px; font-size:12px; color:#fca5a5; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2);"></div>

            <button id="fp-reset-btn" onclick="fpResetPassword()"
                    style="width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px; border-radius:12px; border:none; cursor:pointer; font-size:14px; font-weight:600; color:white; background:linear-gradient(135deg,#10b981,#059669);">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span id="fp-reset-txt">Reset Password</span>
            </button>
        </div>

        <!-- ─── SUCCESS ──────────────────────────── -->
        <div id="fp-success" style="display:none; padding:40px 24px; text-align:center;">
            <div style="display:flex; justify-content:center; margin-bottom:16px;">
                <div style="padding:20px; border-radius:50%; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3);">
                    <svg width="40" height="40" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
            </div>
            <h3 style="font-size:20px; font-weight:700; color:white; margin:0 0 8px;">Password Reset!</h3>
            <p style="font-size:13px; color:#94a3b8; margin:0 0 24px;">Your password has been successfully updated. You can now sign in with your new credentials.</p>
            <button onclick="fpClose()"
                    style="width:100%; padding:13px; border-radius:12px; border:none; cursor:pointer; font-size:14px; font-weight:600; color:white; background:linear-gradient(135deg,#6366f1,#8b5cf6);">
                Back to Sign In
            </button>
        </div>

        <div style="height:8px;"></div>
    </div>
</div>

@endsection

@push('scripts')
<script>
// ── State ──────────────────────────────────────────────────────────
var _fpEmail    = '';
var _fpOtp      = '';
var _fpVerified = false;
var _fpTimer    = null;

// ── Open / Close ───────────────────────────────────────────────────
function fpOpen() {
    var ov = document.getElementById('fp-overlay');
    ov.style.display = 'flex';
    fpGoStep(1);
    document.getElementById('fp-email-inp').value = '';
}

function fpClose() {
    document.getElementById('fp-overlay').style.display = 'none';
    clearInterval(_fpTimer);
    _fpVerified = false;
    _fpOtp = '';
    _fpEmail = '';
    // Reset OTP inputs
    document.querySelectorAll('.fp-otp-box').forEach(function(b) {
        b.value = '';
        b.style.borderColor = 'rgba(99,102,241,0.3)';
    });
    var p = document.getElementById('fp-newpass');
    var c = document.getElementById('fp-confpass');
    if (p) p.value = '';
    if (c) c.value = '';
    fpHideErr('fp-s1-err');
    fpHideErr('fp-s2-err');
    fpHideErr('fp-s3-err');
}

document.getElementById('forgot-password-btn').addEventListener('click', fpOpen);
document.getElementById('fp-close-btn').addEventListener('click', fpClose);
document.getElementById('fp-overlay').addEventListener('click', function(e) {
    if (e.target.id === 'fp-overlay') fpClose();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fpClose();
});

// ── Error helpers ─────────────────────────────────────────────────
function fpShowErr(id, msg) {
    var el = document.getElementById(id);
    el.textContent = msg;
    el.style.display = 'block';
}
function fpHideErr(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

// ── Step navigation ───────────────────────────────────────────────
function fpGoStep(step) {
    document.getElementById('fp-s1').style.display       = 'none';
    document.getElementById('fp-s2').style.display       = 'none';
    document.getElementById('fp-s3').style.display       = 'none';
    document.getElementById('fp-success').style.display  = 'none';

    var active   = '#6366f1';
    var inactive = 'rgba(255,255,255,0.12)';

    if (step === 1) {
        document.getElementById('fp-s1').style.display = 'block';
        document.getElementById('fp-dot1').style.cssText = 'height:6px; width:36px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-dot2').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + inactive + '; transition:all 0.3s;';
        document.getElementById('fp-dot3').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + inactive + '; transition:all 0.3s;';
        document.getElementById('fp-subtitle').textContent  = 'Enter your email to get started';
        document.getElementById('fp-step-lbl').textContent  = 'Step 1 of 3';
    } else if (step === 2) {
        document.getElementById('fp-s2').style.display = 'block';
        document.getElementById('fp-dot1').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-dot2').style.cssText = 'height:6px; width:36px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-dot3').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + inactive + '; transition:all 0.3s;';
        document.getElementById('fp-subtitle').textContent  = 'Check your inbox for the code';
        document.getElementById('fp-step-lbl').textContent  = 'Step 2 of 3';
        fpStartTimer(3600);
        var boxes = document.querySelectorAll('.fp-otp-box');
        if (boxes.length) boxes[0].focus();
    } else if (step === 3) {
        document.getElementById('fp-s3').style.display = 'block';
        document.getElementById('fp-dot1').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-dot2').style.cssText = 'height:6px; width:18px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-dot3').style.cssText = 'height:6px; width:36px; border-radius:3px; background:' + active + '; transition:all 0.3s;';
        document.getElementById('fp-subtitle').textContent  = 'Create your new password';
        document.getElementById('fp-step-lbl').textContent  = 'Step 3 of 3';
        clearInterval(_fpTimer);
    } else if (step === 'success') {
        document.getElementById('fp-success').style.display = 'block';
        document.getElementById('fp-subtitle').textContent  = 'All done!';
        document.getElementById('fp-step-lbl').textContent  = '✓ Complete';
    }
}

// ── Timer ─────────────────────────────────────────────────────────
function fpStartTimer(seconds) {
    clearInterval(_fpTimer);
    var rem = seconds;
    var timerEl = document.getElementById('fp-timer');
    function tick() {
        var m = Math.floor(rem / 60).toString().padStart(2,'0');
        var s = (rem % 60).toString().padStart(2,'0');
        timerEl.textContent = m + ':' + s;
        if (rem <= 0) { clearInterval(_fpTimer); timerEl.textContent = 'Expired'; timerEl.style.color = '#ef4444'; return; }
        rem--;
    }
    tick();
    _fpTimer = setInterval(tick, 1000);
}

// ── OTP box keyboard navigation ───────────────────────────────────
(function() {
    var boxes = document.querySelectorAll('.fp-otp-box');
    boxes.forEach(function(box, idx) {
        box.addEventListener('focus', function() {
            this.style.borderColor = '#6366f1';
            this.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)';
        });
        box.addEventListener('blur', function() {
            this.style.boxShadow = '';
            if (!this.value) this.style.borderColor = 'rgba(99,102,241,0.3)';
        });
        box.addEventListener('input', function(e) {
            var v = e.target.value.replace(/\D/g,'');
            e.target.value = v ? v[0] : '';
            if (v && idx < boxes.length - 1) boxes[idx+1].focus();
        });
        box.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && idx > 0) boxes[idx-1].focus();
        });
        box.addEventListener('paste', function(e) {
            e.preventDefault();
            var pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'');
            boxes.forEach(function(b, i) { b.value = pasted[i] || ''; });
            var last = Math.min(pasted.length, boxes.length) - 1;
            if (last >= 0) boxes[last].focus();
        });
    });
})();

function fpGetOtp() {
    return Array.from(document.querySelectorAll('.fp-otp-box')).map(function(b){ return b.value; }).join('');
}

// ── STEP 1: Send OTP ─────────────────────────────────────────────
function fpSendOtp() {
    fpHideErr('fp-s1-err');
    var email = document.getElementById('fp-email-inp').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fpShowErr('fp-s1-err', 'Please enter a valid email address.');
        return;
    }

    var btn  = document.getElementById('fp-send-btn');
    var txt  = document.getElementById('fp-send-txt');
    btn.disabled = true; btn.style.opacity = '0.65'; txt.textContent = 'Sending...';

    fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email })
    })
    .then(function(r) { return r.json().then(function(d){ return {ok:r.ok,data:d}; }); })
    .then(function(res) {
        if (!res.ok) {
            fpShowErr('fp-s1-err', res.data.message || (res.data.errors && res.data.errors.email && res.data.errors.email[0]) || 'Failed to send OTP. Please try again.');
        } else {
            _fpEmail = email;
            document.getElementById('fp-s2-email').textContent = email;
            document.querySelectorAll('.fp-otp-box').forEach(function(b){ b.value = ''; });
            fpGoStep(2);
        }
    })
    .catch(function() { fpShowErr('fp-s1-err', 'Network error. Please check your connection.'); })
    .finally(function() { btn.disabled = false; btn.style.opacity = '1'; txt.textContent = 'Send Verification Code'; });
}

// ── Resend OTP ───────────────────────────────────────────────────
function fpResendOtp() {
    fpHideErr('fp-s2-err');
    document.querySelectorAll('.fp-otp-box').forEach(function(b){ b.value = ''; });
    var timerEl = document.getElementById('fp-timer');
    timerEl.style.color = '#818cf8';

    fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: _fpEmail })
    })
    .then(function(r) { return r.json().then(function(d){ return {ok:r.ok,data:d}; }); })
    .then(function(res) {
        if (!res.ok) {
            fpShowErr('fp-s2-err', res.data.message || 'Failed to resend code.');
        } else {
            fpStartTimer(3600);
            document.querySelectorAll('.fp-otp-box')[0].focus();
        }
    })
    .catch(function() { fpShowErr('fp-s2-err', 'Network error. Please try again.'); });
}

// ── STEP 2: Verify OTP ──────────────────────────────────────────
function fpVerifyOtp() {
    fpHideErr('fp-s2-err');
    var otp = fpGetOtp();
    if (otp.length !== 6) {
        fpShowErr('fp-s2-err', 'Please enter all 6 digits of the verification code.');
        return;
    }

    var btn = document.getElementById('fp-verify-btn');
    var txt = document.getElementById('fp-verify-txt');
    btn.disabled = true; btn.style.opacity = '0.65'; txt.textContent = 'Verifying...';

    fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: _fpEmail, otp: otp })
    })
    .then(function(r) { return r.json().then(function(d){ return {ok:r.ok,data:d}; }); })
    .then(function(res) {
        if (!res.ok) {
            // Mark boxes red
            document.querySelectorAll('.fp-otp-box').forEach(function(b){ b.style.borderColor = '#ef4444'; });
            fpShowErr('fp-s2-err', res.data.message || 'Invalid verification code. Please try again.');
        } else {
            // ✅ OTP verified — unlock step 3
            _fpOtp      = otp;
            _fpVerified = true;
            fpGoStep(3);
        }
    })
    .catch(function() { fpShowErr('fp-s2-err', 'Network error. Please try again.'); })
    .finally(function() { btn.disabled = false; btn.style.opacity = '1'; txt.textContent = 'Verify Code'; });
}

// ── STEP 3: Reset Password ──────────────────────────────────────
function fpResetPassword() {
    fpHideErr('fp-s3-err');

    // Hard guard: must be verified
    if (!_fpVerified) {
        fpShowErr('fp-s3-err', 'OTP not verified. Please restart the process.');
        return;
    }

    var pass = document.getElementById('fp-newpass').value;
    var conf = document.getElementById('fp-confpass').value;

    if (pass.length < 8) {
        fpShowErr('fp-s3-err', 'Password must be at least 8 characters long.');
        return;
    }
    if (pass !== conf) {
        fpShowErr('fp-s3-err', 'Passwords do not match. Please try again.');
        return;
    }

    var btn = document.getElementById('fp-reset-btn');
    var txt = document.getElementById('fp-reset-txt');
    btn.disabled = true; btn.style.opacity = '0.65'; txt.textContent = 'Resetting...';

    fetch('/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            email: _fpEmail,
            otp: _fpOtp,
            password: pass,
            password_confirmation: conf
        })
    })
    .then(function(r) { return r.json().then(function(d){ return {ok:r.ok,data:d}; }); })
    .then(function(res) {
        if (!res.ok) {
            fpShowErr('fp-s3-err', res.data.message || 'Failed to reset password. Please try again.');
        } else {
            _fpVerified = false;
            fpGoStep('success');
        }
    })
    .catch(function() { fpShowErr('fp-s3-err', 'Network error. Please try again.'); })
    .finally(function() { btn.disabled = false; btn.style.opacity = '1'; txt.textContent = 'Reset Password'; });
}

// ── Enter key shortcuts ─────────────────────────────────────────
document.getElementById('fp-email-inp').addEventListener('keydown', function(e){
    if (e.key === 'Enter') fpSendOtp();
});
</script>
@endpush
