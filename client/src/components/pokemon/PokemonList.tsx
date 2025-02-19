import { type HTMLAttributes, createElement } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonCardSkeleton } from '../ui/skeletons/PokemonCardSkeleton';
import { clsx } from 'clsx';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

interface PokemonListProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    pokemons?: Pokemon[];
}

export function PokemonList({ isLoading, pokemons = [], className, ...props }: PokemonListProps) {
    return createElement('div', {
        className: clsx(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
            className
        ),
        ...props,
        children: isLoading
            ? // Mostrar skeletons mientras carga
            Array.from({ length: 6 }).map((_, i) =>
                createElement(PokemonCardSkeleton, { key: `skeleton-${i}` })
            )
            : // Mostrar cards con datos reales
            pokemons.map(pokemon =>
                createElement(PokemonCard, {
                    key: pokemon.id,
                    pokemon
                })
            )
    });
} 