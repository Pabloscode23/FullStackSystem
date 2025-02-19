import { type ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="container max-w-md mx-auto px-4 py-16 flex-1 flex items-center justify-center">
            <div className="w-full space-y-6">
                {children}
            </div>
        </div>
    );
} 