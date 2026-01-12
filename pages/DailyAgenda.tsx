
import React, { useState } from 'react';
import { Appointment, Service, Professional } from '../types';
import { ChevronLeft, Calendar as CalendarIcon, User, Scissors, Clock, Filter, ChevronRight, ChevronLeft as ChevronLeftIcon } from 'lucide-react';

interface DailyAgendaProps {
  appointments: Appointment[];
  services: Service[];
  professionals: Professional[];
  onBack: () => void;
}

const DailyAgenda: React.FC<DailyAgendaProps> = ({ appointments, services, professionals, onBack }) => {
  const [selectedProfId, setSelectedProfId] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const getService = (id: string) => services.find(s => s.id === id);
  const getProfessional = (id: string) => professionals.find(p => p.id === id);

  const filtered = appointments
    .filter(a => (selectedProfId === 'all' || a.professional_id === selectedProfId) && a.date === selectedDate)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // Cálculo de estatísticas do dia selecionado
  const dailyRevenue = filtered
    .filter(a => a.status === 'confirmado')
    .reduce((acc, a) => acc + (getService(a.service_id)?.price_eur || 0), 0);

  const changeDate = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600 active:scale-95 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Agenda Master</h2>
        </div>
        <div className="bg-black text-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          {dailyRevenue.toFixed(2)}€ Hoje
        </div>
      </div>

      {/* Seletor de Data Premium */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-stone-100 mb-8 flex items-center justify-between">
        <button onClick={() => changeDate(-1)} className="p-2 hover:bg-stone-50 rounded-xl text-stone-400">
          <ChevronLeftIcon size={20} />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em]">Data Selecionada</p>
          <p className="font-black text-stone-900">
            {new Date(selectedDate).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 hover:bg-stone-50 rounded-xl text-stone-400">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Filtro de Staff */}
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar mb-4">
        <button 
          onClick={() => setSelectedProfId('all')}
          className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all shadow-sm uppercase tracking-widest ${
            selectedProfId === 'all' ? 'bg-black text-amber-500 shadow-amber-200/20' : 'bg-white text-stone-400 border border-white'
          }`}
        >
          Todos os Barbeiros
        </button>
        {professionals.map(p => (
          <button 
            key={p.id}
            onClick={() => setSelectedProfId(p.id)}
            className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black transition-all shadow-sm uppercase tracking-widest ${
              selectedProfId === p.id ? 'bg-black text-amber-500 shadow-amber-200/20' : 'bg-white text-stone-400 border border-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-stone-100">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={32} className="text-stone-200" />
            </div>
            <p className="text-stone-400 font-bold text-sm uppercase tracking-tight">Nenhuma marcação para este dia.</p>
          </div>
        ) : (
          filtered.map(app => {
            const service = getService(app.service_id);
            const prof = getProfessional(app.professional_id);
            const isCancelled = app.status === 'cancelado';

            return (
              <div key={app.id} className={`flex gap-4 items-start ${isCancelled ? 'opacity-40 grayscale' : ''}`}>
                <div className="w-14 flex flex-col items-center pt-2 shrink-0">
                  <span className="text-sm font-black text-stone-900 leading-none">{app.start_time}</span>
                  <div className={`w-[2px] h-20 my-2 rounded-full ${isCancelled ? 'bg-stone-200' : 'bg-amber-200'}`}></div>
                </div>
                
                <div className={`flex-1 p-5 rounded-[2rem] border relative overflow-hidden transition-all ${
                  isCancelled ? 'bg-stone-50 border-stone-100' : 'bg-white border-white shadow-xl shadow-stone-200/30'
                }`}>
                  {isCancelled && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">
                      Cancelado
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-[9px] text-stone-300 font-black uppercase tracking-widest mb-1">Cliente</p>
                    <h4 className="font-black text-stone-900 text-base uppercase tracking-tight">
                      {/* Simulação de nome de cliente para o Admin */}
                      {app.user_id === 'client1' ? 'João Silva' : `Cliente #${app.id.slice(-4).toUpperCase()}`}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                        <Scissors size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-stone-600">{service?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                      <img src={prof?.image} className="w-4 h-4 rounded-full object-cover" alt="" />
                      <span className="text-[9px] font-black text-stone-400 uppercase">{prof?.name.split(' ')[0]}</span>
                    </div>
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

export default DailyAgenda;
