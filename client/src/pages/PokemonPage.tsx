import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/layout/PageContainer';
import { PokemonListContainer } from '@/components/pokemon/PokemonListContainer';
import { FloatingTeamPreview } from '@/components/team/FloatingTeamPreview';

export function PokemonPage() {
    const { t } = useTranslation();

    return (
        <PageContainer>
            {/* Hero Section with animated background */}
            <section className="relative text-center py-12 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {t('pages.pokemon.title')}
                    </span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('pages.pokemon.description')}
                </p>
            </section>

            {/* Main Content */}
            <div className="relative backdrop-blur-sm bg-card/50 border border-accent/20 rounded-lg shadow-lg">
                <PokemonListContainer />
            </div>

            {/* Floating Team Preview */}
            <FloatingTeamPreview />
        </PageContainer>
    );
} 