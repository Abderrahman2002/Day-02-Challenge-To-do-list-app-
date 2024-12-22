import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (login(email, password)) {
        console.log('Logged in successfully');
      } else {
        setError('Invalid credentials');
      }
    } else {
      register(name, email, password)
        .then(() => {
          console.log('Registered successfully');
        })
        .catch((err) => {
          setError(err.message || 'Registration failed');
        });
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {isLogin ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;

