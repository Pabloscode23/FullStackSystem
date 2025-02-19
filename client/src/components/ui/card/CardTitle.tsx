import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> { }

/**
 * Card Title component for main heading
 * Used within CardHeader to display the primary title
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                'text-2xl font-semibold leading-none tracking-tight',
                className
            )}
            {...props}
        />
    )
);

CardTitle.displayName = 'CardTitle';

export { CardTitle, type CardTitleProps }; 