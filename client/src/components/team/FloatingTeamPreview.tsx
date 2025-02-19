import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTeam } from '../../context/TeamContext';
import { PencilIcon } from '@heroicons/react/24/outline';

export function FloatingTeamPreview() {
    const { t } = useTranslation();
    const { team, teamName, setTeamName } = useTeam();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(teamName);
    const teamCount = team.filter(Boolean).length;

    const handleNameSubmit = () => {
        if (editedName.trim()) {
            setTeamName(editedName.trim());
        } else {
            setEditedName(teamName);
        }
        setIsEditing(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="group relative flex flex-col gap-2 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-accent/20 hover:border-accent/40 transition-all duration-300">
                {/* Team Name */}
                <div className="flex items-center justify-between gap-2">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onBlur={handleNameSubmit}
                            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                            className="bg-background/50 px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder={t('myTeam.namePlaceholder')}
                            maxLength={20}
                            autoFocus
                        />
                    ) : (
                        <h3 className="text-sm font-medium flex items-center gap-2">
                            {teamName}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                title={t('myTeam.editName')}
                            >
                                <PencilIcon className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                            </button>
                        </h3>
                    )}
                </div>

                {/* Team Preview */}
                <Link
                    to="/my-team"
                    className="flex items-center gap-2"
                >
                    <div className="flex -space-x-3">
                        {team.map((pokemon, index) => (
                            pokemon ? (
                                <img
                                    key={index}
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-10 h-10 rounded-full border-2 border-background"
                                />
                            ) : (
                                <div
                                    key={index}
                                    className="w-10 h-10 rounded-full border-2 border-dashed border-accent/40 bg-accent/5 flex items-center justify-center"
                                    title={t('myTeam.emptySlot')}
                                >
                                    {index + 1}
                                </div>
                            )
                        ))}
                    </div>

                    <div className="ml-2">
                        <span className="text-sm font-medium">
                            {t('myTeam.currentTeam', { count: teamCount })}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground">
                            {t('myTeam.viewTeam')}
                        </span>
                    </div>
                </Link>

                {/* Tooltip */}
                <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-sm px-2 py-1 rounded shadow-lg">
                    {t('myTeam.clickToView')}
                </div>
            </div>
        </div>
    );
} 