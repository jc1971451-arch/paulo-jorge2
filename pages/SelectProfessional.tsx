
import React from 'react';
import { Professional } from '../types';
import { ChevronLeft, Star, Heart } from 'lucide-react';

interface SelectProfessionalProps {
  professionals: Professional[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelect: (p: Professional) => void;
  onBack: () => void;
}

const SelectProfessional: React.FC<SelectProfessionalProps> = ({ 
  professionals, 
  favoriteIds, 
  onToggleFavorite, 
  onSelect, 
  onBack 
}) => {
  const handleToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-stone-900">Profissional</h2>
      </div>

      <header className="mb-8">
        <h3 className="text-2xl font-black text-stone-900 leading-tight">Escolha o seu especialista</h3>
        <p className="text-stone-400 text-sm mt-1">Temos os melhores profissionais ao seu dispor.</p>
      </header>

      <div className="grid gap-6">
        {professionals.map(p => {
          const isFavorite = favoriteIds.includes(p.id);
          return (
            <button 
              key={p.id}
              onClick={() => onSelect(p)}
              className="bg-white rounded-[2.5rem] p-5 border border-white shadow-sm flex items-center gap-5 hover:shadow-xl transition-all text-left relative overflow-hidden group active:scale-[0.98]"
            >
              {/* Botão de Favorito com isolamento de clique */}
              <button 
                onClick={(e) => handleToggle(e, p.id)}
                className={`absolute top-5 right-5 transition-all p-2.5 rounded-2xl z-20 active:scale-125 ${
                  isFavorite 
                    ? 'text-red-500 bg-red-50 shadow-md shadow-red-100' 
                    : 'text-stone-200 bg-stone-50 hover:text-red-400 group-hover:bg-white'
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? 'animate-in zoom-in duration-300' : ''} />
              </button>
              
              <div className="relative">
                <img src={p.image} alt={p.name} className="w-20 h-20 rounded-[1.8rem] object-cover shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black w-8 h-8 rounded-xl flex items-center justify-center border-4 border-white">
                  <Star size={12} fill="currentColor" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-900 text-lg">{p.name}</h3>
                  {isFavorite && (
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mt-1">
                  {p.working_days.slice(0, 3).join(', ')}...
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black">TOP RATED</span>
                  <span className="text-stone-300 text-[10px] font-bold">120+ reviews</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-black rounded-[3rem] border border-white/5 text-center">
        <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] mb-2">Qualidade Garantida</p>
        <p className="text-white/40 text-[11px] font-bold italic leading-relaxed uppercase tracking-tight">
          "Seleciona o coração para guardares o teu barbeiro favorito no teu perfil."
        </p>
      </div>
    </div>
  );
};

export default SelectProfessional;
