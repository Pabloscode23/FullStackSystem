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
    ArrowsRightLeftIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { isAuthenticated, logout } = useAuth();

    // Define navigation items with auth requirements
    const navigationItems = [
        {
            name: t('nav.home'),
            href: '/',
            icon: HomeIcon,
            requiresAuth: false
        },
        {
            name: t('nav.myTeam'),
            href: '/my-team',
            icon: UserGroupIcon,
            requiresAuth: true
        },
        {
            name: t('nav.favorites'),
            href: '/favorites',
            icon: HeartIcon,
            requiresAuth: true
        },
        {
            name: t('nav.compare'),
            href: '/compare',
            icon: ArrowsRightLeftIcon,
            requiresAuth: false
        },
        {
            name: t('nav.profile'),
            href: '/profile',
            icon: UserCircleIcon,
            requiresAuth: true
        },
    ];

    // Filter navigation items based on auth state
    const filteredNavigation = navigationItems.filter(
        item => !item.requiresAuth || isAuthenticated
    );

    const handleLogout = () => {
        logout();
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
                        {isAuthenticated ? (
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
                        {isAuthenticated ? (
                            <button
                                className={navStyles.mobileMenu.authButton}
                                onClick={handleLogout}
                            >
                                {t('auth.logout')}
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={navStyles.mobileMenu.authLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('auth.signIn')}
                                </Link>
                                <Link
                                    to="/register"
                                    className={navStyles.mobileMenu.authLink}
                                    onClick={() => setIsOpen(false)}
                                >
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