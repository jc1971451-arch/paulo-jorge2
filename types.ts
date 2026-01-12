
export type Role = 'cliente' | 'admin' | 'profissional';

export interface User {
  id: string;
  display_name: string;
  phone: string;
  email: string;
  role: Role;
  image?: string; 
  professional_id?: string; // Vincula um user a um profissional específico
}

export interface Service {
  id: string;
  name: string;
  price_eur: number;
  duration_minutes: number;
  active: boolean;
  image?: string; // Nova propriedade para imagem do serviço
}

export interface Professional {
  id: string;
  name: string;
  email: string; // Adicionado para login
  password?: string; // Adicionado para gestão de conta
  services: string[]; 
  working_days: string[]; 
  start_time: string; 
  end_time: string; 
  image?: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  professional_id: string;
  date: string; 
  start_time: string; 
  end_time: string; 
  status: 'confirmado' | 'cancelado' | 'concluido';
  created_time: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'confirmacao' | 'lembrete' | 'info' | 'global';
  timestamp: number;
  read: boolean;
  to_user_id?: string; 
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export type Page = 
  | 'SPLASH' 
  | 'AUTH' 
  | 'CLIENT_DASHBOARD' 
  | 'SELECT_SERVICE' 
  | 'SELECT_PROFESSIONAL' 
  | 'SELECT_DATE' 
  | 'SELECT_TIME' 
  | 'CONFIRM_BOOKING' 
  | 'MY_APPOINTMENTS' 
  | 'PROFILE' 
  | 'ADMIN_DASHBOARD' 
  | 'MANAGE_SERVICES' 
  | 'MANAGE_PROFESSIONALS' 
  | 'DAILY_AGENDA'
  | 'NOTIFICATIONS'
  | 'BROADCAST_CENTER'
  | 'PROFESSIONAL_AGENDA'
  | 'ALL_APPOINTMENTS'
  | 'GALLERY'
  | 'CART'
  | 'VIDEOS'
  | 'APPEARANCE_SETTINGS'
  | 'CHAT';
