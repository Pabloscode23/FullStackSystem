import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PokemonListContainer } from '@/components/pokemon/PokemonListContainer';
import { FloatingTeamPreview } from '@/components/team/FloatingTeamPreview';
import { useTeam } from '@/context/team/TeamContext';
import { FloatingEditTeamPreview } from '@/components/team/FloatingEditTeamPreview';
import { Button } from '@/components/ui/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * Pokemon selection page component
 * Allows users to view and select Pokemon for their teams
 */
export function PokemonPage() {
    const { t } = useTranslation();
    const { mode, startCreating, forceResetState } = useTeam();

    /**
     * Ensure we're in creation mode if not editing
     */
    useEffect(() => {
        if (mode === 'idle') {
            startCreating();
        }
    }, [mode, startCreating]);

    /**
     * Handles creating a new team by resetting the state
     */
    const handleNewTeam = () => {
        forceResetState();
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* New Team Button - Only visible in edit mode */}
            {mode === 'editing' && (
                <NewTeamButton onClick={handleNewTeam} text={t('team.actions.createNew')} />
            )}

            {/* Page Header */}
            <PageHeader
                title={t('pages.pokemon.title')}
                description={t('pages.pokemon.description')}
            />

            {/* Pokemon List */}
            <div className="container mx-auto px-4">
                <PokemonListContainer />
            </div>

            {/* Team Preview - Changes based on mode */}
            {mode === 'editing' ? <FloatingEditTeamPreview /> : <FloatingTeamPreview />}
        </div>
    );
}

/**
 * Button component for creating a new team
 */
interface NewTeamButtonProps {
    onClick: () => void;
    text: string;
}

function NewTeamButton({ onClick, text }: NewTeamButtonProps) {
    return (
        <div className="fixed right-6 top-24 z-50">
            <Button
                onClick={onClick}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                    hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
                    text-white shadow-lg hover:shadow-xl
                    transform hover:-translate-y-0.5
                    transition-all duration-200 ease-out
                    flex items-center gap-2 px-6 py-2.5 rounded-lg"
            >
                <ArrowPathIcon className="w-5 h-5 animate-pulse" />
                <span className="font-medium">{text}</span>
            </Button>
        </div>
    );
}

/**
 * Page header component with title and description
 */
interface PageHeaderProps {
    title: string;
    description: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <section className="relative py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {title}
                    </span>
                </h1>
                <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                    {description}
                </p>
            </div>
        </section>
    );
} 