import axios from 'axios';

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

// Base URL for the PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

// API service object with methods to fetch Pokemon data
export const api = {
    // Get a paginated list of Pokemon
    async getPokemonList(limit = 20, offset = 0) {
        try {
            // Get initial list
            const response = await axios.get<PokemonListResponse>(
                `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
            );

            // Get details for each pokemon
            const detailedPokemon = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const detailResponse = await axios.get<Pokemon>(pokemon.url);
                    const pokemonData = detailResponse.data;
                    
                    return {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        image: pokemonData.sprites.other['official-artwork'].front_default,
                        types: pokemonData.types.map(type => type.type.name)
                    };
                })
            );

            return {
                ...response.data,
                results: detailedPokemon
            };
        } catch (error) {
            console.error('Error fetching pokemon list:', error);
            throw error;
        }
    },

    // Get detailed information about a specific Pokemon by name
    async getPokemonByName(name: string) {
        const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${name}`);
        return response.data;
    },
}; 