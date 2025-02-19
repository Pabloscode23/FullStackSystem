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

export function AppRouter() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon" element={<PokemonPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/my-team" element={<MyTeamPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}