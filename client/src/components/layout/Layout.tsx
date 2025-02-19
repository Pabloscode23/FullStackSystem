import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { layoutStyles } from '@/constants/styles';

// Layout component that wraps all pages with common elements
export function Layout() {
    return (
        <div className={`${layoutStyles.page} flex flex-col min-h-screen`}>
            {/* Navigation bar at the top */}
            <Navbar />

            {/* Main content area */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className={layoutStyles.section}>
                    <Outlet />
                </div>
            </main>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
} 