import { type HTMLAttributes, type ForwardedRef, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * CardContent Component
 * 
 * A flexible content container for the Card component.
 * Provides consistent padding and spacing for card content.
 * 
 * Features:
 * - Ref forwarding support
 * - Custom className extension
 * - Consistent padding (sides and bottom)
 * - No top padding to work with CardHeader
 * 
 * @component
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>
 *     Your content here
 *   </CardContent>
 * </Card>
 * ```
 */
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