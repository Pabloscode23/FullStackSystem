import { createContext, useContext, useState, ReactNode } from 'react';

// Define mock user data for development purposes
const MOCK_USER = {
    id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
};

// Define the shape of our authentication context
export interface AuthContextType {
    user: typeof MOCK_USER | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    register: (email: string, password: string, username: string) => Promise<void>;
}

// Create the context with null as initial value
const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
    // State to hold the current user
    const [user, setUser] = useState<typeof MOCK_USER | null>(null);

    // Mock login function - in a real app, this would call an API
    const login = (email: string, password: string) => {
        if (email === 'demo@example.com' && password === 'password') {
            setUser(MOCK_USER);
        }
    };

    // Logout function - simply clears the user state
    const logout = () => {
        setUser(null);
    };

    // Provide the auth context to children components
    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            register: async (email: string, password: string, username: string) => {
                // Implementation of register function
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 