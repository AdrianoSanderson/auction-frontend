import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function WalletModal({ isOpen, onClose, onUpdate }: WalletModalProps) {
  const [balanceTotal, setBalanceTotal] = useState(0);
  const [balanceCommitted, setBalanceCommitted] = useState(0);
  const [depositAmount, setDepositAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setBalanceTotal(res.data.balance_total);
      setBalanceCommitted(res.data.balance_committed);
    } catch (err) {
      console.error('Erro ao buscar perfil', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount || Number(depositAmount) <= 0) return;

    setLoading(true);
    try {
      await api.post('/users/deposit', { amount: Number(depositAmount) });
      alert('Depósito realizado com sucesso!');
      setDepositAmount('');
      fetchProfile();
      onUpdate(); // Atualiza dados globais se necessário
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao realizar depósito.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const freeBalance = Number(balanceTotal) - Number(balanceCommitted);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md text-white shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Minha Carteira</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400">Saldo Livre</div>
            <div className="text-lg font-bold text-emerald-400">
              R$ {Number(freeBalance).toFixed(2)}
            </div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400">Comprometido</div>
            <div className="text-lg font-bold text-amber-400">
              R$ {Number(balanceCommitted).toFixed(2)}
            </div>
          </div>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4 border-t border-slate-700 pt-4">
          <h3 className="text-sm font-semibold text-slate-300">Adicionar Saldo (Simulação)</h3>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Valor do Depósito (R$)</label>
            <input
              type="number"
              step="0.01"
              required
              min="1"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0.00"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-2.5 rounded font-bold transition disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Depositar'}
          </button>
        </form>
      </div>
    </div>
  );
}