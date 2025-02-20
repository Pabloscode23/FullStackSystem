export interface TeamPokemon {
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
}

export interface Team {
    id: string;
    userId: string;
    name: string;
    pokemon: (TeamPokemon | null)[];
    createdAt: Date;
    updatedAt: Date;
} 