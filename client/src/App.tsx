import { AppRouter } from './routes';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/i18n';
import { TeamProvider } from './context/TeamContext';

function App() {
  return (
    <TeamProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </TeamProvider>
  );
}

export default App;