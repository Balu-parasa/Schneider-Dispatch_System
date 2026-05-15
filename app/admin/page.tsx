"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Activity,
  Bell,
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
  Shield,
  Gauge,
  Layers,
  Cpu,
  Database,
  Server,
  Signal,
  ArrowUpRight,
  Sparkles,
  Radar,
  Globe,
  Crosshair,
  XCircle,
  MapPin,
  Percent,
  Timer,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  completionRate: 94 + Math.floor(Math.random() * 4),
  utilization: 78 + Math.floor(Math.random() * 10),
})

const dispatchFeed = [
  { id: "DSP-001", technician: "John M.", customer: "Sarah Mitchell", service: "HVAC", status: "en-route", eta: "8 min", time: "Just now", icon: Thermometer, priority: "high" },
  { id: "DSP-002", technician: "Mike R.", customer: "David Chen", service: "Plumbing", status: "on-site", eta: "-", time: "2m", icon: Droplets, priority: "normal" },
  { id: "DSP-003", technician: "Sarah C.", customer: "Emily Davis", service: "Electrical", status: "completed", eta: "-", time: "5m", icon: Plug, priority: "normal" },
  { id: "DSP-004", technician: "Alex T.", customer: "James Wilson", service: "Appliance", status: "en-route", eta: "15 min", time: "8m", icon: Wrench, priority: "emergency" },
  { id: "DSP-005", technician: "Emily D.", customer: "Robert Brown", service: "HVAC", status: "on-site", eta: "-", time: "12m", icon: Thermometer, priority: "normal" },
]

const emergencyQueue = [
  { id: "EMG-001", issue: "Gas leak - Commercial", location: "789 Pine St", time: "2m", severity: "critical", assignedTech: null },
  { id: "EMG-002", issue: "Power outage - Medical", location: "456 Oak Ave", time: "5m", severity: "critical", assignedTech: "Sarah C." },
  { id: "EMG-003", issue: "Flooding - Basement", location: "123 Main St", time: "12m", severity: "high", assignedTech: null },
]

const techniciansOnline = [
  { id: 1, name: "John Mitchell", specialty: "HVAC", status: "busy", jobs: 4, rating: 4.9, location: { x: 25, y: 35 }, currentJob: "AC Repair", eta: "15m" },
  { id: 2, name: "Sarah Chen", specialty: "Electrical", status: "available", jobs: 3, rating: 4.8, location: { x: 55, y: 45 }, currentJob: null, eta: null },
  { id: 3, name: "Mike Rodriguez", specialty: "Plumbing", status: "busy", jobs: 5, rating: 5.0, location: { x: 70, y: 30 }, currentJob: "Pipe Repair", eta: "8m" },
  { id: 4, name: "Emily Davis", specialty: "Appliance", status: "available", jobs: 2, rating: 4.7, location: { x: 40, y: 65 }, currentJob: null, eta: null },
  { id: 5, name: "Alex Thompson", specialty: "HVAC", status: "en-route", jobs: 3, rating: 4.6, location: { x: 82, y: 55 }, currentJob: "Emergency", eta: "4m" },
  { id: 6, name: "Chris Park", specialty: "Electrical", status: "busy", jobs: 4, rating: 4.9, location: { x: 15, y: 70 }, currentJob: "Panel Upgrade", eta: "25m" },
  { id: 7, name: "Diana Foster", specialty: "Plumbing", status: "available", jobs: 1, rating: 4.8, location: { x: 60, y: 80 }, currentJob: null, eta: null },
]

const aiInsights = [
  { message: "High HVAC demand in Marina in 2h", confidence: 94, action: "Pre-position 2 techs" },
  { message: "Route optimization for John M. saves 23min", confidence: 87, action: "Apply route" },
  { message: "Equipment failure pattern - Customer #4521", confidence: 78, action: "Schedule visit" },
]

const zoneData = [
  { name: "Downtown", jobs: 45, techs: 12, demand: "high" },
  { name: "Mission", jobs: 32, techs: 8, demand: "medium" },
  { name: "SoMa", jobs: 28, techs: 6, demand: "medium" },
  { name: "Marina", jobs: 18, techs: 5, demand: "low" },
]

function LiveIndicator() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(generateRealtimeData())
  const [selectedTech, setSelectedTech] = useState<number | null>(null)
  const [showSystemPanel, setShowSystemPanel] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateRealtimeData())
      setCurrentTime(new Date())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
      </div>

      {/* Ultra Compact Top Bar */}
      <header className="relative z-50 flex h-10 shrink-0 items-center justify-between border-b border-border/30 bg-card/80 backdrop-blur-xl px-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Zap className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-xs font-bold tracking-tight text-foreground hidden sm:inline">COMMAND</span>
          </Link>
          
          <div className="h-4 w-px bg-border/50" />
          
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 border border-success/20">
            <LiveIndicator />
            <span className="text-[10px] font-medium text-success">LIVE</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground">
            <Wifi className="h-3 w-3 text-success" />
            <span>{stats.wsConnections.toLocaleString()}</span>
          </div>
        </div>

        {/* Center Quick Stats */}
        <div className="hidden lg:flex items-center gap-4">
          {[
            { label: "Techs", value: stats.activeTechnicians, icon: Users, color: "text-primary" },
            { label: "Jobs", value: stats.activeJobs, icon: Activity, color: "text-accent" },
            { label: "Queue", value: stats.queueSize, icon: Layers, color: "text-warning" },
            { label: "Emergency", value: stats.emergencies, icon: AlertTriangle, color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <stat.icon className={cn("h-3 w-3", stat.color)} />
              <span className="text-xs font-bold tabular-nums text-foreground">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <div className="text-xs font-bold tabular-nums text-foreground">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
          
          <button onClick={() => setShowSystemPanel(!showSystemPanel)} className="rounded p-1.5 hover:bg-secondary/50 transition-colors">
            <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          
          <button className="relative rounded p-1.5 hover:bg-secondary/50 transition-colors">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-white">
              {stats.emergencies}
            </span>
          </button>
          
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
            <Shield className="h-3 w-3 text-primary" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Panel - Compact Stats */}
        <aside className="hidden lg:flex w-44 shrink-0 flex-col border-r border-border/30 bg-card/50 backdrop-blur-sm">
          {/* Active Stats */}
          <div className="p-2 space-y-1 border-b border-border/30">
            <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground px-1">Operations</div>
            {[
              { label: "Active Techs", value: stats.activeTechnicians, icon: Users, color: "text-primary", trend: "+12" },
              { label: "Live Bookings", value: stats.activeJobs, icon: Activity, color: "text-accent", trend: "+28" },
              { label: "Emergencies", value: stats.emergencies, icon: AlertTriangle, color: "text-destructive", trend: "3 active" },
              { label: "Queue Size", value: stats.queueSize, icon: Layers, color: "text-warning", trend: "-5" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 rounded-md p-1.5 hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <stat.icon className={cn("h-3.5 w-3.5 shrink-0", stat.color)} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold tabular-nums text-foreground">{stat.value}</div>
                  <div className="text-[9px] text-muted-foreground truncate">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Zone Status */}
          <div className="p-2 space-y-1 border-b border-border/30 flex-1">
            <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground px-1">Zones</div>
            {zoneData.map((zone, i) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-2 rounded-md p-1.5 hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <div className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  zone.demand === "high" ? "bg-destructive" :
                  zone.demand === "medium" ? "bg-warning" : "bg-success"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-medium text-foreground truncate">{zone.name}</div>
                  <div className="text-[9px] text-muted-foreground">{zone.jobs} jobs</div>
                </div>
                <div className="text-[9px] text-muted-foreground">{zone.techs}</div>
              </motion.div>
            ))}
          </div>

          {/* System Load */}
          <div className="p-2 space-y-1.5">
            <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground px-1">System</div>
            {[
              { label: "CPU", value: 42 },
              { label: "Memory", value: 68 },
              { label: "Network", value: 35 },
            ].map((metric) => (
              <div key={metric.label} className="px-1">
                <div className="flex items-center justify-between text-[9px] mb-0.5">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="text-foreground tabular-nums">{metric.value}%</span>
                </div>
                <div className="h-1 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    className={cn(
                      "h-full rounded-full",
                      metric.value > 80 ? "bg-destructive" : metric.value > 60 ? "bg-warning" : "bg-success"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Map Hero */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/50"
            >
              {/* Grid Pattern */}
              <div className="absolute inset-0 grid-pattern opacity-30" />
              
              {/* Map Header Overlay */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 px-2.5 py-1.5">
                  <Radar className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Live Fleet</span>
                  <span className="text-[10px] text-muted-foreground">
                    {techniciansOnline.filter(t => t.status !== "offline").length} active
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-[9px]">
                  {[
                    { color: "bg-success", label: "Available" },
                    { color: "bg-warning", label: "Busy" },
                    { color: "bg-primary animate-pulse", label: "En Route" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1 rounded bg-card/80 backdrop-blur-sm px-1.5 py-0.5">
                      <div className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone Overlays */}
              {[
                { name: "Downtown", x: 20, y: 20, w: 25, h: 30, demand: "high" },
                { name: "SoMa", x: 50, y: 30, w: 20, h: 25, demand: "medium" },
                { name: "Mission", x: 35, y: 55, w: 25, h: 30, demand: "medium" },
                { name: "Marina", x: 10, y: 60, w: 20, h: 25, demand: "low" },
              ].map((zone, i) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={cn(
                    "absolute rounded border border-dashed",
                    zone.demand === "high" ? "border-destructive/40 bg-destructive/5" :
                    zone.demand === "medium" ? "border-warning/40 bg-warning/5" :
                    "border-success/40 bg-success/5"
                  )}
                  style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
                >
                  <span className="absolute left-1.5 top-1 text-[8px] font-medium text-muted-foreground/70">{zone.name}</span>
                </motion.div>
              ))}

              {/* Technician Markers */}
              {techniciansOnline.filter(t => t.status !== "offline").map((tech, i) => (
                <motion.div
                  key={tech.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 200 }}
                  className="absolute cursor-pointer z-20"
                  style={{ left: `${tech.location.x}%`, top: `${tech.location.y}%` }}
                  onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {tech.status === "en-route" && (
                      <span className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-primary/50" />
                    )}
                    
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                      tech.status === "busy" ? "bg-warning border-warning/60" :
                      tech.status === "available" ? "bg-success border-success/60" :
                      "bg-primary border-primary/60",
                      selectedTech === tech.id && "ring-2 ring-white/80 scale-125"
                    )}>
                      <User className="h-2.5 w-2.5 text-background" />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {selectedTech === tech.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute left-6 top-0 w-36 rounded-md bg-card border border-border p-2 shadow-lg"
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-[10px] font-semibold text-foreground">{tech.name}</span>
                            <div className="flex items-center gap-0.5 text-warning">
                              <Star className="h-2 w-2 fill-warning" />
                              <span className="text-[8px]">{tech.rating}</span>
                            </div>
                          </div>
                          <div className="text-[9px] text-muted-foreground mb-1">{tech.specialty}</div>
                          {tech.currentJob && (
                            <div className="text-[9px] text-foreground bg-secondary/50 rounded px-1.5 py-0.5 mb-1">
                              {tech.currentJob}
                            </div>
                          )}
                          <div className="text-[9px] text-muted-foreground">
                            {tech.jobs} jobs today {tech.eta && <span className="text-primary">ETA: {tech.eta}</span>}
                          </div>
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
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                  className="absolute z-30"
                  style={{ left: `${45 + i * 12}%`, top: `${35 + i * 12}%` }}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive -translate-x-1/2 -translate-y-1/2">
                    <AlertTriangle className="h-2.5 w-2.5 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Analytics Bar */}
          <div className="shrink-0 border-t border-border/30 bg-card/80 backdrop-blur-sm p-2">
            <div className="flex items-center gap-3 overflow-x-auto">
              {[
                { label: "Revenue", value: `$${(stats.revenue / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-success", trend: "+18%" },
                { label: "Completed", value: stats.completedToday, icon: CheckCircle, color: "text-success", trend: "+156" },
                { label: "Avg Response", value: `${stats.avgResponseTime}m`, icon: Clock, color: "text-warning", trend: "-2m" },
                { label: "Completion", value: `${stats.completionRate}%`, icon: Target, color: "text-primary", trend: "+3%" },
                { label: "Utilization", value: `${stats.utilization}%`, icon: Percent, color: "text-accent", trend: "+5%" },
                { label: "Satisfaction", value: stats.satisfaction, icon: Star, color: "text-warning", trend: "+0.2" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-2 rounded-md bg-secondary/30 px-2.5 py-1.5 shrink-0"
                >
                  <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                  <div>
                    <div className="text-xs font-bold tabular-nums text-foreground">{stat.value}</div>
                    <div className="text-[9px] text-muted-foreground">{stat.label}</div>
                  </div>
                  <span className="text-[9px] text-success">{stat.trend}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Panel - Realtime Feeds */}
        <aside className="hidden xl:flex w-72 shrink-0 flex-col border-l border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          {/* Dispatch Feed */}
          <div className="flex-1 flex flex-col border-b border-border/30 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/20">
              <div className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">Dispatch Feed</span>
              </div>
              <div className="flex items-center gap-1">
                <LiveIndicator />
                <span className="text-[9px] text-success">Live</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
              {dispatchFeed.map((dispatch, i) => (
                <motion.div
                  key={dispatch.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "flex items-center gap-2 rounded-md p-1.5 hover:bg-secondary/40 transition-colors cursor-pointer",
                    dispatch.priority === "emergency" && "bg-destructive/10 border border-destructive/30"
                  )}
                >
                  <div className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded",
                    dispatch.status === "completed" ? "bg-success/20 text-success" :
                    dispatch.status === "on-site" ? "bg-accent/20 text-accent" :
                    "bg-primary/20 text-primary"
                  )}>
                    <dispatch.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-medium text-foreground truncate">{dispatch.technician}</span>
                      <ChevronRight className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
                      <span className="text-[10px] text-muted-foreground truncate">{dispatch.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-muted-foreground">{dispatch.service}</span>
                      {dispatch.priority === "emergency" && (
                        <span className="rounded bg-destructive/20 px-1 text-[7px] font-bold text-destructive">EMG</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn(
                      "text-[9px] font-medium",
                      dispatch.status === "completed" ? "text-success" :
                      dispatch.status === "on-site" ? "text-accent" : "text-primary"
                    )}>
                      {dispatch.status === "en-route" ? dispatch.eta : dispatch.status}
                    </div>
                    <div className="text-[8px] text-muted-foreground">{dispatch.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Queue */}
          <div className="shrink-0 border-b border-border/30">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/20">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                <span className="text-xs font-semibold text-foreground">Emergencies</span>
              </div>
              <span className="rounded-full bg-destructive/20 px-1.5 py-0.5 text-[9px] font-bold text-destructive">
                {emergencyQueue.length}
              </span>
            </div>
            
            <div className="p-1.5 space-y-1 max-h-36 overflow-y-auto">
              {emergencyQueue.map((emergency, i) => (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={cn(
                    "rounded-md border p-1.5",
                    emergency.severity === "critical" 
                      ? "border-destructive/40 bg-destructive/10" 
                      : "border-warning/40 bg-warning/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className={cn(
                          "text-[8px] font-bold uppercase",
                          emergency.severity === "critical" ? "text-destructive" : "text-warning"
                        )}>
                          {emergency.severity}
                        </span>
                        <span className="text-[8px] text-muted-foreground">{emergency.time}</span>
                      </div>
                      <p className="text-[10px] font-medium text-foreground truncate">{emergency.issue}</p>
                      <p className="text-[9px] text-muted-foreground truncate">{emergency.location}</p>
                    </div>
                    {!emergency.assignedTech && (
                      <Button size="sm" variant="destructive" className="h-5 px-1.5 text-[8px] shrink-0">
                        <Crosshair className="h-2.5 w-2.5" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/20">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-chart-3" />
                <span className="text-xs font-semibold text-foreground">AI Insights</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
              {aiInsights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-md bg-secondary/30 p-2 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <p className="text-[10px] text-foreground leading-tight mb-1.5">{insight.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1 w-10 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-chart-3 rounded-full" style={{ width: `${insight.confidence}%` }} />
                      </div>
                      <span className="text-[8px] text-muted-foreground">{insight.confidence}%</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-4 px-1.5 text-[8px] text-chart-3">
                      {insight.action}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* System Panel Overlay */}
      <AnimatePresence>
        {showSystemPanel && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed right-0 top-10 bottom-0 w-64 bg-card border-l border-border/50 z-40 p-3 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-foreground">System Monitor</span>
              <button onClick={() => setShowSystemPanel(false)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: "API Latency", value: "42ms", icon: Gauge },
                { label: "Database", value: "99.9%", icon: Database },
                { label: "WS Connections", value: stats.wsConnections.toLocaleString(), icon: Signal },
                { label: "Queue Processing", value: "1.2s", icon: Workflow },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center gap-2 rounded-md bg-secondary/30 p-2">
                  <metric.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-[10px] text-muted-foreground">{metric.label}</div>
                    <div className="text-xs font-bold text-foreground">{metric.value}</div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
              ))}

              <div className="pt-2 border-t border-border/30">
                <div className="text-[9px] font-medium text-muted-foreground mb-2">Recent Events</div>
                <div className="space-y-1.5">
                  {[
                    { event: "Technician connected", time: "2s", type: "success" },
                    { event: "Emergency dispatch", time: "15s", type: "warning" },
                    { event: "Payment processed", time: "32s", type: "success" },
                    { event: "Job completed #2847", time: "1m", type: "info" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[9px]">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        event.type === "success" ? "bg-success" :
                        event.type === "warning" ? "bg-warning" : "bg-primary"
                      )} />
                      <span className="flex-1 text-muted-foreground truncate">{event.event}</span>
                      <span className="text-muted-foreground/60 shrink-0">{event.time}</span>
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
