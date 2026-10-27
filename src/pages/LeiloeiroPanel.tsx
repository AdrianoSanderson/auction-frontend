import { useState } from 'react';
import { api } from '../services/api';

interface ExternalProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export function LeiloeiroPanel() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ExternalProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [createdMsg, setCreatedMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCreatedMsg('');

    try {
      const res = await api.get(`/auctions/external-products?q=${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuction = async (productId: number, basePrice: number) => {
    try {
      await api.post('/auctions', {
        externalProductId: productId,
        initialPrice: basePrice,
      });
      setCreatedMsg('Lote cadastrado com sucesso!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao criar lote');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Painel do Leiloeiro — Criar Lotes</h1>
      
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Buscar produtos na API externa (ex: phone, laptop...)"
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded font-bold transition">
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {createdMsg && <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded mb-6 border border-emerald-500">{createdMsg}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((prod) => (
          <div key={prod.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex gap-4 items-center">
            <img src={prod.thumbnail} alt={prod.title} className="w-20 h-20 object-cover rounded bg-slate-900" />
            <div className="flex-1">
              <h4 className="font-bold">{prod.title}</h4>
              <p className="text-sm text-slate-400">Preço Sugerido: R$ {prod.price}</p>
              <button
                onClick={() => handleCreateAuction(prod.id, prod.price)}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1.5 rounded font-bold transition"
              >
                + Criar Lote a partir deste item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}