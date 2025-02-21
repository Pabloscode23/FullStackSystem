import { useAuth } from '@/context/AuthContext';
import { teamService } from '@/services/teamService';
import { TeamState } from '../types';
import { convertToPokemonArray } from '../utils';

/**
 * Hook for team editing functionality
 */
export const useTeamEditing = (state: TeamState, updateState: (updates: Partial<TeamState>) => void) => {
    const { user } = useAuth();

    const startEditing = async (teamId: string) => {
        if (!user) return false;

        try {
            const userTeams = await teamService.getUserTeams(user.uid);
            const team = userTeams.find(t => t.id === teamId);

            if (team) {
                const editState = {
                    teamId,
                    team,
                    mode: 'editing' as const,
                    isEditing: true
                };

                sessionStorage.setItem('teamEditState', JSON.stringify(editState));

                updateState({
                    mode: 'editing',
                    isEditing: true,
                    currentTeamId: teamId,
                    editingTeam: team,
                    teamState: convertToPokemonArray(team.pokemon)
                });

                return true;
            }
        } catch (error) {
            console.error('Error starting edit:', error);
        }
        return false;
    };

    const stopEditing = () => {
        const currentPath = window.location.pathname;
        const shouldResetCompletely = currentPath === '/' || currentPath === '/teams';

        updateState({
            mode: shouldResetCompletely ? 'idle' : 'creating',
            isEditing: false,
            currentTeamId: null,
            editingTeam: null,
            teamState: Array(6).fill(null)
        });

        sessionStorage.removeItem('teamEditState');
    };

    return {
        startEditing,
        stopEditing
    };
}; 