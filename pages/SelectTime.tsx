
import React, { useMemo } from 'react';
import { Professional, Service, Appointment } from '../types';
import { ChevronLeft } from 'lucide-react';
import { BUSINESS_RULES } from '../constants';

interface SelectTimeProps {
  date: string;
  professional: Professional;
  service: Service;
  appointments: Appointment[];
  onSelect: (time: string) => void;
  onBack: () => void;
}

const SelectTime: React.FC<SelectTimeProps> = ({ date, professional, service, appointments, onSelect, onBack }) => {
  const slots = useMemo(() => {
    const availableSlots: string[] = [];
    const [startH, startM] = professional.start_time.split(':').map(Number);
    const [endH, endM] = professional.end_time.split(':').map(Number);
    const [lunchStartH, lunchStartM] = BUSINESS_RULES.LUNCH_START.split(':').map(Number);
    const [lunchEndH, lunchEndM] = BUSINESS_RULES.LUNCH_END.split(':').map(Number);

    let current = new Date(2000, 0, 1, startH, startM);
    const end = new Date(2000, 0, 1, endH, endM);
    const lunchStart = new Date(2000, 0, 1, lunchStartH, lunchStartM);
    const lunchEnd = new Date(2000, 0, 1, lunchEndH, lunchEndM);

    while (current < end) {
      const timeStr = current.toTimeString().slice(0, 5);
      const serviceEnd = new Date(current.getTime() + (service.duration_minutes + BUSINESS_RULES.BUFFER_MINUTES) * 60000);
      
      const isInLunch = (current >= lunchStart && current < lunchEnd) || (serviceEnd > lunchStart && serviceEnd <= lunchEnd);
      const isPastWork = serviceEnd > end;
      const hasConflict = appointments.some(app => {
        if (app.date !== date || app.professional_id !== professional.id || app.status === 'cancelado') return false;
        const [aSH, aSM] = app.start_time.split(':').map(Number);
        const [aEH, aEM] = app.end_time.split(':').map(Number);
        const appStart = new Date(2000, 0, 1, aSH, aSM);
        const appEnd = new Date(2000, 0, 1, aEH, aEM);
        return (current < appEnd && serviceEnd > appStart);
      });

      if (!isInLunch && !isPastWork && !hasConflict) availableSlots.push(timeStr);
      current = new Date(current.getTime() + 30 * 60000); // 30m granularity for cleaner UI
    }
    return availableSlots;
  }, [date, professional, service, appointments]);

  return (
    <div className="p-6 bg-[#F8F9FE] h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-stone-900">Horário</h2>
      </div>

      <header className="mb-8">
        <p className="text-stone-400 text-sm">Disponível para</p>
        <h3 className="text-lg font-bold text-stone-900">
          {new Date(date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })}
        </h3>
      </header>

      {slots.length === 0 ? (
        <div className="bg-white p-8 rounded-[2rem] text-center border border-stone-100">
          <p className="text-stone-500 font-medium">Sem horários para este dia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {slots.map(slot => (
            <button 
              key={slot}
              onClick={() => onSelect(slot)}
              className="bg-white py-4 rounded-2xl border border-transparent font-bold text-stone-700 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm"
            >
              {slot}
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-12 p-6 bg-purple-50 rounded-[2rem] border border-purple-100">
        <h4 className="font-bold text-purple-900 mb-2">Informação útil</h4>
        <p className="text-xs text-purple-700 leading-relaxed">
          Pode cancelar a sua marcação gratuitamente até 6 horas antes do início do serviço.
        </p>
      </div>
    </div>
  );
};

export default SelectTime;
