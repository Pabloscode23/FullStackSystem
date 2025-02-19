import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
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
        // No need to navigate, ProtectedRoute will handle it
    };

    return (
        <nav className="bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/pokemonIcon.png"
                            alt={t('brand.logoAlt')}
                            className="h-8 w-auto"
                        />
                        <span className="text-2xl font-bold">{t('brand.name')}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {filteredNavigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center space-x-1 text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        <LanguageSwitch />
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
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
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-background/90"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">{t('nav.openMenu')}</span>
                            {isOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {filteredNavigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center space-x-2 text-foreground/80 hover:text-foreground hover:bg-background/90 px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <LanguageSwitch />
                </div>
                {/* Auth Buttons - Mobile */}
                <div className="pt-4 pb-3 border-t border-foreground/10">
                    <div className="px-2 space-y-1">
                        {isAuthenticated ? (
                            <button
                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-background/90"
                                onClick={handleLogout}
                            >
                                {t('auth.logout')}
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-background/90"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('auth.signIn')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-background/90"
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