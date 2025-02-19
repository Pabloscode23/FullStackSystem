import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

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

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent",
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

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

export { Card, CardHeader, CardTitle, CardContent }; 