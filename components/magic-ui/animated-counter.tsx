"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  className?: string
  decimals?: number
  duration?: number
  format?: (value: number) => string
}

export default function AnimatedCounter({
  value,
  className,
  decimals = 0,
  duration = 2000,
  format = (val) => val.toLocaleString(),
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const previousValueRef = useRef(value)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const startTime = Date.now()
    const startValue = previousValueRef.current
    const endValue = value

    if (startValue === endValue) return

    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentValue = startValue + (endValue - startValue) * easeOutQuart
      
      if (node) {
        node.textContent = format(
          decimals > 0 
            ? parseFloat(currentValue.toFixed(decimals))
            : Math.floor(currentValue)
        )
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        previousValueRef.current = endValue
      }
    }

    requestAnimationFrame(step)
  }, [value, decimals, duration, format])

  return (
    <span
      ref={nodeRef}
      className={cn("tabular-nums", className)}
    >
      {format(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value))}
    </span>
  )
} 