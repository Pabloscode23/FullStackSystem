import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    // Add specific props for header
    compact?: boolean;
}

/**
 * Card Header component for containing title and description
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, compact, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex flex-col',
                compact ? 'space-y-1 p-4' : 'space-y-1.5 p-6',
                className
            )}
            {...props}
        />
    )
);

CardHeader.displayName = 'CardHeader';

export { CardHeader, type CardHeaderProps }; 