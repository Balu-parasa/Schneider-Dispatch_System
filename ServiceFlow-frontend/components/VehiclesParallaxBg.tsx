"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface VehiclesParallaxBgProps {
  /** Image opacity 0–1. Default 0.13 */
  opacity?: number
}

export default function VehiclesParallaxBg({ opacity = 0.13 }: VehiclesParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Scroll-based transforms ──────────────────────────────────────
  const { scrollYProgress } = useScroll()

  // Image drifts up + scales as user scrolls
  const rawY     = useTransform(scrollYProgress, [0, 1], [0, -180])
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.12, 1.22])

  const y     = useSpring(rawY,     { stiffness: 55, damping: 22 })
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 })

  // ── Mouse 3D tilt + lateral shift ───────────────────────────────
  const tiltX      = useSpring(0, { stiffness: 90, damping: 20 })
  const tiltY      = useSpring(0, { stiffness: 90, damping: 20 })
  const mouseX     = useSpring(0, { stiffness: 65, damping: 20 })
  const mouseY     = useSpring(0, { stiffness: 65, damping: 20 })
  const mouseScale = useSpring(1, { stiffness: 65, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx   // -1 → +1
      const dy = (e.clientY - cy) / cy   // -1 → +1

      tiltX.set(-dy * 5)
      tiltY.set( dx * 5)
      mouseX.set( dx * 24)
      mouseY.set( dy * 14)
      
      const zoomVal = 1 + (Math.abs(dx) * 0.06 + Math.abs(dy) * 0.06)
      mouseScale.set(zoomVal)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [tiltX, tiltY, mouseX, mouseY, mouseScale])

  // Vignette fades slightly as you scroll
  const vigOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.5])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden gpu-accelerated"
      style={{ zIndex: -10 }}
    >
      {/* ── 3D perspective wrapper ─────────────────────────── */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          y,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
          perspective: 1200,
        }}
        className="absolute inset-0"
      >
        {/* ── Layer 1: Vehicle image with mouse-shift parallax ── */}
        <motion.div
          className="absolute"
          style={{
            inset: "-10%",
            x: mouseX,
            y: mouseY,
            scale: mouseScale,
          }}
        >
          <Image
            src="/vehicles-topdown.png"
            alt="Fleet vehicles bird's eye view"
            fill
            priority
            quality={88}
            sizes="200vw"
            className="object-cover object-center"
            style={{ opacity }}
          />
        </motion.div>

        {/* ── Layer 2: Deep radial vignette ── */}
        <motion.div
          style={{ opacity: vigOpacity }}
          className="absolute inset-0"
          // Darker at edges, transparent in centre — keeps the image subtle
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 0%, var(--vignette-mid) 58%, var(--vignette-color) 100%)",
            }}
          />
        </motion.div>

        {/* ── Layer 3: Scanline micro-texture ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.035) 3px,rgba(0,0,0,0.035) 4px)",
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>

      {/* ── Layer 4: Bottom-fade so hero blends into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "40%",
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
      />

      {/* ── Layer 5: Indigo edge glow at the very top (brand accent) ── */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, rgba(99,102,241,0.07) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
