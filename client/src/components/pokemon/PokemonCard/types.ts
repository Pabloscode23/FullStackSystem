/**
 * Pokemon data structure with all required properties
 */
export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: Array<{
        type: {
            name: string;
        }
    }>;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        }
    }>;
    abilities: Array<{
        ability: {
            name: string;
        }
    }>;
}

/**
 * Props for the PokemonCard component
 */
export interface PokemonCardProps {
    pokemon: Pokemon;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
} 