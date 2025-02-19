import { type ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
    return (
        <div className={`container mx-auto px-4 py-6 ${className}`}>
            {children}
        </div>
    );
} 