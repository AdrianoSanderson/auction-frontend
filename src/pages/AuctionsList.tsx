import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  current_price: number;
  status: string;
}

export function AuctionsList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auctions')
      .then((res) => setAuctions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-10 text-white">Carregando lotes...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Lotes Disponíveis</h1>
      
      {auctions.length === 0 ? (
        <p className="text-slate-400">Nenhum lote cadastrado no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auctions.map((item) => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col justify-between">
              <img src={item.image_url} alt={item.title} className="h-48 w-full object-cover bg-slate-900" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                </div>
                <div>
                  <div className="text-indigo-400 font-extrabold text-xl mb-3">
                    R$ {Number(item.current_price).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => navigate(`/auctions/${item.id}`)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium transition">
                    Ver Lote / Dar Lance
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}