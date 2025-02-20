import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { teamService } from '@/services/teamService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Team } from '@/types/team';
import { TeamCard } from '@/components/team/TeamCard';

export function MyTeamPage() {
    const { t } = useTranslation();
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            if (!user?.uid) return;

            try {
                const userTeams = await teamService.getUserTeams(user.uid);
                setTeams(userTeams);
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeams();
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
            setTeams(teams.map(team =>
                team.id === teamId ? { ...team, favorite } : team
            ));
        } catch (error) {
            console.error('Error updating team favorite:', error);
        }
    };

    const handleToggleExpand = (teamId: string) => {
        console.log('Toggling team:', teamId); // Para debug
        setExpandedTeamId(currentId => currentId === teamId ? null : teamId);
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* Hero Section with animated background */}
            <section className="relative py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            {t('pages.myTeam.title')}
                        </span>
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        {t('pages.myTeam.description')}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 space-y-8">
                <div className="flex justify-end">
                    <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        onClick={() => {/* Implementar creación */ }}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {t('team.actions.create')}
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    </div>
                ) : teams.length === 0 ? (
                    <div className="bg-card rounded-lg p-8 text-center space-y-4">
                        <h3 className="text-2xl font-semibold">{t('pages.myTeam.empty')}</h3>
                        <p className="text-muted-foreground">{t('pages.myTeam.createFirst')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                isExpanded={expandedTeamId === team.id}
                                onToggleExpand={handleToggleExpand}
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