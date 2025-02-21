import { Pokemon } from '@/types/pokemon';
import { Team, TeamPokemon } from '@/types/team';

export type TeamMode = 'creating' | 'editing' | 'idle';

export interface TeamState {
    teamState: (Pokemon | null)[];
    teamName: string;
    mode: TeamMode;
    isEditing: boolean;
    currentTeamId: string | null;
    editingTeam: Team | null;
}

export interface TeamContextType extends TeamState {
    updateTeamName: (name: string) => void;
    addToTeam: (pokemon: Pokemon) => { success: boolean; message: string };
    removeFromTeam: (index: number) => { success: boolean; message: string };
    isInTeam: (pokemonId: number) => boolean;
    isTeamFull: boolean;
    saveTeam: () => Promise<boolean>;
    resetTeam: () => void;
    getTeamsCount: () => Promise<number>;
    startEditing: (teamId: string) => Promise<boolean>;
    startCreating: () => void;
    stopEditing: () => void;
    setTeam: (pokemon: TeamPokemon[]) => void;
    updateTeamPokemon: (pokemon: TeamPokemon[]) => void;
    handleAddPokemon: (pokemon: Pokemon) => Promise<boolean>;
    setMode: (mode: TeamMode) => void;
    setIsEditing: (isEditing: boolean) => void;
    setCurrentTeamId: (id: string | null) => void;
    setEditingTeam: (team: Team | null) => void;
    forceResetState: () => void;
} 