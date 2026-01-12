
import React, { useState } from 'react';
import { MOCK_CLIENT, MOCK_ADMIN } from '../constants';
import { User, Professional } from '../types';
import { AlertCircle, Mail, Lock, User as UserIcon, Smartphone, ChevronRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
  professionals: Professional[];
  logo: string;
  background: string;
}

const Auth: React.FC<AuthProps> = ({ onLogin, professionals, logo, background }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const lowEmail = email.toLowerCase();

    if (isLogin) {
      const adminEmails = ['paulo@paulojorge.pt', 'jgexpressgrafica@gmail.com'];
      if (adminEmails.includes(lowEmail)) {
        if (password === 'admin123') {
          onLogin({
            ...MOCK_ADMIN,
            email: lowEmail,
            display_name: lowEmail === 'jgexpressgrafica@gmail.com' ? 'JG Express Gráfica' : 'Paulo Jorge'
          });
          return;
        } else {
          setError('Palavra-passe de administrador incorreta.');
          return;
        }
      }

      const foundProf = professionals.find(p => p.email.toLowerCase() === lowEmail);
      if (foundProf) {
        if (password === (foundProf.password || 'staff123')) {
          onLogin({
            id: `user-${foundProf.id}`,
            display_name: foundProf.name,
            email: foundProf.email,
            phone: '900000000',
            role: 'profissional',
            professional_id: foundProf.id,
            image: foundProf.image
          });
          return;
        } else {
          setError('Palavra-passe de profissional incorreta.');
          return;
        }
      }

      if (password === '123456') {
        onLogin({ ...MOCK_CLIENT, email: lowEmail });
      } else {
        setError('Acesso negado. Verifique os seus dados.');
      }
    } else {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        display_name: name,
        email: lowEmail,
        phone: phone,
        role: 'cliente'
      });
    }
  };

  return (
    <div className="relative h-full w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-6 text-white">
      {/* IMAGEM NO FUNDO DINÂMICA */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <img 
          src={background} 
          alt="Background Branding" 
          className="w-[150%] max-w-none grayscale brightness-50 contrast-125 scale-125 object-cover h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in duration-1000">
        {/* Logo Principal DINÂMICO */}
        <div className="text-center mb-8">
          <div className="inline-block p-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-[0_0_50px_rgba(217,119,6,0.3)] mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-black bg-black">
               <img 
                src={logo} 
                alt="Paulo Jorge Barbershop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-black text-white italic tracking-tighter uppercase">
            Paulo Jorge
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
             <div className="h-[1px] w-4 bg-amber-500/50"></div>
             <p className="text-amber-500 font-bold text-[8px] uppercase tracking-[0.4em]">Barbershop</p>
             <div className="h-[1px] w-4 bg-amber-500/50"></div>
          </div>
        </div>

        {/* Card de Autenticação */}
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl">
          <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-2xl border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-white/40'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-white/40'}`}
            >
              Registar
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold uppercase">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  required
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-4 rounded-2xl focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/10 text-sm"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors" size={16} />
              <input 
                type="email" 
                required
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-4 rounded-2xl focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/10 text-sm"
              />
            </div>

            {!isLogin && (
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input 
                  type="tel" 
                  required
                  placeholder="Telemóvel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-4 rounded-2xl focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/10 text-sm"
                />
              </div>
            )}

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500 transition-colors" size={16} />
              <input 
                type="password" 
                required
                placeholder="Palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-4 rounded-2xl focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-white/10 text-sm"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-400 text-black py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-all mt-6 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Iniciar Sessão' : 'Criar Conta'}
              <ChevronRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 opacity-20">
        <p className="text-white text-[9px] font-black uppercase tracking-[0.5em]">Estilo • Tradição • Excelência</p>
      </div>
    </div>
  );
};

export default Auth;
