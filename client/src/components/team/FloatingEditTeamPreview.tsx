import { useTeam } from '@/context/TeamContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function FloatingEditTeamPreview() {
    const { t } = useTranslation();
    const { mode, editingTeam, teamState } = useTeam();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    console.log('FloatingEditTeamPreview - mode:', mode);
    console.log('FloatingEditTeamPreview - editingTeam:', editingTeam);
    console.log('FloatingEditTeamPreview - teamState:', teamState);

    if (mode !== 'editing' || !editingTeam) {
        return null;
    }

    const currentPokemon = teamState.filter((p): p is NonNullable<typeof p> => p !== null);

    return (
        <>
            {/* Versión Desktop */}
            <div className="fixed right-4 bottom-4 w-64 
                hidden md:block 
                bg-card border border-accent/20 rounded-lg shadow-lg p-4
                transform translate-y-[-80px]"
            >
                <div className="flex justify-center items-center mb-4">
                    <h3 className="font-medium text-center">
                        {t('team.editing.name', { name: editingTeam.name })}
                    </h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {currentPokemon.map((pokemon, index) => (
                        <div key={index} className="relative aspect-square bg-accent/5 rounded-lg p-1">
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                    {Array(6 - currentPokemon.length).fill(null).map((_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="aspect-square bg-accent/5 rounded-lg border-2 border-dashed border-accent/20"
                        />
                    ))}
                </div>
            </div>

            {/* Versión Mobile */}
            <div className="md:hidden">
                {/* Botón para abrir drawer */}
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="fixed right-4 bottom-4 
                        bg-card/95 backdrop-blur-sm rounded-full p-2 shadow-lg
                        border border-accent/20 z-40"
                >
                    <img
                        src={editingTeam.pokemon[0]?.sprites.front_default}
                        alt="Team preview"
                        className="w-10 h-10"
                    />
                </button>

                {/* Drawer */}
                <div className={`
                    fixed inset-x-0 bottom-0 
                    bg-card/95 backdrop-blur-sm 
                    border-t border-accent/20 
                    p-4 shadow-lg 
                    transform transition-transform duration-300 ease-in-out
                    z-50
                    ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
                `}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">
                            {editingTeam.name}
                        </h3>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Pokemon Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {currentPokemon.map((pokemon, index) => (
                            <div key={index} className="relative aspect-square bg-accent/5 rounded-lg p-1">
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                        {Array(6 - currentPokemon.length).fill(null).map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                className="aspect-square bg-accent/5 rounded-lg border-2 border-dashed border-accent/20"
                            />
                        ))}
                    </div>
                </div>

                {/* Overlay para cerrar el drawer */}
                {isDrawerOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </div>
        </>
    );
} 