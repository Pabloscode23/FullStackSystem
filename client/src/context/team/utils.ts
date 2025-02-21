import { TeamPokemon } from '@/types/team';
import { Pokemon } from '@/types/pokemon';

/**
 * Converts TeamPokemon array to full Pokemon array with empty stats/abilities
 */
export const convertToPokemonArray = (pokemon: TeamPokemon[]): (Pokemon | null)[] => {
    const fullTeam = Array(6).fill(null);

    pokemon.forEach((p, i) => {
        if (p) {
            fullTeam[i] = {
                ...p,
                stats: [],
                abilities: [],
                types: p.types ? p.types.map(type => ({
                    slot: 1,
                    type: {
                        ...type.type,
                        url: ''
                    }
                })) : []
            } as Pokemon;
        }
    });

    return fullTeam;
};

/**
 * Simplifies Pokemon object for storage
 */
export const simplifyPokemon = (pokemon: Pokemon): TeamPokemon => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    sprites: {
        front_default: pokemon.sprites.front_default,
        other: {
            'official-artwork': {
                front_default: pokemon.sprites.other['official-artwork'].front_default
            }
        }
    }
}); 