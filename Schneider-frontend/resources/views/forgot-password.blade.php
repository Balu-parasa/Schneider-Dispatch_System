@extends('layouts.app')

@section('title', 'Forgot Password - Schneider Dispatch Platform')

@section('content')
<div class="flex min-h-[90vh] items-stretch" x-data="{
    email: '',
    isLoading: false,
    otpReceived: null,
    message: '',
    error: '',
    submitEmail() {
        if (!this.email) return;
        this.isLoading = true;
        this.error = '';
        this.message = '';

        axios.post('/api/v1/auth/forgot-password', {
            email: this.email
        })
        .then(res => {
            this.message = res.data.message;
            this.otpReceived = res.data.otp; // Expose the OTP locally as provided by the controller
            this.isLoading = false;
        })
        .catch(err => {
            this.error = err.response?.data?.message || 'An error occurred. Please check the email and try again.';
            this.isLoading = false;
        });
    }
}">
    
    <!-- Left Side: Forgot Password Form -->
    <div class="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 z-10">
        <div class="mx-auto w-full max-w-md bg-[#0f1422]/60 p-8 rounded-2xl border border-white/5 backdrop-blur-md">
            
            <div class="mb-8">
                <a href="{{ route('home') }}" class="flex items-center gap-2 group">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 glow-blue">
                        <i data-lucide="zap" class="h-6 w-6 text-white"></i>
                    </div>
                    <span class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Schneider
                    </span>
                </a>
            </div>

            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-white">
                    Reset Password
                </h1>
                <p class="mt-2 text-sm text-slate-400">
                    Enter your email to request a secure verification code
                </p>
            </div>

            <!-- Success Alert -->
            <div x-show="message" x-transition class="mt-6 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-lg">
                <div class="flex items-start gap-3">
                    <i data-lucide="check-circle" class="h-5 w-5 text-emerald-400 shrink-0 mt-0.5"></i>
                    <div>
                        <p class="text-xs text-white font-semibold leading-relaxed" x-text="message"></p>
                        
                        <!-- Expose OTP if it exists for easy sandbox usage -->
                        <div x-show="otpReceived" class="mt-3 p-3 rounded-lg bg-white/5 border border-white/10 font-mono text-center">
                            <span class="text-xs text-slate-400 block font-sans">Verification OTP Code (Sandbox):</span>
                            <span class="text-2xl font-bold tracking-widest text-emerald-400 mt-1 block" x-text="otpReceived"></span>
                        </div>
                        
                        <div class="mt-4">
                            <a :href="'/reset-password?email=' + encodeURIComponent(email)" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-950/20 glow-blue text-xs font-semibold cursor-pointer">
                                Go to Password Reset
                                <i data-lucide="arrow-right" class="h-3 w-3"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error Alert -->
            <div x-show="error" x-transition class="mt-6 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-lg">
                <div class="flex items-center gap-3">
                    <i data-lucide="alert-triangle" class="h-5 w-5 text-rose-400 shrink-0"></i>
                    <p class="text-xs text-rose-350 font-semibold leading-relaxed" x-text="error"></p>
                </div>
            </div>

            <!-- Form -->
            <form x-show="!otpReceived" @submit.prevent="submitEmail" class="mt-8 space-y-6">
                <div class="space-y-4">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-400">Email address</label>
                        <div class="relative mt-2">
                            <i data-lucide="mail" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"></i>
                            <input id="email" 
                                   type="email" 
                                   x-model="email" 
                                   placeholder="you@example.com" 
                                   class="block w-full rounded-xl bg-white/5 border border-white/10 px-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all" 
                                   required />
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" 
                        :disabled="isLoading" 
                        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg glow-blue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <span x-show="!isLoading">Send Verification Code</span>
                    <span x-show="isLoading" class="flex items-center gap-2">
                        <span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Processing...
                    </span>
                    <i data-lucide="arrow-right" class="h-4 w-4" x-show="!isLoading"></i>
                </button>
            </form>

            <p class="mt-8 text-center text-xs text-slate-400">
                Remember your credentials? 
                <a href="{{ route('login') }}" class="text-emerald-400 font-semibold hover:underline">Sign in instead</a>
            </p>

        </div>
    </div>

    <!-- Right Side: Decorative Immersive Panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center border-l border-white/5">
        <!-- Visual highlights overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10 z-0"></div>
        <div class="absolute inset-0 gradient-mesh opacity-40 z-0"></div>
        <div class="absolute inset-0 grid-pattern opacity-20 z-0"></div>

        <div class="relative z-10 px-12 max-w-xl">
            <h2 class="text-3xl font-extrabold text-white leading-snug">
                Secured Monolithic Identity Systems
            </h2>
            <p class="mt-4 text-slate-400 text-sm leading-relaxed">
                Schneider utilizes state-of-the-art cryptographic practices to safeguard dispatch identity controls. Resetting passwords requires double-validation of offline generated sandbox keys or mail server OTP hooks.
            </p>
        </div>
    </div>

</div>
@endsection
