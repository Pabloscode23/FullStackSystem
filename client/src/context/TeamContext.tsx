import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { teamService } from '@/services/teamService';
import { useToast } from '@/components/ui/Toaster';
import type { Pokemon } from '@/types/pokemon';
import { getCountFromServer } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Team, TeamPokemon } from '@/types/team';


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
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [teamState, setTeamState] = useState<(Pokemon | null)[]>(Array(6).fill(null));
    const [teamName, setTeamName] = useState(t('team.defaultName'));
    const isTeamFull = teamState.every(slot => slot !== null);
    const [mode, setMode] = useState<'creating' | 'editing' | 'idle'>('idle');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);

    // Actualizar nombre por defecto al cambiar idioma
    useEffect(() => {
        const isDefaultName = [
            t('team.defaultName', { lng: 'en' }),
            t('team.defaultName', { lng: 'es' })
        ].includes(teamName);

        if (isDefaultName) setTeamName(t('team.defaultName'));
    }, [t, teamName]);

    // Modificar el useEffect para manejar la navegación
    useEffect(() => {
        const restoreEditState = () => {
            const savedEditState = sessionStorage.getItem('teamEditState');
            console.log('Attempting to restore state:', savedEditState);

            if (savedEditState && user) {
                try {
                    const state = JSON.parse(savedEditState);
                    if (state.teamId && state.team) {
                        console.log('Restoring edit state:', state);
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

        // Restaurar estado cuando cambia la ruta
        const handleRouteChange = () => {
            console.log('Route changed, checking state...');
            // Solo restaurar si no estamos en modo edición
            if (!isEditing) {
                restoreEditState();
            }
        };

        window.addEventListener('popstate', handleRouteChange);
        restoreEditState(); // Restaurar estado inicial

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [user]);

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

    const removeFromTeam = (index: number) => {
        if (index < 0 || index >= teamState.length) {
            return { success: false, message: t('team.errors.invalidSlot') };
        }

        if (mode === 'editing' && editingTeam) {
            // Actualizar el equipo que se está editando
            const updatedPokemon = editingTeam.pokemon.filter((_, i) => i !== index);
            const updatedTeam = {
                ...editingTeam,
                pokemon: updatedPokemon
            };

            // Actualizar todos los estados
            setEditingTeam(updatedTeam);
            updateTeamPokemon(updatedPokemon);

            // Actualizar sessionStorage con el estado más reciente
            sessionStorage.setItem('teamEditState', JSON.stringify({
                teamId: currentTeamId,
                team: updatedTeam,
                mode: 'editing',
                isEditing: true
            }));
        }

        setTeamState(prev => {
            const newTeam = [...prev];
            newTeam[index] = null;
            return newTeam;
        });

        return { success: true, message: t('team.success.removed') };
    };

    const isInTeam = (pokemonId: number) => teamState.some(pokemon => pokemon?.id === pokemonId);

    const resetTeam = () => {
        setTeamState(Array(6).fill(null));
        setTeamName(t('team.defaultName'));
    };

    const saveTeam = async () => {
        if (!user) return false;

        try {
            // Validar que tenga nombre y no sea el nombre por defecto
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

    const getTeamsCount = async () => {
        const teamsRef = collection(db, 'teams');
        const snapshot = await getCountFromServer(teamsRef);
        return snapshot.data().count;
    };

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

                // Guardar en storage primero
                sessionStorage.setItem('teamEditState', JSON.stringify(editState));

                // Luego actualizar el estado
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

    const startCreating = () => {
        setMode('creating');
        setIsEditing(false);
        setCurrentTeamId(null);
        setEditingTeam(null);
        resetTeam();
    };

    const stopEditing = () => {
        // Solo limpiar el estado si no estamos en una ruta de edición
        if (!window.location.pathname.includes('/teams/edit/') &&
            !window.location.pathname.includes('/pokemon')) {
            console.log('Stopping edit mode - not in edit route');
            setMode('idle');
            setIsEditing(false);
            setCurrentTeamId(null);
            setEditingTeam(null);
            setTeamState(Array(6).fill(null));
            sessionStorage.removeItem('teamEditState');
        } else {
            console.log('Not stopping edit mode - in edit route');
        }
    };

    const updateTeamPokemon = (pokemon: TeamPokemon[]) => {
        const fullTeam = Array(6).fill(null);
        pokemon.forEach((p, i) => {
            fullTeam[i] = {
                ...p,
                stats: [],
                abilities: [],
                types: p.types.map(type => ({
                    slot: 1,
                    type: {
                        ...type.type,
                        url: ''
                    }
                }))
            } as Pokemon;
        });
        setTeamState(fullTeam);
    };

    const handleAddPokemon = async (pokemon: Pokemon) => {
        console.log('handleAddPokemon called with mode:', mode);
        console.log('currentTeamId:', currentTeamId);
        console.log('editingTeam:', editingTeam);

        if (mode === 'editing' && currentTeamId && editingTeam && user) {
            try {
                if (editingTeam.pokemon.length >= 6) {
                    showToast(t('team.errors.teamFull'), 'error');
                    return false;
                }

                const teamPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    types: pokemon.types,
                    sprites: pokemon.sprites
                };

                const updatedPokemon = [...editingTeam.pokemon, teamPokemon];
                const updatedTeam = {
                    ...editingTeam,
                    pokemon: updatedPokemon
                };

                await teamService.updateTeam(currentTeamId, updatedTeam);
                setEditingTeam(updatedTeam);
                updateTeamPokemon(updatedPokemon);

                // Actualizar sessionStorage
                const editState = JSON.parse(sessionStorage.getItem('teamEditState') || '{}');
                sessionStorage.setItem('teamEditState', JSON.stringify({
                    ...editState,
                    team: updatedTeam,
                    pokemon: updatedPokemon
                }));

                showToast(t('team.success.added'), 'success');
                return true;
            } catch (error) {
                console.error('Error updating team:', error);
                showToast(t('team.errors.saveFailed'), 'error');
                return false;
            }
        } else {
            console.log('Creating new team instead of editing');
            const result = addToTeam(pokemon);
            showToast(result.message, result.success ? 'success' : 'error');
            return result.success;
        }
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
            setEditingTeam
        }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    const { t } = useTranslation();
    if (!context) throw new Error(t('team.errors.contextError'));
    return context;
} 