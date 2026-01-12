
import { Service, Professional, User } from './types';

export const BUSINESS_RULES = {
  SALON_NAME: 'Paulo Jorge – Salão & Barbearia',
  ADMIN_WHATSAPP: '351931162134', 
  LUNCH_START: '13:00',
  LUNCH_END: '14:00',
  BUFFER_MINUTES: 10,
  CANCELLATION_LIMIT_HOURS: 6,
  OPENING_HOURS: '09:00',
  CLOSING_HOURS: '19:00',
};

export const MOCK_SERVICES: Service[] = [
  { 
    id: 's1', 
    name: 'Corte de Cabelo Masculino', 
    price_eur: 15.00, 
    duration_minutes: 30, 
    active: true,
    image: 'https://images.unsplash.com/photo-1599351431247-f577f5d889d7?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 's2', 
    name: 'Barba Tradicional', 
    price_eur: 10.00, 
    duration_minutes: 20, 
    active: true,
    image: 'https://images.unsplash.com/photo-1621605815841-aa33c56317bc?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 's3', 
    name: 'Corte e Barba Premium', 
    price_eur: 25.00, 
    duration_minutes: 60, 
    active: true,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 's4', 
    name: 'Coloração & Camuflagem', 
    price_eur: 35.00, 
    duration_minutes: 90, 
    active: true,
    image: 'https://images.unsplash.com/photo-1622286332616-f71bd3cdeb97?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 's5', 
    name: 'Lavagem Especial', 
    price_eur: 10.00, 
    duration_minutes: 15, 
    active: true,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400'
  },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  { 
    id: 'p1', 
    name: 'Paulo Jorge', 
    email: 'paulo@barbearia.pt',
    password: 'admin',
    services: ['s1', 's2', 's3', 's4'], 
    working_days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'], 
    start_time: '09:00', 
    end_time: '19:00',
    image: 'https://images.unsplash.com/photo-1503910368127-b44283ee1f66?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 'p2', 
    name: 'Ricardo Silva', 
    email: 'ricardo@barbearia.pt',
    password: 'staff',
    services: ['s1', 's2', 's3'], 
    working_days: ['Ter', 'Qua', 'Qui', 'Sex', 'Sab'], 
    start_time: '10:00', 
    end_time: '20:00',
    image: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&q=80&w=200'
  },
];

export const MOCK_ADMIN: User = {
  id: 'admin1',
  display_name: 'Paulo Jorge',
  email: 'paulo@paulojorge.pt',
  phone: '931162134',
  role: 'admin'
};

export const MOCK_CLIENT: User = {
  id: 'client1',
  display_name: 'João Silva',
  email: 'joao@email.com',
  phone: '912345679',
  role: 'cliente'
};
