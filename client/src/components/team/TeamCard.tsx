import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import type { Team, TeamPokemon } from '@/types/team';

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
    const typeCount = getTypeCount(team.pokemon);

    return (
        <div className="bg-card mb-9 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group/card">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {team.name}
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFavorite(team.id, !team.favorite)}
                            className={`
                                relative overflow-hidden
                                transition-all duration-300 ease-out
                                hover:scale-110 active:scale-95
                                ${team.favorite
                                    ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20'
                                    : 'text-muted-foreground hover:text-yellow-400'
                                }
                            `}
                        >
                            <div className={`
                                transform transition-all duration-300
                                ${team.favorite ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
                            `}>
                                <StarSolid className="h-5 w-5" />
                            </div>
                            <div className={`
                                absolute inset-0 flex items-center justify-center
                                transform transition-all duration-300
                                ${team.favorite ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}
                            `}>
                                <StarOutline className="h-5 w-5" />
                            </div>
                        </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {new Date(team.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Pokemon Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {team.pokemon?.map((pokemon, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square rounded-lg overflow-hidden bg-accent/5 p-2"
                        >
                            <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/40 rounded-full text-xs text-white">
                                #{pokemon.id}
                            </div>
                            <img
                                src={pokemon.sprites.other['official-artwork'].front_default}
                                alt={pokemon.name}
                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Pokemon Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                                <p className="text-white text-sm font-medium capitalize mb-1">
                                    {pokemon.name}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {pokemon.types?.map((type, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
                                        >
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 bg-accent/5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100/50"
                            onClick={() => {/* Implementar edición */ }}
                        >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            {t('common.edit')}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100/50"
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