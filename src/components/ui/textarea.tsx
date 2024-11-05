import * as React from "react"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
