import { type HTMLAttributes, createElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PokemonCardProps extends HTMLAttributes<HTMLDivElement> {
    pokemon: {
        id: number;
        name: string;
        image: string;
        types: string[];
    };
}

export function PokemonCard({ pokemon, className, ...props }: PokemonCardProps) {
    return createElement(Card, {
        className,
        ...props,
        children: [
            createElement(CardHeader, {
                children: [
                    createElement('img', {
                        src: pokemon.image,
                        alt: pokemon.name,
                        className: 'w-full h-auto'
                    }),
                    createElement(CardTitle, {
                        children: `#${pokemon.id} ${pokemon.name}`
                    })
                ]
            }),
            createElement(CardContent, {
                children: [
                    createElement('div', {
                        className: 'flex gap-2',
                        children: pokemon.types.map(type =>
                            createElement('span', {
                                key: type,
                                className: 'px-2 py-1 rounded bg-primary/10',
                                children: type
                            })
                        )
                    })
                ]
            })
        ]
    });
} 