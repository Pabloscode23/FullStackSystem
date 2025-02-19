import { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    // Add other Pokemon properties as needed
}

interface TeamContextType {
    team: (Pokemon | null)[];
    teamName: string;
    updateTeamName: (name: string) => void;
    addToTeam: (pokemon: Pokemon) => { success: boolean; message: string };
    removeFromTeam: (index: number) => { success: boolean; message: string };
    isInTeam: (pokemonId: number) => boolean;
    isTeamFull: boolean;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
    const [teamName, setTeamName] = useState(t('team.defaultName')); // Default team name

    const isTeamFull = team.every(slot => slot !== null);

    const addToTeam = (pokemon: Pokemon) => {
        // Check if pokemon is already in team
        if (isInTeam(pokemon.id)) {
            return {
                success: false,
                message: t('team.errors.alreadyInTeam')
            };
        }

        const emptySlot = team.findIndex(slot => slot === null);
        if (emptySlot === -1) {
            return {
                success: false,
                message: t('team.errors.teamFull')
            };
        }

        const newTeam = [...team];
        newTeam[emptySlot] = pokemon;
        setTeam(newTeam);

        return {
            success: true,
            message: t('team.success.added')
        };
    };

    const removeFromTeam = (index: number) => {
        if (index < 0 || index >= team.length) {
            return {
                success: false,
                message: t('team.errors.invalidSlot')
            };
        }

        const newTeam = [...team];
        newTeam[index] = null;
        setTeam(newTeam);

        return {
            success: true,
            message: t('team.success.removed')
        };
    };

    const isInTeam = (pokemonId: number): boolean => {
        return team.some(pokemon => pokemon?.id === pokemonId);
    };

    return (
        <TeamContext.Provider value={{
            team,
            teamName,
            updateTeamName: setTeamName,
            addToTeam,
            removeFromTeam,
            isInTeam,
            isTeamFull
        }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    const { t } = useTranslation();

    if (context === undefined) {
        throw new Error(t('team.errors.contextError'));
    }

    return context;
} 