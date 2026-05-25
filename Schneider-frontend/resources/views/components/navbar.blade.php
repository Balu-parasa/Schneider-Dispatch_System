<nav x-data="{ 
         mobileOpen: false,
         theme: localStorage.getItem('theme') || 'dark',
         toggleTheme() {
             this.theme = this.theme === 'dark' ? 'light' : 'dark';
             localStorage.setItem('theme', this.theme);
             if (this.theme === 'light') {
                 document.documentElement.classList.remove('dark');
             } else {
                 document.documentElement.classList.add('dark');
             }
         }
     }"
     class="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 border-b border-border">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            
            <!-- Left Brand Logo -->
            <a href="{{ route('home') }}" class="flex items-center gap-2 group">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-blue group-hover:scale-105 transition-transform">
                    <i data-lucide="zap" class="h-5 w-5 text-primary-foreground"></i>
                </div>
                <span class="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Schneider
                </span>
            </a>

            <!-- Middle Navigation Links -->
            <div class="hidden items-center gap-8 md:flex">
                <a href="#services" class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Services</a>
                <a href="#features" class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
                <a href="#testimonials" class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Testimonials</a>
                <a href="#pricing" class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
            </div>

            <!-- Right Buttons and Theme Toggler -->
            <div class="flex items-center gap-3">
                <!-- Theme Toggle Button -->
                <button @click="toggleTheme()" class="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border">
                    <template x-if="theme === 'dark'">
                        <i data-lucide="sun" class="h-4 w-4"></i>
                    </template>
                    <template x-if="theme === 'light'">
                        <i data-lucide="moon" class="h-4 w-4"></i>
                    </template>
                </button>

                <!-- Dynamic Auth Buttons -->
                @auth
                    <a href="{{ Auth::user()->role->dashboardPath() }}" class="text-sm font-medium px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all border border-border">
                        {{ __('Dashboard') }}
                    </a>
                    
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-sm font-medium px-3 py-2 rounded-lg text-rose-500 hover:text-rose-400 transition-all cursor-pointer">
                            <i data-lucide="log-out" class="h-4 w-4 inline mr-1"></i>
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-sm font-medium px-4 py-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
                        Sign In
                    </a>
                    <a href="{{ route('booking.create') }}" class="text-sm font-medium px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm glow-blue">
                        Book Service
                    </a>
                @endauth

                <!-- Mobile Menu Button -->
                <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer">
                    <i data-lucide="menu" class="h-5 w-5" x-show="!mobileOpen"></i>
                    <i data-lucide="x" class="h-5 w-5" x-show="mobileOpen"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Drawer -->
    <div x-show="mobileOpen" x-transition class="md:hidden glass border-t border-border bg-background/95 px-4 pt-2 pb-4 space-y-1">
        <a href="#services" @click="mobileOpen = false" class="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">Services</a>
        <a href="#features" @click="mobileOpen = false" class="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">Features</a>
        <a href="#testimonials" @click="mobileOpen = false" class="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">Testimonials</a>
        <a href="#pricing" @click="mobileOpen = false" class="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">Pricing</a>
        @auth
            <a href="{{ Auth::user()->role->dashboardPath() }}" class="block py-2 text-base font-medium text-primary">Dashboard</a>
        @else
            <a href="{{ route('login') }}" class="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">Sign In</a>
            <a href="{{ route('booking.create') }}" class="block py-2 text-base font-medium text-primary">Book Service</a>
        @endauth
    </div>
</nav>
