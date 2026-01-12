
import React, { useState } from 'react';
import { Appointment, Service, Professional } from '../types';
import { ChevronLeft, Search, Filter, Scissors, User, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface AllAppointmentsProps {
  appointments: Appointment[];
  services: Service[];
  professionals: Professional[];
  onBack: () => void;
}

const AllAppointments: React.FC<AllAppointmentsProps> = ({ appointments, services, professionals, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getService = (id: string) => services.find(s => s.id === id);
  const getProfessional = (id: string) => professionals.find(p => p.id === id);

  const filtered = appointments
    .filter(app => {
      const service = getService(app.service_id);
      const prof = getProfessional(app.professional_id);
      const searchStr = `${service?.name} ${prof?.name} ${app.user_id}`.toLowerCase();
      
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.created_time - a.created_time);

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Histórico Master</h2>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-amber-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por cliente ou serviço..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-stone-100 py-4 pl-12 pr-6 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['all', 'confirmado', 'concluido', 'cancelado'].map(f => (
            <button 
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === f ? 'bg-black text-amber-500' : 'bg-white text-stone-400 border border-stone-50'
              }`}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-stone-100">
            <p className="text-stone-400 font-bold text-xs uppercase tracking-widest">Nenhum registo encontrado.</p>
          </div>
        ) : (
          filtered.map(app => {
            const service = getService(app.service_id);
            const prof = getProfessional(app.professional_id);
            
            return (
              <div key={app.id} className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {app.status === 'concluido' ? <CheckCircle2 size={12} className="text-green-500" /> : 
                       app.status === 'cancelado' ? <XCircle size={12} className="text-red-500" /> :
                       <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        app.status === 'concluido' ? 'text-green-600' : 
                        app.status === 'cancelado' ? 'text-red-500' : 'text-amber-600'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <h4 className="font-black text-stone-900 text-base uppercase tracking-tight">
                      {app.user_id === 'client1' ? 'João Silva' : `Cliente #${app.id.slice(-4).toUpperCase()}`}
                    </h4>
                  </div>
                  <span className="font-black text-stone-900 text-sm">
                    {service?.price_eur.toFixed(2)}€
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                      <Scissors size={14} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-600 truncate">{service?.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 overflow-hidden">
                      <img src={prof?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <p className="text-[10px] font-bold text-stone-600">{prof?.name.split(' ')[0]}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                      <Calendar size={14} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-600">
                      {new Date(app.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                      <Clock size={14} />
                    </div>
                    <p className="text-[10px] font-bold text-stone-600">{app.start_time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
