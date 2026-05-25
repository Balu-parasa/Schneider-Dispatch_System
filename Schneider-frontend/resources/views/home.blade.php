@extends('layouts.app')

@section('title', 'Schneider - Realtime Smart Dispatch & CRM Monolith')

@section('content')
<div x-data="{
    stats: {
        online_technicians: 2847,
        completed_jobs: 50000,
        average_rating: 4.92,
        dispatch_feed: [
            {
                name: 'John D.',
                service: 'HVAC Tuning',
                status: 'En Route',
                time: '2 min ago',
                icon: 'thermometer',
                color: 'text-accent bg-accent/10'
            },
            {
                name: 'Sarah M.',
                service: 'Plumbing Repair',
                status: 'On Site',
                time: '12 min ago',
                icon: 'droplets',
                color: 'text-primary bg-primary/10'
            },
            {
                name: 'Mike R.',
                service: 'Electrical Setup',
                status: 'Done',
                time: 'Just now',
                icon: 'plug',
                color: 'text-chart-4 bg-chart-4/10'
            }
        ]
    },
    async init() {
        try {
            const res = await fetch('http://localhost:8000/api/v1/landing-stats');
            if (res.ok) {
                const data = await res.json();
                this.stats = data;
            }
        } catch (err) {
            console.warn('Failed to fetch landing stats from backend, using fallbacks.', err);
        }
        
        // Poll every 10 seconds for real-time dispatch updates
        setInterval(async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/landing-stats');
                if (res.ok) {
                    const data = await res.json();
                    this.stats = data;
                }
            } catch (err) {}
        }, 10000);
    }
}" x-effect="$nextTick(() => { if (window.lucide) window.lucide.createIcons(); })">

<!-- Hero Section -->
<section class="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
    <!-- Ambient Blur Orbs -->
    <div class="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div class="grid items-center gap-12 lg:grid-cols-2">
            
            <!-- Left content -->
            <div id="hero-left-content" class="text-center lg:text-left">
                <!-- Online stats indicator -->
                <div class="mb-6 inline-flex">
                    <div class="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md">
                        <span class="relative flex h-2 w-2">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                            <span class="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                        </span>
                        <span class="text-xs font-semibold text-primary">
                            <span x-text="stats.online_technicians.toLocaleString()">2,847</span> technicians online now
                        </span>
                    </div>
                </div>

                <h1 class="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Realtime Smart Service <br>
                    <span class="animated-gradient-text font-extrabold">
                        Dispatch Platform
                    </span>
                </h1>

                <p class="mt-6 text-base text-muted-foreground sm:text-lg max-w-xl mx-auto lg:mx-0 text-pretty">
                    Book trusted technicians for home, commercial, and industrial services with instant AI matching and live GPS updates.
                </p>

                <!-- Small Stats Row -->
                <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-8">
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-foreground" x-text="Math.round(stats.completed_jobs / 1000) + 'K+'">50K+</div>
                        <div class="text-xs text-muted-foreground font-medium">Jobs Completed</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-foreground" x-text="Number(stats.average_rating).toFixed(1)">4.9</div>
                        <div class="text-xs text-muted-foreground font-medium">Average Rating</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-foreground">&lt;15m</div>
                        <div class="text-xs text-muted-foreground font-medium">Response Time</div>
                    </div>
                </div>

                <!-- CTA buttons -->
                <div class="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                    <a href="{{ route('booking.create') }}" class="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-md glow-blue flex items-center gap-2">
                        Book Service
                        <i data-lucide="arrow-right" class="h-4 w-4"></i>
                    </a>
                    <a href="#services" class="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-all border border-border">
                        Explore Services
                    </a>
                </div>
            </div>

            <!-- Right content (Dashboard Preview) -->
            <div id="hero-right-dashboard" class="relative">
                <div class="glass-card rounded-2xl p-1 border border-border shadow-2xl">
                    <div class="rounded-xl bg-card p-6">
                        
                        <!-- Header -->
                        <div class="mb-4 flex items-center justify-between">
                            <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Live Dispatch Feed</h3>
                            <div class="flex items-center gap-2">
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                                </span>
                                <span class="text-xs text-success font-semibold uppercase">Active</span>
                            </div>
                        </div>

                        <!-- Feed items (Dynamic via Alpine) -->
                        <div class="space-y-3">
                            <template x-for="(item, index) in stats.dispatch_feed" :key="index">
                                <div class="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 border border-border animate-fade-in">
                                    <div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="item.color || 'bg-primary/10 text-primary'">
                                        <i :data-lucide="item.icon.toLowerCase()" class="h-5 w-5"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between">
                                            <span class="text-xs font-semibold text-foreground" x-text="item.name"></span>
                                            <span class="text-[10px] text-muted-foreground font-mono" x-text="item.time"></span>
                                        </div>
                                        <div class="flex items-center justify-between mt-1">
                                            <span class="text-xs text-muted-foreground" x-text="item.service"></span>
                                            <span class="text-xs font-semibold" :class="item.color ? item.color.split(' ')[0] : 'text-primary'" x-text="item.status"></span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- mini stats -->
                        <div class="mt-4 grid grid-cols-3 gap-3">
                            <div class="rounded-lg bg-secondary/30 p-3 text-center border border-border">
                                <div class="text-base font-bold text-foreground">128</div>
                                <div class="text-[9px] text-muted-foreground uppercase tracking-wider font-mono">Active</div>
                            </div>
                            <div class="rounded-lg bg-secondary/30 p-3 text-center border border-border">
                                <div class="text-base font-bold text-foreground">47</div>
                                <div class="text-[9px] text-muted-foreground uppercase tracking-wider font-mono">Pending</div>
                            </div>
                            <div class="rounded-lg bg-secondary/30 p-3 text-center border border-border">
                                <div class="text-base font-bold text-foreground">892</div>
                                <div class="text-[9px] text-muted-foreground uppercase tracking-wider font-mono">Today</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Floating animations card -->
                <div class="floating absolute -left-8 top-1/4 rounded-xl bg-card p-3 shadow-2xl border border-border z-20">
                    <div class="flex items-center gap-2">
                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success">
                            <i data-lucide="check" class="h-4 w-4"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-foreground">Job Complete</div>
                            <div class="text-[9px] text-muted-foreground font-mono">AC Tuning - $285</div>
                        </div>
                    </div>
                </div>

                <div class="floating absolute -right-4 bottom-1/4 rounded-xl bg-card p-3 shadow-2xl border border-border z-20" style="animation-delay: 1.5s;">
                    <div class="flex items-center gap-2">
                        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <i data-lucide="map-pin" class="h-4 w-4"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-foreground">Tech Arriving</div>
                            <div class="text-[9px] text-muted-foreground font-mono">ETA: 8 minutes</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Express Dispatch Runway Simulator Section -->
<section class="relative h-[40vh] w-full overflow-hidden pointer-events-none z-20 flex items-center justify-center">
    <div id="lottie-scooter-container" 
         x-data="{ 
            initLottie() {
                if (window.lottie) {
                    window.lottie.loadAnimation({
                        container: this.$el,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '{{ asset('Man_riding_a_red_scooter.json') }}'
                    });
                }
            }
         }"
         x-init="initLottie()"
         class="absolute w-[280px] sm:w-[350px] aspect-square flex items-center justify-center">
        <!-- Ambient Shadow Glow -->
        <div class="absolute bottom-[10%] w-[70%] h-3.5 bg-primary/10 rounded-full blur-md -skew-x-12 animate-pulse"></div>
    </div>
</section>

<!-- Services Grid Section -->
<section id="services" class="relative py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="text-center">
            <h2 class="text-3xl font-extrabold text-foreground sm:text-4xl">Our Services</h2>
            <p class="mx-auto mt-4 max-w-xl text-muted-foreground text-sm">
                Comprehensive technical dispatches for your residential, business, or complex industrial infrastructure.
            </p>
        </div>

        <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Service 1 -->
            <a href="{{ route('booking.create') }}" class="group glass-card cursor-pointer rounded-2xl p-6 transition-all hover:border-primary/30 hover:scale-[1.02] block border border-border">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <i data-lucide="thermometer" class="h-6 w-6"></i>
                </div>
                <h3 class="mb-2 text-lg font-bold text-foreground">HVAC Maintenance</h3>
                <p class="text-sm text-muted-foreground">
                    Heating, cooling, ventilation tuning, and regular environment diagnostics.
                </p>
                <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Book Dispatch</span>
                    <i data-lucide="arrow-right" class="h-3 w-3"></i>
                </div>
            </a>

            <!-- Service 2 -->
            <a href="{{ route('booking.create') }}" class="group glass-card cursor-pointer rounded-2xl p-6 transition-all hover:border-primary/30 hover:scale-[1.02] block border border-border">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <i data-lucide="droplets" class="h-6 w-6"></i>
                </div>
                <h3 class="mb-2 text-lg font-bold text-foreground">Advanced Plumbing</h3>
                <p class="text-sm text-muted-foreground">
                    Leak repair, residential pipeline inspection, and heavy high-capacity installations.
                </p>
                <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Book Dispatch</span>
                    <i data-lucide="arrow-right" class="h-3 w-3"></i>
                </div>
            </a>

            <!-- Service 3 -->
            <a href="{{ route('booking.create') }}" class="group glass-card cursor-pointer rounded-2xl p-6 transition-all hover:border-primary/30 hover:scale-[1.02] block border border-border">
                <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chart-4/10 text-chart-4">
                    <i data-lucide="plug" class="h-6 w-6"></i>
                </div>
                <h3 class="mb-2 text-lg font-bold text-foreground">Electrical Dispatch</h3>
                <p class="text-sm text-muted-foreground">
                    Power outages, wiring updates, and smart grid automation integrations.
                </p>
                <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Book Dispatch</span>
                    <i data-lucide="arrow-right" class="h-3 w-3"></i>
                </div>
            </a>
        </div>

    </div>
</section>

<!-- Why Choose Us Features Section -->
<section id="features" class="relative py-24 border-t border-border bg-secondary/20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-16 lg:grid-cols-2">
            
            <div>
                <h2 class="text-3xl font-extrabold text-foreground sm:text-4xl">Platform Capabilities</h2>
                <p class="mt-4 text-muted-foreground text-sm">
                    Leveraging native real-time WebSockets and smart queue algorithms to connect you to high-performing technicians instantly.
                </p>

                <div class="mt-10 space-y-6">
                    <div class="flex gap-4">
                        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <i data-lucide="activity" class="h-6 w-6"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-base">Realtime Navigation Tracking</h3>
                            <p class="mt-1 text-xs text-muted-foreground leading-relaxed">
                                Live location sharing powered by native Laravel Reverb WebSocket frames.
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <i data-lucide="zap" class="h-6 w-6"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-foreground text-base">Smart AI Dispatcher</h3>
                            <p class="mt-1 text-xs text-muted-foreground leading-relaxed">
                                Automated queue matching evaluates technician ratings, skillsets, and distance in real time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dashboard Mockup Image with glass overlays -->
            <div class="glass-card rounded-2xl p-2 border border-border shadow-2xl">
                <img src="{{ asset('vehicles-perspective.png') }}" class="rounded-xl opacity-90 object-cover w-full h-auto shadow-inner blend-transparent-vehicles" alt="Platform Overview">
            </div>

        </div>
    </div>
</section>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Use GSAP for simple cinematic entrance animations on landing elements
        if (typeof gsap !== 'undefined') {
            gsap.from('#hero-left-content', {
                x: -80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('#hero-right-dashboard', {
                x: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });
        }

        // Simple scroll responsive driving scooter animation
        const scooter = document.getElementById('lottie-scooter-container');
        if (scooter) {
            window.addEventListener('scroll', () => {
                const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
                
                // Replicate scooter driving across the runway
                const translatePercent = -40 + (180 * progress); // from -40% to 140%
                if (typeof gsap !== 'undefined') {
                    gsap.to(scooter, {
                        left: `${translatePercent}%`,
                        duration: 0.6,
                        ease: 'power1.out'
                    });
                } else {
                    scooter.style.left = `${translatePercent}%`;
                }
            });
        }
    });
</script>
@endpush
