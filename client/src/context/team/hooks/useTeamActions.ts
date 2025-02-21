import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/Toaster';
import { Pokemon } from '@/types/pokemon';
import { TeamState } from '../types';

/**
 * Hook for basic team manipulation actions
 */
export const useTeamActions = (state: TeamState, updateState: (updates: Partial<TeamState>) => void) => {
    const { t } = useTranslation();
    const { showToast } = useToast();

    const addToTeam = (pokemon: Pokemon) => {
        if (isInTeam(pokemon.id)) {
            return { success: false, message: t('team.errors.alreadyInTeam') };
        }

        const emptySlot = state.teamState.findIndex(slot => slot === null);
        if (emptySlot === -1) {
            return { success: false, message: t('team.errors.teamFull') };
        }

        const newTeam = [...state.teamState];
        newTeam[emptySlot] = pokemon;
        updateState({ teamState: newTeam });

        return { success: true, message: t('team.success.added') };
    };

    const removeFromTeam = (index: number) => {
        try {
            if (index < 0 || index >= 6) {
                showToast(t('team.errors.invalidSlot'), 'error');
                return { success: false, message: t('team.errors.invalidSlot') };
            }

            const newTeam = [...state.teamState];
            newTeam[index] = null;
            updateState({ teamState: newTeam });

            if (newTeam.every(pokemon => pokemon === null)) {
                resetTeam();
            }

            showToast(t('team.success.removed'), 'success');
            return { success: true, message: t('team.success.removed') };
        } catch (error) {
            console.error('Error removing from team:', error);
            return { success: false, message: t('team.errors.default') };
        }
    };

    const isInTeam = (pokemonId: number) => 
        state.teamState.some(pokemon => pokemon?.id === pokemonId);

    const resetTeam = () => {
        updateState({
            teamState: Array(6).fill(null),
            teamName: t('team.defaultName'),
            mode: 'creating'
        });
    };

    return {
        addToTeam,
        removeFromTeam,
        isInTeam,
        resetTeam
    };
}; 