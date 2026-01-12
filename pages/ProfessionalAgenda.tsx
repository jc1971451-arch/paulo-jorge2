
import React from 'react';
import { Appointment, Service } from '../types';
import { Clock, User, Scissors, CheckCircle2, Circle } from 'lucide-react';

interface ProfessionalAgendaProps {
  appointments: Appointment[];
  services: Service[];
  professionalId: string;
  onUpdateStatus: (id: string, status: 'confirmado' | 'concluido') => void;
}

const ProfessionalAgenda: React.FC<ProfessionalAgendaProps> = ({ appointments, services, professionalId, onUpdateStatus }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const myAppointments = appointments
    .filter(a => a.professional_id === professionalId && a.date === today && a.status !== 'cancelado')
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  const getService = (id: string) => services.find(s => s.id === id);

  return (
    <div className="p-6 bg-[#F8F9FE] min-h-full pb-32">
      <header className="mb-8">
        <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Agenda Pessoal</p>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight italic">O MEU DIA HOJE</h2>
        <div className="mt-2 inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-stone-100 shadow-sm">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
             {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long' })}
           </span>
        </div>
      </header>

      {myAppointments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <Clock className="text-stone-200" size={32} />
          </div>
          <p className="text-stone-400 font-bold text-sm uppercase tracking-tight">Sem marcações para hoje.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myAppointments.map(app => {
            const service = getService(app.service_id);
            const isDone = app.status === 'concluido';

            return (
              <div 
                key={app.id}
                className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${
                  isDone ? 'bg-stone-50 border-transparent opacity-60' : 'bg-white border-white shadow-xl shadow-stone-200/50'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={12} className="text-amber-500" />
                      <span className="text-base font-black text-stone-900">{app.start_time}</span>
                    </div>
                    <h3 className="font-black text-stone-900 text-lg leading-none uppercase tracking-tight">
                      {app.user_id === 'client1' ? 'João Silva' : `Cliente #${app.id.slice(-4).toUpperCase()}`}
                    </h3>
                  </div>
                  <button 
                    onClick={() => onUpdateStatus(app.id, isDone ? 'confirmado' : 'concluido')}
                    className={`p-3 rounded-2xl transition-all ${isDone ? 'bg-green-500 text-white' : 'bg-stone-50 text-stone-300'}`}
                  >
                    {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                </div>

                <div className="flex items-center gap-4 py-4 border-t border-stone-50">
                   <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <Scissors size={18} />
                   </div>
                   <div>
                      <p className="text-[9px] text-stone-300 font-black uppercase tracking-widest">Serviço</p>
                      <p className="text-xs font-bold text-stone-600">{service?.name}</p>
                   </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                   <User size={12} className="text-stone-300" />
                   <span className="text-[10px] font-bold text-stone-400 uppercase">Ver detalhes do cliente</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-6 bg-black rounded-[2.5rem] text-center shadow-2xl">
        <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">Dica de Produtividade</p>
        <p className="text-white/60 text-[11px] leading-relaxed">
          Marque os serviços como concluídos para ajudar o Paulo a ter as contas em dia!
        </p>
      </div>
    </div>
  );
};

export default ProfessionalAgenda;
