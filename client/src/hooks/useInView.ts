import { useEffect, useRef, useState } from 'react';

type IntersectionOptions = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export function useInView(options?: IntersectionOptions) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, {
            threshold: 0.1,
            ...options
        });

        const element = ref.current;
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return { ref, isInView };
} 