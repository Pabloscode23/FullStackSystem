import { User } from 'firebase/auth';

export interface AuthState {
    user: User | null;
    loading: boolean;
}

export interface AuthContextType extends AuthState {
    register: (email: string, password: string, username: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUsersCount: () => Promise<number>;
} 