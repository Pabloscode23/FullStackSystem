import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { PokemonPage } from '@/pages/PokemonPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MyTeamPage } from '@/pages/MyTeamPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ComparePage } from '@/pages/ComparePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* Protected routes */}
                    <Route
                        path="/pokemon"
                        element={
                            <ProtectedRoute>
                                <PokemonPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/compare"
                        element={
                            <ProtectedRoute>
                                <ComparePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-team"
                        element={
                            <ProtectedRoute>
                                <MyTeamPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <ProtectedRoute>
                                <FavoritesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}