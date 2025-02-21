import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * Props for the CreateTeamButton component
 * @property onClick - Handler function for button click
 * @property text - Button label text
 */
interface CreateTeamButtonProps {
    onClick: () => void;
    text: string;
}

/**
 * CreateTeamButton Component
 * 
 * A styled button for creating new teams.
 * Features:
 * - Gradient background
 * - Plus icon
 * - Hover effects
 * - Right-aligned positioning
 */
export function CreateTeamButton({ onClick, text }: CreateTeamButtonProps) {
    return (
        <div className="flex justify-end">
            <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={onClick}
            >
                <PlusIcon className="h-5 w-5 mr-2" />
                {text}
            </Button>
        </div>
    );
} 