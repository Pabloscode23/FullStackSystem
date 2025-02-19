import { type HTMLAttributes, type ForwardedRef, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

const CardContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) =>
    createElement('div', {
        ref,
        className: clsx(
            "p-6 pt-0",
            className
        ),
        ...props
    })
);

CardContent.displayName = "CardContent";

export { CardContent }; 