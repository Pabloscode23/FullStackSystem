import { useTranslation } from 'react-i18next';
import { useTeam } from '../../context/TeamContext';
import {
    PlusCircleIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PokemonCardProps {
    pokemon: {
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
    };
    onAdd?: (pokemon: { id: number; name: string; sprites: { front_default: string; other: { 'official-artwork': { front_default: string; } } } }) => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

export function PokemonCard({ pokemon, onAdd, isFavorite, onToggleFavorite }: PokemonCardProps) {
    const { t } = useTranslation();
    const { mode, handleAddPokemon, isInTeam, isTeamFull, currentTeamId } = useTeam();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'warning'>('success');
    const isCurrentlyInTeam = isInTeam(pokemon.id);

    // Get the main stats we want to display
    const hp = pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0;
    const attack = pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
    const defense = pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0;
    const speed = pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0;

    // Get type colors
    const getTypeColor = (type: string) => {
        const colors: { [key: string]: string } = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-300',
            fighting: 'bg-red-600',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-500',
            bug: 'bg-lime-500',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-600',
            dark: 'bg-gray-800',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-400',
        };
        return colors[type] || 'bg-gray-400';
    };

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
            {/* Pokemon Image with gradient background based on type */}
            <div className="relative aspect-square overflow-hidden">
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${getTypeColor(pokemon.types[0].type.name)}`} />
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="absolute inset-0 w-full h-full object-contain p-4 
                        transition-all duration-300 group-hover:scale-110 drop-shadow-md"
                />
            </div>

            {/* Pokemon Info */}
            <div className="p-6 space-y-4">
                {/* Name and Number */}
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold capitalize bg-gradient-to-r from-foreground to-foreground/70 
                        bg-clip-text text-transparent">
                        {pokemon.name}
                    </h3>
                    <span className="text-sm font-medium text-muted-foreground/60">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>
                </div>

                {/* Types with translations */}
                <div className="flex gap-2">
                    {pokemon.types.map(({ type }) => (
                        <span
                            key={type.name}
                            className={`px-3 py-1 rounded-full text-white text-sm font-medium 
                                shadow-sm transition-transform hover:scale-105 ${getTypeColor(type.name)}`}
                        >
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </span>
                    ))}
                </div>

                {/* Stats with improved visualization */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { name: 'HP', value: hp, color: 'text-red-500', bg: 'bg-red-500' },
                        { name: 'ATK', value: attack, color: 'text-orange-500', bg: 'bg-orange-500' },
                        { name: 'DEF', value: defense, color: 'text-blue-500', bg: 'bg-blue-500' },
                        { name: 'SPD', value: speed, color: 'text-green-500', bg: 'bg-green-500' }
                    ].map((stat) => (
                        <div key={stat.name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className={`font-medium ${stat.color}`}>{stat.name}</span>
                                <span className="font-bold">{stat.value}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-accent/20 overflow-hidden">
                                <div
                                    className={`h-full ${stat.bg} transition-all duration-500 ease-out`}
                                    style={{ width: `${(stat.value / 255) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Abilities with translations */}
                <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Abilities:
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

                {/* Actions con botón centrado */}
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

            {/* Toast mejorado */}
            {showToast && (
                <div className={`
                    absolute bottom-20 left-1/2 transform -translate-x-1/2 
                    px-4 py-2 rounded-lg shadow-lg text-sm 
                    animate-fade-in-up backdrop-blur-sm
                    ${toastType === 'success' ? 'bg-green-500/90' : 'bg-yellow-500/90'}
                    text-white
                    flex items-center gap-2
                `}>
                    <div className={`w-2 h-2 rounded-full ${toastType === 'success' ? 'bg-green-300' : 'bg-yellow-300'}`} />
                    {toastMessage}
                </div>
            )}
        </div>
    );
}

// Función auxiliar para obtener el gradiente según el tipo
function getTypeGradient(type: string) {
    const gradients: { [key: string]: string } = {
        normal: 'from-gray-400/50 to-gray-500/50',
        fire: 'from-red-400/50 to-orange-500/50',
        water: 'from-blue-400/50 to-blue-600/50',
        electric: 'from-yellow-300/50 to-yellow-500/50',
        grass: 'from-green-400/50 to-green-600/50',
        ice: 'from-blue-200/50 to-blue-400/50',
        fighting: 'from-red-500/50 to-red-700/50',
        poison: 'from-purple-400/50 to-purple-600/50',
        ground: 'from-yellow-600/50 to-yellow-800/50',
        flying: 'from-indigo-300/50 to-indigo-500/50',
        psychic: 'from-pink-400/50 to-pink-600/50',
        bug: 'from-lime-400/50 to-lime-600/50',
        rock: 'from-yellow-700/50 to-yellow-900/50',
        ghost: 'from-purple-600/50 to-purple-800/50',
        dragon: 'from-indigo-500/50 to-indigo-700/50',
        dark: 'from-gray-700/50 to-gray-900/50',
        steel: 'from-gray-400/50 to-gray-600/50',
        fairy: 'from-pink-300/50 to-pink-500/50',
    };
    return gradients[type] || 'from-gray-400/50 to-gray-500/50';
} 