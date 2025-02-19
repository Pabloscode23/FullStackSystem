import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

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

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public routes */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="compare" element={<ComparePage />} />

                    {/* Protected routes */}
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