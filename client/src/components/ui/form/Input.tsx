import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "flex h-10 w-full rounded-md border border-input px-3 py-2",
                    "bg-background text-sm text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-red-500 focus:ring-red-500/50",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}

Input.displayName = 'Input'; 