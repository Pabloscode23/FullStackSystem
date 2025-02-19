import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    // Add specific props for content
    padded?: boolean;
}

/**
 * Card Content component for main content area
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, padded = true, ...props }, ref) => (
        <div ref={ref} className={cn(
            padded ? 'p-6 pt-0' : 'p-0',
            className
        )} {...props} />
    )
);

CardContent.displayName = 'CardContent';

export { CardContent, type CardContentProps }; 