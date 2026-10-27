import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem('@auction:token', token);
      localStorage.setItem('@auction:user', JSON.stringify(user));

      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Acessar Conta</h2>
        
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/50">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-bold transition">
          Entrar
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Não tem uma conta? <Link to="/register" className="text-indigo-400 hover:underline">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}