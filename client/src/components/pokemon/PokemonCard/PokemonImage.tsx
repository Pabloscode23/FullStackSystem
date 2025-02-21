import { type Pokemon } from './types';
import { getTypeColor } from './utils';

interface PokemonImageProps {
    pokemon: Pokemon;
}

/**
 * PokemonImage Component
 * Displays Pokemon artwork with type-based gradient background
 */
export function PokemonImage({ pokemon }: PokemonImageProps) {
    return (
        <div className="relative aspect-square overflow-hidden">
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${getTypeColor(pokemon.types[0].type.name)}`} />
            <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="absolute inset-0 w-full h-full object-contain p-4 
                    transition-all duration-300 group-hover:scale-110 drop-shadow-md"
            />
        </div>
    );
} 