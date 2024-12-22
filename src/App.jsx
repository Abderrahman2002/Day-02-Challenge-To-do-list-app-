import { AuthProvider } from './contexts/AuthContext';
import TaskManager from './Components/TaskManager';
import AuthForm from './Components/AuthForm';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        {user ? <TaskManager /> : <AuthForm />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

