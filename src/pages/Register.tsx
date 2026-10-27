import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'LICITANTE' | 'LEILOEIRO'>('LICITANTE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role,
      });

      // Redireciona para o login após cadastrar com sucesso
      navigate('/login');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Nova Conta</h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/50">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nome Completo</label>
          <input
            type="text"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Tipo de Perfil</label>
          <select
            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 focus:outline-none focus:border-indigo-500 text-white"
            value={role}
            onChange={(e) => setRole(e.target.value as 'LICITANTE' | 'LEILOEIRO')}
          >
            <option value="LICITANTE">Licitante (Dar lances)</option>
            <option value="LEILOEIRO">Leiloeiro (Criar leilões)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-bold transition disabled:opacity-50"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Já possui uma conta?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}