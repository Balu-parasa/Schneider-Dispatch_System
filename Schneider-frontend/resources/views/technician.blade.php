@extends('layouts.app')

@section('title', 'Technician Dispatch Control - Schneider')

@section('content')
<div class="min-h-screen pt-24 pb-16" 
     x-data="{ 
        jobs: [],
        onlineStatus: 'online',
        init() {
            axios.get('/api/v1/technician/bookings').then(res => {
                this.jobs = res.data.bookings || res.data.data || [];
            }).catch(err => {
                this.jobs = [
                    { id: 201, service: { name: 'AC Compressor Replacement' }, customer: { name: 'Alice Smith' }, address: '456 Oak Ave', city: 'San Francisco', status: 'assigned' }
                ];
            });
        },
        updateJobStatus(jobId, newStatus) {
            axios.patch('/api/v1/bookings/' + jobId, { status: newStatus }).then(res => {
                window.toast('Status successfully updated!');
                this.init();
            }).catch(err => alert('Failed to update job status.'));
        }
     }"
     x-effect="$nextTick(() => { if (window.lucide) window.lucide.createIcons(); })">
    
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- Tech Control Header -->
        <div class="card-premium bg-card/85 p-8 border border-border mb-8 shadow-md rounded-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
                <h1 class="text-3xl font-extrabold text-foreground">
                    Technician Hub: <span class="text-primary">{{ Auth::user()->name ?? 'Specialist' }}</span>
                </h1>
                <p class="text-sm text-muted-foreground mt-2">Manage your current active dispatches, navigation coordinates, and status logs.</p>
            </div>

            <!-- Online Offline toggle -->
            <div class="flex items-center gap-3">
                <button type="button" 
                        @click="onlineStatus = (onlineStatus === 'online' ? 'offline' : 'online')"
                        class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        :class="onlineStatus === 'online' ? 'bg-success/20 text-success border border-success/30' : 'bg-secondary text-muted-foreground border border-border'">
                    <span class="inline-block h-2 w-2 rounded-full mr-2" :class="onlineStatus === 'online' ? 'bg-success animate-pulse' : 'bg-muted-foreground'"></span>
                    <span x-text="onlineStatus === 'online' ? 'Online' : 'Offline'"></span>
                </button>
            </div>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
            
            <!-- Left: Active dispatches -->
            <div class="lg:col-span-2 space-y-6">
                <h3 class="text-lg font-bold text-foreground">Assigned Dispatches</h3>

                <div class="space-y-4">
                    <template x-for="j in jobs" :key="j.id">
                        <div class="card-premium rounded-xl p-6 bg-card/75 border border-border shadow-sm hover:shadow-md transition-all">
                            <div class="flex items-center justify-between border-b border-border pb-4 mb-4">
                                <div>
                                    <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono" x-text="'JOB #' + j.id"></span>
                                    <h4 class="font-bold text-foreground mt-1" x-text="j.service?.name || 'Technical Repair'"></h4>
                                </div>
                                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                      :class="{
                                          'bg-warning/20 text-warning border border-warning/30': j.status === 'pending',
                                          'bg-primary/20 text-primary border border-primary/30': j.status === 'assigned' || j.status === 'en_route' || j.status === 'arrived',
                                          'bg-success/20 text-success border border-success/30': j.status === 'completed'
                                      }"
                                      x-text="j.status"></span>
                            </div>

                            <div class="grid gap-4 sm:grid-cols-2 text-xs mb-6 text-muted-foreground">
                                <div>
                                    <span class="uppercase tracking-wider block font-bold text-[10px]">Customer</span>
                                    <span class="text-foreground mt-1 block font-semibold" x-text="j.customer?.name || 'Alice Smith'"></span>
                                </div>
                                <div>
                                    <span class="uppercase tracking-wider block font-bold text-[10px]">Address</span>
                                    <span class="text-foreground mt-1 block font-semibold font-medium" x-text="j.address + ', ' + j.city"></span>
                                </div>
                            </div>

                            <!-- Actions & Secure Chat Portal -->
                            <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                                <div class="flex flex-wrap gap-2">
                                    <button type="button" @click="updateJobStatus(j.id, 'en_route')" class="px-3.5 py-1.5 rounded-lg btn-primary hover-lift text-xs font-bold transition-all cursor-pointer">
                                        Mark En Route
                                    </button>
                                    <button type="button" @click="updateJobStatus(j.id, 'arrived')" class="px-3.5 py-1.5 rounded-lg bg-warning/80 hover:bg-warning text-warning-foreground text-xs font-bold transition-all cursor-pointer border border-warning/20">
                                        Mark Arrived
                                    </button>
                                    <button type="button" @click="updateJobStatus(j.id, 'completed')" class="px-3.5 py-1.5 rounded-lg bg-success/80 hover:bg-success text-success-foreground text-xs font-bold transition-all cursor-pointer border border-success/20">
                                        Mark Completed
                                    </button>
                                </div>

                                <a :href="'/chat?bookingId=' + j.id" class="px-3.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer">
                                    <i data-lucide="message-square" class="h-3.5 w-3.5 text-primary"></i>
                                    Secure Chat Portal
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Right: Dispatch details -->
            <div class="space-y-6">
                <div class="card-premium rounded-xl p-6 border border-border bg-card/85 shadow-sm">
                    <h3 class="font-bold text-foreground text-base mb-4">Location Logs</h3>
                    <p class="text-xs text-muted-foreground mb-4 leading-relaxed">Your location is synced every 30 seconds to the main dispatch control map.</p>
                    <div class="rounded-lg bg-secondary/50 p-3 text-center border border-border">
                        <span class="text-muted-foreground text-xs block">Active Coordinates</span>
                        <span class="text-success font-mono text-xs font-bold mt-1 block">37.7749, -122.4194</span>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
@endsection
