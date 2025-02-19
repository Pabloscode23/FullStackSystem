import { type HTMLAttributes, createElement } from 'react';
import { clsx } from 'clsx';
import { Skeleton } from '../Skeleton';
import { Card, CardContent, CardHeader } from '../card';

export function PokemonCardSkeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return createElement(Card, {
        className: clsx('overflow-hidden', className),
        ...props,
        children: [
            createElement(CardHeader, {
                className: 'gap-2',
                children: [
                    // Pokemon image skeleton
                    createElement(Skeleton, {
                        variant: 'rectangular',
                        className: 'aspect-square w-full',
                    }),
                    // Pokemon number
                    createElement(Skeleton, {
                        className: 'h-4 w-12',
                    }),
                    // Pokemon name
                    createElement(Skeleton, {
                        className: 'h-6 w-[80%]',
                    })
                ]
            }),
            createElement(CardContent, {
                children: [
                    // Pokemon types
                    createElement('div', {
                        className: 'flex gap-2',
                        children: [
                            createElement(Skeleton, {
                                className: 'h-6 w-16',
                            }),
                            createElement(Skeleton, {
                                className: 'h-6 w-16',
                            })
                        ]
                    }),
                    // Pokemon stats
                    createElement('div', {
                        className: 'mt-4 space-y-2',
                        children: Array.from({ length: 3 }).map((_, i) =>
                            createElement(Skeleton, {
                                key: i,
                                className: 'h-4 w-full'
                            })
                        )
                    })
                ]
            })
        ]
    });
} 