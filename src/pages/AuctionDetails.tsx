import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  initial_price: number;
  current_price: number;
  status: string;
  leiloeiro_id: string;
}

interface Bid {
  id: string;
  amount: number;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
}

export function AuctionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidAmount, setBidAmount] = useState<number | ''>('');

  const userJson = localStorage.getItem('@auction:user');
  const user = userJson ? JSON.parse(userJson) : null;

  const loadAuctionData = async () => {
    try {
      const [auctionRes, bidsRes] = await Promise.all([
        api.get(`/auctions/${id}`),
        api.get(`/bids/auction/${id}`),
      ]);

      setAuction(auctionRes.data);
      setBids(bidsRes.data);
      // Sugere um lance mínimo levemente superior ao preço atual
      setBidAmount(Number(auctionRes.data.current_price) + 10);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar detalhes do lote.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuctionData();
  }, [id]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para dar um lance.');
      return navigate('/login');
    }

    try {
      await api.post('/bids', {
        auctionId: id,
        amount: Number(bidAmount),
      });

      alert('Lance realizado com sucesso!');
      await loadAuctionData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao processar o lance.');
    }
  };

  if (loading) return <div className="text-center p-10 text-white">Carregando detalhes do lote...</div>;
  if (error || !auction) return <div className="text-center p-10 text-red-400">{error || 'Lote não encontrado.'}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-slate-400 hover:text-white transition flex items-center gap-2"
      >
        ← Voltar para a vitrine
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-6">
        <div>
          <img
            src={auction.image_url}
            alt={auction.title}
            className="w-full h-80 object-cover rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
              {auction.status}
            </span>
            <h1 className="text-2xl font-bold mb-2">{auction.title}</h1>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{auction.description}</p>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Preço Atual</div>
              <div className="text-3xl font-black text-indigo-400">
                R$ {Number(auction.current_price).toFixed(2)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Lance inicial: R$ {Number(auction.initial_price).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Área de Lance (Apenas Licitante) */}
          {user?.role === 'LICITANTE' ? (
            <form onSubmit={handlePlaceBid} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Seu Lance (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min={Number(auction.current_price) + 0.01}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500 font-bold"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-bold text-white transition shadow-lg"
              >
                Confirmar Lance
              </button>
            </form>
          ) : user?.role === 'LEILOEIRO' ? (
            <div className="bg-slate-900/50 border border-slate-700 p-3 rounded text-center text-xs text-slate-400">
              Leiloeiros não podem enviar lances.
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded font-bold text-white transition"
            >
              Faça login como Licitante para dar lances
            </button>
          )}
        </div>
      </div>

      {/* Histórico de Lances */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Histórico de Lances</h3>
        {bids.length === 0 ? (
          <p className="text-slate-400 text-sm">Nenhum lance realizado para este lote ainda. Seja o primeiro!</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className="bg-slate-900 border border-slate-700 p-3 rounded flex items-center justify-between text-sm"
              >
                <div>
                  <span className="font-semibold text-slate-200">{bid.user?.name || 'Usuário'}</span>
                  <span className="text-xs text-slate-500 ml-2">
                    ({new Date(bid.created_at).toLocaleString('pt-BR')})
                  </span>
                </div>
                <div className="font-bold text-emerald-400">
                  R$ {Number(bid.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}