import { Spinner } from '@/components/ui/Spinner';

/**
 * LoadingState Component
 * Displays a centered spinner while content is loading
 */
export function LoadingState() {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
        </div>
    );
} 