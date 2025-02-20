import { useInView } from '@/hooks/useInView';
import { PokemonCard } from './PokemonCard';
import type { Pokemon } from '@/services/pokemonService';

interface AnimatedPokemonCardProps {
    pokemon: Pokemon;
    index: number;
}

export function AnimatedPokemonCard({ pokemon, index }: AnimatedPokemonCardProps) {
    const { ref, isInView } = useInView({
        threshold: 0.1,
        rootMargin: '50px'
    });

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`
                transform
                transition-all
                duration-700
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
            `}
        >
            <PokemonCard pokemon={pokemon} />
        </div>
    );
} 