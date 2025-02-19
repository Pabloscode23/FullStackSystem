import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type = 'text', ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="text-sm font-medium text-foreground/70 block">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2",
                            "text-sm ring-offset-background",
                            "placeholder:text-muted-foreground/60",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "transition-colors duration-200",
                            "backdrop-blur-sm",
                            error && "border-destructive focus-visible:ring-destructive/50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-destructive mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input'; 