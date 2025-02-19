import { type HTMLAttributes, type ForwardedRef, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Card Description component for secondary text
 */
const CardDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLParagraphElement>) =>
    createElement('p', {
        ref,
        className: clsx(
            "text-sm text-muted-foreground",
            className
        ),
        ...props
    })
);

CardDescription.displayName = "CardDescription";

export { CardDescription }; 