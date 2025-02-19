const BASE_URL = 'https://pokeapi.co/api/v2';
const MAX_POKEMON = 200; // Total number of Pokemon to fetch

// Basic Pokemon data from list endpoint
export interface PokemonBasic {
    name: string;
    url: string;
}

// Complete Pokemon data structure
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

export const pokemonService = {
    // Get paginated list of Pokemon
    getList: async (limit: number = 20, offset: number = 0): Promise<{ results: PokemonBasic[], count: number }> => {
        try {
            // Ensure we don't fetch beyond our maximum
            const adjustedLimit = Math.min(limit, MAX_POKEMON - offset);
            const response = await fetch(`${BASE_URL}/pokemon?limit=${adjustedLimit}&offset=${offset}`);
            if (!response.ok) throw new Error('Failed to fetch pokemon list');
            const data = await response.json();
            
            // Limit the total count to MAX_POKEMON
            return {
                results: data.results,
                count: Math.min(data.count, MAX_POKEMON)
            };
        } catch (error) {
            console.error('Error fetching pokemon list:', error);
            throw error;
        }
    },

    // Get detailed information for a single Pokemon
    getDetails: async (idOrName: string | number): Promise<Pokemon> => {
        try {
            const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
            if (!response.ok) throw new Error(`Failed to fetch pokemon ${idOrName}`);
            return response.json();
        } catch (error) {
            console.error(`Error fetching pokemon ${idOrName}:`, error);
            throw error;
        }
    },

    // Get multiple Pokemon details in batches to avoid rate limiting
    getBatch: async (ids: number[], batchSize: number = 5): Promise<Pokemon[]> => {
        const results: Pokemon[] = [];
        // Process Pokemon in batches
        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);
            const batchResults = await Promise.all(
                batch.map(id => pokemonService.getDetails(id))
            );
            results.push(...batchResults);
            // Add delay between batches to prevent API rate limiting
            if (i + batchSize < ids.length) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        return results;
    }
}; 