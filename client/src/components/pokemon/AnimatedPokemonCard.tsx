import { useInView } from '@/hooks/useInView';
import { PokemonCard } from './PokemonCard';
import type { Pokemon } from '@/types/pokemon';

interface AnimatedPokemonCardProps {
    pokemon: Pokemon;
    onAdd?: (pokemon: Pokemon) => Promise<boolean>;
}

export function AnimatedPokemonCard({ pokemon, onAdd }: AnimatedPokemonCardProps) {
    const { ref, isInView } = useInView({
        threshold: 0.1,
        rootMargin: '50px'
    });

    return (
        <div
            ref={ref}
            className={`
                transform
                transition-all
                duration-700
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
            `}
        >
            <PokemonCard
                pokemon={pokemon}
                onAdd={onAdd}
            />
        </div>
    );
} 