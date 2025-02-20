export interface TeamPokemon {
    id: number;
    name: string;
    types: {
        type: {
            name: string;
        };
    }[];
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
    userId: string;
    name: string;
    pokemon: TeamPokemon[];
    createdAt: Date;
    updatedAt: Date;
    favorite: boolean;
} 