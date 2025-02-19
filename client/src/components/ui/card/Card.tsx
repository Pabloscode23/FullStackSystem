import { type HTMLAttributes, type ForwardedRef, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

// Extend HTMLAttributes with any specific props we might need
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    // Add any card-specific props here if needed
    variant?: 'default' | 'bordered';
}

/**
 * Main Card component that serves as a container
 * Can be composed with other Card components for flexible layouts
 */
const Card = forwardRef<
    HTMLDivElement,
    CardProps
>(({ className, variant = 'default', ...props }, ref: ForwardedRef<HTMLDivElement>) =>
    createElement('div', {
        ref,
        className: clsx(
            'rounded-lg border bg-card text-card-foreground shadow-sm',
            variant === 'bordered' && 'border-2',
            className
        ),
        ...props
    })
);

Card.displayName = 'Card';

export { Card, type CardProps };