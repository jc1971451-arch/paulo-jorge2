
import React, { useState } from 'react';
import { Professional } from '../types';
import { ChevronLeft, Plus, UserPlus, X, Check, Trash2, Mail, Lock } from 'lucide-react';

interface ManageProfessionalsProps {
  professionals: Professional[];
  onUpdate: (profs: Professional[]) => void;
  onBack: () => void;
}

const ManageProfessionals: React.FC<ManageProfessionalsProps> = ({ professionals, onUpdate, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProf, setEditingProf] = useState<Professional | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    start_time: '09:00',
    end_time: '19:00'
  });

  const handleOpenModal = (prof?: Professional) => {
    if (prof) {
      setEditingProf(prof);
      setFormData({
        name: prof.name,
        email: prof.email || '',
        password: prof.password || 'staff123',
        start_time: prof.start_time,
        end_time: prof.end_time
      });
    } else {
      setEditingProf(null);
      setFormData({ name: '', email: '', password: '', start_time: '09:00', end_time: '19:00' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Eliminar este profissional da equipa?')) {
      onUpdate(professionals.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProf: Professional = {
      id: editingProf?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      start_time: formData.start_time,
      end_time: formData.end_time,
      services: editingProf?.services || ['s1', 's2', 's3'],
      working_days: editingProf?.working_days || ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      image: editingProf?.image || 'https://images.unsplash.com/photo-1503910368127-b44283ee1f66?auto=format&fit=crop&q=80&w=200'
    };

    if (editingProf) {
      onUpdate(professionals.map(p => p.id === editingProf.id ? newProf : p));
    } else {
      onUpdate([...professionals, newProf]);
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
          className="bg-black text-amber-500 p-3 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          <UserPlus size={24} />
        </button>
      </header>

      <div className="mb-8 px-1">
        <h2 className="text-2xl font-black text-stone-900 leading-tight">Gestão de Staff</h2>
        <p className="text-stone-400 text-sm mt-1">Crie cotas de acesso para os seus barbeiros.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {professionals.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-5">
            <img src={p.image} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-amber-500/10 shadow-sm" alt="" />
            <div className="flex-1">
              <p className="font-black text-stone-900 text-sm uppercase tracking-tight">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold">{p.email}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => handleOpenModal(p)}
                className="bg-stone-50 p-3 rounded-xl text-stone-400 hover:text-amber-600 transition-colors"
              >
                <Plus size={16} />
              </button>
              <button 
                onClick={() => handleDelete(p.id)}
                className="bg-red-50 p-3 rounded-xl text-red-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-stone-900">
                {editingProf ? 'Editar Acesso' : 'Criar Cota de Staff'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-stone-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                  placeholder="Nome do colaborador"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">E-mail de Login</label>
                <div className="relative">
                   <Mail className="absolute left-4 top-4 text-stone-300" size={18} />
                   <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    placeholder="email@barbearia.pt"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Palavra-passe</label>
                <div className="relative">
                   <Lock className="absolute left-4 top-4 text-stone-300" size={18} />
                   <input 
                    required
                    type="password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Início Turno</label>
                  <input 
                    type="time" 
                    value={formData.start_time}
                    onChange={e => setFormData({...formData, start_time: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-2 block">Fim Turno</label>
                  <input 
                    type="time" 
                    value={formData.end_time}
                    onChange={e => setFormData({...formData, end_time: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl font-bold"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-amber-500 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 mt-4 active:scale-95 shadow-xl"
              >
                <Check size={20} />
                Guardar Cota
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfessionals;
