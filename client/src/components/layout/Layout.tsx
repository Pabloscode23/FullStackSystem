import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

// Layout component that wraps all pages with common elements
export function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation bar at the top */}
            <Navbar />

            {/* Main content area */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
} 