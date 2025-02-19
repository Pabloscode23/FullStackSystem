import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    // Add specific props for footer
    align?: 'start' | 'center' | 'end';
}

/**
 * Card Footer component for actions or additional information
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, align = 'start', ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex items-center p-6 pt-0',
                {
                    'justify-start': align === 'start',
                    'justify-center': align === 'center',
                    'justify-end': align === 'end',
                },
                className
            )}
            {...props}
        />
    )
);

CardFooter.displayName = 'CardFooter';

export { CardFooter, type CardFooterProps }; 