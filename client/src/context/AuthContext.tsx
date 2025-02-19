import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';

// Define the shape of our authentication context
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    register: (email: string, password: string, username: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUsersCount: () => Promise<number>;
}

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application and provides authentication functionality.
 * Manages user state, loading state, and authentication methods.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    // State to track the current user and loading status
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Effect to handle authentication state changes
    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    /**
     * Check if a username already exists in the database
     * @param username - The username to check
     * @returns Promise<boolean> - True if username exists, false otherwise
     */
    const checkUsernameExists = async (username: string): Promise<boolean> => {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    /**
     * Check if an email already exists in the database
     * @param email - The email to check
     * @returns Promise<boolean> - True if email exists, false otherwise
     */
    const checkEmailExists = async (email: string): Promise<boolean> => {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    /**
     * Register a new user with email and password
     * Creates a user document in Firestore after successful registration
     */
    const register = async (email: string, password: string, username: string) => {
        try {
            // Set loading to prevent UI flicker
            setLoading(true);

            // Check if username already exists
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                throw new Error('auth.errors.usernameExists');
            }

            // Check if email already exists
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                throw new Error('auth.errors.emailExists');
            }

            // Create authentication record but prevent onAuthStateChanged from triggering
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document in Firestore
            const userDoc = {
                username,
                email,
                createdAt: new Date(),
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

            // Sign out immediately and prevent the UI from updating until complete
            await signOut(auth);

        } catch (error) {
            console.error('Error in registration:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Log in an existing user with email and password
     * @param email - User's email
     * @param password - User's password
     */
    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error in login:', error);
            throw error;
        }
    };

    /**
     * Log out the current user
     */
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error in logout:', error);
            throw error;
        }
    };

    /**
     * Get the total count of registered users
     * @returns Promise<number> - The total number of users
     */
    const getUsersCount = async (): Promise<number> => {
        try {
            const q = query(collection(db, 'users'));
            const snapshot = await getDocs(q);
            console.log('Users count:', snapshot.size);
            console.log('Users:', snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            return snapshot.size;
        } catch (error) {
            console.error('Error getting users count:', error);
            return 0;
        }
    };

    // Create the context value object with all authentication methods
    const value = {
        user,
        loading,
        register,
        login,
        logout,
        getUsersCount,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Render children only after initial loading is complete */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to use the authentication context
 * Must be used within an AuthProvider component
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 