import { useTranslation } from 'react-i18next';
import { layoutStyles, cardStyles } from '@/constants/styles';

export function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-16">
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {t('pages.home.welcome')}
                    </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('pages.home.description')}
                </p>
            </section>

            {/* Features Grid */}
            <div className={`${layoutStyles.grid} gap-8`}>
                {[
                    {
                        title: 'pages.home.features.team',
                        description: 'pages.home.features.teamDescription',
                        gradient: 'from-blue-500 to-cyan-500'
                    },
                    {
                        title: 'pages.home.features.compare',
                        description: 'pages.home.features.compareDescription',
                        gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                        title: 'pages.home.features.favorites',
                        description: 'pages.home.features.favoritesDescription',
                        gradient: 'from-amber-500 to-orange-500'
                    }
                ].map((feature, index) => (
                    <div
                        key={index}
                        className={`
                            ${cardStyles.base}
                            backdrop-blur-sm
                            bg-accent/10
                            border border-accent/20
                            hover:border-accent/40
                            transition-all
                            duration-300
                        `}
                    >
                        <div className={`${cardStyles.header} bg-gradient-to-r ${feature.gradient}`}>
                            <h3 className="text-xl font-semibold text-white">
                                {t(feature.title)}
                            </h3>
                        </div>
                        <div className={`${cardStyles.content} bg-card/50`}>
                            <p className="text-muted-foreground">
                                {t(feature.description)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Section */}
            <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    { number: '150+', label: 'Pokémon Available' },
                    { number: '1000+', label: 'Active Trainers' },
                    { number: '5000+', label: 'Teams Created' }
                ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                        <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {stat.number}
                        </h4>
                        <p className="text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </section>
        </div>
    );
} 