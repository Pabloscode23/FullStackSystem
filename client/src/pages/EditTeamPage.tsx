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
            const newPokemon = [...currentTeam.pokemon];
            newPokemon.splice(index, 1);

            const updatedTeam = {
                ...currentTeam,
                pokemon: newPokemon
            };

            await updateTeamInDB(updatedTeam);

            setCurrentTeam(updatedTeam);

            updateTeamPokemon(newPokemon);
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
            {/* Hero Section */}
            <section className="relative py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            {t('team.edit.title')}
                        </span>
                    </h1>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 space-y-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Team Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t('team.edit.name')}</label>
                        <Input
                            value={teamName}
                            onChange={(e) => handleUpdateName(e.target.value)}
                            placeholder={t('team.edit.namePlaceholder')}
                            className="max-w-md"
                        />
                    </div>

                    {/* Pokemon Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {currentTeam.pokemon.map((pokemon, index) => (
                            <div
                                key={index}
                                className="relative group aspect-square rounded-lg overflow-hidden bg-accent/5 p-2"
                            >
                                <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/40 rounded-full text-xs text-white">
                                    #{pokemon.id}
                                </div>
                                <img
                                    src={pokemon.sprites.other['official-artwork'].front_default}
                                    alt={pokemon.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Pokemon Info Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                                    <p className="text-white text-sm font-medium capitalize mb-1">
                                        {pokemon.name}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {pokemon.types?.map((type, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                                className="h-full aspect-square border-dashed flex flex-col items-center justify-center gap-2"
                                onClick={() => handleNavigate('/pokemon')}
                            >
                                <PlusIcon className="h-8 w-8" />
                                {t('team.edit.addPokemon')}
                            </Button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="outline"
                            onClick={() => handleNavigate('/teams')}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleSave().then(() => handleNavigate('/teams'));
                            }}
                            disabled={isSaving}
                        >
                            {isSaving ? t('common.saving') : t('common.save')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 