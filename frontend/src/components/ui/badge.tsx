import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'critical' | 'high' | 'medium' | 'low' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-matrix-green text-matrix-black border-matrix-green',
    critical: 'bg-red-500/20 text-red-500 border-red-500',
    high: 'bg-orange-500/20 text-orange-500 border-orange-500',
    medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
    low: 'bg-green-500/20 text-green-500 border-green-500',
    outline: 'text-matrix-green border-matrix-green bg-transparent'
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "font-mono uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }