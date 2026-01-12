
import React from 'react';
import { AppNotification } from '../types';
import { ChevronLeft, Bell, Calendar, Scissors, Info } from 'lucide-react';

interface NotificationsPageProps {
  notifications: AppNotification[];
  onBack: () => void;
  onMarkRead: (id: string) => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onBack, onMarkRead }) => {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'confirmacao': return <Calendar className="text-green-500" size={20} />;
      case 'lembrete': return <Bell className="text-amber-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="p-6 bg-[#F8F9FE] h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-stone-900">Notificações</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <Bell className="mx-auto text-stone-200 mb-4" size={48} />
          <p className="text-stone-400 font-medium">Ainda não recebeu notificações.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(n => (
            <button 
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={`w-full p-4 rounded-2xl border transition-all flex items-start gap-4 text-left ${
                n.read ? 'bg-white border-transparent opacity-60' : 'bg-white border-purple-100 shadow-md shadow-purple-50'
              }`}
            >
              <div className={`p-3 rounded-xl ${n.read ? 'bg-stone-50' : 'bg-purple-50'}`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold text-stone-900 ${n.read ? 'text-stone-500' : ''}`}>{n.title}</h4>
                  <span className="text-[10px] text-stone-400">
                    {new Date(n.timestamp).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>}
            </button>
          ))}
        </div>
      )}

      {/* Simulation Reminder Tip */}
      <div className="mt-12 p-6 bg-white rounded-[2rem] border border-stone-100">
        <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
          <Info size={18} className="text-purple-600" />
          Dica do Paulo
        </h4>
        <p className="text-xs text-stone-500 leading-relaxed">
          Ative as notificações do sistema nas definições do seu telemóvel para receber lembretes 1 hora antes da sua marcação.
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
