
import React, { useRef, useState, useEffect } from 'react';
import { Play, Heart, MessageCircle, Share2, CalendarCheck2 } from 'lucide-react';

interface Clip {
  id: string;
  videoUrl: string;
  thumbnail: string;
  barber: string;
  service: string;
  likes: string;
  comments: string;
}

const MOCK_CLIPS: Clip[] = [
  {
    id: 'c1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-hair-with-a-machine-42468-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400',
    barber: 'Paulo Jorge',
    service: 'Skin Fade Premium',
    likes: '1.2k',
    comments: '45'
  },
  {
    id: 'c2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barber-shaving-a-man-with-a-razor-42470-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1512690196236-d400787e8140?auto=format&fit=crop&q=80&w=400',
    barber: 'Ricardo Silva',
    service: 'Barba Tradicional',
    likes: '850',
    comments: '12'
  },
  {
    id: 'c3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-barber-cutting-hair-42467-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621605815841-aa33c56317bc?auto=format&fit=crop&q=80&w=400',
    barber: 'Paulo Jorge',
    service: 'Corte Artístico',
    likes: '2.4k',
    comments: '89'
  }
];

interface VideoFeedProps {
  onBookNow: () => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ onBookNow }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {MOCK_CLIPS.map((clip, idx) => (
        <VideoItem 
          key={clip.id} 
          clip={clip} 
          isActive={idx === activeIndex} 
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
};

const VideoItem: React.FC<{ clip: Clip; isActive: boolean; onBookNow: () => void }> = ({ clip, isActive, onBookNow }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-screen w-full snap-start relative flex items-center justify-center bg-stone-900">
      <video 
        ref={videoRef}
        src={clip.videoUrl}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-6 bg-black/20 backdrop-blur-sm rounded-full text-white/80 scale-110">
            <Play size={48} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Overlays Laterais (Ações) */}
      <div className="absolute right-4 bottom-36 flex flex-col gap-6 items-center z-20">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`p-3 rounded-full backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
            <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">{clip.likes}</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-white/20 transition-all">
            <MessageCircle size={24} />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">{clip.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-white/20 transition-all">
            <Share2 size={24} />
          </div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">Share</span>
        </button>
      </div>

      {/* Info do Clip e CTA */}
      <div className="absolute bottom-6 left-6 right-20 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl border-2 border-amber-500 overflow-hidden shadow-xl bg-black">
             <img src="https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Paulo Jorge Barbershop</p>
            <h4 className="text-white font-black text-lg uppercase tracking-tight italic flex items-center gap-2">
              {clip.barber}
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            </h4>
          </div>
        </div>

        <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/5 inline-block">
          Trabalho de hoje: <span className="text-amber-400 font-bold">{clip.service}</span>. Inspira-te! 🔥
        </p>

        {/* BOTÃO ATUALIZADO: AGENDAR AGORA */}
        <button 
          onClick={onBookNow}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-400 text-black py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(217,119,6,0.3)] active:scale-95 transition-all animate-in slide-in-from-bottom duration-700"
        >
          <CalendarCheck2 size={20} />
          Agendar Agora
        </button>
      </div>

      {/* Gradiente de fundo para leitura */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoFeed;
