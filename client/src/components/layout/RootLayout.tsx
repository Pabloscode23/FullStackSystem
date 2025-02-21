import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@/components/navigation';

export function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 