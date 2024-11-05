import * as React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }