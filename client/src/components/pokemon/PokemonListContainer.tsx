import { useState, useEffect, useCallback } from 'react';
import { pokemonService, type Pokemon } from '@/services/pokemonService';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import { AnimatedPokemonCard } from '@/components/pokemon/AnimatedPokemonCard';
import { useTeam } from '@/context/team/TeamContext';
import { useAuth } from '@/context/auth/AuthContext';
import { teamService } from '@/services/teamService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toaster';
import { useTranslation } from 'react-i18next';

// Number of Pokemon to display per page
const POKEMON_PER_PAGE = 20;
const MAX_POKEMON = 200; // Match the service constant

export function PokemonListContainer() {
    const { isEditing, currentTeamId, addToTeam, handleAddPokemon } = useTeam();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useTranslation();

    console.log('isEditing:', isEditing); // Para debug
    console.log('currentTeamId:', currentTeamId); // Para debug

    // State management for Pokemon data and UI
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch Pokemon data with pagination
    const fetchPokemon = useCallback(async () => {
        try {
            setLoading(true);
            const offset = (currentPage - 1) * POKEMON_PER_PAGE;

            // Don't fetch if we're beyond our limit
            if (offset >= MAX_POKEMON) {
                setPokemon([]);
                return;
            }

            const { results, count } = await pokemonService.getList(POKEMON_PER_PAGE, offset);

            // Calculate total pages based on API response, limited to MAX_POKEMON
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

    // Fetch Pokemon when page changes
    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    // Handle page navigation
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate which page numbers to display in pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxPagesToShow - 1);

        // Adjust start if we're near the end
        if (end - start + 1 < maxPagesToShow) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePokemonSelect = async (pokemon: Pokemon) => {
        if (isEditing && currentTeamId) {
            try {
                const userTeams = await teamService.getUserTeams(user!.uid);
                const currentTeam = userTeams.find(t => t.id === currentTeamId);

                if (currentTeam) {
                    const updatedPokemon = [...currentTeam.pokemon, pokemon];
                    await teamService.updateTeam(currentTeamId, {
                        ...currentTeam,
                        pokemon: updatedPokemon
                    });

                    toast({
                        title: t('team.success.added'),
                        variant: 'default',
                        className: 'bg-green-500 text-white'
                    });

                    navigate(`/teams/edit/${currentTeamId}`);
                }
            } catch (error) {
                console.error('Error updating team:', error);
                toast({
                    title: t('team.errors.saveFailed'),
                    variant: 'destructive'
                });
            }
        } else {
            const result = addToTeam(pokemon);
            toast({
                title: result.message,
                variant: result.success ? 'default' : 'destructive',
                className: result.success ? 'bg-green-500 text-white' : undefined
            });
        }
    };

    // Error handling
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
                <div className="flex justify-center items-center min-h-[400px]">
                    <Spinner />
                </div>
            ) : (
                <>
                    {/* Pokemon Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pokemon.map((poke) => (
                            <AnimatedPokemonCard
                                key={poke.id}
                                pokemon={poke}
                                onAdd={handleAddPokemon}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-2 pb-8">
                        {/* First Page Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1 || loading}
                            className="w-10 h-10 p-0"
                            title="First Page"
                        >
                            <ChevronDoubleLeftIcon className="w-4 h-4" />
                        </Button>

                        {/* Previous Page Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="w-10 h-10 p-0"
                            title="Previous Page"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </Button>

                        {/* Page Numbers */}
                        {getPageNumbers().map(pageNum => (
                            <Button
                                key={pageNum}
                                variant={pageNum === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                disabled={loading}
                                className={`w-10 h-10 ${pageNum === currentPage
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                    : ''
                                    }`}
                            >
                                {pageNum}
                            </Button>
                        ))}

                        {/* Next Page Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="w-10 h-10 p-0"
                            title="Next Page"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </Button>

                        {/* Last Page Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages || loading}
                            className="w-10 h-10 p-0"
                            title="Last Page"
                        >
                            <ChevronDoubleRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}