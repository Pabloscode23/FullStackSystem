import { AuthProvider } from '@/context/auth/AuthContext';
import { TeamProvider } from '@/context/team/TeamContext';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { ToastProvider } from '@/components/ui/Toaster';
import { AppRouter } from '@/routes';
import '@/i18n';

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