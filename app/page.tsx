"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Zap,
  Shield,
  Clock,
  MapPin,
  Wrench,
  Thermometer,
  Droplets,
  Plug,
  ArrowRight,
  Check,
  Star,
  Users,
  Activity,
  TrendingUp,
  BarChart3,
  Headphones,
  Mail,
  Phone,
  Send,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// Navbar Component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Schneider
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#services"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border py-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground px-2">Features</Link>
              <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground px-2">Services</Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground px-2">Pricing</Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground px-2">Contact Us</Link>
              <div className="flex gap-3 pt-2 px-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link href="/admin" className="flex-1">
                  <Button size="sm" className="w-full">Dashboard</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-16">
      {/* Subtle Background */}
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6 inline-flex">
              <div className="badge-primary flex items-center gap-2">
                <Zap className="h-3.5 w-3.5" />
                <span>AI-powered Service Platform</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              Build Stronger Customer Relationships{" "}
              <span className="text-primary">With Simplicity.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Schneider Smart Service Platform helps businesses manage technicians, automate dispatching, track performance, and scale operations with a clean and intelligent service management experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-6 border-border hover:bg-secondary">
                  Login
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap justify-center gap-8 lg:justify-start"
            >
              {[
                { value: "50K+", label: "Jobs Completed" },
                { value: "4.9", label: "Average Rating" },
                { value: "<15min", label: "Response Time" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="card-premium rounded-xl p-1">
              <div className="rounded-lg bg-card p-5">
                {/* Mini Dashboard Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    Live Dispatch Feed
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="status-dot status-online pulse-soft" />
                    <span className="text-xs text-success font-medium">Live</span>
                  </div>
                </div>

                {/* Activity Items */}
                <div className="space-y-2.5">
                  {[
                    { name: "John D.", service: "HVAC Repair", status: "En Route", time: "2 min", icon: Thermometer },
                    { name: "Sarah M.", service: "Plumbing", status: "On Site", time: "12 min", icon: Droplets },
                    { name: "Mike R.", service: "Electrical", status: "Completed", time: "Just now", icon: Plug },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{item.service}</span>
                          <span className={`text-xs font-medium ${
                            item.status === "Completed" ? "text-success" : 
                            item.status === "On Site" ? "text-accent" : "text-warning"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {[
                    { label: "Active", value: "128" },
                    { label: "Pending", value: "47" },
                    { label: "Today", value: "892" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg bg-secondary/30 p-3 text-center">
                      <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-1/4 hidden lg:block"
            >
              <div className="card-premium rounded-lg p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">Job Completed</div>
                    <div className="text-xs text-muted-foreground">AC Repair - $285</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 bottom-1/4 hidden lg:block"
            >
              <div className="card-premium rounded-lg p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">Tech Arriving</div>
                    <div className="text-xs text-muted-foreground">ETA: 8 minutes</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Efficiently track and manage all your service requests and customer leads in one place.",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Gain insights into your service performance with comprehensive analytics and reporting.",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automate dispatching, scheduling, and follow-ups to save time and reduce errors.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Keep your technicians and office staff connected with real-time communication tools.",
    },
    {
      icon: Activity,
      title: "Real-time Dashboard",
      description: "Monitor all operations live with our intuitive command center dashboard.",
    },
    {
      icon: TrendingUp,
      title: "Smart Reports",
      description: "Generate detailed reports to track growth, efficiency, and customer satisfaction.",
    },
  ]

  return (
    <section id="features" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            Everything You Need to Manage{" "}
            <span className="text-primary">Customers Efficiently</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Powerful features designed to streamline your service operations and delight your customers.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="card-premium hover-lift group cursor-pointer rounded-xl p-6 transition-all"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    { icon: Thermometer, title: "HVAC Services", description: "Installation, repair, and maintenance for all HVAC systems." },
    { icon: Droplets, title: "Plumbing", description: "Expert plumbing solutions for residential and commercial properties." },
    { icon: Plug, title: "Electrical", description: "Licensed electricians for all your electrical needs." },
    { icon: Wrench, title: "Appliance Repair", description: "Fast and reliable repair services for all major appliances." },
  ]

  return (
    <section id="services" className="relative py-20 lg:py-24 section-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Professional technical services for home, commercial, and industrial needs.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-premium hover-lift group cursor-pointer rounded-xl p-5 bg-card text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-sm font-medium text-foreground">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Have questions about our platform? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">support@schneider.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Phone</div>
                  <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Support</div>
                  <div className="text-sm text-muted-foreground">24/7 Available</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="card-premium rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-premium w-full"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-premium w-full"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-premium w-full resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Schneider Smart Service</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Schneider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
