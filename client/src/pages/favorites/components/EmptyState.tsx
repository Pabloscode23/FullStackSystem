/**
 * Props for the EmptyState component
 * @property title - Main message to display
 * @property description - Additional guidance text
 */
interface EmptyStateProps {
    title: string;
    description: string;
}

/**
 * EmptyState Component
 * 
 * Displays a message when no favorite teams are available
 * Provides guidance for users to add favorites
 */
export function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="bg-card rounded-lg p-8 text-center space-y-4">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
