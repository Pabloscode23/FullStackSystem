import { useTeam } from '@/context/team/TeamContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * FloatingEditTeamPreview Component
 * 
 * A floating UI element that displays the team currently being edited.
 * Provides both desktop and mobile views with different layouts.
 * 
 * Features:
 * - Responsive design (desktop/mobile)
 * - Team name display
 * - Pokemon grid with empty slots
 * - Mobile drawer with slide animation
 * - Team size counter
 */
export function FloatingEditTeamPreview() {
    const { t } = useTranslation();
    const { mode, editingTeam, teamState } = useTeam();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Only show when in editing mode and have a team
    if (mode !== 'editing' || !editingTeam) {
        return null;
    }

    // Filter out null slots for valid Pokemon display
    const currentPokemon = teamState.filter((p): p is NonNullable<typeof p> => p !== null);

    return (
        <>
            {/* Desktop version */}
            <div className="fixed right-4 bottom-4 w-64 
                hidden md:block 
                bg-card border border-accent/20 rounded-lg shadow-lg
                transform translate-y-[-80px]
                overflow-hidden"
            >
                <div className="p-4 flex flex-col h-full">
                    {/* Team name and count header */}
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-sm truncate flex-1 pr-2">
                            {t('team.editing.name', { name: editingTeam.name })}
                        </h3>
                        <span className="text-sm text-muted-foreground flex-shrink-0">
                            ({currentPokemon.length}/6)
                        </span>
                    </div>

                    {/* Pokemon grid with empty slots */}
                    <div className="grid grid-cols-3 gap-1.5">
                        {currentPokemon.map((pokemon, index) => (
                            <div key={`pokemon-${pokemon.id}-${index}`}
                                className="relative aspect-square bg-accent/5 rounded-md p-1"
                            >
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                        {/* Empty slot placeholders */}
                        {Array(6 - currentPokemon.length).fill(null).map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                className="aspect-square bg-accent/5 rounded-md
                                    border border-dashed border-accent/20"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className="md:hidden">
                {/* Mobile trigger button */}
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="fixed right-4 bottom-20 
                        bg-card/95 backdrop-blur-sm rounded-full p-2 shadow-lg
                        border border-accent/20 z-30"
                >
                    <img
                        src={currentPokemon[0]?.sprites.front_default}
                        alt="Team preview"
                        className="w-10 h-10"
                    />
                </button>

                {/* Mobile drawer with slide animation */}
                <div className={`
                    fixed inset-x-0 bottom-0 
                    bg-card/95 backdrop-blur-sm 
                    border-t border-accent/20 
                    transform transition-transform duration-300 ease-in-out
                    z-40 overflow-hidden
                    ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
                `}>
                    <div className="p-4 pb-20">
                        {/* Drawer header with team info */}
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-sm truncate flex-1 pr-2">
                                {editingTeam.name}
                            </h3>
                            <span className="text-sm text-muted-foreground flex-shrink-0 mr-4">
                                ({currentPokemon.length}/6)
                            </span>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-muted-foreground hover:text-foreground flex-shrink-0"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pokemon grid in drawer */}
                        <div className="grid grid-cols-3 gap-1.5">
                            {currentPokemon.map((pokemon, index) => (
                                <div key={`pokemon-${pokemon.id}-${index}`}
                                    className="relative aspect-square bg-accent/5 rounded-md p-1"
                                >
                                    <img
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                            {/* Empty slot placeholders */}
                            {Array(6 - currentPokemon.length).fill(null).map((_, index) => (
                                <div
                                    key={`empty-${index}`}
                                    className="aspect-square bg-accent/5 rounded-md
                                        border border-dashed border-accent/20"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Backdrop overlay for mobile */}
                {isDrawerOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </div>
        </>
    );
} 