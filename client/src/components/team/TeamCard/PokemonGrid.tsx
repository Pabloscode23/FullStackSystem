import { PokemonCard } from './PokemonCard';
import type { Team } from '@/types/team';

interface PokemonGridProps {
    pokemon: Team['pokemon'];
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {pokemon?.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
            ))}
        </div>
    );
} 