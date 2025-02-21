import { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './hooks/useAuthState';
import { useAuthActions } from './hooks/useAuthActions';

/**
 * Context for authentication management
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component for authentication
 * Handles user state and auth operations
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, loading } = useAuthState();
    const actions = useAuthActions();

    const value: AuthContextType = {
        user,
        loading,
        ...actions
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}; 