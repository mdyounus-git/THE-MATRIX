import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border-2 border-matrix-green bg-matrix-black/80 text-matrix-white shadow-lg",
      "backdrop-blur-sm",
      "shadow-[0_0_15px_rgba(0,255,65,0.3)]",
      "hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] transition-all duration-300",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-matrix-green font-mono uppercase",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-matrix-white/70", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

Save and close.

---

## ✅ **CONFIRMATION**

You've now completed:
- ✅ Utility functions (formatting, helpers)
- ✅ Toast notification hook
- ✅ Mock data for alerts
- ✅ Matrix Rain effect component
- ✅ Button component with Matrix styling
- ✅ Card component with Matrix styling

**Your structure now:**
```
src/
├── lib/
│   └── utils.ts ✅
├── hooks/
│   └── use-toast.ts ✅
├── data/
│   └── mockAlerts.ts ✅
├── components/
│   ├── effects/
│   │   └── MatrixRain.tsx ✅
│   └── ui/
│       ├── button.tsx ✅
│       └── card.tsx ✅