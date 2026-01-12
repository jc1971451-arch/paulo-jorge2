
import React from 'react';
import { Service, Professional, User, Appointment } from '../types';
import { ChevronLeft, MapPin, Scissors, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface ConfirmBookingProps {
  service: Service;
  professional: Professional;
  date: string;
  time: string;
  currentUser: User;
  onConfirm: (app: Appointment) => void;
  onBack: () => void;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ service, professional, date, time, currentUser, onConfirm, onBack }) => {
  const calculateEndTime = (start: string, duration: number) => {
    const [h, m] = start.split(':').map(Number);
    const date = new Date(2000, 0, 1, h, m);
    date.setMinutes(date.getMinutes() + duration);
    return date.toTimeString().slice(0, 5);
  };

  const handleConfirm = () => {
    const app: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser.id,
      service_id: service.id,
      professional_id: professional.id,
      date,
      start_time: time,
      end_time: calculateEndTime(time, service.duration_minutes),
      status: 'confirmado',
      created_time: Date.now()
    };
    onConfirm(app);
  };

  return (
    <div className="p-6 bg-[#F8F9FE] h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-stone-900">Resumo</h2>
      </div>

      <div className="bg-white rounded-[2rem] border border-white p-8 space-y-8 shadow-xl shadow-purple-50">
        <div className="flex items-start gap-5">
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 shadow-inner">
            <Scissors size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Serviço</p>
            <p className="font-bold text-stone-900 text-lg">{service.name}</p>
            <p className="text-stone-400 text-sm mt-0.5">{service.duration_minutes} minutos de duração</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 shadow-inner">
            <Calendar size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Data e Hora</p>
            <p className="font-bold text-stone-900 text-lg">
              {new Date(date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long' })}
            </p>
            <p className="text-purple-600 font-black text-xl mt-0.5 uppercase tracking-tighter">às {time}</p>
          </div>
        </div>

        <div className="flex items-start gap-5">
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 shadow-inner">
            <MapPin size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Profissional</p>
            <p className="font-bold text-stone-900 text-lg">{professional.name}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-stone-400 text-sm font-medium">Preço do serviço</span>
            <p className="text-3xl font-black text-stone-900">{service.price_eur.toFixed(2)}€</p>
          </div>
        </div>
      </div>

      <button 
        onClick={handleConfirm}
        className="w-full bg-purple-600 text-white py-6 rounded-[2.5rem] font-black text-lg mt-12 shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-4 group"
      >
        <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
        Confirmar Agendamento
      </button>

      <p className="text-center text-stone-400 text-xs mt-6 px-10 leading-relaxed">
        Ao confirmar, receberá uma notificação instantânea e um lembrete antes do serviço.
      </p>
    </div>
  );
};

export default ConfirmBooking;
