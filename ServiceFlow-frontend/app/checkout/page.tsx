"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, ShieldCheck, Lock, Zap, CheckCircle2, ChevronRight, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const plan = searchParams.get("plan") || "Pro Plan"
  const price = searchParams.get("price") || "₹299"
  const bookingId = searchParams.get("booking_id")

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  // Card state for visual representation
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")

  useEffect(() => {
    if (paymentStatus === 'success') {
      const audio = new Audio('/gpay.mp3')
      audio.play().catch(e => console.error("Audio playback failed:", e))
    }
  }, [paymentStatus])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus('processing')
    
    setPaymentStatus('success')
    setTimeout(() => {
      if (bookingId) {
        router.push(`/tracking?booking_id=${bookingId}&payment=success`)
      } else {
        router.push("/?subscription=success")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 text-foreground">
      {/* Premium Ambient Background - Dynamic Mode */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Success Full-Screen Overlay - Blur + Only Animation */}
      <AnimatePresence>
        {paymentStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] relative drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
            >
              <DotLottieReact
                src="/P.json"
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        <nav className="mb-12">
          <Link href="/#pricing" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Return to Plans
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Form & Card Visual */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Secure Checkout</h1>
              <p className="text-muted-foreground">Enter your payment details to activate your subscription.</p>
            </div>

            {/* Simulated Credit Card Visual - Keeps a premium dark/sleek look for contrast */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-md aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between bg-slate-900 text-white"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              
              {/* Card Microchip & Logo */}
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-9 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 flex items-center justify-center border border-yellow-600/30">
                  <div className="w-8 h-5 border border-yellow-800/30 rounded-sm grid grid-cols-3 gap-px opacity-50">
                    <div className="border-r border-b border-yellow-800/30"></div>
                    <div className="border-r border-b border-yellow-800/30"></div>
                    <div className="border-b border-yellow-800/30"></div>
                    <div className="border-r border-yellow-800/30"></div>
                    <div className="border-r border-yellow-800/30"></div>
                    <div></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-90">
                  <div className="w-8 h-8 rounded-full bg-red-500 mix-blend-screen"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-400 mix-blend-screen -ml-4"></div>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4 relative z-10">
                <div className="text-2xl tracking-[0.2em] font-mono text-slate-100 shadow-sm">
                  {cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="flex justify-between items-end">
                  <div className="uppercase tracking-widest text-xs font-semibold text-slate-300 truncate max-w-[200px]">
                    {cardName || "YOUR NAME"}
                  </div>
                  <div className="text-sm font-mono text-slate-100">
                    {expiry || "MM/YY"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Theme Glass Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden"
            >
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2 relative group">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">Cardholder Name</Label>
                  <div className="relative">
                    <Input 
                      id="name" 
                      required 
                      placeholder="John Doe" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-14 px-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2 relative group">
                  <Label htmlFor="card" className="text-xs uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">Card Number</Label>
                  <div className="relative">
                    <Input 
                      id="card" 
                      required 
                      placeholder="0000 0000 0000 0000" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      onFocus={() => setFocusedField('card')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-14 pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono" 
                      maxLength={19} 
                    />
                    <CreditCard className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <Label htmlFor="expiry" className="text-xs uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      required 
                      placeholder="MM/YY" 
                      value={expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length >= 3) {
                          val = val.substring(0, 2) + '/' + val.substring(2, 4);
                        }
                        setExpiry(val);
                      }}
                      onFocus={() => setFocusedField('expiry')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center font-mono" 
                      maxLength={5} 
                    />
                  </div>
                  <div className="space-y-2 group">
                    <Label htmlFor="cvc" className="text-xs uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">CVC / CVV</Label>
                    <div className="relative">
                      <Input 
                        id="cvc" 
                        required 
                        placeholder="123" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                        onFocus={() => setFocusedField('cvc')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-14 pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono tracking-widest" 
                        maxLength={4} 
                        type="password" 
                      />
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'cvc' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={paymentStatus === 'processing'}
                  className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_20px_rgba(var(--primary),0.2)] hover:shadow-[0_15px_30px_rgba(var(--primary),0.3)] transition-all overflow-hidden relative group"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {paymentStatus === 'processing' ? (
                    <span className="flex items-center justify-center gap-3">
                      <Fingerprint className="w-6 h-6 animate-pulse" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Pay {price}
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="flex gap-2 opacity-50">
                  <div className="w-8 h-5 bg-secondary rounded-sm"></div>
                  <div className="w-8 h-5 bg-secondary rounded-sm"></div>
                  <div className="w-8 h-5 bg-secondary rounded-sm"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center justify-between">
                  Order Summary
                  <span className="text-xs font-normal px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                    {bookingId ? "Service Call" : "Subscription"}
                  </span>
                </h2>
                
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-foreground text-lg">{plan}</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingId ? "One-time payment" : "Billed monthly"}
                      </p>
                    </div>
                    <p className="font-bold text-foreground text-xl">{price}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <p>Subtotal</p>
                    <p className="font-medium text-foreground">{price}</p>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <p>Taxes & Fees</p>
                    <p className="font-medium text-foreground">Included</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-end mb-8">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Due Today</p>
                    <p className="text-xs text-muted-foreground">
                      {bookingId ? "Payment for service dispatch" : "Renews automatically"}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{price}</p>
                </div>

                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    What you get today
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {bookingId ? (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>Immediate technician dispatch</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>Real-time GPS tracking</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>Guaranteed service window</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>Instant account upgrade and activation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>Priority dispatch routing and tracking</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>24/7 dedicated support channel</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    By confirming this payment, you agree to our Terms of Service and Privacy Policy. {bookingId ? "Cancellations may be subject to a fee." : "You can cancel your subscription at any time from your account settings."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
