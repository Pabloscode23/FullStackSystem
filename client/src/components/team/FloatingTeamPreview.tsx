import { useTeam } from '@/context/TeamContext';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/form/Input';
import { PokemonPreview } from './PokemonPreview';

// Component for editable team name
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
                group flex items-center gap-9 
                px-3 py-1.5 rounded-lg transition-all duration-200
                ${isDefaultName
                    ? 'bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20'
                    : 'hover:bg-accent/10'
                }
                min-w-[200px]
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
                w-4 h-4 flex-shrink-0
                ${isDefaultName
                    ? 'text-blue-500 animate-bounce'
                    : 'text-muted-foreground group-hover:text-foreground'
                }
            `} />
        </button>
    );
}

// Component for action buttons
function TeamActions({ onView, onSave }: { onView: () => void; onSave: () => void }) {
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
                onClick={onView}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            >
                {t('pages.myTeam.viewTeam')}
            </Button>
            <Button
                onClick={handleSave}
                disabled={isSaving}
                className={`
                    w-full bg-gradient-to-r from-green-500 to-emerald-500
                    disabled:opacity-70
                `}
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

export function FloatingTeamPreview() {
    const { team, teamName, updateTeamName, saveTeam } = useTeam();
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDesktopVisible, setIsDesktopVisible] = useState(true);

    // Filter out null Pokemon and verify if there are any
    const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);

    // Mostrar el componente cuando se agregue un Pokémon
    useEffect(() => {
        if (validTeam.length > 0) {
            setIsDesktopVisible(true);
        }
    }, [validTeam.length]);

    if (validTeam.length === 0) return null;

    // Handle navigation to team page
    const handleViewTeam = () => {
        setIsDrawerOpen(false);
        navigate('/my-team');
    };

    const handleSaveTeam = async () => {
        try {
            const success = await saveTeam();
            if (success) {
                setIsDrawerOpen(false);
                setIsDesktopVisible(false);
            }
        } catch (error) {
            console.error('Error saving team:', error);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <Button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`
                    fixed bottom-4 right-4 
                    md:hidden 
                    z-50 
                    bg-gradient-to-r from-blue-500 to-purple-500
                    transition-all duration-300
                    ${isDrawerOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}
                `}
                size="sm"
            >
                {teamName}
            </Button>

            {/* Mobile Drawer */}
            <div className={`
                fixed inset-x-0 bottom-0 
                bg-card/95 backdrop-blur-sm 
                border-t border-accent/20 
                p-4 shadow-lg 
                transform transition-transform duration-300 ease-in-out
                md:hidden
                z-40
                ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
            `}>
                {/* Header with team name and counter */}
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                            <TeamNameInput name={teamName} onSave={updateTeamName} />
                            <span className="text-sm font-medium text-muted-foreground px-3 py-1.5 bg-accent/10 rounded-full flex-shrink-0">
                                {validTeam.length}/6
                            </span>
                        </div>

                        <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                    </div>

                    {/* Grid de Pokémon */}
                    <div className="grid grid-cols-3 gap-2">
                        {validTeam.map((pokemon, index) => (
                            <PokemonPreview
                                key={pokemon.id}
                                pokemon={pokemon}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                <TeamActions onView={handleViewTeam} onSave={handleSaveTeam} />
            </div>

            {/* Desktop Floating Preview */}
            <div className={`
                fixed right-4 bottom-4
                hidden md:block
                bg-card/95 backdrop-blur-sm 
                border border-accent/20
                rounded-lg shadow-lg
                p-4
                max-w-xs
                w-full
                z-40
                transition-all duration-300
                ${isDesktopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
            `}>
                <div className="flex justify-between items-center mb-4 gap-4">
                    <TeamNameInput name={teamName} onSave={updateTeamName} />
                    <span className="text-sm text-muted-foreground">
                        ({validTeam.length}/6)
                    </span>
                </div>

                {/* Pokemon grid for desktop */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {validTeam.map((pokemon, index) => (
                        <PokemonPreview
                            key={pokemon.id}
                            pokemon={pokemon}
                            index={index}
                        />
                    ))}
                </div>

                <TeamActions onView={handleViewTeam} onSave={handleSaveTeam} />
            </div>
        </>
    );
} 