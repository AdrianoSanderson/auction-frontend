import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletModal } from './WalletModal';

export function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('@auction:token');
  const userJson = localStorage.getItem('@auction:user');
  const user = userJson ? JSON.parse(userJson) : null;

  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('@auction:token');
    localStorage.removeItem('@auction:user');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <Link to="/" className="text-xl font-bold tracking-wide text-indigo-400">
          ⚡ Sistema de Leilões
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-300 transition">Vitrine</Link>
          
          {user?.role === 'LEILOEIRO' && (
            <Link to="/leiloeiro" className="hover:text-indigo-300 transition">
              Painel do Leiloeiro
            </Link>
          )}

          {user?.role === 'LICITANTE' && (
            <button
              onClick={() => setIsWalletOpen(true)}
              className="bg-slate-800 border border-slate-700 hover:border-indigo-500 px-3 py-1.5 rounded text-sm font-medium transition"
            >
              💰 Carteira
            </button>
          )}

          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                {user?.email} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition">
                Entrar
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded font-medium transition">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </nav>

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        onUpdate={() => {}}
      />
    </>
  );
}