import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PokemonListContainer } from '@/components/pokemon/PokemonListContainer';
import { FloatingTeamPreview } from '@/components/team/FloatingTeamPreview';
import { useTeam } from '@/context/TeamContext';
import { FloatingEditTeamPreview } from '@/components/team/FloatingEditTeamPreview';
import { Button } from '@/components/ui/button';

export function PokemonPage() {
    const { t } = useTranslation();
    const { mode, startCreating, forceResetState } = useTeam();

    // Asegurar que estamos en modo creación si no estamos editando
    useEffect(() => {
        if (mode === 'idle') {
            startCreating();
        }
    }, [mode, startCreating]);

    // Botón para crear nuevo equipo
    const handleNewTeam = () => {
        forceResetState();
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* Hero Section with animated background */}
            <section className="relative py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            {t('pages.pokemon.title')}
                        </span>
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        {t('pages.pokemon.description')}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4">
                <PokemonListContainer />
            </div>

            {mode === 'editing' ? <FloatingEditTeamPreview /> : <FloatingTeamPreview />}

            {/* Agregar botón si estamos en modo edición */}
            {mode === 'editing' && (
                <div className="container mx-auto px-4 mb-4">
                    <Button
                        onClick={handleNewTeam}
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                        {t('team.actions.createNew')}
                    </Button>
                </div>
            )}
        </div>
    );
} 