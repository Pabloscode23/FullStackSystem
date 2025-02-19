import * as React from 'react';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "transition-all duration-200",
                    // Variant styles
                    variant === 'default' && "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:brightness-110",
                    variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    variant === 'outline' && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    variant === 'ghost' && "hover:bg-accent hover:text-accent-foreground",
                    // Size styles
                    size === 'default' && "h-10 px-4 py-2",
                    size === 'sm' && "h-9 rounded-md px-3",
                    size === 'lg' && "h-11 rounded-md px-8",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button'; 