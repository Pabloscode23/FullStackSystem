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
        <div className="relative flex items-center p-2
            bg-accent/5 rounded-lg 
            hover:bg-accent/10 transition-all duration-200
            border border-accent/10 hover:border-accent/20
            group"
        >
            {/* Imagen del Pokémon */}
            <div className="relative w-12 h-12 flex-shrink-0">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-full object-contain
                        transform group-hover:scale-110 transition-transform duration-200"
                />
            </div>

            {/* Info del Pokémon */}
            <div className="flex flex-1 items-center ml-3">
                <div className="flex flex-col">
                    <span className="text-sm font-medium capitalize">
                        {pokemon.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>
                </div>
            </div>

            {/* Botón de eliminar */}
            <button
                onClick={() => removeFromTeam(index)}
                className="flex-shrink-0 p-1.5 rounded-full 
                    bg-red-500/90 text-white
                    transition-all duration-200
                    hover:bg-red-600 hover:scale-105"
                title="Remove from team"
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
} 