import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';

/**
 * Hook for authentication-related actions
 */
export const useAuthActions = () => {
    const checkUsernameExists = async (username: string): Promise<boolean> => {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const checkEmailExists = async (email: string): Promise<boolean> => {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                throw new Error('auth.errors.usernameExists');
            }

            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                throw new Error('auth.errors.emailExists');
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const userDoc = {
                username,
                email,
                createdAt: new Date(),
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
            await signOut(auth);

        } catch (error) {
            console.error('Error in registration:', error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error in login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error in logout:', error);
            throw error;
        }
    };

    const getUsersCount = async (): Promise<number> => {
        try {
            const q = query(collection(db, 'users'));
            const snapshot = await getDocs(q);
            return snapshot.size;
        } catch (error) {
            console.error('Error getting users count:', error);
            return 0;
        }
    };

    return {
        register,
        login,
        logout,
        getUsersCount
    };
}; 