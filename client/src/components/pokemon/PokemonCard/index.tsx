import { useTranslation } from 'react-i18next';
import { useTeam } from '@/context/team/TeamContext';
import { useNavigate } from 'react-router-dom';
import { PokemonImage } from './PokemonImage';
import { PokemonInfo } from './PokemonInfo';
import { PokemonStats } from './PokemonStats';
import { type PokemonCardProps } from './types';
import { Button } from '@/components/ui/Button';
import {
    PlusCircleIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

/**
 * PokemonCard Component
 * 
 * Displays detailed information about a Pokemon with interactive features.
 * Includes image, stats, types, abilities and team management actions.
 * 
 * Features:
 * - Responsive layout
 * - Interactive hover effects
 * - Team integration
 * - Stats visualization
 * - Type-based styling
 */
export function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: PokemonCardProps) {
    const { t } = useTranslation();
    const { mode, handleAddPokemon, isInTeam, isTeamFull, currentTeamId } = useTeam();
    const navigate = useNavigate();
    const isCurrentlyInTeam = isInTeam(pokemon.id);

    const handleClick = async () => {
        const success = await handleAddPokemon(pokemon);
        if (success && mode === 'editing' && currentTeamId) {
            navigate(`/teams/edit/${currentTeamId}`);
        }
    };

    return (
        <div className="group relative bg-card/95 backdrop-blur-sm border border-accent/20 rounded-xl 
            overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            hover:border-accent/40 bg-gradient-to-br from-background/50 to-accent/5">
            <PokemonImage pokemon={pokemon} />
            <div className="p-6 space-y-4">
                <PokemonInfo pokemon={pokemon} />
                <PokemonStats pokemon={pokemon} />

                {/* Abilities section */}
                <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        {t('pages.pokemon.labels.abilities')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {pokemon.abilities.map(({ ability }) => (
                            <span
                                key={ability.name}
                                className="px-2 py-1 bg-accent/10 rounded-md text-xs capitalize
                                    border border-accent/5 hover:border-accent/20 transition-colors"
                            >
                                {ability.name
                                    .split('-')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center gap-4 pt-2">
                    <Button
                        onClick={handleClick}
                        disabled={isCurrentlyInTeam || isTeamFull}
                        className={`
                            flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium
                            transition-all duration-200 shadow-sm hover:shadow-md
                            max-w-[200px] justify-center mx-auto
                            ${isCurrentlyInTeam
                                ? 'bg-accent/20 text-muted-foreground cursor-not-allowed'
                                : isTeamFull
                                    ? 'bg-yellow-500/80 text-white cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                            }
                        `}
                        title={
                            isCurrentlyInTeam
                                ? t('pages.pokemon.alreadyInTeam')
                                : isTeamFull
                                    ? t('team.errors.teamFull')
                                    : t('pages.pokemon.addToTeam')
                        }
                    >
                        <PlusCircleIcon className="w-4 h-4" />
                        <span>
                            {isCurrentlyInTeam
                                ? t('pages.pokemon.alreadyInTeam')
                                : isTeamFull
                                    ? t('team.errors.teamFull')
                                    : t('pages.pokemon.addToTeam')
                            }
                        </span>
                    </Button>

                    {onToggleFavorite && (
                        <button
                            onClick={onToggleFavorite}
                            className="p-2 hover:scale-110 transition-transform"
                            aria-label={isFavorite ? t('pages.pokemon.removeFromFavorites') : t('pages.pokemon.addToFavorites')}
                        >
                            {isFavorite ? (
                                <HeartSolidIcon className="w-5 h-5 text-red-500 drop-shadow-sm" />
                            ) : (
                                <HeartIcon className="w-5 h-5 hover:text-red-500 transition-colors" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 