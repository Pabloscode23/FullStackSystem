import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PokemonCard } from './PokemonCard';
import { Spinner } from '../ui/Spinner';

interface Pokemon {
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

export function PokemonListContainer() {
    const { t } = useTranslation();
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                // First, get the list of pokemon
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await response.json();

                // Then, fetch details for each pokemon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon: { url: string }) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );

                setPokemon(pokemonDetails);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    const handleAddToTeam = (pokemon: Pokemon) => {
        // Implementation will come from context
        console.log('Adding to team:', pokemon.name);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {pokemon.map((poke) => (
                <PokemonCard
                    key={poke.id}
                    pokemon={poke}
                    onAddToTeam={handleAddToTeam}
                />
            ))}
        </div>
    );
} 