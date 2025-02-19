import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '@/types/pokemon';

// Define the state interface
interface PokemonState {
  list: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  favorites: number[]; // Array of Pokemon IDs
  currentPage: number;
  totalPages: number;
}

// Define the initial state
const initialState: PokemonState = {
  list: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  favorites: [],
  currentPage: 1,
  totalPages: 0,
};

// Create the slice
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPokemonList: (state, action: PayloadAction<Pokemon[]>) => {
      state.list = action.payload;
    },
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);
      if (index === -1) {
        state.favorites.push(pokemonId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

// Export actions
export const {
  setLoading,
  setPokemonList,
  setSelectedPokemon,
  setError,
  toggleFavorite,
  setCurrentPage,
  setTotalPages,
} = pokemonSlice.actions;

// Export reducer
export default pokemonSlice.reducer; 