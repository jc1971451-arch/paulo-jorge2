
import React from 'react';
import { Service } from '../types';
import { ChevronLeft, Trash2, ShoppingBag, ArrowRight, Scissors, Clock } from 'lucide-react';

interface CartPageProps {
  cart: Service[];
  onRemove: (id: string) => void;
  onBack: () => void;
  onProceed: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemove, onBack, onProceed }) => {
  const totalPrice = cart.reduce((acc, s) => acc + s.price_eur, 0);
  const totalDuration = cart.reduce((acc, s) => acc + s.duration_minutes, 0);

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Checkout</h2>
      </div>

      <header className="mb-8">
        <h3 className="text-2xl font-black text-stone-900 leading-tight">Os Seus Serviços</h3>
        <p className="text-stone-400 text-sm mt-1">Revise as suas escolhas antes de agendar.</p>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
          <ShoppingBag className="mx-auto text-stone-100 mb-4" size={48} />
          <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">O seu carrinho está vazio</p>
          <button onClick={onBack} className="mt-6 text-amber-600 font-black text-xs uppercase underline">Voltar aos serviços</button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(service => (
            <div key={service.id} className="bg-white p-5 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-4 group">
              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400">
                <Scissors size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-stone-900 text-xs uppercase tracking-tight">{service.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-amber-600 font-black text-sm">{service.price_eur.toFixed(2)}€</span>
                  <div className="flex items-center text-stone-300 text-[9px] font-black uppercase gap-1">
                    <Clock size={10} />
                    <span>{service.duration_minutes} min</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onRemove(service.id)}
                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-300 hover:text-red-500 rounded-xl transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className="mt-10 bg-black p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <ShoppingBag size={80} className="text-amber-500" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] mb-4">Resumo do Pedido</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400 text-xs font-bold">Duração Total:</span>
                <span className="text-white font-black text-sm uppercase">{totalDuration} minutos</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-stone-400 text-sm font-bold">Preço Final:</span>
                <span className="text-amber-500 font-black text-2xl">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onProceed}
            className="w-full bg-amber-500 text-black py-6 rounded-[2.5rem] font-black text-lg mt-8 shadow-xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all"
          >
            Escolher Barbeiro
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
