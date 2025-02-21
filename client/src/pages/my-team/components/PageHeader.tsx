/**
 * Props for the PageHeader component
 * @property title - Main heading text to display
 * @property description - Subheading text that provides additional context
 */
interface PageHeaderProps {
    title: string;
    description: string;
}

/**
 * PageHeader Component
 * 
 * Renders a consistent page header with a gradient title and description.
 * Used across different sections of the application for visual hierarchy.
 * 
 * Features:
 * - Responsive text sizing
 * - Gradient text effect
 * - Centered layout
 * - Muted description text
 */
export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <section className="relative py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        {title}
                    </span>
                </h1>
                <p className="mt-3 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                    {description}
                </p>
            </div>
        </section>
    );
} 