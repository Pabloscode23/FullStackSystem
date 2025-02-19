import * as React from 'react';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

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

Button.displayName = 'Button'; 