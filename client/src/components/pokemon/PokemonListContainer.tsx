import { type HTMLAttributes, createElement, useEffect, useState } from 'react';
import { PokemonList } from './PokemonList';
import { api } from '../../services/api';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

export function PokemonListContainer(props: HTMLAttributes<HTMLDivElement>) {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setIsLoading(true);
                const data = await api.getPokemonList(200);
                setPokemons(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (error) {
        return createElement('div', {
            className: 'text-center text-destructive p-4',
            children: error
        });
    }

    return createElement(PokemonList, {
        isLoading,
        pokemons,
        ...props
    });
} 