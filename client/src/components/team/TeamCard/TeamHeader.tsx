import { Button } from '@/components/ui/Button';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import type { Team } from '@/types/team';

interface TeamHeaderProps {
    name: string;
    favorite: boolean;
    onToggleFavorite: () => void;
}

export function TeamHeader({ name, favorite, onToggleFavorite }: TeamHeaderProps) {
    return (
        <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-700 to-purple-700 
                dark:from-blue-400 dark:to-purple-400">
                {name}
            </h3>
            <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFavorite}
                className={`
                    relative overflow-hidden transition-all duration-300 ease-out
                    hover:scale-110 active:scale-95
                    ${favorite
                        ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-400/20'
                        : 'text-slate-400 hover:text-yellow-600 hover:bg-yellow-50'
                    }
                `}
            >
                {favorite ? <StarSolid className="w-5 h-5" /> : <StarOutline className="w-5 h-5" />}
            </Button>
        </div>
    );
} 