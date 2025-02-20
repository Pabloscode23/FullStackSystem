import { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { teamService } from '@/services/teamService';
import { useToast } from '@/components/ui/Toaster';

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: Array<{
        type: {
            name: string;
        }
    }>;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        }
    }>;
    abilities: Array<{
        ability: {
            name: string;
        }
    }>;
}

interface TeamContextType {
    team: (Pokemon | null)[];
    teamName: string;
    updateTeamName: (name: string) => void;
    addToTeam: (pokemon: Pokemon) => { success: boolean; message: string };
    removeFromTeam: (index: number) => { success: boolean; message: string };
    isInTeam: (pokemonId: number) => boolean;
    isTeamFull: boolean;
    saveTeam: () => Promise<boolean>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showToast } = useToast();
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

    const saveTeam = async () => {
        if (!user) return false;

        try {
            // Validar que tenga nombre
            if (!teamName.trim()) {
                showToast(t('team.errors.nameRequired'), 'error');
                return false;
            }

            // Validar que tenga 6 pokémon
            const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);
            if (validTeam.length !== 6) {
                showToast(t('team.errors.incompleteTeam'), 'error');
                return false;
            }

            // Validar nombre único
            const nameExists = await teamService.checkTeamNameExists(user.uid, teamName);
            if (nameExists) {
                showToast(t('team.errors.nameExists'), 'error');
                return false;
            }

            const simplifiedTeam = validTeam.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                sprites: {
                    front_default: pokemon.sprites.front_default,
                    other: {
                        'official-artwork': {
                            front_default: pokemon.sprites.other['official-artwork'].front_default
                        }
                    }
                }
            }));

            await teamService.createTeam(user.uid, teamName, simplifiedTeam);
            showToast(t('team.success.saved'), 'success');
            return true;
        } catch (error) {
            console.error('Error saving team:', error);
            showToast(t('team.errors.saveFailed'), 'error');
            return false;
        }
    };

    return (
        <TeamContext.Provider value={{
            team,
            teamName,
            updateTeamName: setTeamName,
            addToTeam,
            removeFromTeam,
            isInTeam,
            isTeamFull,
            saveTeam
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