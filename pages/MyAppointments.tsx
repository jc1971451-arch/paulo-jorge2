
import React from 'react';
import { Appointment, Service, Professional } from '../types';
import { Calendar, Clock, Scissors, AlertCircle, Info, MessageCircle } from 'lucide-react';
import { BUSINESS_RULES } from '../constants';

interface MyAppointmentsProps {
  appointments: Appointment[];
  services: Service[];
  professionals: Professional[];
  onCancel: (id: string) => void;
}

const MyAppointments: React.FC<MyAppointmentsProps> = ({ appointments, services, professionals, onCancel }) => {
  const getService = (id: string) => services.find(s => s.id === id);
  const getProfessional = (id: string) => professionals.find(p => p.id === id);

  const canCancelOnline = (date: string, startTime: string) => {
    const appointmentDate = new Date(`${date}T${startTime}`);
    const now = new Date();
    const diffInMilliseconds = appointmentDate.getTime() - now.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours >= BUSINESS_RULES.CANCELLATION_LIMIT_HOURS;
  };

  const handleCancelClick = (id: string) => {
    if (window.confirm('Tem a certeza que deseja cancelar esta marcação online?')) {
      onCancel(id);
    }
  };

  const handleWhatsAppCancel = (date: string, time: string, serviceName: string) => {
    const message = encodeURIComponent(`Olá Paulo Jorge, gostaria de solicitar o cancelamento da minha marcação de ${serviceName} agendada para o dia ${date} às ${time}.`);
    window.open(`https://wa.me/${BUSINESS_RULES.ADMIN_WHATSAPP}?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 bg-[#F8F9FE] h-full pb-32">
      <header className="mb-8">
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">As Minhas Marcações</h2>
        <p className="text-stone-400 text-sm mt-1">Gira os teus horários e serviços.</p>
      </header>

      {appointments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
          <Calendar className="mx-auto text-stone-100 mb-4" size={48} />
          <p className="text-stone-400 font-medium">Ainda não tem marcações agendadas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.sort((a, b) => b.created_time - a.created_time).map(app => {
            const service = getService(app.service_id);
            const prof = getProfessional(app.professional_id);
            const isCancelled = app.status === 'cancelado';
            const allowedToCancel = canCancelOnline(app.date, app.start_time);

            return (
              <div 
                key={app.id} 
                className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${
                  isCancelled 
                    ? 'bg-stone-50 border-stone-100 grayscale opacity-60' 
                    : 'bg-white border-white shadow-xl shadow-stone-200/50'
                }`}
              >
                {isCancelled && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                    Cancelado
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em] mb-1">Serviço Agendado</p>
                    <h3 className="font-black text-stone-900 text-xl leading-none">{service?.name}</h3>
                  </div>
                  {!isCancelled && (
                    <span className="text-stone-900 font-black text-lg">{service?.price_eur.toFixed(2)}€</span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-amber-600">
                       <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-stone-300 font-black uppercase tracking-widest">Data e Hora</p>
                      <p className="text-xs font-bold text-stone-600">
                        {new Date(app.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })} às {app.start_time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-amber-600">
                      <Scissors size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-stone-300 font-black uppercase tracking-widest">Profissional</p>
                      <p className="text-xs font-bold text-stone-600">{prof?.name}</p>
                    </div>
                  </div>
                </div>

                {!isCancelled && (
                  <div className="pt-4 border-t border-stone-50 space-y-3">
                    {allowedToCancel ? (
                      <button 
                        onClick={() => handleCancelClick(app.id)}
                        className="w-full bg-white border-2 border-red-50 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95"
                      >
                        Cancelar Online Agora
                      </button>
                    ) : (
                      <div className="space-y-3 animate-in fade-in zoom-in">
                        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                            Fora do prazo de cancelamento online (6h). Por favor, contacte o Paulo diretamente.
                          </p>
                        </div>
                        <button 
                          onClick={() => handleWhatsAppCancel(app.date, app.start_time, service?.name || '')}
                          className="w-full bg-[#25D366] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95 transition-all"
                        >
                          <MessageCircle size={16} fill="white" />
                          Pedir Cancelamento via WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100/50">
        <h4 className="font-black text-amber-900 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
          <Info size={14} />
          Sobre Cancelamentos
        </h4>
        <p className="text-[10px] text-amber-800/70 font-bold leading-relaxed uppercase tracking-tight">
          Pode cancelar qualquer serviço diretamente na aplicação até {BUSINESS_RULES.CANCELLATION_LIMIT_HOURS} horas antes do horário. Caso precise de cancelar com menos antecedência, utilize o botão de WhatsApp acima.
        </p>
      </div>
    </div>
  );
};

export default MyAppointments;
