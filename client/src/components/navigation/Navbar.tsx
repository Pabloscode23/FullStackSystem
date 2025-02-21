import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navStyles } from '@/constants/styles';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UserGroupIcon,
    HeartIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/auth/AuthContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    // Define navigation items with auth requirements
    const navigationItems = [
        {
            name: t('nav.home'),
            href: '/',
            icon: HomeIcon,
            requiresAuth: false
        },
        {
            name: t('nav.pokemon'),
            href: '/pokemon',
            icon: BookOpenIcon,
            requiresAuth: true
        },
        {
            name: t('nav.myTeam'),
            href: '/teams',
            icon: UserGroupIcon,
            requiresAuth: true
        },
        {
            name: t('nav.favorites'),
            href: '/favorites',
            icon: HeartIcon,
            requiresAuth: true
        }
    ];

    // Filter navigation items based on auth state
    const filteredNavigation = navigationItems.filter(
        item => !item.requiresAuth || !!user
    );

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className={navStyles.nav}>
            <div className={navStyles.container}>
                <div className={navStyles.header}>
                    {/* Logo */}
                    <Link to="/" className={navStyles.logoContainer}>
                        <img
                            src="/pokemonIcon.png"
                            alt={t('brand.logoAlt')}
                            className={navStyles.logoImage}
                        />
                        <span className={navStyles.logoText}>{t('brand.name')}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={navStyles.desktopNav}>
                        {filteredNavigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={navStyles.navLink}
                            >
                                <item.icon className={navStyles.navIcon} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex items-center space-x-2">
                            <LanguageSwitch />
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className={navStyles.authContainer}>
                        {user ? (
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                            >
                                {t('auth.logout')}
                            </Button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost">{t('auth.signIn')}</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>{t('auth.signUp')}</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className={navStyles.mobileMenuBtn}>
                        <button
                            type="button"
                            className={navStyles.mobileMenuTrigger}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">{t('nav.openMenu')}</span>
                            {isOpen ? (
                                <XMarkIcon className={navStyles.mobileIcon} />
                            ) : (
                                <Bars3Icon className={navStyles.mobileIcon} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className={navStyles.mobileMenu.container}>
                    {filteredNavigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={navStyles.mobileMenu.link}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className={navStyles.navIcon} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <div className="flex items-center space-x-2 px-3 py-2">
                        <LanguageSwitch />
                        <ThemeToggle />
                    </div>
                </div>
                {/* Auth Buttons - Mobile */}
                <div className={navStyles.mobileMenu.authSection}>
                    <div className={navStyles.mobileMenu.authContainer}>
                        {user ? (
                            <button
                                className={navStyles.mobileMenu.authButton}
                                onClick={handleLogout}
                            >
                                {t('auth.logout')}
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className={navStyles.mobileMenu.authLink}>
                                    {t('auth.signIn')}
                                </Link>
                                <Link to="/register" className={navStyles.mobileMenu.authLink}>
                                    {t('auth.signUp')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 