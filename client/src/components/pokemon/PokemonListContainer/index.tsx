import { useState, useEffect, useCallback } from 'react';
import { pokemonService, type Pokemon } from '@/services/pokemonService';
import { useTeam } from '@/context/team/TeamContext';
import { LoadingState } from './LoadingState';
import { PokemonGrid } from './PokemonGrid';
import { Pagination } from './Pagination';
import { POKEMON_PER_PAGE, MAX_POKEMON, MAX_PAGES_TO_SHOW } from './constants';

/**
 * PokemonListContainer Component
 * 
 * Main container component that manages Pokemon data fetching and pagination.
 * Displays a responsive grid of Pokemon cards with pagination controls.
 * 
 * Features:
 * - Paginated Pokemon list
 * - Loading states
 * - Error handling
 * - Responsive grid layout
 * - Team building integration
 */
export function PokemonListContainer() {
    const { handleAddPokemon } = useTeam();
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    /**
     * Fetches Pokemon data for the current page
     * Handles pagination limits and error states
     */
    const fetchPokemon = useCallback(async () => {
        try {
            setLoading(true);
            const offset = (currentPage - 1) * POKEMON_PER_PAGE;

            if (offset >= MAX_POKEMON) {
                setPokemon([]);
                return;
            }

            const { results, count } = await pokemonService.getList(POKEMON_PER_PAGE, offset);
            setTotalPages(Math.ceil(Math.min(count, MAX_POKEMON) / POKEMON_PER_PAGE));

            const newPokemon = await pokemonService.getBatch(
                results.map((_, index) => offset + index + 1)
            );

            setPokemon(newPokemon);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    /**
     * Handles page navigation with smooth scrolling
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Calculates visible page numbers for pagination
     */
    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + MAX_PAGES_TO_SHOW - 1);
        const adjustedStart = Math.max(1, end - MAX_PAGES_TO_SHOW + 1);

        for (let i = adjustedStart; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    <PokemonGrid
                        pokemon={pokemon}
                        onAdd={handleAddPokemon}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        loading={loading}
                        onPageChange={handlePageChange}
                        pageNumbers={getPageNumbers()}
                    />
                </>
            )}
        </div>
    );
} 