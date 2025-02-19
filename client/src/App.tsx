import { AppRouter } from '@/routes';
import { AuthProvider } from '@/context/AuthContext';
import '@/i18n';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;