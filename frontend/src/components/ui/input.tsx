import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-matrix-green bg-matrix-black px-3 py-2",
          "text-sm text-matrix-white placeholder:text-matrix-green/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-green",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "font-mono",
          "shadow-[0_0_10px_rgba(0,255,65,0.2)]",
          "focus:shadow-[0_0_20px_rgba(0,255,65,0.4)]",
          "transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

Save and close.

---

## ✅ **CONFIRMATION**

You've now completed:
- ✅ HomePage with all 4 module cards
- ✅ NotFound (404) page
- ✅ Dashboard page (basic structure)
- ✅ Badge component for severity levels
- ✅ Input component with Matrix styling

**Your structure now:**
```
src/
├── pages/
│   ├── HomePage.tsx ✅
│   ├── NotFound.tsx ✅
│   └── Dashboard.tsx ✅
├── components/
│   └── ui/
│       ├── badge.tsx ✅
│       └── input.tsx ✅