import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/auth/AuthContext';
import type { Team } from '@/types/team';
import { teamService } from '@/services/teamService';
import { PageHeader } from './components/PageHeader';
import { MainContent } from './components/MainContent';

/**
 * FavoritesPage Component
 * 
 * Displays and manages user's favorite Pokemon teams.
 */
export function FavoritesPage() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFavoriteTeams();
    }, [user]);

    /**
     * Fetches user's favorite teams from the database
     */
    const fetchFavoriteTeams = async () => {
        if (!user?.uid) return;

        try {
            const userTeams = await teamService.getUserTeams(user.uid);
            const favoriteTeams = userTeams.filter(team => team.favorite);
            setTeams(favoriteTeams);
        } catch (error) {
            console.error('Error fetching favorite teams:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTeam = async (teamId: string) => {
        try {
            await teamService.deleteTeam(teamId);
            setTeams(teams.filter(team => team.id !== teamId));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    const handleToggleFavorite = async (teamId: string, favorite: boolean) => {
        try {
            await teamService.updateTeam(teamId, { favorite });
            if (!favorite) {
                setTeams(teams.filter(team => team.id !== teamId));
            }
        } catch (error) {
            console.error('Error updating team favorite:', error);
        }
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            <PageHeader
                title={t('pages.favorites.title')}
                description={t('pages.favorites.description')}
            />
            <MainContent
                isLoading={isLoading}
                teams={teams}
                onDeleteTeam={handleDeleteTeam}
                onToggleFavorite={handleToggleFavorite}
                t={t}
            />
        </div>
    );
} 