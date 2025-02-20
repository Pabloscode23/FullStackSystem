import { useTranslation } from 'react-i18next';
import { PokemonListContainer } from '@/components/pokemon/PokemonListContainer';
import { FloatingTeamPreview } from '@/components/team/FloatingTeamPreview';

export function PokemonPage() {
    const { t } = useTranslation();

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

            <FloatingTeamPreview />
        </div>
    );
} 