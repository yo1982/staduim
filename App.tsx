
import React, { useState, useEffect, useCallback } from 'react';
import type { User, View, Booking, Stadium, Language, Notification, MaintenanceInvoice } from './types';
import { USERS, STADIUMS, INITIAL_BOOKINGS, LOCALIZATION, INITIAL_MAINTENANCE_INVOICES } from './constants';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { StadiumList } from './components/StadiumList';
import { StadiumDetails } from './components/StadiumDetails';
import { UserBookings } from './components/UserBookings';
import { OwnerDashboard } from './components/OwnerDashboard';
import { NotificationToast } from './components/Notification';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('login');
  const [selectedStadiumId, setSelectedStadiumId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [language, setLanguage] = useState<Language>('en');
  const [notification, setNotification] = useState<Notification | null>(null);
  const [maintenanceInvoices, setMaintenanceInvoices] = useState<MaintenanceInvoice[]>(INITIAL_MAINTENANCE_INVOICES);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useCallback((key: string): string => {
    return LOCALIZATION[language][key] || key;
  }, [language]);
  
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ id: Date.now(), message, type });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('stadium_list');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleNavigate = (view: View) => {
    if (view === 'stadium_list') {
      setSelectedStadiumId(null);
    }
    setCurrentView(view);
  };
  
  const handleSelectStadium = (id: number) => {
    setSelectedStadiumId(id);
    setCurrentView('stadium_details');
  };

  const handleBookSlot = (stadiumId: number, date: string, time: string) => {
    if (!currentUser) return;
    const newBooking: Booking = {
      id: Date.now().toString(),
      stadiumId,
      userId: currentUser.id,
      date,
      time
    };
    setBookings(prev => [...prev, newBooking]);
    showNotification(t('bookingConfirmed'));
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showNotification(t('bookingCancelled'));
  };

  const handleToggleSlotForOwner = (stadiumId: number, date: string, time: string, makeAvailable: boolean) => {
      // For this MVP, owners can only add bookings for a placeholder user to make it unavailable.
      // In a real app, this would toggle an `isAvailable` flag on a timeslot entity.
      const placeholderUser = USERS.find(u => u.id === 2); // use Regular User
      if (makeAvailable && placeholderUser) {
        const newBooking: Booking = {
            id: `owner_block_${Date.now()}`,
            stadiumId,
            userId: placeholderUser.id, // Or a system user ID
            date,
            time
        };
        setBookings(prev => [...prev, newBooking]);
        showNotification(t('slotAdded'));
      }
  };

  const handleAddInvoice = (newInvoice: Omit<MaintenanceInvoice, 'id'>) => {
    setMaintenanceInvoices(prev => [
      { id: `m_${Date.now()}`, ...newInvoice },
      ...prev
    ]);
    showNotification(t('invoiceAdded'));
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginScreen onLogin={handleLogin} t={t} users={USERS} />;
    }

    switch (currentView) {
      case 'stadium_list':
        return <StadiumList stadiums={STADIUMS} onSelectStadium={handleSelectStadium} t={t} />;
      case 'stadium_details':
        const stadium = STADIUMS.find(s => s.id === selectedStadiumId);
        if (stadium) {
          return <StadiumDetails stadium={stadium} bookings={bookings} currentUser={currentUser} onBook={handleBookSlot} t={t} language={language} />;
        }
        return <StadiumList stadiums={STADIUMS} onSelectStadium={handleSelectStadium} t={t} />;
      case 'user_bookings':
        return <UserBookings bookings={bookings} stadiums={STADIUMS} currentUser={currentUser} onCancelBooking={handleCancelBooking} t={t} />;
      case 'owner_dashboard':
        const ownerStadium = STADIUMS.find(s => s.ownerId === currentUser.id);
        if (ownerStadium) {
          return <OwnerDashboard 
            stadium={ownerStadium} 
            bookings={bookings} 
            maintenanceInvoices={maintenanceInvoices.filter(inv => inv.stadiumId === ownerStadium.id)}
            onToggleSlot={handleToggleSlotForOwner}
            onAddInvoice={handleAddInvoice}
            t={t} 
            language={language}/>;
        }
        return <p>You do not own any stadiums.</p>;
      default:
        return <LoginScreen onLogin={handleLogin} t={t} users={USERS} />;
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen font-sans">
      {currentUser && <Header user={currentUser} language={language} t={t} onLogout={handleLogout} onNavigate={handleNavigate} onLanguageChange={setLanguage} />}
      <main>
        {renderContent()}
      </main>
      {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}

export default App;
