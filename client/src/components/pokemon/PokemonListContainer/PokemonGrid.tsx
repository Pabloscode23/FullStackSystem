import { AnimatedPokemonCard } from '@/components/pokemon/AnimatedPokemonCard';
import type { Pokemon } from '@/services/pokemonService';

interface PokemonGridProps {
    pokemon: Pokemon[];
    onAdd: (p: Pokemon) => Promise<boolean>;
}

/**
 * PokemonGrid Component
 * Displays a responsive grid of Pokemon cards
 * Handles Pokemon selection for team building
 */
export function PokemonGrid({ pokemon, onAdd }: PokemonGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemon.map((poke) => (
                <AnimatedPokemonCard
                    key={poke.id}
                    pokemon={poke}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
} 