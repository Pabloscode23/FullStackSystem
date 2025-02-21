import * as React from 'react';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx and tailwind-merge for handling conditional classes
 */
const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

/**
 * Props for the Button component
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * 
 * @property variant - Visual style variant ('default' | 'outline' | 'ghost')
 * @property size - Button size ('sm' | 'md' | 'lg')
 * @property loading - Loading state flag
 * @property children - Button content
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

/**
 * Button Component
 * 
 * A reusable button component with multiple variants and sizes.
 * 
 * Features:
 * - Multiple visual variants (default, outline, ghost)
 * - Responsive sizes (sm, md, lg)
 * - Loading state with spinner
 * - Focus and hover states
 * - Gradient background option
 * - Disabled state handling
 * 
 * @example
 * ```tsx
 * <Button variant="outline" size="lg" loading={isLoading}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
    className,
    variant = 'default',
    size = 'md',
    loading = false,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                // Base styles
                "inline-flex items-center justify-center rounded-md text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "transition-all duration-200",

                // Variant styles
                variant === 'default' && "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:brightness-110",
                variant === 'outline' && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                variant === 'ghost' && "hover:bg-accent hover:text-accent-foreground",

                // Size styles
                size === 'sm' && "h-9 rounded-md px-3",
                size === 'md' && "h-10 px-4 py-2",
                size === 'lg' && "h-11 rounded-md px-8",

                // State styles
                loading && 'opacity-70 cursor-not-allowed',
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⚪</span>
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}

// Component display name for React DevTools
Button.displayName = 'Button'; 