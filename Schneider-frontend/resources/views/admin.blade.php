@extends('layouts.app')

@section('title', 'Admin Platform Command - Schneider')

@section('content')
<div class="min-h-screen pt-24 pb-16" 
     x-data="{ 
        bookings: [],
        techs: [],
        init() {
            axios.get('/api/v1/bookings').then(res => {
                this.bookings = res.data.bookings || res.data.data || [];
            }).catch(err => {
                this.bookings = [
                    { id: 301, service: { name: 'Appliance Leak Repair' }, customer: { name: 'Bob Johnson' }, technician: { name: 'John Mitchell' }, status: 'en_route' }
                ];
            });

            axios.get('/api/v1/technicians').then(res => {
                this.techs = res.data.technicians || res.data.data || [];
            }).catch(err => {
                this.techs = [
                    { id: 1, name: 'John Mitchell', specialty: 'HVAC Specialist', rating: 4.9 }
                ];
            });
        }
     }"
     x-effect="$nextTick(() => { if (window.lucide) window.lucide.createIcons(); })">
    
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- Welcome Card -->
        <div class="card-premium bg-card/85 p-8 border border-border mb-8 shadow-md rounded-2xl">
            <h1 class="text-3xl font-extrabold text-foreground">
                Platform Command: <span class="text-primary">Admin Control</span>
            </h1>
            <p class="text-sm text-muted-foreground mt-2">Oversee live technician dispatch feeds, active booking queries, and real-time WebSockets.</p>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
            
            <!-- Left Panel: All active bookings -->
            <div class="lg:col-span-2 space-y-6">
                <h3 class="text-lg font-bold text-foreground">Live Dispatches System Feed</h3>

                <div class="space-y-4">
                    <template x-for="b in bookings" :key="b.id">
                        <div class="card-premium rounded-xl p-5 bg-card/75 border border-border flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
                            <div class="space-y-1">
                                <span class="text-[10px] font-bold text-muted-foreground font-mono" x-text="'DISPATCH #' + b.id"></span>
                                <h4 class="font-bold text-foreground text-sm" x-text="b.service?.name || 'Service Dispatch'"></h4>
                                <p class="text-xs text-muted-foreground" x-text="'Customer: ' + (b.customer?.name || 'Bob') + ' | Tech: ' + (b.technician?.name || 'Assigning...')"></p>
                            </div>
                            
                            <div class="flex items-center gap-3">
                                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                      :class="{
                                          'bg-warning/20 text-warning border border-warning/30': b.status === 'pending',
                                          'bg-primary/20 text-primary border border-primary/30': b.status === 'assigned' || b.status === 'en_route' || b.status === 'arrived',
                                          'bg-success/20 text-success border border-success/30': b.status === 'completed'
                                      }"
                                      x-text="b.status"></span>
                                
                                <a :href="'/chat?bookingId=' + b.id" class="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all cursor-pointer" title="Supervise Chat">
                                    <i data-lucide="message-square" class="h-4 w-4 text-primary"></i>
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Right Panel: Online technicians -->
            <div class="space-y-6">
                <h3 class="text-lg font-bold text-foreground">Active Dispatch Team</h3>

                <div class="space-y-3">
                    <template x-for="t in techs" :key="t.id">
                        <div class="card-premium rounded-xl p-4 bg-card/75 border border-border flex items-center justify-between shadow-sm">
                            <div class="flex items-center gap-3">
                                <div class="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                                    👤
                                </div>
                                <div>
                                    <h4 class="font-bold text-foreground text-xs" x-text="t.name"></h4>
                                    <p class="text-[10px] text-muted-foreground" x-text="t.specialty || 'General Engineer'"></p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-amber-500 font-semibold" x-text="'★ ' + (t.rating || '5.0')"></span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>

    </div>
</div>
@endsection
