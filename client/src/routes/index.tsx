import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { HomePage } from '@/pages/home/HomePage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RootLayout } from '@/components/layout/RootLayout';
import { PokemonPage } from '@/pages/PokemonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyTeamPage } from '@/pages/my-team/MyTeamPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { EditTeamPage } from '@/pages/EditTeamPage';

/**
 * Application router configuration using createBrowserRouter
 * Defines all available routes and their corresponding components
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />, // Root layout wrapper for all routes
        children: [
            {
                index: true, // Default route
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />, // Authentication route
            },
            {
                path: 'register',
                element: <RegisterPage />, // User registration route
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
                path: 'teams/edit/:teamId', // Dynamic route with team ID parameter
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
                path: '*', // Catch-all route for 404 errors
                element: <NotFoundPage />,
            },
        ],
    },
]);

/**
 * AppRouter component
 * Provides routing functionality to the application using RouterProvider
 * @returns RouterProvider component with configured routes
 */
export function AppRouter() {
    return <RouterProvider router={router} />;
}