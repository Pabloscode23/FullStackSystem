import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Input component
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 * 
 * Extends the native input props with optional className
 * for custom styling support
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

/**
 * Input Component
 * 
 * A reusable form input component with consistent styling.
 * 
 * Features:
 * - Customizable through className prop
 * - Proper focus and hover states
 * - File input support
 * - Disabled state handling
 * - Placeholder styling
 * - Ring focus effect
 * 
 * @component
 * @example
 * ```tsx
 * <Input 
 *   type="text"
 *   placeholder="Enter your name"
 *   className="max-w-sm"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // Base styles
                    "flex h-10 w-full rounded-md border border-input",
                    "bg-background px-3 py-2 text-sm",
                    "ring-offset-background",

                    // File input styles
                    "file:border-0 file:bg-transparent",
                    "file:text-sm file:font-medium",

                    // Placeholder and focus styles
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2",

                    // Disabled state
                    "disabled:cursor-not-allowed disabled:opacity-50",

                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

// Component display name for React DevTools
Input.displayName = "Input";

export { Input }; 