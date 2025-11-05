
import React from 'react';
import type { Booking, Stadium, User } from '../types';
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from './icons';

interface UserBookingsProps {
  bookings: Booking[];
  stadiums: Stadium[];
  currentUser: User;
  onCancelBooking: (bookingId: string) => void;
  t: (key: string) => string;
}

export const UserBookings: React.FC<UserBookingsProps> = ({ bookings, stadiums, currentUser, onCancelBooking, t }) => {
  const userBookings = bookings.filter(b => b.userId === currentUser.id);
  const now = new Date();

  const upcomingBookings = userBookings
    .filter(b => new Date(`${b.date}T${b.time}`) >= now)
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

  const pastBookings = userBookings
    .filter(b => new Date(`${b.date}T${b.time}`) < now)
    .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());

  // FIX: Define BookingCard props and type it as a React.FC to allow the 'key' prop.
  interface BookingCardProps {
    booking: Booking;
    isUpcoming: boolean;
  }

  const BookingCard: React.FC<BookingCardProps> = ({ booking, isUpcoming }) => {
    const stadium = stadiums.find(s => s.id === booking.stadiumId);
    if (!stadium) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4">
        <img src={stadium.photos[0]} alt={stadium.name} className="w-full sm:w-32 h-32 object-cover rounded-md"/>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800">{stadium.name}</h3>
          <div className="text-gray-600 mt-1 flex items-center"><LocationMarkerIcon className="w-4 h-4 me-2"/>{stadium.location}</div>
          <div className="text-gray-600 mt-2 flex items-center"><CalendarIcon className="w-4 h-4 me-2"/>{new Date(booking.date).toDateString()}</div>
          <div className="text-gray-600 mt-1 flex items-center"><ClockIcon className="w-4 h-4 me-2"/>{booking.time}</div>
        </div>
        {isUpcoming && (
          <div className="flex items-center">
            <button onClick={() => onCancelBooking(booking.id)} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
              {t('cancelBooking')}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('myBookings')}</h2>

      <section>
        <h3 className="text-2xl font-semibold text-mint-700 mb-4">{t('upcomingBookings')}</h3>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} isUpcoming={true} />)}
          </div>
        ) : <p className="text-gray-500">{t('noBookings')}</p>}
      </section>

      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-500 mb-4">{t('pastBookings')}</h3>
        {pastBookings.length > 0 ? (
          <div className="space-y-4 opacity-70">
            {pastBookings.map(b => <BookingCard key={b.id} booking={b} isUpcoming={false} />)}
          </div>
        ) : <p className="text-gray-500">{t('noBookings')}</p>}
      </section>
    </div>
  );
};
