import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import type { Team, TeamPokemon } from '@/types/team';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/context/TeamContext';

interface TeamCardProps {
    team: Team;
    onDelete: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
}

// Función auxiliar para contar tipos con manejo seguro de undefined
function getTypeCount(pokemon: TeamPokemon[] | undefined) {
    if (!pokemon) return {};

    return pokemon.reduce((acc, poke) => {
        if (!poke?.types) return acc;

        poke.types.forEach(({ type }) => {
            if (type?.name) {
                acc[type.name] = (acc[type.name] || 0) + 1;
            }
        });
        return acc;
    }, {} as Record<string, number>);
}

export function TeamCard({ team, onDelete, onToggleFavorite }: TeamCardProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { startEditing } = useTeam();

    const handleEdit = async () => {
        const success = await startEditing(team.id);
        if (success) {
            navigate(`/teams/edit/${team.id}`);
        }
    };

    return (
        <div className="relative group/card overflow-hidden mb-6">
            {/* Fondo con gradiente más pronunciado */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30 
                dark:from-accent/10 dark:via-background dark:to-accent/5" />

            <div className="relative border border-accent/20 rounded-xl bg-white/80 dark:bg-slate-900/80 
                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Decorative top border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />

                <div className="p-6 space-y-6">
                    {/* Header con mejor contraste */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold bg-clip-text text-transparent 
                                bg-gradient-to-r from-blue-700 to-purple-700 
                                dark:from-blue-400 dark:to-purple-400">
                                {team.name}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onToggleFavorite(team.id, !team.favorite)}
                                className={`
                                    relative overflow-hidden transition-all duration-300 ease-out
                                    hover:scale-110 active:scale-95
                                    ${team.favorite
                                        ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-400/20'
                                        : 'text-slate-400 hover:text-yellow-600 hover:bg-yellow-50'
                                    }
                                `}
                            >
                                {team.favorite ? <StarSolid className="w-5 h-5" /> : <StarOutline className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Pokemon Grid con mejor profundidad */}
                    <div className="grid grid-cols-3 gap-4">
                        {team.pokemon?.map((pokemon, index) => (
                            <div
                                key={index}
                                className="group relative aspect-square rounded-lg overflow-hidden 
                                    bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900
                                    shadow-sm hover:shadow-md transition-all duration-300
                                    border border-slate-200/50 dark:border-slate-700/50"
                            >
                                <div className="absolute top-2 left-2 z-10 px-2 py-1 
                                    bg-black/30 backdrop-blur-sm 
                                    rounded-full text-xs text-white font-medium">
                                    #{pokemon.id}
                                </div>
                                <img
                                    src={pokemon.sprites.other['official-artwork'].front_default}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 
                                        transition-transform duration-300 p-2"
                                />
                                {/* Info Overlay con mejor contraste */}
                                <div className="absolute inset-0 bg-gradient-to-t 
                                    from-slate-900/90 via-slate-900/60 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                    flex flex-col justify-end p-3">
                                    <p className="text-white text-sm font-medium capitalize mb-1">
                                        {pokemon.name}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {pokemon.types?.map((type, i) => (
                                            <span key={i} className="text-xs px-2 py-0.5 rounded-full 
                                                bg-white/30 text-white backdrop-blur-sm font-medium">
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer con mejor separación visual */}
                <div className="border-t border-slate-200 dark:border-slate-700/50 
                    p-4 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <div className="flex justify-end items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 
                                dark:text-blue-400 dark:hover:bg-blue-900/30
                                font-medium"
                            onClick={handleEdit}
                        >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            {t('common.edit')}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50
                                dark:text-red-400 dark:hover:bg-red-900/30
                                font-medium"
                            onClick={() => onDelete(team.id)}
                        >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            {t('common.delete')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 