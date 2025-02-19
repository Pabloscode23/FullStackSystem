import { createElement } from 'react';
import { PokemonListContainer } from '../components/pokemon/PokemonListContainer';

export function PokemonPage() {
    return createElement('div', {
        className: 'container mx-auto p-4',
        children: [
            createElement('h1', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: 'Pokédex'
            }),
            createElement(PokemonListContainer)
        ]
    });
} 