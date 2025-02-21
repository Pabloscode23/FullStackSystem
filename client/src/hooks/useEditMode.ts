import { useEffect } from 'react';
import { useTeam } from '@/context/TeamContext';
import { useLocation } from 'react-router-dom';

export function useEditMode() {
    const { 
        mode, 
        setMode, 
        setIsEditing, 
        setCurrentTeamId, 
        setEditingTeam, 
        updateTeamPokemon 
    } = useTeam();
    const location = useLocation();

    useEffect(() => {
        const savedEditState = sessionStorage.getItem('teamEditState');
        if (savedEditState) {
            try {
                const state = JSON.parse(savedEditState);
                console.log('useEditMode - Restoring state:', state);
                
                if (state.teamId && state.team) {
                    setMode('editing');
                    setIsEditing(true);
                    setCurrentTeamId(state.teamId);
                    setEditingTeam(state.team);
                    updateTeamPokemon(state.team.pokemon);
                }
            } catch (error) {
                console.error('Error in useEditMode:', error);
            }
        }
    }, [location.pathname, setMode, setIsEditing, setCurrentTeamId, setEditingTeam, updateTeamPokemon]);

    return mode;
} 