/**
 * TeamContext provides state management and operations for Pokemon teams
 * Handles team creation, editing, persistence and synchronization with storage
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/auth/AuthContext';
import { teamService } from '@/services/teamService';
import { useToast } from '@/components/ui/Toaster';
import type { Pokemon } from '@/types/pokemon';
import { getCountFromServer } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Team, TeamPokemon } from '@/types/team';

/**
 * Interface defining all operations and state available in the team context
 */
export interface TeamContextType {
    team: (Pokemon | null)[];
    teamName: string;
    updateTeamName: (name: string) => void;
    addToTeam: (pokemon: Pokemon) => { success: boolean; message: string };
    removeFromTeam: (index: number) => { success: boolean; message: string };
    isInTeam: (pokemonId: number) => boolean;
    isTeamFull: boolean;
    saveTeam: () => Promise<boolean>;
    resetTeam: () => void;
    getTeamsCount: () => Promise<number>;
    mode: 'creating' | 'editing' | 'idle';
    isEditing: boolean;
    currentTeamId: string | null;
    editingTeam: Team | null;
    teamState: (Pokemon | null)[];
    startEditing: (teamId: string) => Promise<boolean>;
    startCreating: () => void;
    stopEditing: () => void;
    setTeam: (pokemon: TeamPokemon[]) => void;
    updateTeamPokemon: (pokemon: TeamPokemon[]) => void;
    handleAddPokemon: (pokemon: Pokemon) => Promise<boolean>;
    setMode: (mode: 'creating' | 'editing' | 'idle') => void;
    setIsEditing: (isEditing: boolean) => void;
    setCurrentTeamId: (id: string | null) => void;
    setEditingTeam: (team: Team | null) => void;
    forceResetState: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

/**
 * Provider component that manages Pokemon team state and operations
 * Handles team creation, editing, and persistence with session storage
 */
export function TeamProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showToast } = useToast();

    // Core team state
    const [teamState, setTeamState] = useState<(Pokemon | null)[]>(Array(6).fill(null));
    const [teamName, setTeamName] = useState(t('team.defaultName'));
    const isTeamFull = teamState.every(slot => slot !== null);

    // Team editing state
    const [mode, setMode] = useState<'creating' | 'editing' | 'idle'>('idle');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);

    /**
     * Updates team name when language changes
     * Ensures default name stays in sync with current language
     */
    useEffect(() => {
        const isDefaultName = [
            t('team.defaultName', { lng: 'en' }),
            t('team.defaultName', { lng: 'es' })
        ].includes(teamName);

        if (isDefaultName) setTeamName(t('team.defaultName'));
    }, [t, teamName]);

    /**
     * Handles navigation state persistence
     * Restores editing state from session storage when routes change
     */
    useEffect(() => {
        const restoreEditState = () => {
            const savedEditState = sessionStorage.getItem('teamEditState');

            if (savedEditState && user) {
                try {
                    const state = JSON.parse(savedEditState);
                    if (state.teamId && state.team) {
                        setMode('editing');
                        setIsEditing(true);
                        setCurrentTeamId(state.teamId);
                        setEditingTeam(state.team);
                        updateTeamPokemon(state.team.pokemon);
                    }
                } catch (error) {
                    console.error('Error restoring edit state:', error);
                }
            }
        };

        const handleRouteChange = () => {
            if (!isEditing) {
                restoreEditState();
            }
        };

        window.addEventListener('popstate', handleRouteChange);
        restoreEditState();

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [user]);

    /**
     * Adds a Pokemon to the team
     * Validates team size and prevents duplicates
     */
    const addToTeam = (pokemon: Pokemon) => {
        if (isInTeam(pokemon.id)) {
            return { success: false, message: t('team.errors.alreadyInTeam') };
        }

        const emptySlot = teamState.findIndex(slot => slot === null);
        if (emptySlot === -1) {
            return { success: false, message: t('team.errors.teamFull') };
        }

        setTeamState(prev => {
            const newTeam = [...prev];
            newTeam[emptySlot] = pokemon;
            return newTeam;
        });

        return { success: true, message: t('team.success.added') };
    };

    /**
     * Removes a Pokemon from the team at the specified index
     * Handles team state cleanup if team becomes empty
     */
    const removeFromTeam = (index: number) => {
        try {
            if (index < 0 || index >= 6) {
                showToast(t('team.errors.invalidSlot'), 'error');
                return { success: false, message: t('team.errors.invalidSlot') };
            }

            const newTeam = [...teamState];
            newTeam[index] = null;
            setTeamState(newTeam);

            if (newTeam.every(pokemon => pokemon === null)) {
                setTeamState(Array(6).fill(null));
                setTeamName(t('team.defaultName'));
            }

            showToast(t('team.success.removed'), 'success');
            return { success: true, message: t('team.success.removed') };
        } catch (error) {
            console.error('Error removing from team:', error);
            return { success: false, message: t('team.errors.default') };
        }
    };

    /**
     * Checks if a Pokemon is already in the team
     */
    const isInTeam = (pokemonId: number) => teamState.some(pokemon => pokemon?.id === pokemonId);

    /**
     * Resets team state to initial values
     */
    const resetTeam = () => {
        setTeamState(Array(6).fill(null));
        setTeamName(t('team.defaultName'));
        setMode('creating');
    };

    /**
     * Saves current team to database
     * Validates team name and completeness before saving
     */
    const saveTeam = async () => {
        if (!user) return false;

        try {
            const isDefaultName = [
                t('team.defaultName', { lng: 'en' }),
                t('team.defaultName', { lng: 'es' })
            ].includes(teamName);

            if (!teamName.trim() || isDefaultName) {
                showToast(t('team.errors.nameRequired'), 'error');
                return false;
            }

            const validTeam = teamState.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);

            if (validTeam.length !== 6) {
                showToast(t('team.errors.incompleteTeam'), 'error');
                return false;
            }

            if (await teamService.checkTeamNameExists(user.uid, teamName)) {
                showToast(t('team.errors.nameExists'), 'error');
                return false;
            }

            const simplifiedTeam = validTeam.map(({ id, name, types, sprites }) => ({
                id,
                name,
                types,
                sprites: {
                    front_default: sprites.front_default,
                    other: {
                        'official-artwork': {
                            front_default: sprites.other['official-artwork'].front_default
                        }
                    }
                }
            }));

            await teamService.createTeam(user.uid, teamName, simplifiedTeam);
            showToast(t('team.success.saved'), 'success');
            resetTeam();
            return true;
        } catch (error) {
            console.error('Error saving team:', error);
            showToast(t('team.errors.saveFailed'), 'error');
            return false;
        }
    };

    /**
     * Gets total count of teams from database
     */
    const getTeamsCount = async () => {
        const teamsRef = collection(db, 'teams');
        const snapshot = await getCountFromServer(teamsRef);
        return snapshot.data().count;
    };

    /**
     * Starts team editing mode
     * Loads team data and updates editing state
     */
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
                setMode('editing');
                setIsEditing(true);
                setCurrentTeamId(teamId);
                setEditingTeam(team);
                updateTeamPokemon(team.pokemon);

                return true;
            }
        } catch (error) {
            console.error('Error starting edit:', error);
        }
        return false;
    };

    /**
     * Starts team creation mode if no active editing
     */
    const startCreating = () => {
        if (!editingTeam) {
            sessionStorage.removeItem('teamEditState');
            setMode('creating');
            setIsEditing(false);
            setCurrentTeamId(null);
            setEditingTeam(null);
            resetTeam();
        }
    };

    /**
     * Stops editing mode and cleans up state
     * Behavior varies based on current route
     */
    const stopEditing = () => {
        const currentPath = window.location.pathname;

        if (currentPath === '/' || currentPath === '/teams') {
            setMode('idle');
            setIsEditing(false);
            setCurrentTeamId(null);
            setEditingTeam(null);
            setTeamState(Array(6).fill(null));
            sessionStorage.removeItem('teamEditState');
            return;
        }

        if (currentPath === '/pokemon') {
            if (!isEditing || !editingTeam) {
                setMode('creating');
                setIsEditing(false);
                setCurrentTeamId(null);
                setEditingTeam(null);
                setTeamState(Array(6).fill(null));
                sessionStorage.removeItem('teamEditState');
            }
        }
    };

    /**
     * Updates Pokemon team state while maintaining positions
     */
    const updateTeamPokemon = (pokemon: TeamPokemon[]) => {
        const fullTeam = Array(6).fill(null);

        pokemon.forEach((p, i) => {
            if (p) {
                fullTeam[i] = {
                    ...p,
                    stats: [],
                    abilities: [],
                    types: p.types ? p.types.map(type => ({
                        slot: 1,
                        type: {
                            ...type.type,
                            url: ''
                        }
                    })) : []
                } as Pokemon;
            }
        });

        setTeamState(fullTeam);
    };

    /**
     * Handles adding Pokemon in both creation and editing modes
     * Updates database and local state accordingly
     */
    const handleAddPokemon = async (pokemon: Pokemon) => {
        if (mode === 'editing' && currentTeamId && editingTeam && user) {
            try {
                const currentPokemonCount = teamState.filter(p => p !== null).length;
                if (currentPokemonCount >= 6) {
                    showToast(t('team.errors.teamFull'), 'error');
                    return false;
                }

                const teamPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types,
                    sprites: pokemon.sprites
                };

                const emptySlotIndex = teamState.findIndex(p => p === null);
                const updatedPokemon = [...editingTeam.pokemon];
                updatedPokemon[emptySlotIndex] = teamPokemon;

                const updatedTeam = {
                    ...editingTeam,
                    pokemon: updatedPokemon.filter(p => p !== null)
                };

                await teamService.updateTeam(currentTeamId, updatedTeam);
                setEditingTeam(updatedTeam);
                updateTeamPokemon(updatedTeam.pokemon);

                sessionStorage.setItem('teamEditState', JSON.stringify({
                    teamId: currentTeamId,
                    team: updatedTeam,
                    mode: 'editing',
                    isEditing: true
                }));

                showToast(t('team.success.added'), 'success');
                return true;
            } catch (error) {
                console.error('Error updating team:', error);
                showToast(t('team.errors.saveFailed'), 'error');
                return false;
            }
        } else {
            const result = addToTeam(pokemon);
            showToast(result.message, result.success ? 'success' : 'error');
            return result.success;
        }
    };

    /**
     * Forces a complete reset of team state
     */
    const forceResetState = () => {
        setMode('creating');
        setIsEditing(false);
        setCurrentTeamId(null);
        setEditingTeam(null);
        setTeamState(Array(6).fill(null));
        sessionStorage.removeItem('teamEditState');
    };

    return (
        <TeamContext.Provider value={{
            team: teamState,
            teamName,
            updateTeamName: setTeamName,
            addToTeam,
            removeFromTeam,
            isInTeam,
            isTeamFull,
            saveTeam,
            resetTeam,
            getTeamsCount,
            mode,
            isEditing,
            currentTeamId,
            editingTeam,
            teamState,
            startEditing,
            startCreating,
            stopEditing,
            setTeam: updateTeamPokemon,
            updateTeamPokemon,
            handleAddPokemon,
            setMode,
            setIsEditing,
            setCurrentTeamId,
            setEditingTeam,
            forceResetState
        }}>
            {children}
        </TeamContext.Provider>
    );
}

/**
 * Custom hook to access team context
 * @throws Error if used outside TeamProvider
 */
export function useTeam() {
    const context = useContext(TeamContext);
    const { t } = useTranslation();
    if (!context) throw new Error(t('team.errors.contextError'));
    return context;
} 