import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> { }

/**
 * Card Description component for secondary text
 */
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
);

CardDescription.displayName = 'CardDescription';

export { CardDescription, type CardDescriptionProps }; 