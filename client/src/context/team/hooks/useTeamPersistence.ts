import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toaster';
import { useTranslation } from 'react-i18next';
import { teamService } from '@/services/teamService';
import { TeamState } from '../types';
import { simplifyPokemon } from '../utils';

/**
 * Hook for team persistence operations
 */
export const useTeamPersistence = (state: TeamState, resetTeam: () => void) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const { t } = useTranslation();

    const saveTeam = async () => {
        if (!user) return false;

        try {
            const isDefaultName = [
                t('team.defaultName', { lng: 'en' }),
                t('team.defaultName', { lng: 'es' })
            ].includes(state.teamName);

            if (!state.teamName.trim() || isDefaultName) {
                showToast(t('team.errors.nameRequired'), 'error');
                return false;
            }

            const validTeam = state.teamState.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);

            if (validTeam.length !== 6) {
                showToast(t('team.errors.incompleteTeam'), 'error');
                return false;
            }

            if (await teamService.checkTeamNameExists(user.uid, state.teamName)) {
                showToast(t('team.errors.nameExists'), 'error');
                return false;
            }

            const simplifiedTeam = validTeam.map(simplifyPokemon);

            await teamService.createTeam(user.uid, state.teamName, simplifiedTeam);
            showToast(t('team.success.saved'), 'success');
            resetTeam();
            return true;
        } catch (error) {
            console.error('Error saving team:', error);
            showToast(t('team.errors.saveFailed'), 'error');
            return false;
        }
    };

    return { saveTeam };
}; 