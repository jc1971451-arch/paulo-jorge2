
import React, { useState } from 'react';
import { Service, User } from '../types';
import { Search, Clock, Scissors, Bell, Megaphone, ShoppingCart, Check, Image as ImageIcon } from 'lucide-react';

interface SelectServiceProps {
  services: Service[];
  cart: Service[];
  onToggle: (service: Service) => void;
  onOpenCart: () => void;
  user?: User | null;
  logo: string;
  onOpenNotifications: () => void;
  hasUnreadNotifications: boolean;
  globalAnnouncement?: string | null;
}

const SelectService: React.FC<SelectServiceProps> = ({ 
  services, 
  cart, 
  onToggle, 
  onOpenCart, 
  user, 
  logo,
  onOpenNotifications, 
  hasUnreadNotifications, 
  globalAnnouncement 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      {/* Header Premium com Logo Oficial */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-black border-2 border-amber-500 shadow-lg overflow-hidden shrink-0">
             <img 
                src={logo} 
                alt="Logo Paulo Jorge" 
                className="w-full h-full object-cover"
              />
          </div>
          <div>
            <p className="text-amber-600 text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1">Paulo Jorge</p>
            <h2 className="text-xl font-black text-stone-900 leading-tight">Olá, {user?.display_name?.split(' ')[0] || 'Amigo'}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onOpenCart}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 relative active:scale-95 transition-transform"
          >
            <ShoppingCart size={20} className="text-stone-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-amber-500 text-[9px] font-black rounded-full border-2 border-white flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenNotifications}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 relative active:scale-95 transition-transform"
          >
            <Bell size={20} className="text-stone-600" />
            {hasUnreadNotifications && (
              <span className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
            )}
          </button>
        </div>
      </div>

      {/* ANÚNCIO GLOBAL DO PAULO */}
      {globalAnnouncement && (
        <div className="mb-8 bg-black p-5 rounded-[2rem] shadow-xl shadow-amber-500/10 border border-amber-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-amber-500">
            <Megaphone size={40} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Aviso Importante</p>
          </div>
          <p className="text-white text-sm font-bold leading-relaxed relative z-10">
            {globalAnnouncement}
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8 relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Pesquisar serviço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-stone-100 py-4 pl-14 pr-6 rounded-2xl shadow-sm outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium text-stone-800"
        />
      </div>

      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="h-8 w-1 bg-amber-500 rounded-full"></div>
        <h3 className="font-black text-stone-900 text-xl uppercase tracking-tight italic">Serviços</h3>
      </div>

      <div className="space-y-4">
        {filteredServices.length > 0 ? filteredServices.map(service => {
          const isInCart = cart.some(s => s.id === service.id);
          return (
            <button 
              key={service.id}
              onClick={() => onToggle(service)}
              className={`w-full p-4 rounded-[2.5rem] border transition-all flex items-center gap-5 text-left group active:scale-[0.98] ${
                isInCart ? 'bg-amber-500 border-black shadow-lg shadow-amber-500/20' : 'bg-white border-stone-100 shadow-sm'
              }`}
            >
              {/* IMAGEM DO SERVIÇO */}
              <div className={`w-20 h-20 rounded-[1.8rem] overflow-hidden shrink-0 transition-all ${
                isInCart ? 'border-2 border-black/20' : 'border border-stone-100'
              }`}>
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-stone-50 flex items-center justify-center text-stone-300">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h4 className={`font-black text-sm uppercase tracking-tight leading-tight ${isInCart ? 'text-black' : 'text-stone-900'}`}>
                  {service.name}
                </h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`font-black text-base ${isInCart ? 'text-black' : 'text-amber-600'}`}>
                    {service.price_eur.toFixed(2)}€
                  </span>
                  <div className={`flex items-center text-[10px] font-black uppercase tracking-widest gap-1 ${isInCart ? 'text-black/60' : 'text-stone-300'}`}>
                    <Clock size={12} />
                    <span>{service.duration_minutes} min</span>
                  </div>
                </div>
              </div>

              {isInCart && (
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-amber-500 mr-2">
                   <Check size={18} />
                </div>
              )}
            </button>
          );
        }) : (
          <div className="text-center py-10">
            <p className="text-stone-400 font-medium">Nenhum serviço encontrado.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-28 left-6 right-6 z-40 animate-in slide-in-from-bottom duration-500">
          <button 
            onClick={onOpenCart}
            className="w-full bg-black text-amber-500 py-6 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-4 group active:scale-95 transition-all"
          >
            <span>Continuar Checkout</span>
            <div className="bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black">
              {cart.length}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectService;
