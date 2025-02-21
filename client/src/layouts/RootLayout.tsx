import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

/**
 * RootLayout Component
 * 
 * Main layout wrapper for the application that provides:
 * - Consistent page structure
 * - Navigation header
 * - Footer
 * - Content container with proper spacing
 * 
 * Features:
 * - Full height layout with sticky footer
 * - Centered content with max width
 * - Responsive padding
 * - Flexible content area
 * 
 * @component
 */
export function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 