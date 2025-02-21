import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { AuthState } from '../types';

/**
 * Hook to manage authentication state
 */
export const useAuthState = () => {
    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setState({
                user,
                loading: false
            });
        });

        return unsubscribe;
    }, []);

    return {
        ...state,
        setState
    };
}; 