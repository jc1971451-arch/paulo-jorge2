
import React, { useState, useRef } from 'react';
import { Service } from '../types';
import { ChevronLeft, Plus, Trash2, Edit, Scissors, Clock, X, Check, Euro, Camera, Image as ImageIcon } from 'lucide-react';

interface ManageServicesProps {
  services: Service[];
  onUpdate: (services: Service[]) => void;
  onBack: () => void;
}

const ManageServices: React.FC<ManageServicesProps> = ({ services, onUpdate, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '30',
    image: ''
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        price: service.price_eur.toString(),
        duration: service.duration_minutes.toString(),
        image: service.image || ''
      });
    } else {
      setEditingService(null);
      setFormData({ name: '', price: '', duration: '30', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente apagar este serviço do seu preçário?')) {
      onUpdate(services.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: editingService?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price_eur: parseFloat(formData.price),
      duration_minutes: parseInt(formData.duration),
      image: formData.image,
      active: true
    };

    if (editingService) {
      onUpdate(services.map(s => s.id === editingService.id ? newService : s));
    } else {
      onUpdate([...services, newService]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <header className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-black text-amber-500 px-6 py-3 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-transform flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Serviço
        </button>
      </header>

      <div className="mb-8 px-1">
        <h2 className="text-2xl font-black text-stone-900 leading-tight">Preçário de Serviços</h2>
        <p className="text-stone-400 text-sm mt-1">Edite os preços e as fotos dos seus trabalhos.</p>
      </div>

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-[2.5rem] border border-white shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border border-stone-100 shrink-0">
                {service.image ? (
                  <img src={service.image} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full bg-stone-50 flex items-center justify-center text-stone-200">
                    <Scissors size={20} />
                  </div>
                )}
              </div>
              <div>
                <p className="font-black text-stone-900 text-sm uppercase tracking-tight leading-tight">{service.name}</p>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="text-amber-600 font-black text-base">{service.price_eur.toFixed(2)}€</span>
                  <div className="flex items-center text-stone-300 text-[9px] gap-1 font-black uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{service.duration_minutes} min</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => handleOpenModal(service)}
                className="w-10 h-10 flex items-center justify-center bg-stone-50 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-200 hover:text-red-500 rounded-xl transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Formulário */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-stone-900">
                {editingService ? 'Ajustar Serviço' : 'Novo Serviço'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* UPLOAD DE FOTO DO SERVIÇO */}
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-40 h-40 bg-stone-50 rounded-[2.5rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative group"
                >
                  {formData.image ? (
                    <>
                      <img src={formData.image} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white" size={24} />
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="mx-auto text-stone-300 mb-2" size={32} />
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Adicionar Foto</p>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Nome do Serviço</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800"
                  placeholder="Ex: Skin Fade Premium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Preço (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-4 text-stone-300" size={16} />
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-100 p-4 pl-10 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Duração (min)</label>
                  <select 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-800"
                  >
                    <option value="15">15 min</option>
                    <option value="20">20 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 hora</option>
                    <option value="90">1h 30min</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-amber-500 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 mt-4 hover:bg-stone-900 transition-all shadow-xl shadow-stone-200 active:scale-95"
              >
                <Check size={20} />
                Guardar Serviço
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
