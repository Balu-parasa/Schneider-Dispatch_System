"use client"

import { motion } from "framer-motion"
import { Check, Star, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for occasional home service needs.",
    features: [
      "Standard service booking",
      "Normal response time (within 24 hrs)",
      "Access to verified technicians",
      "Basic email support",
    ],
    buttonText: "Start for Free",
    popular: false,
    icon: Shield,
    colorClass: "text-muted-foreground",
    bgColorClass: "bg-muted/20",
  },
  {
    name: "Pro Plan",
    price: "$9.99",
    period: "/mo",
    description: "Ideal for homeowners needing reliable, faster service.",
    features: [
      "Priority service routing",
      "Speed service (2-hour response window)",
      "On-time arrival guarantee",
      "10% discount on parts & labor",
      "Priority customer support",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
    icon: Star,
    colorClass: "text-primary",
    bgColorClass: "bg-primary/10",
  },
  {
    name: "VIP Advanced",
    price: "$19.99",
    period: "/mo",
    description: "For complete peace of mind and emergency support.",
    features: [
      "Immediate VIP dispatch (under 30 mins)",
      "24/7 Emergency Service access",
      "Specialized elite technicians",
      "Free annual maintenance check",
      "Dedicated 24/7 phone support line",
    ],
    buttonText: "Get VIP Access",
    popular: false,
    icon: Zap,
    colorClass: "text-accent",
    bgColorClass: "bg-accent/10",
  },
]

export default function PricingSection() {
  const router = useRouter()
  return (
    <section className="relative py-24" id="pricing">
      {/* Background Mesh (same as other sections) */}
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4"
          >
            <Star className="h-4 w-4" />
            <span>Affordable Plans</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            Choose the Perfect Plan for Your Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground"
          >
            Whether you need occasional fixes or 24/7 VIP emergency service, we have an affordable plan tailored to your needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`glass-card relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 ${
                tier.popular
                  ? "border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.15)] md:-mt-6 md:mb-6 md:p-8"
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg mb-4 ${tier.bgColorClass} ${tier.colorClass}`}>
                  <tier.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-muted-foreground text-xs h-8">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <Check className={`h-4 w-4 shrink-0 ${tier.popular ? "text-primary" : "text-muted-foreground/50"}`} />
                    <span className="text-xs">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => router.push(`/checkout?plan=${encodeURIComponent(tier.name)}&price=${encodeURIComponent(tier.price)}`)}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                }`}
              >
                {tier.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
