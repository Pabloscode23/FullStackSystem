import { useState, useEffect } from 'react';
import { Theme } from './types';

/**
 * Hook to manage theme state and system preferences
 */
export const useThemeState = () => {
    // Get initial theme from localStorage or system preference
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            return savedTheme || (prefersDark ? 'dark' : 'light');
        }
        return 'dark';
    });

    // Update document classes and localStorage when theme changes
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
}; 