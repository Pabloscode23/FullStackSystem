import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { HomePage } from '@/pages/HomePage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RootLayout } from '@/components/layout/RootLayout';
import { PokemonPage } from '@/pages/PokemonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyTeamPage } from '@/pages/MyTeamPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ComparePage } from '@/pages/ComparePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />,
            },
            {
                path: 'pokemon',
                element: (
                    <ProtectedRoute>
                        <PokemonPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'compare',
                element: (
                    <ProtectedRoute>
                        <ComparePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'my-team',
                element: (
                    <ProtectedRoute>
                        <MyTeamPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'favorites',
                element: (
                    <ProtectedRoute>
                        <FavoritesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}