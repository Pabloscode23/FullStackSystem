import { AuthProvider } from '@/context/AuthContext';
import { TeamProvider } from '@/context/TeamContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ui/Toaster';
import { AppRouter } from '@/routes';
import '@/i18n';
import { EditTeamPage } from '@/pages/EditTeamPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <TeamProvider>
            <AppRouter />
          </TeamProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;