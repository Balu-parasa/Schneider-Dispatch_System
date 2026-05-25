@extends('layouts.app')

@section('title', 'Sign In - Schneider Dispatch Platform')

@section('content')
<div class="flex min-h-[90vh] items-stretch">
    
    <!-- Left Side: Login Form -->
    <div class="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 z-10">
        <div class="mx-auto w-full max-w-md bg-card p-8 rounded-2xl border border-border backdrop-blur-md">
            
            <div class="mb-8">
                <a href="{{ route('home') }}" class="flex items-center gap-2 group">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary glow-blue">
                        <i data-lucide="zap" class="h-6 w-6 text-primary-foreground"></i>
                    </div>
                    <span class="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        Schneider
                    </span>
                </a>
            </div>

            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-foreground">
                    Welcome back
                </h1>
                <p class="mt-2 text-sm text-muted-foreground">
                    Sign in to your monolithic portal to continue
                </p>
            </div>

            <!-- Error Alerts -->
            @if ($errors->any())
                <div class="mt-6 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-lg">
                    <div class="flex items-center gap-3">
                        <i data-lucide="alert-triangle" class="h-5 w-5 text-rose-500 shrink-0"></i>
                        <p class="text-xs text-rose-600 dark:text-rose-300 font-semibold leading-relaxed">
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
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Email address</label>
                        <div class="relative mt-2">
                            <i data-lucide="mail" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"></i>
                            <input id="email" 
                                   type="email" 
                                   name="email" 
                                   placeholder="you@example.com" 
                                   value="{{ old('email') }}" 
                                   class="block w-full rounded-xl bg-secondary border border-border px-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                                   required />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                            <a href="{{ route('password.request') }}" class="text-xs text-primary hover:underline font-semibold">Forgot password?</a>
                        </div>
                        <div class="relative mt-2">
                            <i data-lucide="lock" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"></i>
                            <input id="password" 
                                   :type="showPass ? 'text' : 'password'" 
                                   name="password" 
                                   placeholder="••••••••" 
                                   class="block w-full rounded-xl bg-secondary border border-border px-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10" 
                                   required />
                            
                            <!-- Show Hide Eye -->
                            <button type="button" @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                <i data-lucide="eye" class="h-4 w-4" x-show="!showPass"></i>
                                <i data-lucide="eye-off" class="h-4 w-4" x-show="showPass"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-md glow-blue cursor-pointer">
                    Sign In
                    <i data-lucide="arrow-right" class="h-4 w-4"></i>
                </button>

                <!-- Divider -->
                <div class="relative flex py-2 items-center">
                    <div class="flex-grow border-t border-border"></div>
                    <span class="flex-shrink mx-4 text-muted-foreground text-xs uppercase tracking-wider font-mono">Or continue with</span>
                    <div class="flex-grow border-t border-border"></div>
                </div>

                <!-- Google OAuth -->
                <a href="{{ url('/auth/google') }}" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold transition-all">
                    <i data-lucide="chrome" class="h-5 w-5 text-rose-500"></i>
                    Google Client OAuth
                </a>
            </form>

            <p class="mt-8 text-center text-xs text-muted-foreground">
                Don't have an account? 
                <a href="#" class="text-primary font-semibold hover:underline">Create one now</a>
            </p>

        </div>
    </div>

    <!-- Right Side: Decorative Immersive Panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center border-l border-border bg-secondary/10">
        <!-- Visual highlights overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 z-0"></div>
        <div class="absolute inset-0 gradient-mesh opacity-40 z-0"></div>
        <div class="absolute inset-0 grid-pattern opacity-20 z-0"></div>

        <div class="relative z-10 px-12 max-w-xl">
            <h2 class="text-3xl font-extrabold text-foreground leading-snug">
                AI-Driven Enterprise Service Dispatch Control
            </h2>
            <p class="mt-4 text-muted-foreground text-sm leading-relaxed text-pretty">
                Connect directly with thousands of verified residential and industrial engineers. Track dispatch schedules, check route compliance, and monitor fleet logistics instantly in one full-stack dashboard.
            </p>

            <!-- Small visual details list -->
            <div class="mt-8 space-y-4">
                <div class="flex gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <i data-lucide="shield" class="h-4 w-4"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-foreground uppercase tracking-wider">Certified Network</h4>
                        <p class="text-xs text-muted-foreground">Every tech is fully background-screened and license-validated.</p>
                    </div>
                </div>

                <div class="flex gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <i data-lucide="clock" class="h-4 w-4"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-foreground uppercase tracking-wider">Guaranteed response times</h4>
                        <p class="text-xs text-muted-foreground">Average ETA of dispatch is less than 15 minutes.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection
