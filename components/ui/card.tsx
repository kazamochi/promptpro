import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border bg-white p-4 shadow-sm ${className}`}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"
