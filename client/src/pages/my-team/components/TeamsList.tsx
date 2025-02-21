import type { Team } from '@/types/team';
import { TeamCard } from '@/components/team/TeamCard';

/**
 * Props for the TeamsList component
 * @property teams - Array of team objects to display
 * @property expandedTeamId - ID of the currently expanded team (if any)
 * @property onToggleExpand - Handler for expanding/collapsing team details
 * @property onDelete - Handler for team deletion
 * @property onToggleFavorite - Handler for toggling team favorite status
 */
interface TeamsListProps {
    teams: Team[];
    expandedTeamId: string | null;
    onToggleExpand: (teamId: string) => void;
    onDelete: (teamId: string) => Promise<void>;
    onToggleFavorite: (teamId: string, favorite: boolean) => Promise<void>;
}

/**
 * TeamsList Component
 * 
 * Renders a grid of TeamCard components.
 * Handles the display and interaction of multiple Pokemon teams.
 * 
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 columns on desktop)
 * - Expandable team details
 * - Team deletion
 * - Favorite toggling
 * 
 * @param props - Component properties (see TeamsListProps interface)
 */
export function TeamsList({
    teams,
    expandedTeamId,
    onToggleExpand,
    onDelete,
    onToggleFavorite
}: TeamsListProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                    isExpanded={expandedTeamId === team.id}
                    onToggleExpand={onToggleExpand}
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
} 