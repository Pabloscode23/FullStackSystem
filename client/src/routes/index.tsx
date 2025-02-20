import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { HomePage } from '@/pages/HomePage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RootLayout } from '@/components/layout/RootLayout';
import { PokemonPage } from '@/pages/PokemonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyTeamPage } from '@/pages/MyTeamPage';
import { FavoritesPage } from '@/pages/FavoritesPage';;
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { EditTeamPage } from '@/pages/EditTeamPage';

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
                path: 'teams',
                element: (
                    <ProtectedRoute>
                        <MyTeamPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'teams/edit/:teamId',
                element: (
                    <ProtectedRoute>
                        <EditTeamPage />
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
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}