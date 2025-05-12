import * as React from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full p-2 border border-gray-300 rounded resize-none ${className}`}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"
