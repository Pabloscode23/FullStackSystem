import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { layoutStyles } from '@/constants/styles';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/auth/AuthContext';
import { features } from '@/features/home/config/features';
import { FeatureCard } from '@/features/home/components/FeatureCard';
import { StatCard } from '@/features/home/components/StatCard';
import { useStats } from '@/features/home/hooks/useStats';

export function HomePage() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const stats = useStats();

    return (
        <div className="space-y-10 pb-12">
            {/* Hero Section */}
            <section className="relative text-center space-y-6 py-20 overflow-hidden px-4">

                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {t('pages.home.welcome')}
                    </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('pages.home.description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mx-auto">
                    {!user ? (
                        <>
                            <Link to="/login" className="w-full sm:w-auto min-w-[160px]">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full hover:bg-accent/10 transition-all duration-300"
                                >
                                    {t('pages.home.cta.login')}
                                </Button>
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto min-w-[160px]">
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                                >
                                    {t('pages.home.cta.start')}
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/pokemon" className="w-full sm:w-auto min-w-[200px]">
                            <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                            >
                                {t('pages.home.cta.explore')}
                            </Button>
                        </Link>
                    )}
                </div>
            </section>

            {/* Features Grid */}
            <div className="container mx-auto px-4 ">
                <div className={`${layoutStyles.grid} gap-8 max-w-7xl mx-auto`}>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {stats.map((stat, index) => (
                            <StatCard key={index} stat={stat} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
} 