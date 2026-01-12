
import React, { useState } from 'react';
import { Camera, Maximize2, X, Plus, Filter } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  category: 'cabelo' | 'barba' | 'espaco';
  title: string;
}

const MOCK_PHOTOS: Photo[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1503910368127-b44283ee1f66?auto=format&fit=crop&q=80&w=800', category: 'cabelo', title: 'Fade Moderno' },
  { id: '2', url: 'https://images.unsplash.com/photo-1621605815841-aa33c56317bc?auto=format&fit=crop&q=80&w=800', category: 'barba', title: 'Barba Alinhada' },
  { id: '3', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800', category: 'espaco', title: 'Nossa Barbearia' },
  { id: '4', url: 'https://images.unsplash.com/photo-1599351431247-f577f5d889d7?auto=format&fit=crop&q=80&w=800', category: 'cabelo', title: 'Clássico Scissor Cut' },
  { id: '5', url: 'https://images.unsplash.com/photo-1622286332616-f71bd3cdeb97?auto=format&fit=crop&q=80&w=800', category: 'cabelo', title: 'Design Artístico' },
  { id: '6', url: 'https://images.unsplash.com/photo-1512690196236-d400787e8140?auto=format&fit=crop&q=80&w=800', category: 'barba', title: 'Cuidado Completo' },
];

interface GalleryPageProps {
  userRole: string;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ userRole }) => {
  const [filter, setFilter] = useState<string>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = filter === 'todos' 
    ? MOCK_PHOTOS 
    : MOCK_PHOTOS.filter(p => p.category === filter);

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Lookbook</p>
          <h2 className="text-3xl font-black text-stone-900 leading-none italic">GALERIA</h2>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-stone-300 border border-stone-100 shadow-sm">
          <Camera size={24} />
        </div>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        {['todos', 'cabelo', 'barba', 'espaco'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === cat ? 'bg-black text-amber-500 shadow-lg' : 'bg-white text-stone-400 border border-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-2 gap-4">
        {filteredPhotos.map((photo, idx) => (
          <div 
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className={`relative rounded-[2rem] overflow-hidden bg-white shadow-sm group active:scale-[0.98] transition-all ${
              idx % 3 === 0 ? 'col-span-1 h-64' : 'h-48'
            }`}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-white font-black text-[10px] uppercase tracking-widest">{photo.title}</p>
            </div>
            <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Admin Upload Button */}
      {userRole === 'admin' && (
        <button className="fixed bottom-28 right-10 w-16 h-16 bg-amber-500 text-black rounded-full shadow-2xl flex items-center justify-center animate-bounce z-[60]">
          <Plus size={32} />
        </button>
      )}

      {/* Modal de Zoom */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-10 right-10 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="w-full max-w-lg">
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title}
              className="w-full h-auto rounded-[3rem] shadow-2xl animate-in zoom-in duration-500"
            />
            <div className="mt-8 text-center">
              <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {selectedPhoto.category}
              </span>
              <h3 className="text-white text-2xl font-black mt-4 uppercase italic">{selectedPhoto.title}</h3>
              <p className="text-white/40 text-[10px] mt-2 font-bold uppercase tracking-widest">Paulo Jorge Barbershop – Estilo Premium</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 p-8 bg-black rounded-[3rem] border border-amber-500/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Camera size={80} className="text-amber-500" />
        </div>
        <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] mb-2">Inspirado?</p>
        <p className="text-white/60 text-xs font-medium leading-relaxed italic">
          "O teu estilo é a nossa arte. Escolhe o teu look e deixa o resto connosco."
        </p>
      </div>
    </div>
  );
};

export default GalleryPage;
