
import React, { useRef, useState } from 'react';
import { User } from '../types';
import { 
  LogOut, 
  User as UserIcon, 
  Settings, 
  Phone, 
  Mail, 
  HelpCircle, 
  Camera, 
  Smartphone,
  Check,
  X,
  Edit3,
  Share2,
  MessageCircle,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_RULES } from '../constants';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onOpenChat: () => void;
  unreadChatCount: number;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onUpdateUser, onOpenChat, unreadChatCount }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.display_name);
  const [editPhone, setEditPhone] = useState(user.phone);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleShareApp = () => {
    const shareData = {
      title: 'Paulo Jorge Barbershop',
      text: 'Marca o teu corte na nova App do Paulo Jorge!',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('Link copiado para a área de transferência!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleSupport = () => {
    const message = encodeURIComponent(`Olá Paulo Jorge, estou a usar a App e preciso de ajuda com a minha conta.`);
    window.open(`https://wa.me/${BUSINESS_RULES.ADMIN_WHATSAPP}?text=${message}`, '_blank');
  };

  const handleSave = () => {
    onUpdateUser({ ...user, display_name: editName, phone: editPhone });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.display_name);
    setEditPhone(user.phone);
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ ...user, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-stone-50 min-h-full pb-32">
      <header className="mb-10 flex flex-col items-center">
        <div className="relative group cursor-pointer mb-6" onClick={handleAvatarClick}>
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-amber-500 shadow-2xl overflow-hidden relative">
            {user.image ? (
              <img src={user.image} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={56} className="text-stone-300" />
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 bg-black p-2.5 rounded-2xl text-amber-500 shadow-lg border-2 border-white">
            <Edit3 size={16} />
          </div>
        </div>
        
        <div className="text-center mb-6 w-full px-4">
          {isEditing ? (
            <input 
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="text-2xl font-black text-stone-900 bg-white border-b-2 border-amber-500 outline-none text-center w-full pb-1"
            />
          ) : (
            <h2 className="text-2xl font-black text-stone-900 uppercase italic tracking-tighter">{user.display_name}</h2>
          )}
          <div className="bg-amber-500 px-4 py-1 rounded-full mt-2 inline-block">
            <p className="text-black font-black uppercase text-[9px] tracking-widest">{user.role === 'admin' ? 'Proprietário' : 'Cliente VIP'}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-2 mb-6 animate-in fade-in zoom-in">
            <button onClick={handleSave} className="bg-black text-amber-500 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Check size={14} /> Guardar
            </button>
            <button onClick={handleCancel} className="bg-white text-stone-400 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border border-stone-100">
              <X size={14} /> Cancelar
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="mb-6 text-stone-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
             <Settings size={14} /> Gerir Dados Pessoais
          </button>
        )}
        
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <input type="file" ref={cameraInputRef} onChange={handleFileChange} accept="image/*" capture="user" className="hidden" />
      </header>

      <div className="space-y-4">
        {/* NOVO: CHAT PRIVADO INTERNO */}
        <button 
          onClick={onOpenChat}
          className="w-full p-6 bg-amber-500 text-black rounded-[2.5rem] flex items-center justify-between group active:scale-95 transition-all shadow-xl shadow-amber-200 relative"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black rounded-2xl text-amber-500">
              <MessageSquare size={20} />
            </div>
            <div className="text-left">
              <p className="font-black text-sm uppercase tracking-tight">Chat com Paulo Jorge</p>
              <p className="text-[9px] text-black/60 font-black uppercase tracking-widest">Conversa Privada na App</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {unreadChatCount > 0 && (
               <div className="bg-black text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-black animate-bounce">
                  {unreadChatCount}
               </div>
             )}
             <ChevronRight size={20} className="text-black/30" />
          </div>
        </button>

        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden my-6">
          <div className="p-5 border-b border-stone-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
              <Mail size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] text-stone-300 uppercase font-black tracking-widest">E-mail</p>
              <p className="font-bold text-stone-900 text-sm truncate">{user.email}</p>
            </div>
          </div>
          <div className={`p-5 flex items-center gap-4 ${isEditing ? 'bg-amber-50/30' : ''}`}>
            <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-stone-300 uppercase font-black tracking-widest">Telemóvel</p>
              {isEditing ? (
                <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full bg-transparent font-bold text-stone-900 outline-none border-b border-amber-500/50" />
              ) : (
                <p className="font-bold text-stone-900 text-sm">{user.phone}</p>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleShareApp}
          className="w-full p-6 bg-black text-amber-500 rounded-[2.5rem] flex items-center justify-between group active:scale-95 transition-all shadow-xl shadow-stone-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Share2 size={20} />
            </div>
            <div className="text-left">
              <p className="font-black text-sm uppercase tracking-tight">Recomendar a App</p>
              <p className="text-[9px] text-stone-500 font-black uppercase tracking-widest">Ganha pontos no próximo corte</p>
            </div>
          </div>
          <ChevronRight size={20} />
        </button>

        <button 
          onClick={handleSupport}
          className="w-full p-6 bg-white border border-stone-100 rounded-[2.5rem] flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600">
              <MessageCircle size={20} />
            </div>
            <div className="text-left">
              <p className="font-black text-stone-900 text-sm uppercase tracking-tight">Suporte WhatsApp</p>
              <p className="text-[9px] text-stone-400 font-black uppercase tracking-widest">Ajuda Urgente</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-stone-300" />
        </button>

        <button 
          onClick={onLogout}
          className="w-full p-6 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest mt-6 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          Terminar Sessão
        </button>
      </div>

      <p className="text-center text-stone-300 text-[9px] font-black uppercase tracking-[0.5em] mt-12 mb-10">
        PAULO JORGE BARBERSHOP • VERSÃO CLIENTE 1.0
      </p>
    </div>
  );
};

export default Profile;
