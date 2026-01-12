
import React, { useState, useEffect } from 'react';
import { Page, User, Service, Professional, Appointment, AppNotification, ChatMessage } from './types';
import { MOCK_SERVICES, MOCK_PROFESSIONALS, MOCK_CLIENT, MOCK_ADMIN } from './constants';
import { 
  Home, 
  Calendar, 
  User as UserIcon, 
  LayoutDashboard, 
  Bell,
  X,
  ClipboardList,
  Image as ImageIcon,
  PlayCircle
} from 'lucide-react';

// Pages
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import SelectService from './pages/SelectService';
import SelectProfessional from './pages/SelectProfessional';
import SelectDate from './pages/SelectDate';
import SelectTime from './pages/SelectTime';
import ConfirmBooking from './pages/ConfirmBooking';
import MyAppointments from './pages/MyAppointments';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ManageServices from './pages/ManageServices';
import ManageProfessionals from './pages/ManageProfessionals';
import DailyAgenda from './pages/DailyAgenda';
import NotificationsPage from './pages/NotificationsPage';
import BroadcastCenter from './pages/BroadcastCenter';
import ProfessionalAgenda from './pages/ProfessionalAgenda';
import AllAppointments from './pages/AllAppointments';
import GalleryPage from './pages/GalleryPage';
import CartPage from './pages/CartPage';
import VideoFeed from './pages/VideoFeed';
import AppearanceSettings from './pages/AppearanceSettings';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('SPLASH');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Persistência de Dados
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('pj_services');
    return saved ? JSON.parse(saved) : MOCK_SERVICES;
  });
  
  const [appLogo, setAppLogo] = useState<string>(() => {
    return localStorage.getItem('pj_logo') || "https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg";
  });
  
  const [loginBg, setLoginBg] = useState<string>(() => {
    return localStorage.getItem('pj_bg') || "https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg";
  });

  const [globalAnnouncement, setGlobalAnnouncement] = useState<string | null>(() => {
    return localStorage.getItem('pj_announcement') || "Bem-vindos à nova App do Paulo Jorge!";
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('pj_chats');
    return saved ? JSON.parse(saved) : [
      { id: 'm1', sender_id: 'admin1', text: 'Bem-vindo ao chat privado! Como te posso ajudar hoje?', timestamp: Date.now() - 3600000, read: false }
    ];
  });

  const [favoriteProfessionalIds, setFavoriteProfessionalIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('pj_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Salvar alterações automaticamente
  useEffect(() => {
    localStorage.setItem('pj_services', JSON.stringify(services));
    localStorage.setItem('pj_logo', appLogo);
    localStorage.setItem('pj_bg', loginBg);
    localStorage.setItem('pj_chats', JSON.stringify(chatMessages));
    localStorage.setItem('pj_favorites', JSON.stringify(favoriteProfessionalIds));
    if (globalAnnouncement) localStorage.setItem('pj_announcement', globalAnnouncement);
  }, [services, appLogo, loginBg, globalAnnouncement, chatMessages, favoriteProfessionalIds]);

  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  
  const [cart, setCart] = useState<Service[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage === 'SPLASH') {
      const timer = setTimeout(() => setCurrentPage('AUTH'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigateTo = (page: Page) => setCurrentPage(page);

  const toggleServiceInCart = (service: Service) => {
    setCart(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) return prev.filter(s => s.id !== service.id);
      return [...prev, service];
    });
  };

  const toggleFavoriteProfessional = (id: string) => {
    setFavoriteProfessionalIds(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    if (!newNotif.to_user_id || newNotif.to_user_id === currentUser?.id) {
      setActiveToast(newNotif);
      setTimeout(() => setActiveToast(null), 5000);
    }
  };

  const sendChatMessage = (text: string) => {
    if (!currentUser) return;
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender_id: currentUser.id,
      text,
      timestamp: Date.now(),
      read: true
    };
    setChatMessages(prev => [...prev, newMessage]);

    // Simulação de resposta automática do Paulo se não for admin
    if (currentUser.role !== 'admin') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          sender_id: 'admin1',
          text: 'Recebido! Vou verificar a tua mensagem e respondo-te assim que sair de um corte. ✂️',
          timestamp: Date.now(),
          read: false
        };
        setChatMessages(prev => [...prev, reply]);
      }, 3000);
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') navigateTo('ADMIN_DASHBOARD');
    else if (user.role === 'profissional') navigateTo('PROFESSIONAL_AGENDA');
    else navigateTo('SELECT_SERVICE');
  };

  const unreadChatCount = chatMessages.filter(m => m.sender_id !== currentUser?.id && !m.read).length;
  const totalDuration = cart.reduce((acc, s) => acc + s.duration_minutes, 0);
  const totalPrice = cart.reduce((acc, s) => acc + s.price_eur, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'SPLASH': return <Splash logo={appLogo} />;
      case 'AUTH': return <Auth onLogin={handleLoginSuccess} professionals={professionals} logo={appLogo} background={loginBg} />;
      case 'SELECT_SERVICE': 
        return <SelectService 
          services={services} 
          cart={cart}
          onToggle={toggleServiceInCart}
          onOpenCart={() => navigateTo('CART')}
          user={currentUser}
          logo={appLogo}
          onOpenNotifications={() => navigateTo('NOTIFICATIONS')}
          hasUnreadNotifications={notifications.filter(n => !n.to_user_id || n.to_user_id === currentUser?.id).some(n => !n.read)}
          globalAnnouncement={globalAnnouncement}
        />;
      case 'CART':
        return <CartPage 
          cart={cart} 
          onRemove={(id) => setCart(prev => prev.filter(s => s.id !== id))} 
          onBack={() => navigateTo('SELECT_SERVICE')} 
          onProceed={() => navigateTo('SELECT_PROFESSIONAL')} 
        />;
      case 'SELECT_PROFESSIONAL':
        return <SelectProfessional 
          professionals={professionals} 
          favoriteIds={favoriteProfessionalIds}
          onToggleFavorite={toggleFavoriteProfessional}
          onSelect={(p) => { setSelectedProfessional(p); navigateTo('SELECT_DATE'); }} 
          onBack={() => navigateTo('CART')} 
        />;
      case 'SELECT_DATE':
        return <SelectDate professional={selectedProfessional!} onSelect={(d) => { setSelectedDate(d); navigateTo('SELECT_TIME'); }} onBack={() => navigateTo('SELECT_PROFESSIONAL')} />;
      case 'SELECT_TIME':
        return <SelectTime 
          date={selectedDate!} 
          professional={selectedProfessional!} 
          service={{ id: 'multi', name: 'Combo', duration_minutes: totalDuration, price_eur: totalPrice, active: true }} 
          appointments={appointments} 
          onSelect={(t) => { setSelectedTime(t); navigateTo('CONFIRM_BOOKING'); }} 
          onBack={() => navigateTo('SELECT_DATE')} 
        />;
      case 'CONFIRM_BOOKING':
        return <ConfirmBooking 
          service={{ id: 'multi', name: cart.map(s => s.name).join(' + '), duration_minutes: totalDuration, price_eur: totalPrice, active: true }} 
          professional={selectedProfessional!} 
          date={selectedDate!} 
          time={selectedTime!} 
          onConfirm={(appointment) => { 
            setAppointments(prev => [...prev, appointment]); 
            addNotification({ title: 'Marcação Confirmada!', message: `O seu agendamento foi realizado com sucesso.`, type: 'confirmacao', to_user_id: currentUser?.id }); 
            setCart([]);
            navigateTo('MY_APPOINTMENTS'); 
          }} 
          onBack={() => navigateTo('SELECT_TIME')} 
          currentUser={currentUser!} 
        />;
      case 'MY_APPOINTMENTS':
        return <MyAppointments appointments={appointments.filter(a => a.user_id === currentUser?.id)} services={services} professionals={professionals} onCancel={(id) => { setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelado' } : a)); }} />;
      case 'PROFILE':
        return <Profile 
          user={currentUser!} 
          onLogout={() => { setCurrentUser(null); navigateTo('AUTH'); }} 
          onUpdateUser={setCurrentUser} 
          onOpenChat={() => navigateTo('CHAT')}
          unreadChatCount={unreadChatCount}
        />;
      case 'CHAT':
        return <ChatPage 
          messages={chatMessages} 
          currentUser={currentUser!} 
          onSendMessage={sendChatMessage} 
          onBack={() => {
            setChatMessages(prev => prev.map(m => ({...m, read: true})));
            navigateTo('PROFILE');
          }} 
        />;
      case 'NOTIFICATIONS':
        return <NotificationsPage notifications={notifications.filter(n => !n.to_user_id || n.to_user_id === currentUser?.id)} onBack={() => navigateTo('SELECT_SERVICE')} onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n))} />;
      case 'ADMIN_DASHBOARD':
        return <AdminDashboard stats={{ appointments: appointments.length, services: services.length, professionals: professionals.length, users: 2 }} onNavigate={navigateTo} />;
      case 'MANAGE_SERVICES':
        return <ManageServices services={services} onUpdate={setServices} onBack={() => navigateTo('ADMIN_DASHBOARD')} />;
      case 'MANAGE_PROFESSIONALS':
        return <ManageProfessionals professionals={professionals} onUpdate={setProfessionals} onBack={() => navigateTo('ADMIN_DASHBOARD')} />;
      case 'DAILY_AGENDA':
        return <DailyAgenda appointments={appointments} services={services} professionals={professionals} onBack={() => navigateTo('ADMIN_DASHBOARD')} />;
      case 'BROADCAST_CENTER':
        return <BroadcastCenter onBack={() => navigateTo('ADMIN_DASHBOARD')} onSendNotification={(title, msg) => addNotification({ title, message: msg, type: 'global' })} onUpdateAnnouncement={setGlobalAnnouncement} currentAnnouncement={globalAnnouncement} />;
      case 'PROFESSIONAL_AGENDA':
        return <ProfessionalAgenda appointments={appointments} services={services} professionalId={currentUser?.professional_id || ''} onUpdateStatus={(id, status) => setAppointments(prev => prev.map(a => a.id === id ? {...a, status} : a))} />;
      case 'ALL_APPOINTMENTS':
        return <AllAppointments appointments={appointments} services={services} professionals={professionals} onBack={() => navigateTo('ADMIN_DASHBOARD')} />;
      case 'GALLERY':
        return <GalleryPage userRole={currentUser?.role || 'cliente'} />;
      case 'VIDEOS':
        return <VideoFeed onBookNow={() => navigateTo('SELECT_SERVICE')} />;
      case 'APPEARANCE_SETTINGS':
        return <AppearanceSettings 
          currentLogo={appLogo} 
          currentBg={loginBg} 
          onUpdateLogo={setAppLogo} 
          onUpdateBg={setLoginBg} 
          onBack={() => navigateTo('ADMIN_DASHBOARD')} 
        />;
      default: return <div className="p-8 text-center text-stone-400 font-bold uppercase tracking-widest">A carregar...</div>;
    }
  };

  const showBottomNav = !['SPLASH', 'AUTH', 'CHAT'].includes(currentPage);
  const userRole = currentUser?.role;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F8F9FE] overflow-hidden border-x border-stone-100 shadow-2xl relative">
      {activeToast && (
        <div className="absolute top-6 left-6 right-6 z-[100] animate-in slide-in-from-top duration-500">
          <div className="bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-amber-500/30 flex items-start gap-4">
            <div className="bg-amber-50 p-2 rounded-xl text-black">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{activeToast.title}</h4>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{activeToast.message}</p>
            </div>
            <button onClick={() => setActiveToast(null)} className="text-stone-500 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto pb-24">
        {renderPage()}
      </main>

      {showBottomNav && (
        <nav className="absolute bottom-6 left-6 right-6 bg-black/95 backdrop-blur-lg border border-white/5 rounded-[2rem] px-6 py-4 flex justify-between items-center z-50 shadow-2xl">
          {userRole === 'admin' ? (
            <>
              <button onClick={() => navigateTo('ADMIN_DASHBOARD')} className={`${currentPage === 'ADMIN_DASHBOARD' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <LayoutDashboard size={24} />
              </button>
              <button onClick={() => navigateTo('VIDEOS')} className={`${currentPage === 'VIDEOS' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <PlayCircle size={24} />
              </button>
              <button onClick={() => navigateTo('GALLERY')} className={`${currentPage === 'GALLERY' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <ImageIcon size={24} />
              </button>
              <button onClick={() => navigateTo('PROFILE')} className={`${currentPage === 'PROFILE' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all relative`}>
                <UserIcon size={24} />
                {unreadChatCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-black animate-pulse"></span>}
              </button>
            </>
          ) : userRole === 'profissional' ? (
            <>
              <button onClick={() => navigateTo('PROFESSIONAL_AGENDA')} className={`${currentPage === 'PROFESSIONAL_AGENDA' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <ClipboardList size={24} />
              </button>
              <button onClick={() => navigateTo('VIDEOS')} className={`${currentPage === 'VIDEOS' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <PlayCircle size={24} />
              </button>
              <button onClick={() => navigateTo('GALLERY')} className={`${currentPage === 'GALLERY' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <ImageIcon size={24} />
              </button>
              <button onClick={() => navigateTo('PROFILE')} className={`${currentPage === 'PROFILE' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all relative`}>
                <UserIcon size={24} />
                {unreadChatCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-black animate-pulse"></span>}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigateTo('SELECT_SERVICE')} className={`${['SELECT_SERVICE'].includes(currentPage) ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <Home size={24} />
              </button>
              <button onClick={() => navigateTo('VIDEOS')} className={`${currentPage === 'VIDEOS' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <PlayCircle size={24} />
              </button>
              <button onClick={() => navigateTo('GALLERY')} className={`${currentPage === 'GALLERY' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <ImageIcon size={24} />
              </button>
              <button onClick={() => navigateTo('MY_APPOINTMENTS')} className={`${currentPage === 'MY_APPOINTMENTS' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all`}>
                <Calendar size={24} />
              </button>
              <button onClick={() => navigateTo('PROFILE')} className={`${currentPage === 'PROFILE' ? 'text-amber-500 scale-110' : 'text-stone-500'} p-3 transition-all relative`}>
                <UserIcon size={24} />
                {unreadChatCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-black animate-pulse"></span>}
              </button>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default App;
