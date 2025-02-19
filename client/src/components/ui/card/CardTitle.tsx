import { type HTMLAttributes, type ForwardedRef, type ReactNode, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}

/**
 * Card Title component for main heading
 * Used within CardHeader to display the primary title
 */
const CardTitle = forwardRef<
    HTMLHeadingElement,
    CardTitleProps
>(({ className, children, ...props }, ref: ForwardedRef<HTMLHeadingElement>) =>
    createElement('h3', {
        ref,
        className: clsx(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        ),
        ...props,
        children
    })
);

CardTitle.displayName = "CardTitle";

export { CardTitle }; 