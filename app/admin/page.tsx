"use client"

import { useState, useEffect, useCallback } from "react"
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
  ChevronLeft,
  ChevronDown,
  User,
  Star,
  Navigation,
  Thermometer,
  Droplets,
  Plug,
  Wrench,
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
  X,
  MapPin,
  Percent,
  Timer,
  Workflow,
  Search,
  Settings,
  BarChart3,
  LineChart,
  PieChart,
  Bot,
  HeartPulse,
  Command,
  Phone,
  MessageSquare,
  Eye,
  Play,
  Pause,
  RefreshCw,
  MoreHorizontal,
  Home,
  Map,
  Calendar,
  FileText,
  Headphones,
  LogOut,
  Menu,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Circle,
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
  apiLatency: 38 + Math.floor(Math.random() * 15),
  dbHealth: 99.9,
  queueProcessing: (1.1 + Math.random() * 0.3).toFixed(1),
})

const dispatchFeed = [
  { id: "DSP-001", technician: "John M.", customer: "Sarah Mitchell", service: "HVAC", status: "en-route", eta: "8 min", time: "Just now", icon: Thermometer, priority: "high" },
  { id: "DSP-002", technician: "Mike R.", customer: "David Chen", service: "Plumbing", status: "on-site", eta: "-", time: "2m ago", icon: Droplets, priority: "normal" },
  { id: "DSP-003", technician: "Sarah C.", customer: "Emily Davis", service: "Electrical", status: "completed", eta: "-", time: "5m ago", icon: Plug, priority: "normal" },
  { id: "DSP-004", technician: "Alex T.", customer: "James Wilson", service: "Appliance", status: "en-route", eta: "15 min", time: "8m ago", icon: Wrench, priority: "emergency" },
  { id: "DSP-005", technician: "Emily D.", customer: "Robert Brown", service: "HVAC", status: "on-site", eta: "-", time: "12m ago", icon: Thermometer, priority: "normal" },
  { id: "DSP-006", technician: "Chris P.", customer: "Lisa Wang", service: "Electrical", status: "en-route", eta: "6 min", time: "15m ago", icon: Plug, priority: "normal" },
]

const emergencyQueue = [
  { id: "EMG-001", issue: "Gas leak - Commercial", location: "789 Pine St", time: "2m", severity: "critical", assignedTech: null },
  { id: "EMG-002", issue: "Power outage - Medical", location: "456 Oak Ave", time: "5m", severity: "critical", assignedTech: "Sarah C." },
  { id: "EMG-003", issue: "Flooding - Basement", location: "123 Main St", time: "12m", severity: "high", assignedTech: null },
]

const techniciansOnline = [
  { id: 1, name: "John Mitchell", specialty: "HVAC", status: "busy", jobs: 4, rating: 4.9, location: { x: 22, y: 32 }, currentJob: "AC Repair", eta: "15m" },
  { id: 2, name: "Sarah Chen", specialty: "Electrical", status: "available", jobs: 3, rating: 4.8, location: { x: 58, y: 42 }, currentJob: null, eta: null },
  { id: 3, name: "Mike Rodriguez", specialty: "Plumbing", status: "busy", jobs: 5, rating: 5.0, location: { x: 72, y: 28 }, currentJob: "Pipe Repair", eta: "8m" },
  { id: 4, name: "Emily Davis", specialty: "Appliance", status: "available", jobs: 2, rating: 4.7, location: { x: 38, y: 62 }, currentJob: null, eta: null },
  { id: 5, name: "Alex Thompson", specialty: "HVAC", status: "en-route", jobs: 3, rating: 4.6, location: { x: 85, y: 52 }, currentJob: "Emergency", eta: "4m" },
  { id: 6, name: "Chris Park", specialty: "Electrical", status: "busy", jobs: 4, rating: 4.9, location: { x: 15, y: 72 }, currentJob: "Panel Upgrade", eta: "25m" },
  { id: 7, name: "Diana Foster", specialty: "Plumbing", status: "available", jobs: 1, rating: 4.8, location: { x: 62, y: 78 }, currentJob: null, eta: null },
  { id: 8, name: "Ryan Kim", specialty: "HVAC", status: "en-route", jobs: 2, rating: 4.5, location: { x: 45, y: 25 }, currentJob: "Heating Issue", eta: "12m" },
]

const aiInsights = [
  { message: "High HVAC demand predicted in Marina district within 2 hours", confidence: 94, action: "Pre-position", type: "prediction" },
  { message: "Route optimization available for John M. - saves 23 minutes", confidence: 87, action: "Apply", type: "optimization" },
  { message: "Equipment failure pattern detected - Customer #4521", confidence: 78, action: "Schedule", type: "alert" },
  { message: "Surge pricing recommended for Downtown zone", confidence: 82, action: "Review", type: "revenue" },
]

const zoneData = [
  { name: "Downtown", jobs: 45, techs: 12, demand: "high", revenue: 12400 },
  { name: "Mission", jobs: 32, techs: 8, demand: "medium", revenue: 8200 },
  { name: "SoMa", jobs: 28, techs: 6, demand: "medium", revenue: 7100 },
  { name: "Marina", jobs: 18, techs: 5, demand: "low", revenue: 4800 },
  { name: "Richmond", jobs: 22, techs: 4, demand: "medium", revenue: 5600 },
]

const sidebarItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: Radar, label: "Live Operations", badge: "Live" },
  { icon: Map, label: "Fleet Tracking" },
  { icon: AlertTriangle, label: "Emergency Center", badge: "3" },
  { icon: BarChart3, label: "Analytics" },
  { icon: DollarSign, label: "Revenue" },
  { icon: Users, label: "Technicians" },
  { icon: User, label: "Customers" },
  { icon: Sparkles, label: "AI Insights" },
  { icon: HeartPulse, label: "System Health" },
  { icon: Settings, label: "Settings" },
]

const recentEvents = [
  { event: "Technician connected", time: "2s", type: "success" },
  { event: "Emergency dispatch sent", time: "15s", type: "warning" },
  { event: "Payment $245 processed", time: "32s", type: "success" },
  { event: "Job #2847 completed", time: "1m", type: "info" },
  { event: "New booking received", time: "2m", type: "info" },
  { event: "Route optimized", time: "3m", type: "success" },
]

function LiveIndicator({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span className={cn("relative flex", size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2")}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
      <span className={cn("relative inline-flex rounded-full bg-success", size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2")} />
    </span>
  )
}

function MiniSparkline({ data, color = "primary" }: { data: number[], color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <div className="flex items-end gap-px h-6">
      {data.map((value, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-sm transition-all",
            color === "primary" ? "bg-primary" :
            color === "success" ? "bg-success" :
            color === "accent" ? "bg-accent" : "bg-warning"
          )}
          style={{ height: `${((value - min) / range) * 100}%`, minHeight: "2px" }}
        />
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(generateRealtimeData())
  const [selectedTech, setSelectedTech] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSystemHealth, setShowSystemHealth] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [revenueData] = useState([42, 38, 45, 52, 48, 55, 60, 58, 62, 65, 70, 68])
  const [responseData] = useState([14, 12, 15, 11, 13, 10, 12, 9, 11, 10, 8, 9])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateRealtimeData())
      setCurrentTime(new Date())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  }, [])

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-mesh opacity-15" />
      </div>

      {/* Premium Top Navigation Bar */}
      <header className="relative z-50 flex h-11 shrink-0 items-center justify-between border-b border-border/40 bg-card/90 backdrop-blur-xl px-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground hidden md:inline">Schneider</span>
          </Link>
          
          <div className="h-5 w-px bg-border/50 hidden md:block" />
          
          {/* Live Status */}
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-success/10 px-2.5 py-1 border border-success/20">
            <LiveIndicator size="md" />
            <span className="text-[11px] font-semibold text-success tracking-wide">LIVE</span>
            <span className="text-[10px] text-success/70">{stats.wsConnections.toLocaleString()}</span>
          </div>

          {/* Global Search */}
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5 text-muted-foreground hover:bg-secondary/80 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search...</span>
              <kbd className="hidden xl:inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </button>
          </div>
        </div>

        {/* Center Quick Stats */}
        <div className="hidden xl:flex items-center gap-6">
          {[
            { label: "Active", value: stats.activeTechnicians, icon: Users, color: "text-primary" },
            { label: "Jobs", value: stats.activeJobs, icon: Activity, color: "text-accent" },
            { label: "Queue", value: stats.queueSize, icon: Layers, color: "text-warning" },
            { label: "Emergencies", value: stats.emergencies, icon: AlertTriangle, color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
              <span className="text-sm font-bold tabular-nums text-foreground">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Time */}
          <div className="hidden md:flex items-center gap-2 text-right mr-2">
            <div className="text-xs font-mono font-bold tabular-nums text-foreground">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* AI Assistant */}
          <button className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-chart-3/20 to-primary/20 px-2.5 py-1.5 border border-chart-3/30 hover:border-chart-3/50 transition-colors">
            <Bot className="h-3.5 w-3.5 text-chart-3" />
            <span className="text-[11px] font-medium text-chart-3">AI</span>
          </button>
          
          {/* Emergency Alerts */}
          <button className="relative rounded-lg p-2 hover:bg-destructive/10 transition-colors border border-transparent hover:border-destructive/30">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            {stats.emergencies > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white animate-pulse">
                {stats.emergencies}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-secondary/50 transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
              12
            </span>
          </button>

          {/* System Health */}
          <button 
            onClick={() => setShowSystemHealth(!showSystemHealth)}
            className={cn(
              "rounded-lg p-2 transition-colors",
              showSystemHealth ? "bg-primary/20 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
            )}
          >
            <HeartPulse className="h-4 w-4" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-2 py-1 ml-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Shield className="h-3 w-3 text-white" />
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-[11px] font-medium text-foreground leading-tight">Admin</div>
              <div className="text-[9px] text-muted-foreground leading-tight">Operator</div>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className={cn(
          "hidden md:flex flex-col border-r border-border/40 bg-sidebar/80 backdrop-blur-sm transition-all duration-300",
          sidebarCollapsed ? "w-14" : "w-52"
        )}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-3 border-b border-border/30">
            {!sidebarCollapsed && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Navigation</span>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded p-1 hover:bg-secondary/50 text-muted-foreground transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {sidebarItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all",
                  item.active 
                    ? "bg-primary/15 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", item.active && "text-primary")} />
                {!sidebarCollapsed && (
                  <>
                    <span className="text-[12px] font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                        item.badge === "Live" ? "bg-success/20 text-success" :
                        item.badge === "3" ? "bg-destructive/20 text-destructive" :
                        "bg-primary/20 text-primary"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-2 border-t border-border/30">
            <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
              {!sidebarCollapsed && <span className="text-[12px] font-medium">Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Map Command Center (Hero) */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40"
            >
              {/* Tactical Grid */}
              <div className="absolute inset-0 tactical-grid opacity-40" />
              
              {/* Map Header Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-md border border-border/50 px-3 py-2 shadow-lg">
                    <Radar className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-xs font-bold text-foreground">Live Fleet Tracking</span>
                    <div className="h-4 w-px bg-border/50" />
                    <span className="text-[11px] text-muted-foreground">
                      {techniciansOnline.filter(t => t.status !== "offline").length} technicians active
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Map Legend */}
                  <div className="flex items-center gap-3 rounded-lg bg-card/95 backdrop-blur-md border border-border/50 px-3 py-2 shadow-lg">
                    {[
                      { color: "bg-success", label: "Available" },
                      { color: "bg-warning", label: "Busy" },
                      { color: "bg-primary", label: "En Route" },
                      { color: "bg-destructive animate-pulse", label: "Emergency" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-1.5">
                        <div className={cn("h-2 w-2 rounded-full", item.color)} />
                        <span className="text-[10px] text-muted-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Map Controls */}
                  <div className="flex items-center gap-1 rounded-lg bg-card/95 backdrop-blur-md border border-border/50 p-1 shadow-lg">
                    <button className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone Overlays */}
              {[
                { name: "Downtown", x: 18, y: 15, w: 28, h: 32, demand: "high", jobs: 45 },
                { name: "SoMa", x: 52, y: 25, w: 22, h: 28, demand: "medium", jobs: 28 },
                { name: "Mission", x: 32, y: 52, w: 26, h: 32, demand: "medium", jobs: 32 },
                { name: "Marina", x: 8, y: 55, w: 20, h: 28, demand: "low", jobs: 18 },
                { name: "Richmond", x: 68, y: 60, w: 24, h: 26, demand: "medium", jobs: 22 },
              ].map((zone, i) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className={cn(
                    "absolute rounded-lg border-2 border-dashed cursor-pointer transition-all hover:scale-[1.02]",
                    zone.demand === "high" ? "border-destructive/50 bg-destructive/5 hover:bg-destructive/10" :
                    zone.demand === "medium" ? "border-warning/50 bg-warning/5 hover:bg-warning/10" :
                    "border-success/50 bg-success/5 hover:bg-success/10"
                  )}
                  style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
                >
                  <div className="absolute left-2 top-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-foreground/80">{zone.name}</span>
                    <span className={cn(
                      "text-[8px] font-bold px-1 py-0.5 rounded",
                      zone.demand === "high" ? "bg-destructive/20 text-destructive" :
                      zone.demand === "medium" ? "bg-warning/20 text-warning" :
                      "bg-success/20 text-success"
                    )}>
                      {zone.jobs}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Technician Markers */}
              {techniciansOnline.map((tech, i) => (
                <motion.div
                  key={tech.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 300 }}
                  className="absolute cursor-pointer z-20"
                  style={{ left: `${tech.location.x}%`, top: `${tech.location.y}%` }}
                  onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {/* Pulse ring for en-route */}
                    {tech.status === "en-route" && (
                      <span className="absolute inset-0 -m-2 rounded-full bg-primary/40 animate-ping" />
                    )}
                    
                    {/* Marker */}
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-all",
                      tech.status === "busy" ? "bg-warning border-warning/80" :
                      tech.status === "available" ? "bg-success border-success/80" :
                      "bg-primary border-primary/80",
                      selectedTech === tech.id && "ring-2 ring-white scale-125"
                    )}>
                      <User className="h-4 w-4 text-white" />
                    </div>

                    {/* Floating Panel */}
                    <AnimatePresence>
                      {selectedTech === tech.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute left-10 top-0 w-48 rounded-lg bg-card/98 backdrop-blur-xl border border-border/60 p-3 shadow-xl z-30"
                        >
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedTech(null) }}
                            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full",
                              tech.status === "busy" ? "bg-warning/20" :
                              tech.status === "available" ? "bg-success/20" : "bg-primary/20"
                            )}>
                              <User className={cn(
                                "h-4 w-4",
                                tech.status === "busy" ? "text-warning" :
                                tech.status === "available" ? "text-success" : "text-primary"
                              )} />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-foreground">{tech.name}</div>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <span>{tech.specialty}</span>
                                <span className="text-warning flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5 fill-warning" />
                                  {tech.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {tech.currentJob && (
                            <div className="text-[11px] bg-secondary/50 rounded-md px-2 py-1.5 mb-2">
                              <span className="text-muted-foreground">Current: </span>
                              <span className="text-foreground font-medium">{tech.currentJob}</span>
                              {tech.eta && <span className="text-primary ml-1">ETA {tech.eta}</span>}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-2">
                            <span>{tech.jobs} jobs today</span>
                            <span className={cn(
                              "capitalize font-medium",
                              tech.status === "busy" ? "text-warning" :
                              tech.status === "available" ? "text-success" : "text-primary"
                            )}>
                              {tech.status}
                            </span>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message
                            </Button>
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
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="absolute z-30"
                  style={{ left: `${42 + i * 15}%`, top: `${38 + i * 10}%` }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute inset-0 -m-3 rounded-full bg-destructive/30 animate-ping" />
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive border-2 border-destructive/80 shadow-lg">
                      <AlertTriangle className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="absolute left-8 top-0 whitespace-nowrap rounded bg-destructive/95 px-2 py-1 text-[9px] font-medium text-white shadow-lg">
                      {emergency.issue}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Analytics Bar */}
          <div className="shrink-0 border-t border-border/40 bg-card/90 backdrop-blur-md p-3">
            <div className="flex items-center gap-4 overflow-x-auto">
              {[
                { label: "Revenue Today", value: `$${(stats.revenue / 1000).toFixed(1)}K`, icon: DollarSign, color: "success", trend: "+18%", up: true, data: revenueData },
                { label: "Completed Jobs", value: stats.completedToday, icon: CheckCircle, color: "success", trend: "+156", up: true },
                { label: "Avg Response", value: `${stats.avgResponseTime}m`, icon: Clock, color: "warning", trend: "-2m", up: false, data: responseData },
                { label: "Completion Rate", value: `${stats.completionRate}%`, icon: Target, color: "primary", trend: "+3%", up: true },
                { label: "Utilization", value: `${stats.utilization}%`, icon: Percent, color: "accent", trend: "+5%", up: true },
                { label: "Satisfaction", value: stats.satisfaction, icon: Star, color: "warning", trend: "+0.2", up: true },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-lg bg-secondary/30 border border-border/30 px-3 py-2 shrink-0 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    stat.color === "success" ? "bg-success/15 text-success" :
                    stat.color === "warning" ? "bg-warning/15 text-warning" :
                    stat.color === "primary" ? "bg-primary/15 text-primary" :
                    "bg-accent/15 text-accent"
                  )}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tabular-nums text-foreground">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                  {stat.data && (
                    <MiniSparkline data={stat.data} color={stat.color} />
                  )}
                  <div className={cn(
                    "flex items-center gap-0.5 text-[10px] font-medium",
                    stat.up ? "text-success" : "text-warning"
                  )}>
                    {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Realtime Operations Panel */}
        <aside className="hidden lg:flex w-80 shrink-0 flex-col border-l border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden">
          {/* Dispatch Feed */}
          <div className="flex-1 flex flex-col border-b border-border/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-foreground">Live Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LiveIndicator />
                <span className="text-[10px] text-success font-medium">Streaming</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {dispatchFeed.map((dispatch, i) => (
                <motion.div
                  key={dispatch.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-2.5 hover:bg-secondary/50 transition-all cursor-pointer",
                    dispatch.priority === "emergency" && "bg-destructive/10 border border-destructive/30 hover:bg-destructive/15"
                  )}
                >
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    dispatch.status === "completed" ? "bg-success/20 text-success" :
                    dispatch.status === "on-site" ? "bg-accent/20 text-accent" :
                    "bg-primary/20 text-primary"
                  )}>
                    <dispatch.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-foreground">{dispatch.technician}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-[11px] text-muted-foreground truncate">{dispatch.customer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{dispatch.service}</span>
                      {dispatch.priority === "emergency" && (
                        <span className="text-[8px] font-bold text-destructive bg-destructive/20 px-1.5 py-0.5 rounded">EMERGENCY</span>
                      )}
                      {dispatch.priority === "high" && (
                        <span className="text-[8px] font-bold text-warning bg-warning/20 px-1.5 py-0.5 rounded">HIGH</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn(
                      "text-[10px] font-semibold",
                      dispatch.status === "completed" ? "text-success" :
                      dispatch.status === "on-site" ? "text-accent" : "text-primary"
                    )}>
                      {dispatch.status === "en-route" ? `ETA ${dispatch.eta}` : dispatch.status.replace("-", " ")}
                    </div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">{dispatch.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Queue */}
          <div className="shrink-0 border-b border-border/30">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-bold text-foreground">Emergency Queue</span>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white animate-pulse">
                {emergencyQueue.length}
              </span>
            </div>
            
            <div className="p-2 space-y-1.5 max-h-40 overflow-y-auto">
              {emergencyQueue.map((emergency, i) => (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={cn(
                    "rounded-lg border p-2.5",
                    emergency.severity === "critical" 
                      ? "border-destructive/50 bg-destructive/10" 
                      : "border-warning/50 bg-warning/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded",
                          emergency.severity === "critical" ? "bg-destructive/30 text-destructive" : "bg-warning/30 text-warning"
                        )}>
                          {emergency.severity}
                        </span>
                        <span className="text-[9px] text-muted-foreground">{emergency.time} ago</span>
                      </div>
                      <p className="text-[11px] font-semibold text-foreground">{emergency.issue}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {emergency.location}
                      </p>
                    </div>
                    {!emergency.assignedTech ? (
                      <Button size="sm" variant="destructive" className="h-7 px-2 text-[10px] shrink-0">
                        <Crosshair className="h-3 w-3 mr-1" />
                        Dispatch
                      </Button>
                    ) : (
                      <div className="text-[9px] text-success font-medium bg-success/20 px-2 py-1 rounded">
                        Assigned: {emergency.assignedTech}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-chart-3" />
                <span className="text-xs font-bold text-foreground">AI Insights</span>
              </div>
              <span className="text-[9px] text-chart-3 font-medium bg-chart-3/20 px-2 py-0.5 rounded-full">
                {aiInsights.length} new
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {aiInsights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/30 p-3 hover:border-chart-3/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg shrink-0",
                      insight.type === "prediction" ? "bg-primary/20 text-primary" :
                      insight.type === "optimization" ? "bg-accent/20 text-accent" :
                      insight.type === "alert" ? "bg-warning/20 text-warning" :
                      "bg-success/20 text-success"
                    )}>
                      {insight.type === "prediction" && <TrendingUp className="h-3 w-3" />}
                      {insight.type === "optimization" && <Navigation className="h-3 w-3" />}
                      {insight.type === "alert" && <AlertTriangle className="h-3 w-3" />}
                      {insight.type === "revenue" && <DollarSign className="h-3 w-3" />}
                    </div>
                    <p className="text-[11px] text-foreground leading-relaxed flex-1">{insight.message}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.confidence}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-chart-3 to-primary rounded-full" 
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{insight.confidence}% confidence</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-chart-3 hover:text-chart-3 hover:bg-chart-3/10">
                      {insight.action}
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* System Health Panel Overlay */}
      <AnimatePresence>
        {showSystemHealth && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setShowSystemHealth(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-11 bottom-0 w-80 bg-card border-l border-border/50 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-success" />
                  <span className="text-sm font-bold text-foreground">System Health</span>
                </div>
                <button 
                  onClick={() => setShowSystemHealth(false)} 
                  className="rounded-lg p-1.5 hover:bg-secondary/50 text-muted-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Health Score */}
                <div className="rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/30 p-4 text-center">
                  <div className="text-4xl font-bold text-success mb-1">{stats.systemHealth}%</div>
                  <div className="text-[11px] text-success/80 font-medium">All Systems Operational</div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "API Latency", value: `${stats.apiLatency}ms`, icon: Gauge, status: stats.apiLatency < 50 ? "good" : "warning" },
                    { label: "Database", value: `${stats.dbHealth}%`, icon: Database, status: "good" },
                    { label: "WS Connections", value: stats.wsConnections.toLocaleString(), icon: Signal, status: "good" },
                    { label: "Queue Time", value: `${stats.queueProcessing}s`, icon: Workflow, status: "good" },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-lg bg-secondary/30 border border-border/30 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon className="h-4 w-4 text-muted-foreground" />
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          metric.status === "good" ? "bg-success" : "bg-warning"
                        )} />
                      </div>
                      <div className="text-sm font-bold text-foreground">{metric.value}</div>
                      <div className="text-[10px] text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Server Status */}
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Server Status</div>
                  <div className="space-y-2">
                    {[
                      { name: "API Server", status: "online", load: 42 },
                      { name: "WebSocket Server", status: "online", load: 35 },
                      { name: "Database Primary", status: "online", load: 28 },
                      { name: "Cache Layer", status: "online", load: 15 },
                    ].map((server) => (
                      <div key={server.name} className="flex items-center gap-3 rounded-lg bg-secondary/20 p-2.5">
                        <div className="h-2 w-2 rounded-full bg-success" />
                        <div className="flex-1">
                          <div className="text-[11px] font-medium text-foreground">{server.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground">{server.load}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Events</div>
                  <div className="space-y-1.5">
                    {recentEvents.map((event, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] py-1">
                        <div className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          event.type === "success" ? "bg-success" :
                          event.type === "warning" ? "bg-warning" : "bg-primary"
                        )} />
                        <span className="flex-1 text-muted-foreground">{event.event}</span>
                        <span className="text-muted-foreground/60 shrink-0">{event.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setShowSearch(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-card border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search technicians, customers, jobs..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
                <kbd className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">ESC</kbd>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto">
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2 py-1">Quick Actions</div>
                {[
                  { icon: Users, label: "View all technicians", shortcut: "T" },
                  { icon: AlertTriangle, label: "Emergency dispatch", shortcut: "E" },
                  { icon: BarChart3, label: "Open analytics", shortcut: "A" },
                  { icon: Settings, label: "System settings", shortcut: "S" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    <action.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground flex-1 text-left">{action.label}</span>
                    <kbd className="text-[10px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{action.shortcut}</kbd>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
