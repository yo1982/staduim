
import { User, Stadium, Booking, Language, MaintenanceInvoice } from './types';

export const USERS: User[] = [
  { id: 1, name: 'Stadium Owner', role: 'owner' },
  { id: 2, name: 'Regular User', role: 'user' },
];

export const STADIUMS: Stadium[] = [
  {
    id: 1,
    ownerId: 1,
    name: 'Al-Seeb Stadium',
    location: 'Seeb, Muscat',
    price: 25,
    photos: [
      'https://picsum.photos/seed/stadium1/800/600',
      'https://picsum.photos/seed/stadium1-2/800/600',
      'https://picsum.photos/seed/stadium1-3/800/600',
    ],
  },
  {
    id: 2,
    ownerId: 1,
    name: 'Bawsher Club',
    location: 'Bawsher, Muscat',
    price: 20,
    photos: [
      'https://picsum.photos/seed/stadium2/800/600',
      'https://picsum.photos/seed/stadium2-2/800/600',
    ],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: '1',
    stadiumId: 1,
    userId: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
  },
];

export const INITIAL_MAINTENANCE_INVOICES: MaintenanceInvoice[] = [
  {
    id: 'm1',
    stadiumId: 1,
    date: '2024-07-15',
    description: 'Pitch grass reseeding',
    amount: 150,
    status: 'Paid'
  },
  {
    id: 'm2',
    stadiumId: 1,
    date: '2024-08-01',
    description: 'Floodlight repair',
    amount: 75,
    status: 'Pending'
  }
];

export const TIME_SLOTS_TEMPLATE: string[] = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];


export const LOCALIZATION: Record<Language, Record<string, string>> = {
  en: {
    appName: 'Malaeb',
    login: 'Login',
    logout: 'Logout',
    loginAsUser: 'Login as User',
    loginAsOwner: 'Login as Stadium Owner',
    welcome: 'Welcome',
    home: 'Home',
    myBookings: 'My Bookings',
    dashboard: 'Dashboard',
    stadiums: 'Stadiums',
    stadiumDetails: 'Stadium Details',
    location: 'Location',
    price: 'Price',
    perHour: 'per hour',
    omr: 'OMR',
    bookNow: 'Book Now',
    booked: 'Booked',
    selectDateAndTime: 'Select a Date & Time',
    upcomingBookings: 'Upcoming Bookings',
    pastBookings: 'Past Bookings',
    noBookings: 'You have no bookings.',
    cancelBooking: 'Cancel',
    bookingCancelled: 'Booking cancelled successfully.',
    bookingConfirmed: 'Booking confirmed!',
    errorBooking: 'Error making booking. Please try again.',
    errorCancelling: 'Error cancelling booking.',
    manageSchedule: 'Manage Schedule',
    addSlot: 'Make Available',
    removeSlot: 'Make Unavailable',
    slotAdded: 'Time slot made available.',
    slotRemoved: 'Time slot made unavailable.',
    selectLanguage: 'Select Language',
    english: 'English',
    arabic: 'العربية',
    financialReports: 'Financial Reports',
    maintenanceInvoices: 'Maintenance Invoices',
    totalRevenue: 'Total Revenue',
    monthlyRevenue: 'Monthly Revenue',
    bookingsLog: 'Bookings Log',
    invoiceDate: 'Date',
    description: 'Description',
    amount: 'Amount',
    status: 'Status',
    addInvoice: 'Add Invoice',
    newInvoice: 'New Maintenance Invoice',
    invoiceAdded: 'Invoice added successfully.',
    paid: 'Paid',
    pending: 'Pending',
  },
  ar: {
    appName: 'ملاعب',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    loginAsUser: 'دخول كمستخدم',
    loginAsOwner: 'دخول كصاحب ملعب',
    welcome: 'أهلاً بك',
    home: 'الرئيسية',
    myBookings: 'حجوزاتي',
    dashboard: 'لوحة التحكم',
    stadiums: 'الملاعب',
    stadiumDetails: 'تفاصيل الملعب',
    location: 'الموقع',
    price: 'السعر',
    perHour: 'للساعة',
    omr: 'ريال عماني',
    bookNow: 'احجز الآن',
    booked: 'محجوز',
    selectDateAndTime: 'اختر التاريخ والوقت',
    upcomingBookings: 'الحجوزات القادمة',
    pastBookings: 'الحجوزات السابقة',
    noBookings: 'ليس لديك أي حجوزات.',
    cancelBooking: 'إلغاء الحجز',
    bookingCancelled: 'تم إلغاء الحجز بنجاح.',
    bookingConfirmed: 'تم تأكيد الحجز!',
    errorBooking: 'خطأ في الحجز. الرجاء المحاولة مرة أخرى.',
    errorCancelling: 'خطأ في إلغاء الحجز.',
    manageSchedule: 'إدارة الجدول الزمني',
    addSlot: 'جعله متاحاً',
    removeSlot: 'جعله غير متاح',
    slotAdded: 'تمت إتاحة الوقت.',
    slotRemoved: 'تم جعل الوقت غير متاح.',
    selectLanguage: 'اختر اللغة',
    english: 'English',
    arabic: 'العربية',
    financialReports: 'التقارير المالية',
    maintenanceInvoices: 'فواتير الصيانة',
    totalRevenue: 'إجمالي الإيرادات',
    monthlyRevenue: 'الإيرادات الشهرية',
    bookingsLog: 'سجل الحجوزات',
    invoiceDate: 'التاريخ',
    description: 'الوصف',
    amount: 'المبلغ',
    status: 'الحالة',
    addInvoice: 'إضافة فاتورة',
    newInvoice: 'فاتورة صيانة جديدة',
    invoiceAdded: 'تمت إضافة الفاتورة بنجاح.',
    paid: 'مدفوعة',
    pending: 'معلقة',
  },
};
