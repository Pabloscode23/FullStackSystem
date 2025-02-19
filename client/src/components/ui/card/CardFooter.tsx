import { type HTMLAttributes, type ForwardedRef, type CSSProperties, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    style?: CSSProperties;
}

/**
 * Card Footer component for actions or additional information
 */
const CardFooter = forwardRef<
    HTMLDivElement,
    CardFooterProps
>(({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) =>
    createElement('div', {
        ref,
        className: clsx(
            "flex items-center p-6 pt-0",
            className
        ),
        ...props
    })
);

CardFooter.displayName = "CardFooter";

export { CardFooter }; 