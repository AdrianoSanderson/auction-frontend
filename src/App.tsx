import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuctionsList } from './pages/AuctionsList';
import { LeiloeiroPanel } from './pages/LeiloeiroPanel';
import { AuctionDetails } from './pages/AuctionDetails';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<AuctionsList />} />
            <Route path="/auctions/:id" element={<AuctionDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leiloeiro" element={<LeiloeiroPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}