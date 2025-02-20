export interface TeamPokemon {
    id: number;
    name: string;
    types: Array<{
        type: {
            name: string;
        }
    }>;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
}

export interface Team {
    id: string;
    name: string;
    pokemon: TeamPokemon[];
    userId: string;
    createdAt: Date;
    favorite: boolean;
} 