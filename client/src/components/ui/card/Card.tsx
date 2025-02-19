import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

// Extend HTMLAttributes with any specific props we might need
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    // Add any card-specific props here if needed
    variant?: 'default' | 'bordered';
}

/**
 * Main Card component that serves as a container
 * Can be composed with other Card components for flexible layouts
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({
    className,
    variant = 'default',
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded-lg border bg-card text-card-foreground shadow-sm',
            variant === 'bordered' && 'border-2',
            className
        )}
        {...props}
    />
));

Card.displayName = 'Card';

export { Card, type CardProps };