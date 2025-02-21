import { useTeam } from '@/context/TeamContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { type Pokemon } from '@/services/pokemonService';

interface PokemonPreviewProps {
    pokemon: Pokemon;
    index: number;
}

export function PokemonPreview({ pokemon, index }: PokemonPreviewProps) {
    const { removeFromTeam } = useTeam();

    return (
        <div className="relative aspect-square rounded-lg p-1.5
            hover:bg-accent/10 transition-all duration-200
            border border-accent/10 hover:border-accent/20
            group
            bg-gray-100/80 dark:bg-accent/5"
        >
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain
                    transform group-hover:scale-110 transition-transform duration-200"
            />

            <button
                onClick={() => removeFromTeam(index)}
                className="absolute top-1 right-1 p-1 rounded-full 
                    bg-red-500/90 text-white
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    hover:bg-red-600"
                title="Remove from team"
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
} 