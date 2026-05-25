'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    // Disable Lenis on highly dynamic dashboard routes where it causes UI shaking
    const disableRoutes = ['/customer', '/technician', '/admin', '/chat', '/booking']
    const shouldDisable = disableRoutes.some(route => pathname?.startsWith(route))
    
    if (shouldDisable) {
      // Remove any lenis classes that might have been applied
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped')
      return
    }

    // 1. Initialize Lenis Smooth Scroll with exact monolith settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Expose lenis instance on window for potential global interaction/debugging
    if (typeof window !== 'undefined') {
      ;(window as any).lenis = lenis
    }

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [pathname])

  return <>{children}</>
}
