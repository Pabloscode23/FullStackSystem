import { type Pokemon } from './types';
import { getTypeColor } from './utils';

interface PokemonInfoProps {
    pokemon: Pokemon;
}

/**
 * PokemonInfo Component
 * Shows Pokemon name, number and types
 */
export function PokemonInfo({ pokemon }: PokemonInfoProps) {
    return (
        <>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold capitalize bg-gradient-to-r from-foreground to-foreground/70 
                    bg-clip-text text-transparent">
                    {pokemon.name}
                </h3>
                <span className="text-sm font-medium text-muted-foreground/60">
                    #{String(pokemon.id).padStart(3, '0')}
                </span>
            </div>

            <div className="flex gap-2">
                {pokemon.types.map(({ type }) => (
                    <span
                        key={type.name}
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium 
                            shadow-sm transition-transform hover:scale-105 ${getTypeColor(type.name)}`}
                    >
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </span>
                ))}
            </div>
        </>
    );
} 