import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import type { Team } from '@/types/team';
import { teamService } from '@/services/teamService';
import { TeamCard } from '@/components/team/TeamCard';

export function FavoritesPage() {
    const { t } = useTranslation();
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFavoriteTeams = async () => {
            if (!user?.uid) return;

            try {
                const userTeams = await teamService.getUserTeams(user.uid);
                // Filtrar solo los equipos favoritos
                const favoriteTeams = userTeams.filter(team => team.favorite);
                setTeams(favoriteTeams);
            } catch (error) {
                console.error('Error fetching favorite teams:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteTeams();
    }, [user]);

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
                // Si se desmarca como favorito, removerlo de la lista
                setTeams(teams.filter(team => team.id !== teamId));
            } else {
                // Actualizar el estado del equipo
                setTeams(teams.map(team =>
                    team.id === teamId ? { ...team, favorite } : team
                ));
            }
        } catch (error) {
            console.error('Error updating team favorite:', error);
        }
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* Hero Section */}
            <section className="relative py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            {t('pages.favorites.title')}
                        </span>
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        {t('pages.favorites.description')}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 space-y-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    </div>
                ) : teams.length === 0 ? (
                    <div className="bg-card rounded-lg p-8 text-center space-y-4">
                        <h3 className="text-2xl font-semibold">{t('pages.favorites.empty')}</h3>
                        <p className="text-muted-foreground">{t('pages.favorites.addSome')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                onDelete={handleDeleteTeam}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 