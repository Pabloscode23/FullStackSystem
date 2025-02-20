// Define the main Pokemon interface with all its properties
export interface Pokemon {
  id: number;
  name: string;
  // Sprites contains different image versions of the Pokemon
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  // Types array defines Pokemon types (e.g., fire, water)
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  // Stats array contains base stats like HP, attack, defense
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}

// Interface for the paginated response from the PokeAPI
export interface PokemonListResponse {
  count: number;          // Total number of Pokemon
  next: string | null;    // URL for the next page
  previous: string | null; // URL for the previous page
  results: {              // Array of basic Pokemon info
    name: string;
    url: string;
  }[];
} 