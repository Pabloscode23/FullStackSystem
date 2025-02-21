import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/context/team/TeamContext';
import { TeamHeader } from './TeamHeader';
import { PokemonGrid } from './PokemonGrid';
import { ActionFooter } from './ActionFooter';
import type { TeamCardProps } from './types';

/**
 * TeamCard Component
 * 
 * Displays a Pokemon team with interactive features.
 * 
 * Features:
 * - Team name display with gradient text
 * - Favorite toggle with animation
 * - Pokemon grid with hover effects
 * - Type display for each Pokemon
 * - Edit and delete actions
 * - Dark mode support
 * - Responsive layout
 */
export function TeamCard({ team, onDelete, onToggleFavorite }: TeamCardProps) {
    const navigate = useNavigate();
    const { startEditing } = useTeam();

    const handleEdit = async () => {
        const success = await startEditing(team.id);
        if (success) {
            navigate(`/teams/edit/${team.id}`);
        }
    };

    return (
        <div className="relative group/card overflow-hidden mb-6">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30 
                dark:from-accent/10 dark:via-background dark:to-accent/5" />

            <div className="relative border border-accent/20 rounded-xl bg-white/80 dark:bg-slate-900/80 
                backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Decorative top border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />

                <div className="p-6 space-y-6">
                    <TeamHeader
                        name={team.name}
                        favorite={team.favorite}
                        onToggleFavorite={() => onToggleFavorite(team.id, !team.favorite)}
                    />
                    <PokemonGrid pokemon={team.pokemon} />
                </div>

                <ActionFooter
                    onEdit={handleEdit}
                    onDelete={() => onDelete(team.id)}
                />
            </div>
        </div>
    );
} 