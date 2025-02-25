import { useTeam } from '@/context/team/TeamContext';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Input } from '@/components/ui/form/Input';
import { PokemonPreview } from './PokemonPreview';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * TeamNameInput Component
 * Provides inline editing for team names with validation and keyboard support
 */
function TeamNameInput({ name, onSave }: { name: string; onSave: (name: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);
    const { t } = useTranslation();
    const isDefaultName = name === t('team.defaultName');

    const handleSave = () => {
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            setValue(name);
            setIsEditing(false);
            return;
        }
        onSave(trimmedValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setValue(name);
            setIsEditing(false);
        }
    };

    const startEditing = () => {
        setValue(name);
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder={t('team.namePlaceholder')}
                className="text-sm h-8 w-full bg-accent/5 focus:bg-accent/10"
                autoFocus
            />
        );
    }

    return (
        <button
            onClick={startEditing}
            className={`
                group flex items-center justify-between
                px-3 py-1.5 rounded-lg transition-all duration-200
                ${isDefaultName
                    ? 'bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20'
                    : 'hover:bg-accent/10'
                }
                w-[180px] min-w-0
            `}
        >
            <span className={`
                font-medium truncate
                ${isDefaultName
                    ? 'text-blue-500 group-hover:text-blue-600'
                    : 'text-foreground'
                }
            `}>
                {name}
            </span>
            <PencilIcon className={`
                w-4 h-4 flex-shrink-0 ml-2
                ${isDefaultName
                    ? 'text-blue-500 animate-bounce'
                    : 'text-muted-foreground group-hover:text-foreground'
                }
            `} />
        </button>
    );
}

/**
 * TeamActions Component
 * Displays save button with loading state and success feedback
 */
function TeamActions({ onSave }: { onSave: () => Promise<void> }) {
    const { t } = useTranslation();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-2">
            <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 disabled:opacity-70"
            >
                {isSaving ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('common.saving')}</span>
                    </div>
                ) : (
                    t('common.save')
                )}
            </Button>
        </div>
    );
}

/**
 * FloatingTeamPreview Component
 * Displays a floating preview of the current team being built
 * Supports both desktop and mobile layouts
 */
export function FloatingTeamPreview() {
    const { team, teamName, updateTeamName, saveTeam, isEditing } = useTeam();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Don't show if editing
    if (isEditing) return null;

    // Filter out null slots for valid team display
    const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);

    // Don't show if no team or editing
    if (validTeam.length === 0 || isEditing) return null;

    /**
     * Handles saving the team and updates drawer state
     */
    const handleSaveTeam = async () => {
        try {
            const success = await saveTeam();
            if (success) {
                setIsDrawerOpen(false);
            }
        } catch (error) {
            console.error('Error saving team:', error);
        }
    };

    return (
        <>
            {/* Desktop version */}
            <div className="fixed right-4 bottom-4 w-64 hidden md:block bg-card border border-accent/20 rounded-lg shadow-lg p-4">
                {/* Team name and count */}
                <div className="flex justify-between items-center mb-4 gap-4">
                    <TeamNameInput name={teamName} onSave={updateTeamName} />
                    <span className="text-sm text-muted-foreground">
                        ({validTeam.length}/6)
                    </span>
                </div>

                {/* Pokemon grid with empty slots */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {validTeam.map((pokemon, index) => (
                        <PokemonPreview
                            key={pokemon.id}
                            pokemon={pokemon}
                            index={index}
                        />
                    ))}
                    {Array(6 - validTeam.length).fill(null).map((_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="aspect-square bg-accent/5 rounded-lg border-2 border-dashed border-accent/20"
                        />
                    ))}
                </div>

                {/* Save button */}
                {validTeam.length > 0 && (
                    <TeamActions onSave={handleSaveTeam} />
                )}
            </div>

            {/* Mobile version */}
            <div className="block md:hidden">
                {/* Mobile trigger button */}
                {validTeam.length > 0 && (
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="fixed right-4 bottom-20 bg-card/95 backdrop-blur-sm rounded-full p-2 shadow-lg border border-accent/20 z-30"
                    >
                        <img
                            src={validTeam[0]?.sprites.front_default}
                            alt="Team preview"
                            className="w-10 h-10"
                        />
                    </button>
                )}

                {/* Mobile drawer */}
                <div className={`
                    fixed inset-x-0 bottom-0 
                    bg-card/95 backdrop-blur-sm 
                    border-t border-accent/20 
                    p-4 pb-20 shadow-lg 
                    transform transition-transform duration-300 ease-in-out
                    z-40
                    ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
                `}>
                    <div className="flex justify-between items-center mb-4">
                        <TeamNameInput name={teamName} onSave={updateTeamName} />
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {validTeam.map((pokemon, index) => (
                            <PokemonPreview
                                key={pokemon.id}
                                pokemon={pokemon}
                                index={index}
                            />
                        ))}
                    </div>

                    <TeamActions onSave={handleSaveTeam} />
                </div>
            </div>
        </>
    );
} 