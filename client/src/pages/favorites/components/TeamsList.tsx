import type { Team } from '@/types/team';
import { TeamCard } from '@/components/team/TeamCard';

/**
 * Props for the TeamsList component
 * @property teams - Array of teams to display
 * @property onDelete - Handler for team deletion
 * @property onToggleFavorite - Handler for toggling favorite status
 */
interface TeamsListProps {
    teams: Team[];
    onDelete: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
}

/**
 * TeamsList Component
 * 
 * Renders a grid of favorite team cards
 * Features:
 * - Responsive grid layout
 * - Team management actions
 * - Consistent spacing
 */
export function TeamsList({
    teams,
    onDelete,
    onToggleFavorite
}: TeamsListProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
} 