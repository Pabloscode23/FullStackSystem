import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { teamService } from '@/services/teamService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/Input';
import type { Team } from '@/types/team';
import { useTeam } from '@/context/TeamContext';

export function EditTeamPage() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAuth();
    const { startEditing, stopEditing, updateTeamPokemon } = useTeam();
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [teamName, setTeamName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchTeam = async () => {
            if (!teamId || !user) return;

            try {
                const userTeams = await teamService.getUserTeams(user.uid);
                const team = userTeams.find(t => t.id === teamId);
                if (team) {
                    setCurrentTeam(team);
                    setTeamName(team.name);
                    updateTeamPokemon(team.pokemon);
                    startEditing(teamId);
                }
            } catch (error) {
                console.error('Error fetching team:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();

        // Cleanup function
        return () => {
            stopEditing();
        };
    }, [teamId, user]);

    const handleNavigate = (path: string) => {
        stopEditing();
        navigate(path);
    };

    const updateTeamInDB = async (updatedTeam: Team) => {
        try {
            await teamService.updateTeam(updatedTeam.id, updatedTeam);
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        }
    };

    const handleRemovePokemon = async (index: number) => {
        if (!currentTeam) return;

        try {
            // Crear una copia del array actual preservando los índices
            const pokemonArray = [...currentTeam.pokemon];

            // Crear un array con las posiciones correctas
            const updatedPokemon = pokemonArray.map((p, i) => i === index ? null : p)
                .filter(p => p !== null); // Filtrar nulls para la base de datos

            const updatedTeam = {
                ...currentTeam,
                pokemon: updatedPokemon
            };

            await updateTeamInDB(updatedTeam);
            setCurrentTeam(updatedTeam);

            // Mantener las posiciones originales al actualizar el estado
            const teamStateArray = [...pokemonArray];
            teamStateArray[index] = null;
            updateTeamPokemon(teamStateArray);

        } catch (error) {
            console.error('Error removing pokemon:', error);
        }
    };

    const handleUpdateName = async (newName: string) => {
        if (!currentTeam) return;
        setTeamName(newName);

        try {
            const updatedTeam = {
                ...currentTeam,
                name: newName.trim()
            };

            await updateTeamInDB(updatedTeam);

            setCurrentTeam(updatedTeam);
        } catch (error) {
            console.error('Error updating team name:', error);
        }
    };

    const handleSave = async () => {
        if (!currentTeam) return;
        setIsSaving(true);

        try {
            const updatedTeam = {
                ...currentTeam,
                name: teamName.trim()
            };
            await teamService.updateTeam(currentTeam.id, updatedTeam);
            return updatedTeam;
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!currentTeam) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-semibold">{t('team.edit.notFound')}</h2>
                <Button
                    className="mt-4"
                    onClick={() => handleNavigate('/teams')}
                >
                    {t('common.goBack')}
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen space-y-4 pt-4">
            {/* Hero Section con gradiente mejorado */}
            <section className="relative py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            {t('team.edit.title')}
                        </span>
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        {t('pages.myTeam.description')}
                    </p>
                </div>
            </section>

            {/* Main Content con mejor espaciado y diseño */}
            <div className="container mx-auto px-4 space-y-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Team Name con mejor diseño */}
                    <div className="space-y-2 max-w-md mx-auto">
                        <Input
                            value={teamName}
                            onChange={(e) => handleUpdateName(e.target.value)}
                            placeholder={t('team.edit.namePlaceholder')}
                            className="text-center text-lg font-medium bg-accent/5 focus:bg-accent/10 border-accent/20"
                        />
                    </div>

                    {/* Pokemon Grid con mejor diseño */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {currentTeam.pokemon.map((pokemon, index) => (
                            <div
                                key={index}
                                className="relative group aspect-square rounded-xl overflow-hidden bg-accent/5 p-2
                                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm 
                                    rounded-full text-xs text-white font-medium">
                                    #{pokemon.id}
                                </div>
                                <img
                                    src={pokemon.sprites.other['official-artwork'].front_default}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 
                                        transition-transform duration-300"
                                />
                                {/* Pokemon Info Overlay mejorado */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 
                                    to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                                    duration-200 flex flex-col justify-end p-4">
                                    <p className="text-white text-sm font-medium capitalize mb-2">
                                        {pokemon.name}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {pokemon.types?.map((type, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-full bg-white/20 
                                                    text-white backdrop-blur-sm font-medium"
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="mt-3 w-full opacity-0 group-hover:opacity-100 
                                            transition-opacity bg-red-500/80 hover:bg-red-600/80 
                                            backdrop-blur-sm"
                                        onClick={() => handleRemovePokemon(index)}
                                    >
                                        <TrashIcon className="h-4 w-4 mr-1" />
                                        {t('team.edit.removePokemon')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {currentTeam.pokemon.length < 6 && (
                            <Button
                                variant="outline"
                                className="h-full aspect-square border-2 border-dashed 
                                    flex flex-col items-center justify-center gap-3
                                    bg-accent/5 hover:bg-accent/10 transition-colors
                                    group"
                                onClick={() => handleNavigate('/pokemon')}
                            >
                                <PlusIcon className="h-8 w-8 text-muted-foreground 
                                    group-hover:text-foreground transition-colors" />
                                <span className="text-sm text-muted-foreground 
                                    group-hover:text-foreground transition-colors">
                                    {t('team.edit.addPokemon')}
                                </span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 