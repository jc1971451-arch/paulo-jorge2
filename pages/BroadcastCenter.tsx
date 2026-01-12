
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Megaphone, 
  Send, 
  Bell, 
  Trash2, 
  CheckCircle2, 
  Copy, 
  Share2, 
  MessageCircle,
  Smartphone
} from 'lucide-react';

interface BroadcastCenterProps {
  onBack: () => void;
  onSendNotification: (title: string, message: string) => void;
  onUpdateAnnouncement: (msg: string | null) => void;
  currentAnnouncement: string | null;
}

const BroadcastCenter: React.FC<BroadcastCenterProps> = ({ onBack, onSendNotification, onUpdateAnnouncement, currentAnnouncement }) => {
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [bannerMsg, setBannerMsg] = useState(currentAnnouncement || '');
  const [success, setSuccess] = useState<string | null>(null);

  const appUrl = window.location.href;

  const marketingTemplates = [
    {
      id: 'wa',
      name: 'WhatsApp (Direto)',
      icon: <MessageCircle size={18} />,
      text: `Boas! Já podes marcar o teu próximo corte na minha nova App oficial! ✂️🔥\n\nVê os novos estilos, escolhe o teu barbeiro e reserva em segundos.\n\nAcede aqui: ${appUrl}`
    },
    {
      id: 'ig',
      name: 'Instagram / Stories',
      icon: <Share2 size={18} />,
      text: `NOVIDADE! 🚨 A App Paulo Jorge Barbershop já está online! \n\nMenu de serviços com fotos reais e marcação instantânea. Não fiques à espera, reserva já o teu lugar! ⚡️\n\nLink na Bio: ${appUrl}`
    }
  ];

  const handleSendNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMsg) return;
    onSendNotification(notifTitle, notifMsg);
    setNotifTitle('');
    setNotifMsg('');
    showSuccess('Notificação enviada a todos!');
  };

  const handleUpdateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement(bannerMsg || null);
    showSuccess('Banner principal atualizado!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess('Mensagem copiada!');
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="p-6 bg-stone-50 min-h-full pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95 transition-all">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Comunicação & Marketing</h2>
      </div>

      {success && (
        <div className="fixed top-6 left-6 right-6 z-[110] p-4 bg-green-600 text-white rounded-2xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} />
          <p className="text-xs font-black uppercase tracking-widest">{success}</p>
        </div>
      )}

      {/* NOVO: CONVIDAR CLIENTES (MARKETING) */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="h-5 w-1 bg-amber-500 rounded-full"></div>
          <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Convidar Clientes</h3>
        </div>

        <div className="space-y-4">
          {marketingTemplates.map((template) => (
            <div key={template.id} className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    {template.icon}
                  </div>
                  <span className="font-black text-stone-900 text-[10px] uppercase tracking-widest">{template.name}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(template.text)}
                  className="p-2 bg-stone-50 text-stone-400 hover:bg-black hover:text-amber-500 rounded-xl transition-all active:scale-90"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-dashed border-stone-200">
                <p className="text-[11px] text-stone-500 font-medium leading-relaxed italic">
                  "{template.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1. NOTIFICAÇÃO PUSH GLOBAL */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-100 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Bell size={20} />
          </div>
          <div>
            <h3 className="font-black text-stone-900 text-sm uppercase tracking-tight">Notificação na App</h3>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Push para todos os clientes</p>
          </div>
        </div>

        <form onSubmit={handleSendNotif} className="space-y-4">
          <input 
            type="text" 
            placeholder="Título da Notificação"
            value={notifTitle}
            onChange={e => setNotifTitle(e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800 text-sm"
          />
          <textarea 
            placeholder="Escreva a sua mensagem aqui..."
            value={notifMsg}
            onChange={e => setNotifMsg(e.target.value)}
            rows={3}
            className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800 text-sm resize-none"
          />
          <button 
            type="submit"
            className="w-full bg-black text-amber-500 py-4 rounded-[1.8rem] font-black flex items-center justify-center gap-3 hover:bg-stone-900 transition-all active:scale-95 shadow-xl"
          >
            <Send size={18} />
            Lançar Notificação
          </button>
        </form>
      </section>

      {/* 2. BANNER DE ANÚNCIO PRINCIPAL */}
      <section className="bg-black p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Megaphone size={120} className="text-amber-500" />
        </div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-white/10 rounded-2xl text-amber-500">
            <Megaphone size={20} />
          </div>
          <div>
            <h3 className="font-black text-white text-sm uppercase tracking-tight">Banner da Home</h3>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-0.5">Aviso fixo para todos</p>
          </div>
        </div>

        <form onSubmit={handleUpdateBanner} className="space-y-4 relative z-10">
          <input 
            type="text" 
            placeholder="Ex: Próxima semana o salão fecha às 18h."
            value={bannerMsg}
            onChange={e => setBannerMsg(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-white text-sm"
          />
          <div className="flex gap-2">
            <button 
              type="submit"
              className="flex-1 bg-amber-500 text-black py-4 rounded-[1.8rem] font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-amber-500/10"
            >
              Atualizar Banner
            </button>
            {currentAnnouncement && (
              <button 
                type="button"
                onClick={() => { onUpdateAnnouncement(null); setBannerMsg(''); showSuccess('Banner removido!'); }}
                className="w-14 bg-red-500/20 text-red-500 rounded-[1.8rem] flex items-center justify-center active:scale-95"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </form>
      </section>

      <div className="mt-10 p-6 text-center">
        <p className="text-[9px] text-stone-300 font-black uppercase tracking-[0.4em]">Ferramentas de Crescimento Paulo Jorge</p>
      </div>
    </div>
  );
};

export default BroadcastCenter;
