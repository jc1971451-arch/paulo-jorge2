
import React, { useRef } from 'react';
import { ChevronLeft, Camera, Image as ImageIcon, CheckCircle2, RotateCcw } from 'lucide-react';

interface AppearanceSettingsProps {
  currentLogo: string;
  currentBg: string;
  onUpdateLogo: (url: string) => void;
  onUpdateBg: (url: string) => void;
  onBack: () => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ 
  currentLogo, 
  currentBg, 
  onUpdateLogo, 
  onUpdateBg, 
  onBack 
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, updater: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updater(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = () => {
    if (confirm('Deseja repor as imagens originais da aplicação?')) {
      onUpdateLogo("https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg");
      onUpdateBg("https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg");
    }
  };

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight italic">Aparência</h2>
        </div>
        <button 
          onClick={resetToDefault}
          className="p-2 bg-stone-100 text-stone-400 rounded-xl hover:text-amber-600 transition-colors"
          title="Repor Originais"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <header className="mb-8">
        <h3 className="text-2xl font-black text-stone-900 leading-tight">Identidade Visual</h3>
        <p className="text-stone-400 text-sm mt-1">Carrega o teu logo e muda o fundo do login.</p>
      </header>

      <div className="space-y-8">
        {/* Gestão do Logo */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Logo Oficial</p>
              <p className="font-bold text-stone-900 text-xs">Aparece no Splash e Cabeçalhos</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-black rounded-full border-4 border-amber-500/10 shadow-xl overflow-hidden mb-6 relative group">
              <img src={currentLogo} alt="Logo Atual" className="w-full h-full object-cover" />
              <button 
                onClick={() => logoInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="text-white mb-2" size={24} />
                <span className="text-[8px] text-white font-black uppercase tracking-widest">Mudar Logo</span>
              </button>
            </div>
            
            <button 
              onClick={() => logoInputRef.current?.click()}
              className="w-full bg-stone-50 text-stone-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-stone-100 active:scale-95 transition-all"
            >
              Escolher Novo Logo
            </button>
          </div>
          <input 
            type="file" 
            ref={logoInputRef} 
            onChange={(e) => handleImageChange(e, onUpdateLogo)} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Gestão do Fundo de Login */}
        <div className="bg-black p-6 rounded-[2.5rem] shadow-2xl border border-amber-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <ImageIcon size={100} className="text-amber-500" />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-white/10 rounded-2xl text-amber-500">
              <ImageIcon size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Fundo de Login</p>
              <p className="font-bold text-white text-xs">Imagem imersiva do ecrã inicial</p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="w-full h-40 bg-stone-900 rounded-[2rem] overflow-hidden mb-6 border border-white/5 relative group">
              <img src={currentBg} alt="Background Atual" className="w-full h-full object-cover opacity-50 grayscale" />
              <button 
                onClick={() => bgInputRef.current?.click()}
                className="absolute inset-0 bg-amber-500/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="text-white mb-2" size={24} />
                <span className="text-[8px] text-white font-black uppercase tracking-widest">Alterar Fundo</span>
              </button>
            </div>

            <button 
              onClick={() => bgInputRef.current?.click()}
              className="w-full bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 active:scale-95 transition-all"
            >
              Carregar Nova Imagem
            </button>
          </div>
          <input 
            type="file" 
            ref={bgInputRef} 
            onChange={(e) => handleImageChange(e, onUpdateBg)} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      <div className="mt-10 p-6 bg-amber-50 rounded-[2.5rem] text-center border border-amber-100">
         <p className="text-[10px] text-amber-800 font-black uppercase tracking-widest mb-1">Atenção</p>
         <p className="text-amber-900/60 text-[10px] font-bold leading-relaxed uppercase tracking-tight">
           Usa imagens de alta qualidade (PNG ou JPG) para que a App mantenha o aspeto profissional. As alterações são guardadas automaticamente.
         </p>
      </div>
    </div>
  );
};

export default AppearanceSettings;
