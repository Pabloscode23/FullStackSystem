import { type HTMLAttributes, createElement } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonCardSkeleton } from '../ui/skeletons/PokemonCardSkeleton';
import { clsx } from 'clsx';

/**
 * Basic Pokemon data structure
 */
interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

/**
 * Props for the PokemonList component
 * Extends HTML div attributes to allow standard div props
 */
interface PokemonListProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    pokemons?: Pokemon[];
}

/**
 * PokemonList Component
 * 
 * Renders a responsive grid of Pokemon cards with loading states.
 * Uses createElement for dynamic rendering and performance.
 * 
 * Features:
 * - Loading skeleton states
 * - Responsive grid layout
 * - Dynamic class merging
 * - Extensible div props
 * 
 * @param isLoading - Whether to show loading state
 * @param pokemons - Array of Pokemon to display
 * @param className - Additional CSS classes
 * @param props - Additional HTML div attributes
 */
export function PokemonList({ isLoading, pokemons = [], className, ...props }: PokemonListProps) {
    return createElement('div', {
        className: clsx(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
            className
        ),
        ...props,
        children: isLoading
            ? // Show loading skeletons
            Array.from({ length: 6 }).map((_, i) =>
                createElement(PokemonCardSkeleton, { key: `skeleton-${i}` })
            )
            : // Show actual Pokemon cards
            pokemons.map(pokemon =>
                createElement(PokemonCard, {
                    key: pokemon.id,
                    pokemon
                })
            )
    });
} 