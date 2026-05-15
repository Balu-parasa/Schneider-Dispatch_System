"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Zap,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Activity,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronRight,
  User,
  Star,
  Navigation,
  Thermometer,
  Droplets,
  Plug,
  Wrench,
  RefreshCw,
  Wifi,
  Radio,
  Target,
  MessageSquare,
  Shield,
  Gauge,
  Layers,
  Cpu,
  Database,
  Server,
  Signal,
  Flame,
  Eye,
  Play,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Radar,
  CircleDot,
  Hexagon,
  BarChart3,
  PieChart,
  Globe,
  Satellite,
  Crosshair,
  Timer,
  Bolt,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Animated Counter Hook
function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])
  
  return count
}

// Realtime Data Simulation
const generateRealtimeData = () => ({
  activeTechnicians: 128 + Math.floor(Math.random() * 10),
  activeJobs: 247 + Math.floor(Math.random() * 20),
  completedToday: 892 + Math.floor(Math.random() * 15),
  revenue: 48750 + Math.floor(Math.random() * 1000),
  avgResponseTime: 12 + Math.floor(Math.random() * 3),
  satisfaction: (4.85 + Math.random() * 0.1).toFixed(2),
  queueSize: 34 + Math.floor(Math.random() * 8),
  emergencies: 3 + Math.floor(Math.random() * 2),
  systemHealth: 98 + Math.floor(Math.random() * 2),
  wsConnections: 2847 + Math.floor(Math.random() * 100),
})

const dispatchFeed = [
  { id: "DSP-001", technician: "John M.", customer: "Sarah Mitchell", service: "HVAC", status: "en-route", eta: "8 min", time: "Just now", icon: Thermometer, priority: "high", earnings: 285 },
  { id: "DSP-002", technician: "Mike R.", customer: "David Chen", service: "Plumbing", status: "on-site", eta: "-", time: "2 min ago", icon: Droplets, priority: "normal", earnings: 175 },
  { id: "DSP-003", technician: "Sarah C.", customer: "Emily Davis", service: "Electrical", status: "completed", eta: "-", time: "5 min ago", icon: Plug, priority: "normal", earnings: 320 },
  { id: "DSP-004", technician: "Alex T.", customer: "James Wilson", service: "Appliance", status: "en-route", eta: "15 min", time: "8 min ago", icon: Wrench, priority: "emergency", earnings: 450 },
  { id: "DSP-005", technician: "Emily D.", customer: "Robert Brown", service: "HVAC", status: "on-site", eta: "-", time: "12 min ago", icon: Thermometer, priority: "normal", earnings: 210 },
  { id: "DSP-006", technician: "Chris P.", customer: "Lisa Anderson", service: "Electrical", status: "en-route", eta: "22 min", time: "15 min ago", icon: Plug, priority: "high", earnings: 395 },
]

const emergencyQueue = [
  { id: "EMG-001", issue: "Gas leak detected - Commercial Building", location: "789 Pine St, SF", time: "2 min ago", severity: "critical", customer: "Tech Corp HQ", assignedTech: null },
  { id: "EMG-002", issue: "Power outage - Elderly resident, medical equipment", location: "456 Oak Ave, SF", time: "5 min ago", severity: "critical", customer: "Martha Jenkins", assignedTech: "Sarah C." },
  { id: "EMG-003", issue: "Flooding - Burst pipe in basement", location: "123 Main St, SF", time: "12 min ago", severity: "high", customer: "Bay View Apartments", assignedTech: "Mike R." },
  { id: "EMG-004", issue: "HVAC failure - Data center cooling", location: "500 Tech Blvd, SF", time: "18 min ago", severity: "high", customer: "CloudServe Inc", assignedTech: null },
]

const techniciansOnline = [
  { id: 1, name: "John Mitchell", specialty: "HVAC", status: "busy", jobs: 4, rating: 4.9, location: { x: 25, y: 35 }, currentJob: "AC Repair - Downtown", eta: "15 min", earnings: 642 },
  { id: 2, name: "Sarah Chen", specialty: "Electrical", status: "available", jobs: 3, rating: 4.8, location: { x: 55, y: 45 }, currentJob: null, eta: null, earnings: 485 },
  { id: 3, name: "Mike Rodriguez", specialty: "Plumbing", status: "busy", jobs: 5, rating: 5.0, location: { x: 70, y: 30 }, currentJob: "Pipe Repair - SoMa", eta: "8 min", earnings: 892 },
  { id: 4, name: "Emily Davis", specialty: "Appliance", status: "available", jobs: 2, rating: 4.7, location: { x: 40, y: 65 }, currentJob: null, eta: null, earnings: 320 },
  { id: 5, name: "Alex Thompson", specialty: "HVAC", status: "en-route", jobs: 3, rating: 4.6, location: { x: 82, y: 55 }, currentJob: "Emergency - Gas Leak", eta: "4 min", earnings: 578 },
  { id: 6, name: "Chris Park", specialty: "Electrical", status: "busy", jobs: 4, rating: 4.9, location: { x: 15, y: 70 }, currentJob: "Panel Upgrade", eta: "25 min", earnings: 715 },
  { id: 7, name: "Diana Foster", specialty: "Plumbing", status: "available", jobs: 1, rating: 4.8, location: { x: 60, y: 80 }, currentJob: null, eta: null, earnings: 190 },
  { id: 8, name: "Kevin Lee", specialty: "HVAC", status: "offline", jobs: 0, rating: 4.5, location: { x: 0, y: 0 }, currentJob: null, eta: null, earnings: 0 },
]

const aiInsights = [
  { id: 1, type: "demand", message: "High HVAC demand predicted in Marina district in 2 hours", confidence: 94, action: "Pre-position 2 technicians" },
  { id: 2, type: "efficiency", message: "Route optimization can save 23 minutes for John M.", confidence: 87, action: "Suggest alternate route" },
  { id: 3, type: "alert", message: "Potential equipment failure pattern detected - Customer #4521", confidence: 78, action: "Schedule preventive visit" },
  { id: 4, type: "revenue", message: "Upsell opportunity: Sarah M. may need full HVAC service", confidence: 82, action: "Notify technician" },
]

const zoneData = [
  { name: "Downtown", jobs: 45, techs: 12, demand: "high", revenue: 12500 },
  { name: "Mission", jobs: 32, techs: 8, demand: "medium", revenue: 8200 },
  { name: "SoMa", jobs: 28, techs: 6, demand: "medium", revenue: 7100 },
  { name: "Marina", jobs: 18, techs: 5, demand: "low", revenue: 4800 },
  { name: "Richmond", jobs: 24, techs: 7, demand: "medium", revenue: 6300 },
]

const hourlyRevenue = [
  { hour: "6AM", value: 1200, jobs: 8 },
  { hour: "7AM", value: 2100, jobs: 14 },
  { hour: "8AM", value: 3500, jobs: 24 },
  { hour: "9AM", value: 4800, jobs: 32 },
  { hour: "10AM", value: 5800, jobs: 39 },
  { hour: "11AM", value: 6200, jobs: 42 },
  { hour: "12PM", value: 5900, jobs: 40 },
  { hour: "1PM", value: 6500, jobs: 44 },
  { hour: "2PM", value: 7200, jobs: 48 },
  { hour: "3PM", value: 6800, jobs: 46 },
  { hour: "4PM", value: 5500, jobs: 37 },
  { hour: "5PM", value: 4200, jobs: 28 },
]

const systemMetrics = [
  { name: "API Latency", value: "42ms", status: "healthy", icon: Gauge },
  { name: "Database", value: "99.9%", status: "healthy", icon: Database },
  { name: "WS Connections", value: "2,847", status: "healthy", icon: Signal },
  { name: "Queue Processing", value: "1.2s", status: "healthy", icon: Workflow },
]

// Components
function LiveIndicator({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }
  
  return (
    <span className="relative flex">
      <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75", sizeClasses[size])} />
      <span className={cn("relative inline-flex rounded-full bg-success", sizeClasses[size])} />
    </span>
  )
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const animatedValue = useAnimatedCounter(value)
  return <span>{prefix}{animatedValue.toLocaleString()}{suffix}</span>
}

function MiniChart({ data, color = "primary" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const colorClass = color === "success" ? "bg-success" : color === "accent" ? "bg-accent" : "bg-primary"
  
  return (
    <div className="flex h-8 items-end gap-0.5">
      {data.map((value, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={cn("w-1.5 rounded-t", colorClass, "opacity-80")}
        />
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(generateRealtimeData())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTech, setSelectedTech] = useState<number | null>(null)
  const [showSystemPanel, setShowSystemPanel] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Realtime updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateRealtimeData())
      setCurrentTime(new Date())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setStats(generateRealtimeData())
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const maxRevenue = Math.max(...hourlyRevenue.map(h => h.value))

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Command Center Header */}
      <header className="glass fixed left-0 right-0 top-0 z-50 border-b border-primary/10">
        <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary glow-blue">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden text-sm font-bold tracking-tight text-foreground lg:inline">
                SCHNEIDER COMMAND
              </span>
            </Link>

            <div className="hidden h-6 w-px bg-border md:block" />

            {/* Live Status */}
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 border border-success/20">
                <LiveIndicator size="sm" />
                <span className="text-xs font-medium text-success">LIVE</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wifi className="h-3 w-3 text-success" />
                <span>{stats.wsConnections.toLocaleString()} connections</span>
              </div>
            </div>
          </div>

          {/* Center - Time & Date */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="text-center">
              <div className="text-lg font-bold tabular-nums text-foreground">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden gap-2 sm:flex" onClick={() => setShowSystemPanel(!showSystemPanel)}>
              <Cpu className="h-4 w-4" />
              <span className="text-xs">System</span>
            </Button>
            
            <button onClick={handleRefresh} className="rounded-lg bg-secondary/50 p-2 transition-colors hover:bg-secondary">
              <RefreshCw className={cn("h-4 w-4 text-foreground", isRefreshing && "animate-spin")} />
            </button>

            <button className="relative rounded-lg bg-secondary/50 p-2 transition-colors hover:bg-secondary">
              <Bell className="h-4 w-4 text-foreground" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {stats.emergencies}
              </span>
            </button>

            <div className="hidden h-6 w-px bg-border sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-medium text-foreground">Admin</div>
                <div className="text-[10px] text-muted-foreground">Operations Lead</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-[1920px] px-3 pb-6 pt-18">
        {/* Top Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8"
        >
          {[
            { label: "Active Techs", value: stats.activeTechnicians, icon: Users, color: "text-primary", trend: "+12", trendUp: true },
            { label: "Live Jobs", value: stats.activeJobs, icon: Activity, color: "text-accent", trend: "+28", trendUp: true },
            { label: "Completed", value: stats.completedToday, icon: CheckCircle, color: "text-success", trend: "+156", trendUp: true },
            { label: "Revenue", value: stats.revenue, icon: DollarSign, color: "text-success", trend: "+$8.2K", trendUp: true, prefix: "$", format: true },
            { label: "Avg Response", value: stats.avgResponseTime, icon: Clock, color: "text-warning", trend: "-2min", trendUp: true, suffix: "min" },
            { label: "Queue", value: stats.queueSize, icon: Layers, color: "text-accent", trend: "-5", trendUp: true },
            { label: "Emergencies", value: stats.emergencies, icon: AlertTriangle, color: "text-destructive", trend: "Active", trendUp: false },
            { label: "Satisfaction", value: parseFloat(stats.satisfaction), icon: Star, color: "text-warning", trend: "+0.2", trendUp: true },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card rounded-lg p-3 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <span className={cn("text-[10px] font-medium", stat.trendUp ? "text-success" : "text-destructive")}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-xl font-bold text-foreground tabular-nums">
                {stat.prefix}{stat.format ? (stat.value / 1000).toFixed(1) + "K" : stat.value}{stat.suffix}
              </div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid gap-3 lg:grid-cols-12">
          {/* Left Column - Map & Dispatch */}
          <div className="space-y-3 lg:col-span-8">
            {/* Live Fleet Map - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                    <Radar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Live Fleet Tracker</h2>
                    <p className="text-[10px] text-muted-foreground">{techniciansOnline.filter(t => t.status !== "offline").length} technicians active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Busy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-muted-foreground">En Route</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Filter className="mr-1 h-3 w-3" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Map Area */}
              <div className="relative h-[280px] bg-background/50">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                
                {/* Zone Overlays */}
                {[
                  { name: "Downtown", x: 20, y: 25, w: 25, h: 30, demand: "high" },
                  { name: "SoMa", x: 50, y: 35, w: 20, h: 25, demand: "medium" },
                  { name: "Mission", x: 35, y: 60, w: 25, h: 30, demand: "medium" },
                  { name: "Marina", x: 10, y: 55, w: 20, h: 25, demand: "low" },
                ].map((zone, i) => (
                  <motion.div
                    key={zone.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={cn(
                      "absolute rounded-lg border border-dashed",
                      zone.demand === "high" ? "border-destructive/30 bg-destructive/5" :
                      zone.demand === "medium" ? "border-warning/30 bg-warning/5" :
                      "border-success/30 bg-success/5"
                    )}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
                  >
                    <span className="absolute left-2 top-1 text-[9px] font-medium text-muted-foreground">{zone.name}</span>
                  </motion.div>
                ))}

                {/* Technician Markers */}
                {techniciansOnline.filter(t => t.status !== "offline").map((tech, i) => (
                  <motion.div
                    key={tech.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                    className="absolute cursor-pointer group"
                    style={{ left: `${tech.location.x}%`, top: `${tech.location.y}%` }}
                    onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                  >
                    <div className="relative">
                      {/* Pulse ring for en-route */}
                      {tech.status === "en-route" && (
                        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-primary/40" />
                      )}
                      
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                        tech.status === "busy" ? "bg-warning border-warning/50" :
                        tech.status === "available" ? "bg-success border-success/50" :
                        "bg-primary border-primary/50",
                        selectedTech === tech.id && "ring-2 ring-white scale-125"
                      )}>
                        <User className="h-3 w-3 text-background" />
                      </div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {selectedTech === tech.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute left-8 top-0 z-10 w-48 rounded-lg bg-card border border-border p-3 shadow-xl"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-sm font-semibold text-foreground">{tech.name}</div>
                              <div className="flex items-center gap-0.5 text-warning">
                                <Star className="h-3 w-3 fill-warning" />
                                <span className="text-[10px]">{tech.rating}</span>
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground mb-2">{tech.specialty}</div>
                            {tech.currentJob && (
                              <div className="text-[10px] text-foreground bg-secondary/50 rounded px-2 py-1 mb-2">
                                {tech.currentJob}
                              </div>
                            )}
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-muted-foreground">Today: {tech.jobs} jobs</span>
                              <span className="text-success font-medium">${tech.earnings}</span>
                            </div>
                            {tech.eta && (
                              <div className="mt-2 flex items-center gap-1 text-[10px] text-primary">
                                <Navigation className="h-3 w-3" />
                                <span>ETA: {tech.eta}</span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                {/* Emergency Markers */}
                {emergencyQueue.filter(e => !e.assignedTech).map((emergency, i) => (
                  <motion.div
                    key={emergency.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="absolute"
                    style={{ left: `${45 + i * 15}%`, top: `${40 + i * 10}%` }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive">
                      <AlertTriangle className="h-3 w-3 text-destructive-foreground" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Two Column Section */}
            <div className="grid gap-3 lg:grid-cols-2">
              {/* Realtime Dispatch Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl"
              >
                <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-accent live-indicator" />
                    <h3 className="text-sm font-semibold text-foreground">Dispatch Feed</h3>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-success">
                    <LiveIndicator size="sm" />
                    Live
                  </span>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2">
                  <div className="space-y-1.5">
                    {dispatchFeed.map((dispatch, i) => (
                      <motion.div
                        key={dispatch.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg bg-secondary/30 p-2 hover:bg-secondary/50 transition-colors cursor-pointer",
                          dispatch.priority === "emergency" && "border border-destructive/30 bg-destructive/5"
                        )}
                      >
                        <div className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          dispatch.status === "completed" ? "bg-success/20 text-success" :
                          dispatch.status === "on-site" ? "bg-accent/20 text-accent" :
                          "bg-primary/20 text-primary"
                        )}>
                          <dispatch.icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-foreground truncate">{dispatch.technician}</span>
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground truncate">{dispatch.customer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{dispatch.service}</span>
                            {dispatch.priority === "emergency" && (
                              <span className="rounded bg-destructive/20 px-1 py-0.5 text-[8px] font-bold text-destructive">
                                EMERGENCY
                              </span>
                            )}
                            {dispatch.priority === "high" && (
                              <span className="rounded bg-warning/20 px-1 py-0.5 text-[8px] font-bold text-warning">
                                PRIORITY
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={cn(
                            "text-[10px] font-medium",
                            dispatch.status === "completed" ? "text-success" :
                            dispatch.status === "on-site" ? "text-accent" : "text-primary"
                          )}>
                            {dispatch.status === "en-route" ? `ETA ${dispatch.eta}` : dispatch.status.replace("-", " ")}
                          </div>
                          <div className="text-[10px] text-success">${dispatch.earnings}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Emergency Queue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl"
              >
                <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <h3 className="text-sm font-semibold text-foreground">Emergency Queue</h3>
                    <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-bold text-destructive">
                      {emergencyQueue.length}
                    </span>
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-2">
                  <div className="space-y-2">
                    {emergencyQueue.map((emergency, i) => (
                      <motion.div
                        key={emergency.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                          "rounded-lg border p-3",
                          emergency.severity === "critical" 
                            ? "border-destructive/50 bg-destructive/10" 
                            : "border-warning/50 bg-warning/10"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "flex h-5 w-5 items-center justify-center rounded",
                              emergency.severity === "critical" ? "bg-destructive" : "bg-warning"
                            )}>
                              <AlertTriangle className="h-3 w-3 text-white" />
                            </div>
                            <span className={cn(
                              "text-[10px] font-bold uppercase",
                              emergency.severity === "critical" ? "text-destructive" : "text-warning"
                            )}>
                              {emergency.severity}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{emergency.time}</span>
                        </div>
                        
                        <p className="text-xs font-medium text-foreground mb-1">{emergency.issue}</p>
                        <p className="text-[10px] text-muted-foreground mb-2">{emergency.location}</p>
                        
                        <div className="flex items-center justify-between">
                          {emergency.assignedTech ? (
                            <div className="flex items-center gap-1 text-[10px] text-success">
                              <CheckCircle className="h-3 w-3" />
                              <span>Assigned: {emergency.assignedTech}</span>
                            </div>
                          ) : (
                            <Button size="sm" variant="destructive" className="h-6 text-[10px]">
                              <Crosshair className="mr-1 h-3 w-3" />
                              Dispatch Now
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Revenue Timeline Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-semibold text-foreground">Revenue Timeline</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Jobs</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-end justify-between h-32 gap-1">
                  {hourlyRevenue.map((data, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 gap-1">
                      <div className="relative w-full flex flex-col items-center gap-0.5" style={{ height: '100px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="w-full max-w-[20px] rounded-t bg-success/80 hover:bg-success transition-colors cursor-pointer"
                          title={`$${data.value.toLocaleString()}`}
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{data.hour}</span>
                    </div>
                  ))}
                </div>
                
                {/* Summary Stats */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    { label: "Peak Hour", value: "2PM", icon: TrendingUp },
                    { label: "Total Revenue", value: `$${(stats.revenue / 1000).toFixed(1)}K`, icon: DollarSign },
                    { label: "Avg/Job", value: "$185", icon: Target },
                    { label: "Projected", value: "$62K", icon: ArrowUpRight },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg bg-secondary/30 p-2 text-center">
                      <stat.icon className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
                      <div className="text-xs font-bold text-foreground">{stat.value}</div>
                      <div className="text-[9px] text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-3 lg:col-span-4">
            {/* AI Insights Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-chart-3" />
                  <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
                </div>
                <span className="text-[10px] text-chart-3">4 recommendations</span>
              </div>

              <div className="p-2 space-y-2">
                {aiInsights.map((insight, i) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-lg bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded",
                        insight.type === "demand" ? "bg-warning/20 text-warning" :
                        insight.type === "efficiency" ? "bg-success/20 text-success" :
                        insight.type === "alert" ? "bg-destructive/20 text-destructive" :
                        "bg-primary/20 text-primary"
                      )}>
                        {insight.type === "demand" ? <TrendingUp className="h-3 w-3" /> :
                         insight.type === "efficiency" ? <Gauge className="h-3 w-3" /> :
                         insight.type === "alert" ? <AlertTriangle className="h-3 w-3" /> :
                         <DollarSign className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-tight">{insight.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-16 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-chart-3 rounded-full" 
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{insight.confidence}%</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-5 px-2 text-[10px] text-chart-3">
                        {insight.action}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Zone Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Zone Performance</h3>
                </div>
              </div>

              <div className="p-2 space-y-1.5">
                {zoneData.map((zone, i) => (
                  <motion.div
                    key={zone.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center gap-3 rounded-lg bg-secondary/30 p-2 hover:bg-secondary/50 transition-colors"
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      zone.demand === "high" ? "bg-destructive" :
                      zone.demand === "medium" ? "bg-warning" : "bg-success"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground">{zone.name}</div>
                      <div className="text-[10px] text-muted-foreground">{zone.jobs} jobs • {zone.techs} techs</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-success">${(zone.revenue / 1000).toFixed(1)}K</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technician Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-warning" />
                  <h3 className="text-sm font-semibold text-foreground">Top Performers</h3>
                </div>
                <span className="text-[10px] text-muted-foreground">Today</span>
              </div>

              <div className="p-2 space-y-1.5">
                {techniciansOnline
                  .filter(t => t.status !== "offline")
                  .sort((a, b) => b.earnings - a.earnings)
                  .slice(0, 5)
                  .map((tech, i) => (
                    <motion.div
                      key={tech.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                      className="flex items-center gap-2 rounded-lg bg-secondary/30 p-2"
                    >
                      <div className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                        i === 0 ? "bg-warning text-warning-foreground" :
                        i === 1 ? "bg-muted text-muted-foreground" :
                        i === 2 ? "bg-orange-600 text-white" :
                        "bg-secondary text-muted-foreground"
                      )}>
                        {i + 1}
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <User className="h-3 w-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">{tech.name}</div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <span>{tech.jobs} jobs</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-warning">
                            <Star className="h-2 w-2 fill-warning" />
                            {tech.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-success">${tech.earnings}</div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* System Health */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-semibold text-foreground">System Health</h3>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-[10px] text-success">All Systems Operational</span>
                </div>
              </div>

              <div className="p-3 grid grid-cols-2 gap-2">
                {systemMetrics.map((metric, i) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="rounded-lg bg-secondary/30 p-2"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <metric.icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{metric.name}</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{metric.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* System Panel Overlay */}
      <AnimatePresence>
        {showSystemPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-14 bottom-0 w-80 glass-card border-l border-border/50 z-40 p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">System Monitor</h3>
              <button onClick={() => setShowSystemPanel(false)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* CPU Usage */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-foreground">42%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    className="h-full bg-success rounded-full"
                  />
                </div>
              </div>

              {/* Memory */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Memory</span>
                  <span className="text-foreground">68%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    className="h-full bg-warning rounded-full"
                  />
                </div>
              </div>

              {/* Network */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Network I/O</span>
                  <span className="text-foreground">1.2 GB/s</span>
                </div>
                <MiniChart data={[30, 45, 35, 60, 55, 70, 65, 80, 75, 90]} color="primary" />
              </div>

              {/* WebSocket Stats */}
              <div className="rounded-lg bg-secondary/30 p-3">
                <div className="text-xs font-medium text-foreground mb-2">WebSocket Activity</div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-muted-foreground">Connections</span>
                    <div className="font-bold text-foreground">{stats.wsConnections}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Messages/sec</span>
                    <div className="font-bold text-foreground">847</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Latency</span>
                    <div className="font-bold text-success">12ms</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uptime</span>
                    <div className="font-bold text-foreground">99.99%</div>
                  </div>
                </div>
              </div>

              {/* Recent Events */}
              <div>
                <div className="text-xs font-medium text-foreground mb-2">Recent Events</div>
                <div className="space-y-1.5 text-[10px]">
                  {[
                    { event: "New technician connected", time: "2s ago", type: "success" },
                    { event: "Emergency dispatch sent", time: "15s ago", type: "warning" },
                    { event: "Payment processed", time: "32s ago", type: "success" },
                    { event: "Job completed #2847", time: "1m ago", type: "info" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        event.type === "success" ? "bg-success" :
                        event.type === "warning" ? "bg-warning" : "bg-primary"
                      )} />
                      <span className="flex-1 text-muted-foreground">{event.event}</span>
                      <span className="text-muted-foreground/60">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
