import { useTeam } from '@/context/TeamContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { type Pokemon } from '@/services/pokemonService';

interface PokemonPreviewProps {
    pokemon: NonNullable<Pokemon>;
    index: number;
}

export function PokemonPreview({ pokemon, index }: PokemonPreviewProps) {
    const { removeFromTeam } = useTeam();

    return (
        <div className="group relative aspect-square rounded-lg overflow-hidden bg-accent/10">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain"
            />
            <button
                onClick={() => removeFromTeam(index)}
                className="absolute top-1 right-1 p-1 rounded-full 
                    bg-red-500/90 text-white
                    md:opacity-0 md:group-hover:opacity-100
                    transition-opacity duration-200
                    hover:bg-red-600"
                title="Remove from team"
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
} 