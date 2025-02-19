import { useTeam } from '@/context/TeamContext';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { type Pokemon } from '@/services/pokemonService';
import { Input } from '@/components/ui/form/Input';

// Component to display an individual Pokemon preview
function PokemonPreview({ pokemon }: { pokemon: NonNullable<Pokemon> }) {
    return (
        <div className="aspect-square rounded-lg overflow-hidden bg-accent/10">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain"
            />
        </div>
    );
}

// Component for the "View Team" button
function ViewTeamButton({ onClick }: { onClick: () => void }) {
    const { t } = useTranslation();
    return (
        <Button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
        >
            {t('team.viewTeam')}
        </Button>
    );
}

// Component for editable team name
function TeamNameInput({ name, onSave }: { name: string; onSave: (name: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);
    const { t } = useTranslation();

    const handleSave = () => {
        onSave(value);
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

    if (isEditing) {
        return (
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder={t('pages.myTeam.namePlaceholder')}
                className="text-sm h-8 w-full"
                autoFocus
            />
        );
    }

    return (
        <div className="flex items-center gap-2 group">
            <span className="font-semibold">{name}</span>
            <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <PencilIcon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
        </div>
    );
}

export function FloatingTeamPreview() {
    const { team, teamName, updateTeamName } = useTeam();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Filter out null Pokemon and verify if there are any
    const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);
    if (validTeam.length === 0) return null;

    // Handle navigation to team page
    const handleViewTeam = () => {
        setIsOpen(false);
        navigate('/my-team');
    };

    return (
        <>
            {/* Mobile Toggle Button - Hidden when drawer is open */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-4 right-4 
                    md:hidden 
                    z-50 
                    bg-gradient-to-r from-blue-500 to-purple-500
                    transition-all duration-300
                    ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}
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
                ${isOpen ? 'translate-y-0' : 'translate-y-full'}
            `}>
                {/* Header with team name and counter */}
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex justify-between items-center">
                        <TeamNameInput name={teamName} onSave={updateTeamName} />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        ({validTeam.length}/6 Pokémon)
                    </span>
                </div>

                {/* Pokemon preview grid */}
                <div className="flex gap-2 overflow-x-auto pb-4">
                    {validTeam.map((pokemon) => (
                        <div key={pokemon.id} className="flex-shrink-0 w-16 h-16">
                            <PokemonPreview pokemon={pokemon} />
                        </div>
                    ))}
                </div>

                <ViewTeamButton onClick={handleViewTeam} />
            </div>

            {/* Desktop Floating Preview */}
            <div className="
                fixed right-4 bottom-4
                hidden md:block
                bg-card/95 backdrop-blur-sm
                border border-accent/20
                rounded-lg shadow-lg
                p-4
                max-w-xs
                w-full
                z-40
            ">
                <div className="flex justify-between items-center mb-4">
                    <TeamNameInput name={teamName} onSave={updateTeamName} />
                    <span className="text-sm text-muted-foreground">
                        ({validTeam.length}/6)
                    </span>
                </div>

                {/* Pokemon grid for desktop */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {validTeam.map((pokemon) => (
                        <PokemonPreview key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>

                <ViewTeamButton onClick={handleViewTeam} />
            </div>
        </>
    );
} 