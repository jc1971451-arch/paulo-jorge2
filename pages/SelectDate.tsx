
import React, { useState } from 'react';
import { Professional } from '../types';
import { ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';

interface SelectDateProps {
  professional: Professional;
  onSelect: (date: string) => void;
  onBack: () => void;
}

const SelectDate: React.FC<SelectDateProps> = ({ onBack, onSelect, professional }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getNextDays = () => {
    const days = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      // Salão fecha ao Domingo
      if (d.getDay() !== 0) days.push(d);
    }
    return days;
  };

  const days = getNextDays();
  const weekDaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const formatDateValue = (d: Date) => d.toISOString().split('T')[0];

  return (
    <div className="p-6 bg-[#F8F9FE] h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-stone-900">Escolha o Dia</h2>
      </div>

      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-white mb-8 flex items-center gap-4">
        <img src={professional.image} className="w-14 h-14 rounded-2xl object-cover" alt="" />
        <div>
          <h3 className="font-bold text-stone-900">{professional.name}</h3>
          <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">Especialista disponível</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className="font-bold text-stone-900 text-lg">Datas disponíveis</h3>
        <CalendarIcon size={18} className="text-purple-600" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
        {days.map((d, idx) => {
          const isSelected = selectedDate === formatDateValue(d);
          const isToday = formatDateValue(d) === formatDateValue(new Date());
          
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(formatDateValue(d))}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-28 rounded-[2.5rem] border transition-all ${
                isSelected 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-100 translate-y-[-4px]' 
                  : 'bg-white border-transparent text-stone-500 hover:border-purple-200 shadow-sm'
              }`}
            >
              <span className={`text-[10px] font-black uppercase mb-3 ${isSelected ? 'opacity-80' : 'text-stone-300'}`}>
                {weekDaysShort[d.getDay()]}
              </span>
              <span className="text-xl font-black">{d.getDate()}</span>
              {isToday && !isSelected && <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>}
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-white rounded-[2rem] border border-stone-100">
        <p className="text-xs text-stone-500 leading-relaxed italic">
          * Horário de funcionamento: {professional.start_time} às {professional.end_time}. Fechado aos domingos para descanso da equipa.
        </p>
      </div>

      <button 
        disabled={!selectedDate}
        onClick={() => selectedDate && onSelect(selectedDate)}
        className={`w-full py-6 rounded-[2.5rem] font-black text-lg mt-auto mb-6 transition-all shadow-xl ${
          selectedDate 
            ? 'bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700' 
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Ver Horários
      </button>
    </div>
  );
};

export default SelectDate;
