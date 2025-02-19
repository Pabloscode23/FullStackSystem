import { type HTMLAttributes, createElement, forwardRef } from 'react';
import { clsx } from 'clsx';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant = 'default', width, height, style, ...props }, ref) =>
        createElement('div', {
            ref,
            className: clsx(
                "animate-pulse bg-muted/50",
                {
                    'rounded-md': variant === 'default',
                    'rounded-full': variant === 'circular',
                    'rounded-none': variant === 'rectangular',
                },
                className
            ),
            style: {
                width,
                height,
                ...style
            },
            ...props
        })
);

Skeleton.displayName = "Skeleton";

export { Skeleton }; 