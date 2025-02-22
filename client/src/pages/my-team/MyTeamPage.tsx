import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/AuthContext';
import { teamService } from '@/services/teamService';
import type { Team } from '@/types/team';
import { PageHeader } from './components/PageHeader';
import { MainContent } from './components/MainContent';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

/**
 * MyTeamPage Component
 * 
 * Main page for displaying and managing user's Pokemon teams.
 * Features:
 * - Displays a list of user's teams
 * - Allows creating new teams
 * - Manages team favorites
 * - Handles team deletion
 * - Provides expandable team details
 */
export function MyTeamPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State management
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
    const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

    /**
     * Fetches user's teams from the database
     * Runs on component mount and when user changes
     * Sets loading state during fetch operation
     */
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

    /**
     * Handles team deletion
     * Removes team from database and updates local state
     * @param teamId - ID of the team to delete
     */
    const handleDeleteTeam = async (teamId: string) => {
        setTeamToDelete(teamId);
    };

    const confirmDelete = async () => {
        if (!teamToDelete) return;

        try {
            await teamService.deleteTeam(teamToDelete);
            setTeams(teams.filter(team => team.id !== teamToDelete));
        } catch (error) {
            console.error('Error deleting team:', error);
        } finally {
            setTeamToDelete(null);
        }
    };

    /**
     * Handles toggling team favorite status
     * Updates team in database and local state
     * @param teamId - ID of the team to update
     * @param favorite - New favorite status
     */
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

    /**
     * Handles expanding/collapsing team details
     * Toggles between expanded and collapsed state
     * @param teamId - ID of the team to toggle
     */
    const handleToggleExpand = (teamId: string) => {
        setExpandedTeamId(currentId => currentId === teamId ? null : teamId);
    };

    /**
     * Navigates to Pokemon selection page for team creation
     */
    const handleCreateTeam = () => {
        navigate('/pokemon');
    };

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* Page header with title and description */}
            <PageHeader
                title={t('pages.myTeam.title')}
                description={t('pages.myTeam.description')}
            />

            {/* Main content with team list and actions */}
            <MainContent
                isLoading={isLoading}
                teams={teams}
                expandedTeamId={expandedTeamId}
                onCreateTeam={handleCreateTeam}
                onToggleExpand={handleToggleExpand}
                onDeleteTeam={handleDeleteTeam}
                onToggleFavorite={handleToggleFavorite}
                t={t}
            />
            <ConfirmationModal
                isOpen={!!teamToDelete}
                onClose={() => setTeamToDelete(null)}
                onConfirm={confirmDelete}
                title={t('common.confirmDelete')}
                message={t('common.deleteTeamConfirmation')}
            />
        </div>
    );
} 