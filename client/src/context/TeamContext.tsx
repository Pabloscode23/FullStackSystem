import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { teamService } from '@/services/teamService';
import { useToast } from '@/components/ui/Toaster';
import type { Pokemon } from '@/types/pokemon';

interface TeamContextType {
    team: (Pokemon | null)[];
    teamName: string;
    updateTeamName: (name: string) => void;
    addToTeam: (pokemon: Pokemon) => { success: boolean; message: string };
    removeFromTeam: (index: number) => { success: boolean; message: string };
    isInTeam: (pokemonId: number) => boolean;
    isTeamFull: boolean;
    saveTeam: () => Promise<boolean>;
    resetTeam: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
    const [teamName, setTeamName] = useState(t('team.defaultName'));
    const isTeamFull = team.every(slot => slot !== null);

    // Actualizar nombre por defecto al cambiar idioma
    useEffect(() => {
        const isDefaultName = [
            t('team.defaultName', { lng: 'en' }),
            t('team.defaultName', { lng: 'es' })
        ].includes(teamName);

        if (isDefaultName) setTeamName(t('team.defaultName'));
    }, [t, teamName]);

    const addToTeam = (pokemon: Pokemon) => {
        if (isInTeam(pokemon.id)) {
            return { success: false, message: t('team.errors.alreadyInTeam') };
        }

        const emptySlot = team.findIndex(slot => slot === null);
        if (emptySlot === -1) {
            return { success: false, message: t('team.errors.teamFull') };
        }

        setTeam(prev => {
            const newTeam = [...prev];
            newTeam[emptySlot] = pokemon;
            return newTeam;
        });

        return { success: true, message: t('team.success.added') };
    };

    const removeFromTeam = (index: number) => {
        if (index < 0 || index >= team.length) {
            return { success: false, message: t('team.errors.invalidSlot') };
        }

        setTeam(prev => {
            const newTeam = [...prev];
            newTeam[index] = null;
            return newTeam;
        });

        return { success: true, message: t('team.success.removed') };
    };

    const isInTeam = (pokemonId: number) => team.some(pokemon => pokemon?.id === pokemonId);

    const resetTeam = () => {
        setTeam(Array(6).fill(null));
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

            const validTeam = team.filter((pokemon): pokemon is NonNullable<typeof pokemon> => pokemon !== null);

            if (validTeam.length !== 6) {
                showToast(t('team.errors.incompleteTeam'), 'error');
                return false;
            }

            if (await teamService.checkTeamNameExists(user.uid, teamName)) {
                showToast(t('team.errors.nameExists'), 'error');
                return false;
            }

            const simplifiedTeam = validTeam.map(({ id, name, sprites }) => ({
                id,
                name,
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

    return (
        <TeamContext.Provider value={{
            team,
            teamName,
            updateTeamName: setTeamName,
            addToTeam,
            removeFromTeam,
            isInTeam,
            isTeamFull,
            saveTeam,
            resetTeam
        }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    if (!context) throw new Error(t('team.errors.contextError'));
    return context;
} 