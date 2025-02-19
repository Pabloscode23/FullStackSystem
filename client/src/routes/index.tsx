import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { Home } from '@/pages/Home';
import { PokemonDetail } from '@/pages/PokemonDetail';
import { MyTeam } from '@/pages/MyTeam';
import { Favorites } from '@/pages/Favorites';
import { Profile } from '@/pages/Profile';
import { Compare } from '@/pages/Compare';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { NotFound } from '@/pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'pokemon/:id', element: <PokemonDetail /> },
            {
                path: 'my-team',
                element: (
                    <ProtectedRoute>
                        <MyTeam />
                    </ProtectedRoute>
                )
            },
            {
                path: 'favorites',
                element: (
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            { path: 'compare', element: <Compare /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'reset-password', element: <ResetPassword /> },
            { path: '*', element: <NotFound /> }
        ]
    }
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
} 