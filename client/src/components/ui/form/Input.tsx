import { cn } from '@/lib/utils';

/**
 * Props for the Form Input component
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 * 
 * @property label - Optional label text for the input
 * @property error - Optional error message to display
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

/**
 * Form Input Component
 * 
 * Enhanced input component with label and error handling.
 * 
 * Features:
 * - Optional label with consistent styling
 * - Error state and message display
 * - All standard input attributes supported
 * - Custom styling through className
 * - Accessible structure
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Username"
 *   error={errors.username}
 *   placeholder="Enter username"
 * />
 * ```
 */
export function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    // Base styles
                    "flex h-10 w-full rounded-md border border-input px-3 py-2",
                    "bg-background text-sm text-foreground",

                    // Focus states
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",

                    // Disabled state
                    "disabled:cursor-not-allowed disabled:opacity-50",

                    // Error state
                    error && "border-red-500 focus:ring-red-500/50",

                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}

// Component display name for React DevTools
Input.displayName = 'Input'; 