@extends('layouts.app')

@section('title', 'Book a Service - ServiceFlow Monolith')

@section('content')
<div class="min-h-screen pt-24 pb-16" 
     x-data="{ 
        step: 1,
        isEmergency: false,
        propertyType: 'home',
        selectedService: '',
        selectedTech: '',
        address: '',
        city: '',
        zipCode: '',
        notes: '',
        scheduledDate: '',
        timeSlot: 'morning',
        specificTime: '',
        technicians: [],
        isSubmitting: false,

        latitude: '',
        longitude: '',
        map: null,
        marker: null,
        isGeocoding: false,
        searchResults: [],
        showResults: false,
        addressSearchQuery: '',

        init() {
            // Load live services and techs from endpoints
            axios.get('/api/v1/services').then(res => {
                this.services = res.data.services || res.data.data || [];
            }).catch(e => {
                this.services = [
                    { id: 1, name: 'HVAC Repair', base_price: 89, description: 'Heating, AC and ventilation tuning' },
                    { id: 2, name: 'Plumbing Service', base_price: 75, description: 'Leak repairs and diagnostics' },
                    { id: 3, name: 'Electrical Dispatch', base_price: 85, description: 'Wiring and emergency repairs' }
                ];
            });

            axios.get('/api/v1/technicians').then(res => {
                this.technicians = res.data.technicians || res.data.data || [];
            }).catch(e => {
                this.technicians = [
                    { id: 1, name: 'John Mitchell', specialty: 'HVAC Specialist', rating: '4.9', eta: '15 min' }
                ];
            });
        },

        submitBooking() {
            this.isSubmitting = true;
            axios.post('/api/v1/bookings', {
                service_id: this.selectedService,
                technician_id: this.selectedTech || null,
                is_emergency: this.isEmergency,
                property_type: this.propertyType,
                address: this.address,
                city: this.city,
                zip_code: this.zipCode,
                latitude: this.latitude || null,
                longitude: this.longitude || null,
                scheduled_date: this.scheduledDate || null,
                time_slot: this.timeSlot,
                specific_time: this.specificTime,
                notes: this.notes
            }).then(res => {
                window.toast('Booking created successfully!');
                setTimeout(() => {
                    window.location.href = '/customer/dashboard';
                }, 1500);
            }).catch(err => {
                this.isSubmitting = false;
                alert(err.response?.data?.message || 'Failed to submit booking. Check all fields.');
            });
        },

        initMap() {
            if (this.map) return;
            
            // Default to India
            let defaultLat = 20.5937;
            let defaultLng = 78.9629;
            
            this.map = L.map('location-map').setView([defaultLat, defaultLng], 5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
            
            this.marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(this.map);
            
            this.marker.on('dragend', (e) => {
                const pos = e.target.getLatLng();
                this.latitude = pos.lat.toFixed(6);
                this.longitude = pos.lng.toFixed(6);
                this.reverseGeocode(pos.lat, pos.lng);
            });
            
            // Try to get user location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.map.setView([lat, lng], 13);
                    this.marker.setLatLng([lat, lng]);
                    this.latitude = lat.toFixed(6);
                    this.longitude = lng.toFixed(6);
                    this.reverseGeocode(lat, lng);
                });
            }
        },

        searchAddress() {
            if (!this.addressSearchQuery || this.addressSearchQuery.length < 3) {
                this.searchResults = [];
                this.showResults = false;
                return;
            }
            this.isGeocoding = true;
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.addressSearchQuery)}&limit=5`)
                .then(res => res.json())
                .then(data => {
                    this.searchResults = data;
                    this.showResults = true;
                    this.isGeocoding = false;
                })
                .catch(() => {
                    this.isGeocoding = false;
                });
        },

        selectLocation(result) {
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);
            
            this.address = result.display_name;
            this.addressSearchQuery = result.display_name;
            
            let parts = result.display_name.split(',');
            if(parts.length > 2) {
                this.city = parts[parts.length - 3]?.trim() || '';
                this.zipCode = parts[parts.length - 2]?.trim() || '';
            }
            
            this.latitude = lat.toFixed(6);
            this.longitude = lng.toFixed(6);
            
            this.map.setView([lat, lng], 16);
            this.marker.setLatLng([lat, lng]);
            
            this.showResults = false;
            this.searchResults = [];
        },

        reverseGeocode(lat, lng) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.display_name) {
                        this.address = data.display_name;
                        this.addressSearchQuery = data.display_name;
                        this.city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || '';
                        this.zipCode = data.address?.postcode || '';
                    }
                });
        }
     }">

    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <!-- Step Indicators -->
        <div class="mb-12">
            <div class="flex items-center justify-between">
                <template x-for="s in [1, 2, 3, 4]" :key="s">
                    <div class="flex items-center flex-1 last:flex-initial">
                        <div class="flex flex-col items-center">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full border transition-all text-xs font-bold font-mono"
                                 :class="step >= s ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-slate-500'">
                                <span x-text="s"></span>
                            </div>
                        </div>
                        <div class="flex-grow mx-4 h-[2px]" 
                             :class="step > s ? 'bg-emerald-600' : 'bg-white/5'"></div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Wizard Box -->
        <div class="glass-card rounded-2xl p-8 border border-white/5 bg-[#0f1422]/60 backdrop-blur-md">
            
            <!-- STEP 1: SERVICE & EMERGENCY -->
            <div x-show="step === 1" x-transition>
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-extrabold text-white">Select a Service</h2>
                    <p class="text-sm text-slate-400 mt-2">What kind of maintenance task do you need assistance with today?</p>
                </div>

                <!-- Emergency Switcher -->
                <div class="mb-8 flex justify-center">
                    <button type="button" 
                            @click="isEmergency = !isEmergency" 
                            class="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                            :class="isEmergency ? 'bg-red-600 hover:bg-red-500 text-white glow-red shadow-lg shadow-red-600/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'">
                        <i data-lucide="alert-triangle" class="h-4 w-4 inline mr-1"></i>
                        <span x-text="isEmergency ? 'Priority Emergency Active' : 'Activate 24/7 Priority Emergency'"></span>
                    </button>
                </div>

                <!-- Services List -->
                <div class="grid gap-4 sm:grid-cols-3">
                    <template x-for="item in services" :key="item.id">
                        <button type="button" 
                                @click="selectedService = item.id"
                                class="relative p-6 text-left rounded-xl border transition-all cursor-pointer"
                                :class="selectedService == item.id ? 'bg-emerald-600/25 border-emerald-500 ring-2 ring-emerald-500/50 scale-[1.02]' : 'bg-white/5 border-white/5 hover:border-white/15'">
                            
                            <!-- selection checkmark -->
                            <div class="absolute top-3 right-3 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]" x-show="selectedService == item.id">
                                ✓
                            </div>

                            <h4 x-text="item.name" class="font-bold text-white text-base"></h4>
                            <p x-text="item.description" class="text-xs text-slate-400 mt-2 line-clamp-2"></p>
                            <span class="text-xs font-semibold text-emerald-400 mt-4 block" x-text="'From $' + (item.base_price || 89)"></span>
                        </button>
                    </template>
                </div>
            </div>

            <!-- STEP 2: LOCATION & PROPERTY -->
            <div x-show="step === 2" x-transition>
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-extrabold text-white">Service Location</h2>
                    <p class="text-sm text-slate-400 mt-2">Specify your physical address and type of property.</p>
                </div>

                <!-- Property selector -->
                <div class="grid gap-4 sm:grid-cols-3 mb-8">
                    <button type="button" @click="propertyType = 'home'" class="p-4 rounded-xl border flex items-center gap-3 cursor-pointer" :class="propertyType === 'home' ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/5'">
                        <i data-lucide="home" class="h-5 w-5 text-emerald-400"></i>
                        <span class="text-sm font-semibold text-slate-200">Residential</span>
                    </button>
                    <button type="button" @click="propertyType = 'commercial'" class="p-4 rounded-xl border flex items-center gap-3 cursor-pointer" :class="propertyType === 'commercial' ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/5'">
                        <i data-lucide="building" class="h-5 w-5 text-emerald-400"></i>
                        <span class="text-sm font-semibold text-slate-200">Commercial</span>
                    </button>
                    <button type="button" @click="propertyType = 'industrial'" class="p-4 rounded-xl border flex items-center gap-3 cursor-pointer" :class="propertyType === 'industrial' ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/5'">
                        <i data-lucide="factory" class="h-5 w-5 text-emerald-400"></i>
                        <span class="text-sm font-semibold text-slate-200">Industrial</span>
                    </button>
                </div>

                <!-- Address Search Input & Map -->
                <div class="space-y-4" x-init="$watch('step', value => { if (value === 2) { setTimeout(() => { initMap(); if(window.lucide) lucide.createIcons(); }, 300); } })">
                    <div class="relative">
                        <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Search Service Address</label>
                        <div class="relative mt-2">
                            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"></i>
                            <input type="text" 
                                   x-model.debounce.500ms="addressSearchQuery" 
                                   @input="searchAddress()"
                                   @focus="if(searchResults.length > 0) showResults = true"
                                   @click.away="showResults = false"
                                   placeholder="Search for an address or area..." 
                                   class="block w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" />
                            <div x-show="isGeocoding" class="absolute right-4 top-1/2 -translate-y-1/2">
                                <div class="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>

                        <!-- Autocomplete Dropdown -->
                        <div x-show="showResults && searchResults.length > 0" 
                             x-transition
                             class="absolute z-50 w-full mt-2 bg-[#151c2c] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                            <template x-for="result in searchResults" :key="result.place_id">
                                <button type="button" 
                                        @click="selectLocation(result)"
                                        class="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 cursor-pointer flex items-start gap-3">
                                    <i data-lucide="map-pin" class="h-4 w-4 text-emerald-400 mt-0.5 shrink-0"></i>
                                    <span x-text="result.display_name" class="text-sm text-slate-300"></span>
                                </button>
                            </template>
                        </div>
                    </div>

                    <!-- Map Container -->
                    <div class="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/40 mt-6" style="z-index: 10;">
                        <div id="location-map" class="w-full h-full z-10" style="position: absolute; top:0; left:0;"></div>
                        
                        <!-- Map Overlay Controls -->
                        <div class="absolute bottom-4 right-4 z-20">
                            <button type="button" title="Center to my location" @click="navigator.geolocation.getCurrentPosition(pos => { const {latitude: lat, longitude: lng} = pos.coords; map.setView([lat, lng], 16); marker.setLatLng([lat, lng]); reverseGeocode(lat, lng); latitude=lat.toFixed(6); longitude=lng.toFixed(6); })" class="bg-[#151c2c]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-emerald-400 shadow-lg hover:bg-[#151c2c] transition-colors cursor-pointer group">
                                <i data-lucide="crosshair" class="h-5 w-5 group-hover:scale-110 transition-transform"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Coordinates Display -->
                    <div class="flex items-center justify-between bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-4 mt-4">
                        <div class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full animate-pulse" :class="latitude ? 'bg-emerald-500' : 'bg-slate-500'"></div>
                            <span class="text-xs font-semibold" :class="latitude ? 'text-emerald-400' : 'text-slate-400'" x-text="latitude ? 'Location Locked' : 'Searching Location...'"></span>
                        </div>
                        <div class="text-xs font-mono text-slate-400">
                            <span x-text="latitude ? latitude : '0.000000'"></span>, 
                            <span x-text="longitude ? longitude : '0.000000'"></span>
                        </div>
                    </div>

                    <!-- Hidden Inputs for form fallback if needed -->
                    <input type="hidden" x-model="address">
                    <input type="hidden" x-model="city">
                    <input type="hidden" x-model="zipCode">
                    <input type="hidden" x-model="latitude">
                    <input type="hidden" x-model="longitude">
                </div>
            </div>

            <!-- STEP 3: SCHEDULE & SCHEDULER -->
            <div x-show="step === 3" x-transition>
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-extrabold text-white">Schedule Dispatch</h2>
                    <p class="text-sm text-slate-400 mt-2">When should our engineer arrive at your location?</p>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                    <!-- Date Input -->
                    <div>
                        <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Preferred Date</label>
                        <input type="date" x-model="scheduledDate" class="block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white mt-2 focus:outline-none focus:border-emerald-500 transition-all" />
                    </div>

                    <!-- Time Slots -->
                    <div>
                        <label class="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Preferred Slot</label>
                        <div class="space-y-2">
                            <button type="button" @click="timeSlot = 'morning'; specificTime = '09:00 AM'" class="w-full text-left p-3 rounded-lg border text-xs font-semibold cursor-pointer" :class="timeSlot === 'morning' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-slate-300'">
                                Morning (08:00 AM - 12:00 PM)
                            </button>
                            <button type="button" @click="timeSlot = 'afternoon'; specificTime = '02:00 PM'" class="w-full text-left p-3 rounded-lg border text-xs font-semibold cursor-pointer" :class="timeSlot === 'afternoon' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-slate-300'">
                                Afternoon (12:00 PM - 05:00 PM)
                            </button>
                            <button type="button" @click="timeSlot = 'evening'; specificTime = '06:00 PM'" class="w-full text-left p-3 rounded-lg border text-xs font-semibold cursor-pointer" :class="timeSlot === 'evening' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-slate-300'">
                                Evening (05:00 PM - 08:00 PM)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STEP 4: CHOOSE TECH & CONFIRM -->
            <div x-show="step === 4" x-transition>
                <div class="mb-8 text-center">
                    <h2 class="text-2xl font-extrabold text-white">Select Engineer & Confirm</h2>
                    <p class="text-sm text-slate-400 mt-2">Pick an available specialist nearby to finalize dispatch.</p>
                </div>

                <div class="space-y-3 mb-6 max-h-[220px] overflow-y-auto pr-2">
                    <template x-for="tech in technicians" :key="tech.id">
                        <button type="button" 
                                @click="selectedTech = tech.id"
                                class="relative w-full p-4 text-left rounded-xl border flex items-center justify-between cursor-pointer"
                                :class="selectedTech == tech.id ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/5'">
                            <div class="flex items-center gap-3">
                                <div class="h-9 w-9 rounded-full bg-emerald-600/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                                    👤
                                </div>
                                <div>
                                    <h4 class="font-bold text-white text-sm" x-text="tech.name"></h4>
                                    <p class="text-xs text-slate-400" x-text="tech.specialty || 'General Engineer'"></p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-emerald-400 block font-semibold" x-text="'ETA: ' + (tech.eta || '15 min')"></span>
                            </div>
                        </button>
                    </template>
                </div>

                <!-- Notes -->
                <div>
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Additional Instructions</label>
                    <textarea x-model="notes" rows="3" placeholder="Provide extra details for the service dispatcher..." class="block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white mt-2 focus:outline-none focus:border-emerald-500 transition-all"></textarea>
                </div>
            </div>

            <!-- Footer navigation -->
            <div class="mt-8 flex justify-between gap-4 pt-6 border-t border-white/5">
                <button type="button" 
                        @click="if(step > 1) { step-- } else { window.location.href = '/' }" 
                        class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer">
                    Back
                </button>

                <button type="button" 
                        x-show="step < 4" 
                        @click="if(selectedService || step > 1) { step++ } else { alert('Please select a service first') }" 
                        class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cursor-pointer">
                    Next
                </button>

                <button type="button" 
                        x-show="step === 4" 
                        @click="submitBooking()"
                        :disabled="isSubmitting"
                        class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-2 cursor-pointer">
                    <span x-text="isSubmitting ? 'Creating Dispatch...' : 'Confirm Dispatch'"></span>
                    <i data-lucide="check" class="h-4 w-4"></i>
                </button>
            </div>

        </div>
    </div>
</div>
@endsection
