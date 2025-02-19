import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { layoutStyles, cardStyles } from '@/constants/styles';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import {
    BookOpenIcon,
    UserGroupIcon,
    HeartIcon,
    UsersIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export function HomePage() {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();

    const features = [
        {
            title: 'pages.home.features.pokedex',
            description: 'pages.home.features.pokedexDescription',
            gradient: 'from-blue-500 to-cyan-500',
            icon: BookOpenIcon,
            href: '/pokemon'
        },
        {
            title: 'pages.home.features.team',
            description: 'pages.home.features.teamDescription',
            gradient: 'from-purple-500 to-pink-500',
            icon: UserGroupIcon,
            href: '/my-team'
        },
        {
            title: 'pages.home.features.teams',
            description: 'pages.home.features.teamsDescription',
            gradient: 'from-amber-500 to-orange-500',
            icon: HeartIcon,
            href: '/teams'
        }
    ];

    const stats = [
        {
            number: '200',
            label: t('pages.home.stats.pokemon'),
            icon: BookOpenIcon,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            number: t('pages.home.stats.trainersCount'),
            label: t('pages.home.stats.trainers'),
            icon: UsersIcon,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            number: t('pages.home.stats.teamsCount'),
            label: t('pages.home.stats.teams'),
            icon: SparklesIcon,
            gradient: 'from-amber-500 to-orange-500'
        }
    ];

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section with animated background */}
            <section className="relative text-center space-y-6 py-24 overflow-hidden px-4">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {t('pages.home.welcome')}
                    </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('pages.home.description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mx-auto">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register" className="w-full sm:w-auto min-w-[160px]">
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                                >
                                    {t('pages.home.cta.start')}
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto min-w-[160px]">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full hover:bg-accent/10 transition-all duration-300"
                                >
                                    {t('pages.home.cta.login')}
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
            <div className="container mx-auto px-4">
                <div className={`${layoutStyles.grid} gap-8 max-w-7xl mx-auto`}>
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            to={feature.href}
                            className={`
                                group
                                ${cardStyles.base}
                                backdrop-blur-sm
                                bg-accent/10
                                border border-accent/20
                                hover:border-accent/40
                                transition-all
                                duration-300
                                hover:shadow-lg
                                hover:-translate-y-1
                                flex flex-col
                            `}
                        >
                            <div className={`${cardStyles.header} bg-gradient-to-r ${feature.gradient}`}>
                                <h3 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
                                    <feature.icon className="w-6 h-6" />
                                    {t(feature.title)}
                                </h3>
                            </div>
                            <div className={`${cardStyles.content} bg-card/50 flex-1 text-center`}>
                                <p className="text-muted-foreground">
                                    {t(feature.description)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, var(--${stat.gradient.split('-')[2]}-500), var(--${stat.gradient.split('-')[4]}-500))`
                                    }}
                                />
                                <div className="relative p-8 rounded-xl border border-accent/10 backdrop-blur-sm bg-card/50 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg text-center">
                                    <stat.icon className="w-8 h-8 mb-4 text-muted-foreground/60 mx-auto" />
                                    <h4 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                                        {stat.number}
                                    </h4>
                                    <p className="mt-2 text-muted-foreground">
                                        {stat.label}
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, var(--${stat.gradient.split('-')[2]}-500), var(--${stat.gradient.split('-')[4]}-500))`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
} 