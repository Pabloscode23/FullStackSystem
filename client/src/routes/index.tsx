import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

// Page imports with updated names
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyTeamPage } from '@/pages/MyTeamPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ComparePage } from '@/pages/ComparePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { PokemonPage } from '@/pages/PokemonPage';

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
                    <Route path="register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />

                    {/* Protected routes */}
                    <Route path="pokemon" element={
                        <ProtectedRoute>
                            <PokemonPage />
                        </ProtectedRoute>
                    } />
                    <Route path="compare" element={
                        <ProtectedRoute>
                            <ComparePage />
                        </ProtectedRoute>
                    } />
                    <Route path="my-team" element={
                        <ProtectedRoute>
                            <MyTeamPage />
                        </ProtectedRoute>
                    } />
                    <Route path="favorites" element={
                        <ProtectedRoute>
                            <FavoritesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    {/* 404 route */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}