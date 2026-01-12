
import React from 'react';
import { Page } from '../types';
import { 
  Users, 
  Scissors, 
  TrendingUp,
  LayoutDashboard,
  ArrowRight,
  Target,
  BarChart3,
  Megaphone,
  History,
  Coins,
  PlayCircle,
  Palette
} from 'lucide-react';

interface AdminDashboardProps {
  stats: { appointments: number; services: number; professionals: number; users: number };
  onNavigate: (page: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats, onNavigate }) => {
  return (
    <div className="p-6 bg-stone-50 min-h-full pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Painel de Controlo</p>
          <h2 className="text-3xl font-black text-stone-900 leading-none italic">PAULO JORGE</h2>
        </div>
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-amber-500 shadow-xl border border-amber-500/20">
          <Target size={24} />
        </div>
      </header>

      {/* Cards de Métricas Reais */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-black p-6 rounded-[2.5rem] text-white shadow-2xl shadow-stone-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-amber-500">
            <Users size={60} />
          </div>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Clientes</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black">{stats.users}</span>
            <span className="text-[10px] font-bold text-stone-500 uppercase">Inscritos</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[2.5rem] text-stone-900 shadow-xl border border-stone-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Scissors size={60} />
          </div>
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Menu</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">{stats.services}</span>
            <span className="text-[10px] font-bold text-stone-300 uppercase">Serviços</span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-5 w-1 bg-black rounded-full"></div>
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Configuração do Negócio</h3>
      </div>
      
      <div className="space-y-4">
        {/* NOVO: BOTÃO DE APARÊNCIA */}
        <button 
          onClick={() => onNavigate('APPEARANCE_SETTINGS')}
          className="w-full bg-white border-2 border-amber-500/20 text-stone-900 p-6 rounded-[2.2rem] shadow-xl shadow-amber-500/5 flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 transition-all">
              <Palette size={24} />
            </div>
            <div className="text-left">
              <p className="font-black text-stone-900 text-sm uppercase tracking-tight">Aparência da App</p>
              <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-1">Mudar Logo e Login</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600">
            <ArrowRight size={20} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('VIDEOS')}
          className="w-full bg-black text-white p-6 rounded-[2.2rem] shadow-xl shadow-stone-300 flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 transition-all">
              <PlayCircle size={24} />
            </div>
            <div className="text-left">
              <p className="font-black text-amber-500 text-sm uppercase tracking-tight">Estúdio de Clips</p>
              <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-1">Gerir Vídeos e Reels</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-amber-500">
            <ArrowRight size={20} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('MANAGE_SERVICES')}
          className="w-full bg-amber-500 text-black p-6 rounded-[2.2rem] shadow-xl shadow-amber-200/50 flex items-center justify-between group transition-all active:scale-95 border-2 border-black/5"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-all">
              <Coins size={24} />
            </div>
            <div className="text-left">
              <p className="font-black text-black text-sm uppercase tracking-tight">Serviços e Preços</p>
              <p className="text-[10px] text-black/60 font-black uppercase tracking-widest mt-1">Mudar Preçário</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-black">
            <ArrowRight size={20} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('BROADCAST_CENTER')}
          className="w-full bg-white border border-stone-100 p-6 rounded-[2.2rem] shadow-sm flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-black group-hover:text-amber-500 transition-all">
              <Megaphone size={24} />
            </div>
            <div className="text-left">
              <p className="font-black text-stone-900 text-sm uppercase tracking-tight">Centro de Mensagens</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Falar com Clientes</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 group-hover:bg-amber-500 group-hover:text-black transition-all">
            <ArrowRight size={20} />
          </div>
        </button>

        <button 
          onClick={() => onNavigate('MANAGE_PROFESSIONALS')}
          className="w-full bg-white p-6 rounded-[2.2rem] border border-stone-100 shadow-sm flex items-center justify-between hover:border-amber-500 group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-black group-hover:text-amber-500 transition-all">
              <Users size={24} />
            </div>
            <div className="text-left">
              <p className="font-black text-stone-900 text-sm uppercase tracking-tight">Equipa e Contas</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Gerir Barbeiros</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 group-hover:bg-amber-500 group-hover:text-black transition-all">
            <ArrowRight size={20} />
          </div>
        </button>
      </div>

      <div className="mt-10 p-8 bg-amber-50 rounded-[3rem] border border-amber-100/50 text-center">
        <p className="text-[10px] text-amber-800 font-black uppercase tracking-[0.3em] mb-2">Controlo Total</p>
        <p className="text-xs text-amber-900/60 font-bold italic leading-relaxed">
          Paulo, aqui podes gerir todos os aspetos do teu negócio, desde os preços até à tua equipa.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
