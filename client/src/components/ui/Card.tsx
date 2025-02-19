import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

// Base Card component - Container for card content
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-xl border bg-card text-card-foreground",
                "transition-all duration-200",
                "hover:shadow-lg",
                "backdrop-blur-sm",
                "dark:bg-slate-900/90 dark:border-slate-800/50",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

// Card Header - Contains title and optional description
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex flex-col space-y-1.5 p-6",
                "border-b dark:border-slate-800/50",
                className
            )}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

// Interface for CardTitle to ensure it always has content
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode; // Required to ensure heading has content for accessibility
}

// Card Title - Main heading of the card with gradient text effect
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, children, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    )
);
CardTitle.displayName = "CardTitle";

// Card Content - Main content area of the card
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "p-6 pt-4",
                "transition-all duration-200",
                className
            )}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

// Export all card components for use in other parts of the application
export { Card, CardHeader, CardTitle, CardContent }; 