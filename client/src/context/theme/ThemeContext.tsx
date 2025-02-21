import { createContext, useContext } from 'react';
import { ThemeContextType } from './types';
import { useThemeState } from './useThemeState';

/**
 * Context for theme management
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider component for theme management
 * Handles theme state and system preferences
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const themeState = useThemeState();

    return (
        <ThemeContext.Provider value={themeState}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook to access theme context
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}; 