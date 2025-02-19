import { type HTMLAttributes, type ForwardedRef, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Card Header component for containing title and description
 */
const CardHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) =>
    createElement('div', {
        ref,
        className: clsx(
            "flex flex-col space-y-1.5 p-6",
            className
        ),
        ...props
    })
);

CardHeader.displayName = "CardHeader";

export { CardHeader }; 