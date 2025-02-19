import { useTeam } from '@/context/TeamContext';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Componente para mostrar un Pokémon individual
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

// Componente para el botón de "Ver equipo"
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

export function FloatingTeamPreview() {
    const { team } = useTeam();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Filtramos los pokémon null y verificamos si hay alguno
    const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);
    if (validTeam.length === 0) return null;

    const handleViewTeam = () => {
        setIsOpen(false);
        navigate('/my-team');
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 md:hidden z-50 bg-gradient-to-r from-blue-500 to-purple-500"
                size="sm"
            >
                {t('team.currentTeam')} ({validTeam.length})
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
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">
                        {t('team.currentTeam')} ({validTeam.length}/6)
                    </h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {validTeam.map((pokemon) => (
                        <div key={pokemon.id} className="flex-shrink-0 w-16 h-16">
                            <PokemonPreview pokemon={pokemon} />
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <ViewTeamButton onClick={handleViewTeam} />
                </div>
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
                <h3 className="font-semibold mb-4">
                    {t('team.currentTeam')} ({validTeam.length}/6)
                </h3>

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