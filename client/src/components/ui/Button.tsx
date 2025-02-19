import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

// Define button variants and sizes as constants for better maintainability
const BUTTON_VARIANTS = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
} as const;

const BUTTON_SIZES = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
} as const;

// Define the props interface extending HTML button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof BUTTON_VARIANTS;
    size?: keyof typeof BUTTON_SIZES;
    isLoading?: boolean;
}

/**
 * Button component that follows design system guidelines
 * Supports different variants, sizes, and loading state
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    disabled,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                // Base styles
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                // Variant and size styles
                BUTTON_VARIANTS[variant],
                BUTTON_SIZES[size],
                // Loading and disabled states
                (isLoading || disabled) && 'opacity-50 cursor-not-allowed',
                className
            )}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && (
                <span className="mr-2 animate-spin">
                    {/* Loading spinner icon */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                </span>
            )}
            {children}
        </button>
    );
});

// Set display name for dev tools
Button.displayName = 'Button';

export { Button, type ButtonProps }; 