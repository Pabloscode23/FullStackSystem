import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show nothing while checking authentication status
    if (loading) {
        return null;
    }

    // Redirect to login if not authenticated
    if (!user) {
        // Save the attempted url for redirecting after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
} 