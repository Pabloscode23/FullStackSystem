import { Button } from '@/components/ui/Button';

interface PaginationButtonProps {
    onClick: () => void;
    disabled: boolean;
    title: string;
    icon: React.ReactNode;
}

/**
 * PaginationButton Component
 * Reusable button for pagination controls
 * Provides consistent styling and accessibility
 */
export function PaginationButton({
    onClick,
    disabled,
    title,
    icon
}: PaginationButtonProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className="w-10 h-10 p-0"
            title={title}
        >
            {icon}
        </Button>
    );
} 