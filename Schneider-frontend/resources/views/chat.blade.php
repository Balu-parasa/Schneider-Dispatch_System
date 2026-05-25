@extends('layouts.app')

@section('title', 'Secure Chat - Schneider Dispatch')

@section('content')
<div class="min-h-[90vh] bg-background text-foreground flex relative" 
     x-data="{ 
        bookingId: new URLSearchParams(window.location.search).get('bookingId'),
        currentUser: null,
        booking: null,
        messages: [],
        inputText: '',
        isSending: false,
        isLoading: true,
        pollingInterval: null,
        
        async init() {
            if (!this.bookingId) {
                this.isLoading = false;
                return;
            }
            
            try {
                // 1. Fetch current user
                const meRes = await axios.get('/api/v1/auth/me');
                this.currentUser = meRes.data.user;
            } catch (err) {
                console.error('Auth error', err);
                window.location.href = '/login?redirect=/chat?bookingId=' + this.bookingId;
                return;
            }

            await this.fetchData();
            this.isLoading = false;

            // Start 3s robust fallback polling for seamless local real-time chat
            this.pollingInterval = setInterval(() => {
                this.fetchMessagesSilently();
            }, 3000);

            // Mark initial messages as read
            axios.post('/api/v1/bookings/' + this.bookingId + '/messages/read').catch(() => {});
            this.scrollToBottom();
        },
        
        async fetchData() {
            try {
                // Get booking
                const bookingRes = await axios.get('/api/v1/bookings/' + this.bookingId);
                this.booking = bookingRes.data.booking || bookingRes.data.data || bookingRes.data;
                
                // Get messages
                const msgRes = await axios.get('/api/v1/bookings/' + this.bookingId + '/messages');
                this.messages = msgRes.data.messages || msgRes.data.data || msgRes.data || [];
            } catch (err) {
                console.error('Failed to load chat data', err);
            }
        },

        async fetchMessagesSilently() {
            try {
                const msgRes = await axios.get('/api/v1/bookings/' + this.bookingId + '/messages');
                const fetched = msgRes.data.messages || msgRes.data.data || msgRes.data || [];
                
                // Only update and scroll if the list length or contents changed
                if (fetched.length !== this.messages.length) {
                    this.messages = fetched;
                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                    // Mark as read when active
                    axios.post('/api/v1/bookings/' + this.bookingId + '/messages/read').catch(() => {});
                }
            } catch (err) {}
        },

        async sendMessage() {
            if (!this.inputText.trim() || this.isSending) return;
            
            const body = this.inputText.trim();
            this.inputText = '';
            this.isSending = true;

            try {
                const res = await axios.post('/api/v1/bookings/' + this.bookingId + '/messages', {
                    body: body
                });
                const newMsg = res.data.message || res.data.data || res.data;
                
                // Ensure duplicate message isn't added
                if (!this.messages.some(m => m.id === newMsg.id)) {
                    this.messages.push(newMsg);
                }
                
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            } catch (err) {
                console.error('Message transmission failed', err);
                this.inputText = body; // Restore message
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to transmit message.', type: 'error' } }));
            } finally {
                this.isSending = false;
            }
        },

        scrollToBottom() {
            const container = this.$refs.msgContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },

        destroy() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
            }
        },

        getStatusColor(status) {
            switch(status) {
                case 'completed': return 'text-success bg-success/10 border-success/20';
                case 'cancelled': return 'text-destructive bg-destructive/10 border-destructive/20';
                case 'en_route':
                case 'en-route':
                case 'arrived':
                case 'in_progress':
                case 'in-progress': return 'text-primary bg-primary/10 border-primary/20 animate-pulse';
                default: return 'text-warning bg-warning/10 border-warning/20';
            }
        },

        getStatusLabel(status) {
            switch(status) {
                case 'completed': return 'Completed';
                case 'cancelled': return 'Cancelled';
                case 'en_route':
                case 'en-route': return 'Tech En-Route';
                case 'arrived': return 'Tech Arrived';
                case 'in_progress':
                case 'in-progress': return 'In Progress';
                case 'assigned': return 'Assigned';
                default: return 'Pending';
            }
        }
     }"
     x-init="init()"
     @unload.window="destroy()">

    <!-- Ambient design meshes -->
    <div class="absolute inset-0 pointer-events-none z-0">
        <div class="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]"></div>
        <div class="absolute bottom-10 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px]"></div>
        <div class="absolute inset-0 grid-pattern opacity-[0.02]"></div>
    </div>

    <!-- Error State: Booking ID missing -->
    <template x-if="!bookingId">
        <div class="flex flex-1 flex-col items-center justify-center p-6 z-10 text-center">
            <div class="max-w-md card-premium p-8 rounded-2xl border border-border backdrop-blur-md bg-card/70">
                <i data-lucide="alert-triangle" class="mx-auto h-12 w-12 text-warning animate-bounce"></i>
                <h2 class="text-xl font-bold mt-4 text-foreground">Invalid Chat Session</h2>
                <p class="text-sm text-muted-foreground mt-2">
                    No booking reference was provided. Please return to your control center to open a valid secure message terminal.
                </p>
                <a href="{{ route('home') }}">
                    <button class="px-6 py-2.5 mt-6 text-xs font-semibold rounded-lg btn-primary hover-lift glow-blue cursor-pointer">
                        Back to Home
                    </button>
                </a>
            </div>
        </div>
    </template>

    <!-- Loading State -->
    <template x-if="bookingId && isLoading">
        <div class="flex flex-1 items-center justify-center z-10">
            <div class="text-center space-y-4">
                <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p class="text-sm text-muted-foreground">Synchronizing secure quantum message tunnel...</p>
            </div>
        </div>
    </template>

    <!-- Chat Active Layout -->
    <template x-if="bookingId && !isLoading && booking">
        <div class="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden max-h-[90vh]">
            
            <!-- Left Sidebar: Context Info -->
            <aside class="w-full md:w-[350px] border-r border-border/40 glass bg-card/15 flex flex-col shrink-0 max-h-[35vh] md:max-h-screen">
                <!-- Header -->
                <div class="p-4 border-b border-border/40 flex items-center justify-between shrink-0">
                    <a :href="currentUser?.role === 'customer' ? '/customer' : (currentUser?.role === 'technician' ? '/technician' : '/admin')">
                        <button class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                            <i data-lucide="chevron-left" class="w-4 h-4"></i>
                            Dashboard
                        </button>
                    </a>
                    <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase tracking-wider">
                        Secure Chat
                    </span>
                </div>

                <!-- Partner Profile Card -->
                <div class="p-5 border-b border-border/40 space-y-4 shrink-0">
                    <div class="flex items-center gap-3.5">
                        <div class="relative">
                            <div class="w-12 h-12 rounded-full bg-primary/20 border border-primary/45 flex items-center justify-center text-primary font-bold text-lg glow-blue uppercase">
                                <span x-text="currentUser?.role === 'customer' ? (booking.technician?.name ? booking.technician.name[0] : 'T') : (booking.customer?.name ? booking.customer.name[0] : 'C')"></span>
                            </div>
                            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse"></span>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-foreground truncate max-w-[180px]" 
                                x-text="currentUser?.role === 'customer' ? (booking.technician?.name || 'Assigning Tech...') : (booking.customer?.name || 'Valued Client')"></h3>
                            <p class="text-[10px] text-muted-foreground" 
                               x-text="currentUser?.role === 'customer' ? (booking.technician?.technician_profile?.specialty || 'Licensed Specialist') : 'Verified Customer'"></p>
                        </div>
                    </div>
                </div>

                <!-- Scrollable Context Info -->
                <div class="flex-1 overflow-y-auto p-5 space-y-5">
                    <div class="space-y-1">
                        <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Service Job</span>
                        <h4 class="text-base font-extrabold text-foreground" x-text="booking.service?.name || 'Technical Service'"></h4>
                        <span class="font-mono text-xs text-muted-foreground block" x-text="'#' + booking.id"></span>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">Status</span>
                            <span class="px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider"
                                  :class="getStatusColor(booking.status)" 
                                  x-text="getStatusLabel(booking.status)"></span>
                        </div>

                        <template x-if="booking.is_emergency">
                            <div class="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 p-3">
                                <i data-lucide="alert-triangle" class="h-4.5 w-4.5 text-destructive animate-pulse shrink-0"></i>
                                <div>
                                    <span class="text-[9px] font-bold text-destructive block">EMERGENCY ACTIVE</span>
                                    <span class="text-[9px] text-muted-foreground">Instant technician tracking en-route.</span>
                                </div>
                            </div>
                        </template>

                        <div class="h-px bg-border/20 my-2"></div>

                        <div class="space-y-2.5 text-xs text-muted-foreground">
                            <div class="flex items-start gap-2.5">
                                <i data-lucide="calendar" class="w-4 h-4 text-primary shrink-0 mt-0.5"></i>
                                <div>
                                    <span class="text-foreground font-semibold block" x-text="booking.scheduled_date || 'ASAP Dispatch'"></span>
                                    <span x-text="booking.time_slot ? 'Slot: ' + booking.time_slot : 'Immediate'"></span>
                                </div>
                            </div>

                            <div class="flex items-start gap-2.5">
                                <i data-lucide="map-pin" class="w-4 h-4 text-accent shrink-0 mt-0.5"></i>
                                <div>
                                    <span class="text-foreground font-semibold block" x-text="booking.address"></span>
                                    <span x-text="booking.city + (booking.zip_code ? ', ' + booking.zip_code : '')"></span>
                                </div>
                            </div>

                            <div class="flex items-start gap-2.5">
                                <i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></i>
                                <div>
                                    <span class="text-foreground font-semibold block" x-text="'$' + booking.estimated_cost"></span>
                                    <span>Estimated Contract Price</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template x-if="booking.notes">
                        <div class="rounded-xl bg-secondary/35 p-3.5 border border-border/30">
                            <span class="text-[9px] font-bold text-foreground/80 uppercase tracking-widest block mb-1">Issue Statement</span>
                            <p class="text-xs text-muted-foreground leading-relaxed italic" x-text="'&ldquo;' + booking.notes + '&rdquo;'"></p>
                        </div>
                    </template>
                </div>
            </aside>

            <!-- Right Side: Message Stream -->
            <section class="flex-1 flex flex-col bg-background/5 h-[55vh] md:h-auto overflow-hidden">
                <!-- Stream Header -->
                <div class="px-6 py-3.5 border-b border-border/40 glass bg-card/5 flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-3">
                        <i data-lucide="activity" class="w-4.5 h-4.5 text-primary animate-pulse"></i>
                        <div>
                            <h2 class="text-sm font-bold text-foreground">Secure Communications Stream</h2>
                            <p class="text-[10px] text-muted-foreground">End-to-End Encrypted Platform Tunnel</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span class="text-[10px] text-muted-foreground font-semibold">Active Tunnel Connection</span>
                    </div>
                </div>

                <!-- Messages Stream Container -->
                <div class="flex-1 overflow-y-auto p-6 space-y-4" x-ref="msgContainer">
                    <template x-if="messages.length > 0">
                        <div class="space-y-4">
                            <template x-for="message in messages" :key="message.id">
                                <div class="flex" :class="message.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'">
                                    <div class="max-w-[80%] rounded-2xl p-4 border shadow-md space-y-1 relative group"
                                         :class="message.sender_id === currentUser?.id 
                                                 ? 'bg-primary text-primary-foreground border-primary/20 rounded-tr-none glow-blue'
                                                 : 'bg-card text-foreground border-border/70 rounded-tl-none'">
                                        
                                        <!-- Sender Label -->
                                        <div class="flex items-center gap-2 justify-between">
                                            <span class="text-[9px] font-bold uppercase tracking-wider" 
                                                  :class="message.sender_id === currentUser?.id ? 'text-primary-foreground/75' : 'text-primary'"
                                                  x-text="message.sender_id === currentUser?.id ? 'You' : (message.sender?.name || 'Partner')"></span>
                                            <span class="text-[8px] shrink-0" 
                                                  :class="message.sender_id === currentUser?.id ? 'text-primary-foreground/60' : 'text-muted-foreground'"
                                                  x-text="new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })"></span>
                                        </div>
                                        
                                        <!-- Body Text -->
                                        <p class="text-sm leading-relaxed whitespace-pre-wrap select-text" x-text="message.body"></p>

                                        <!-- Read status check -->
                                        <template x-if="message.sender_id === currentUser?.id">
                                            <div class="flex justify-end pt-1">
                                                <span class="text-[8px] font-semibold uppercase tracking-wider" 
                                                      :class="message.is_read ? 'text-emerald-300' : 'text-primary-foreground/45'"
                                                      x-text="message.is_read ? '• Read' : '• Transmitted'"></span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>

                    <template x-if="messages.length === 0">
                        <div class="flex flex-col items-center justify-center h-full text-center space-y-3 py-12">
                            <div class="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center border border-dashed border-border">
                                <i data-lucide="message-square" class="w-5 h-5 text-muted-foreground"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-foreground">Secure Channel Opened</h3>
                                <p class="text-xs text-muted-foreground max-w-xs mt-0.5" 
                                   x-text="'Say hello to ' + (currentUser?.role === 'customer' ? (booking.technician?.name || 'your technician') : (booking.customer?.name || 'your client')) + '! Discuss details of scheduling, arrival specifics, or parts requests.'"></p>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Input Area -->
                <div class="p-4 border-t border-border/40 glass bg-card/5 shrink-0">
                    <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                        <button type="button" 
                                class="w-10 h-10 rounded-xl hover:bg-secondary/40 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all shrink-0 border border-transparent hover:border-border/30"
                                title="Attach Document">
                            <i data-lucide="paperclip" class="w-5 h-5"></i>
                        </button>

                        <div class="relative flex-1">
                            <input type="text" 
                                   :placeholder="'Type a secure message...'"
                                   x-model="inputText"
                                   :disabled="isSending"
                                   class="w-full h-11 bg-input hover:bg-input/80 text-foreground placeholder:text-muted-foreground/60 rounded-xl px-4 text-sm border border-border/30 focus:border-primary/50 focus:outline-none transition-all pr-10" />
                            
                            <button type="button" 
                                    class="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                    title="Insert Emoji">
                                <i data-lucide="smile" class="w-5 h-5"></i>
                            </button>
                        </div>

                        <button type="submit" 
                                :disabled="!inputText.trim() || isSending"
                                class="w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 font-semibold cursor-pointer"
                                :class="inputText.trim() && !isSending 
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/95 glow-blue' 
                                        : 'bg-secondary text-muted-foreground/45 border border-border/20 cursor-not-allowed'">
                            <template x-if="isSending">
                                <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                            </template>
                            <template x-if="!isSending">
                                <i data-lucide="send" class="w-4.5 h-4.5"></i>
                            </template>
                        </button>
                    </form>

                    <div class="mt-2.5 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
                        <i data-lucide="shield" class="w-3 h-3 text-primary shrink-0"></i>
                        <span>Schneider verified communications. Content stored securely in contract logs.</span>
                    </div>
                </div>

            </section>

        </div>
    </template>

</div>
@endsection

@push('scripts')
<script>
    // Refresh icons inside template views whenever loading finishes or state transitions
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('load', () => {
            if (window.lucide) window.lucide.createIcons();
        });
    });
</script>
@endpush
