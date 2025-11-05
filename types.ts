
export type UserRole = 'user' | 'owner';

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export interface Stadium {
  id: number;
  ownerId: number;
  name: string;
  location: string;
  price: number; // OMR per hour
  photos: string[];
}

export interface TimeSlot {
  time: string; // e.g., "17:00"
  isBooked: boolean;
  bookedBy?: number | null;
  userName?: string | null;
}

export interface Booking {
  id: string;
  stadiumId: number;
  userId: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface MaintenanceInvoice {
  id: string;
  stadiumId: number;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export type View = 'login' | 'stadium_list' | 'stadium_details' | 'user_bookings' | 'owner_dashboard';
export type OwnerDashboardView = 'schedule' | 'financial' | 'maintenance';

export type Language = 'en' | 'ar';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
}
