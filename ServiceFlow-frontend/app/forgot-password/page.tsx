"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Zap,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Star,
  AlertTriangle,
  KeyRound,
  Lock,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/api"

const features = [
  {
    icon: Shield,
    title: "Verified Technicians",
    description: "All our technicians are background-checked and licensed",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Average response time under 15 minutes",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "4.9 average rating from 50,000+ reviews",
  },
]

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otpArray, setOtpArray] = useState<string[]>(Array(6).fill(""))
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [timer, setTimer] = useState(0)
  const [otpVerified, setOtpVerified] = useState(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // OTP resend timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  // Focus first input on Step 2 transition
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 200)
    }
  }, [step])

  // OTP Change handler
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otpArray]
    newOtp[index] = value.substring(value.length - 1)
    setOtpArray(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // OTP KeyDown backspace handler
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // OTP Paste handler
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otpArray]
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char
      })
      setOtpArray(newOtp)
      inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus()
    }
  }

  // Action: Request OTP code
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await api.post("/auth/forgot-password", { email })
      setSuccessMessage(response.data.message || "A 6-digit verification code has been sent to your email.")
      setTimer(60) // Start 60s cooldown
      
      // Auto advance to step 2 after a brief delay
      setStep(2)
      setIsLoading(false)
    } catch (err: any) {
      console.error(err)
      if (err.code === "ERR_NETWORK" || !err.response) {
        setErrorMessage("Cannot connect to the server. Please make sure the backend is running on port 8000.")
      } else {
        const message = err.response?.data?.message || "Failed to send verification code. Please try again."
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Action: Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0) return
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await api.post("/auth/forgot-password", { email })
      setSuccessMessage(response.data.message || "A new 6-digit verification code has been sent.")
      setTimer(60)
      setOtpArray(Array(6).fill(""))
      setOtpVerified(false)
    } catch (err: any) {
      console.error(err)
      if (err.code === "ERR_NETWORK" || !err.response) {
        setErrorMessage("Cannot connect to the server. Please ensure the backend is running.")
      } else {
        const message = err.response?.data?.message || "Failed to resend verification code."
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Action: Verify OTP with server (real-time server-side verification)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const enteredOtp = otpArray.join("")
    if (enteredOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit code.")
      return
    }
    
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    
    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        otp: enteredOtp,
      })
      
      if (response.data.verified) {
        setOtpVerified(true)
        setSuccessMessage("✅ OTP verified successfully! Setting up your new password...")
        
        // Advance to step 3 after showing success
        setTimeout(() => {
          setStep(3)
          setSuccessMessage("")
          setErrorMessage("")
        }, 1500)
      }
    } catch (err: any) {
      console.error(err)
      if (err.code === "ERR_NETWORK" || !err.response) {
        setErrorMessage("Cannot connect to the server. Please ensure the backend is running.")
      } else {
        const message = err.response?.data?.message || "Invalid verification code. Please try again."
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Action: Reset password completely
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Extra safety: ensure OTP was verified
    if (!otpVerified) {
      setErrorMessage("Please verify your OTP first before resetting password.")
      setStep(2)
      return
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        otp: otpArray.join(""),
        password,
        password_confirmation: confirmPassword,
      })

      setSuccessMessage(response.data.message || "Password successfully reset!")
      
      // Navigate to login page
      setTimeout(() => {
        window.location.href = `/login?message=${encodeURIComponent("Password reset successful! You can now log in with your new password.")}`
      }, 2000)
    } catch (err: any) {
      console.error(err)
      if (err.code === "ERR_NETWORK" || !err.response) {
        setErrorMessage("Cannot connect to the server. Please ensure the backend is running.")
      } else {
        const message = err.response?.data?.message || "Failed to reset password. Please request a new OTP."
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }

  const strength = getPasswordStrength()
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-destructive", "bg-warning", "bg-blue-500", "bg-success"]

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form & Wizard */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8 bg-background relative z-10">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary glow-blue"><div className="h-6 w-6 bg-primary-foreground" style={{ maskImage: "url('/Final_logo_transparent.png')", WebkitMaskImage: "url('/Final_logo_transparent.png')", maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} /></div>
              <span className="text-xl font-bold text-foreground">ServiceFlow</span>
            </Link>
          </motion.div>

          {/* Stepper Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative mb-8 mt-2">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {[1, 2, 3].map((s) => {
                  const Icon = s === 1 ? Mail : s === 2 ? KeyRound : Lock
                  const isActive = step >= s
                  const isCurrent = step === s
                  const isCompleted = step > s
                  return (
                    <div key={s} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-primary/20 border-primary text-primary'
                            : isCurrent 
                              ? 'bg-primary border-primary text-primary-foreground glow-blue scale-110' 
                              : isActive 
                                ? 'bg-background border-primary text-primary shadow-[0_0_10px_rgba(37,99,235,0.2)]' 
                                : 'bg-background border-muted text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`text-[11px] font-semibold mt-2 transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {s === 1 ? "Email" : s === 2 ? "Verify OTP" : "New Password"}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Dynamic Banners */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive"
              >
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="break-words">{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-start gap-2.5 rounded-xl border border-success/20 bg-success/10 p-3.5 text-sm text-success"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Forgot Password
                  </h1>
                  <p className="mt-2 text-muted-foreground text-sm">
                    Enter your registered email address below. We&apos;ll send a 6-digit real-time verification OTP to reset your password.
                  </p>
                </div>

                <form onSubmit={handleRequestOtp} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/50 pl-10 h-11 border-border/60 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 glow-blue h-11 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        Get Verification OTP
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setStep(1); setErrorMessage(""); setSuccessMessage(""); }}
                      className="p-1 h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Go Back</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Enter Verification OTP
                  </h1>
                  <p className="mt-2 text-muted-foreground text-sm">
                    We sent a secure 6-digit code to <strong className="text-foreground">{email}</strong>. Enter it below to verify your identity.
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-center block">6-Digit Secure Code</Label>
                    
                    {/* Multi-box Input for Premium Experience */}
                    <div className="flex justify-between gap-2 max-w-sm mx-auto" onPaste={handleOtpPaste}>
                      {otpArray.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => { inputRefs.current[index] = el }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-secondary/30 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                            otpVerified 
                              ? 'border-success/60 bg-success/10 text-success' 
                              : 'border-border/80 glow-blue-subtle'
                          }`}
                          disabled={otpVerified || isLoading}
                          required
                        />
                      ))}
                    </div>

                    {/* Verified badge */}
                    {otpVerified && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-2 text-success text-sm font-semibold"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Identity Verified</span>
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 glow-blue h-11 text-base font-semibold"
                    disabled={isLoading || otpVerified}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        <span>Verifying with server...</span>
                      </div>
                    ) : otpVerified ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Verified — Redirecting...</span>
                      </div>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        Verify OTP Code
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Resend Action Area */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      Didn&apos;t receive the email code?
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={timer > 0 || isLoading || otpVerified}
                      className="text-primary hover:text-primary/80 font-semibold gap-1.5 mt-1"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                      {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP Code"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  {/* Verified Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-success/10 border border-success/20 w-fit"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-xs font-semibold text-success">Identity Verified via OTP</span>
                  </motion.div>

                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Reset Your Password
                  </h1>
                  <p className="mt-2 text-muted-foreground text-sm">
                    Choose a strong password to secure your ServiceFlow account.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secondary/50 pl-10 pr-10 h-11 border-border/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-1.5 mt-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Password Strength:</span>
                          <span className="font-semibold">{strengthLabels[Math.max(0, strength - 1)]}</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-full flex-1 transition-all duration-300 ${
                                strength >= level ? strengthColors[strength - 1] : "bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-secondary/50 pl-10 pr-10 h-11 border-border/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {/* Password match indicator */}
                    {confirmPassword && (
                      <div className={`flex items-center gap-1.5 text-xs mt-1 ${password === confirmPassword ? 'text-success' : 'text-destructive'}`}>
                        {password === confirmPassword ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Passwords match</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Passwords do not match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 glow-blue h-11 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        Reset Password & Login
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            {"Remembered your password? "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Back to Login
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right Side - Visual Branding Backdrop */}
      <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-pulse duration-10000" />
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative flex h-full flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              AI-Powered Service Dispatch & Management
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              Experience the state-of-the-art dispatch suite. Fast response, top-tier efficiency, and reliable security at every action.
            </p>

            {/* Premium feature display cards */}
            <div className="mt-10 space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/10 border border-border/20 backdrop-blur-md hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dynamic statistics section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex gap-12"
            >
              {[
                { value: "50K+", label: "Jobs Completed" },
                { value: "2,800+", label: "Technicians" },
                { value: "4.9", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
