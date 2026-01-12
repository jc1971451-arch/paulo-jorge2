
import React from 'react';

interface SplashProps {
  logo: string;
}

const Splash: React.FC<SplashProps> = ({ logo }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#050505] text-white relative">
      {/* Background radial gradient sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="w-56 h-56 rounded-full border-[1px] border-amber-500/30 p-2 shadow-[0_0_80px_rgba(217,119,6,0.15)] mb-10 overflow-hidden bg-black flex items-center justify-center">
          <img 
            src={logo} 
            alt="Paulo Jorge Barbershop" 
            className="w-full h-full object-cover scale-100"
          />
        </div>
        
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            PAULO JORGE
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-amber-500/40"></div>
            <p className="text-amber-500 font-bold tracking-[0.6em] text-[9px] uppercase">Barbershop</p>
            <div className="h-[1px] w-8 bg-amber-500/40"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-20 flex flex-col items-center gap-4 z-10">
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-amber-500/50 rounded-full animate-pulse delay-75"></div>
          <div className="w-1 h-1 bg-amber-500/20 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
