import { useState } from 'react';
import { TeamState, TeamMode } from './types';
import { Pokemon } from '@/types/pokemon';
import { Team } from '@/types/team';
import { useTranslation } from 'react-i18next';

export const useTeamState = () => {
    const { t } = useTranslation();
    
    const [state, setState] = useState<TeamState>({
        teamState: Array(6).fill(null),
        teamName: t('team.defaultName'),
        mode: 'idle',
        isEditing: false,
        currentTeamId: null,
        editingTeam: null
    });

    const updateState = (updates: Partial<TeamState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    return {
        ...state,
        updateState
    };
}; 