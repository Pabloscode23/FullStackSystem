import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '@/types/pokemon';

// Base URL for the PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

// API service object with methods to fetch Pokemon data
export const api = {
  // Get a paginated list of Pokemon
  async getPokemonList(limit = 20, offset = 0) {
    const response = await axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get detailed information about a specific Pokemon by name
  async getPokemonByName(name: string) {
    const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  },
}; 