
import React, { useState, useMemo, useCallback } from 'react';
import type { Stadium, Booking, TimeSlot, User } from '../types';
import { USERS, TIME_SLOTS_TEMPLATE } from '../constants';
import { LocationMarkerIcon, TagIcon, CalendarIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface StadiumDetailsProps {
  stadium: Stadium;
  bookings: Booking[];
  currentUser: User;
  onBook: (stadiumId: number, date: string, time: string) => void;
  t: (key: string) => string;
  language: string;
}

export const StadiumDetails: React.FC<StadiumDetailsProps> = ({ stadium, bookings, currentUser, onBook, t, language }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);

  const selectedDateString = selectedDate.toISOString().split('T')[0];

  const timeSlots: TimeSlot[] = useMemo(() => {
    const bookingsForDate = bookings.filter(
      (b) => b.stadiumId === stadium.id && b.date === selectedDateString
    );

    return TIME_SLOTS_TEMPLATE.map(time => {
      const booking = bookingsForDate.find(b => b.time === time);
      return {
        time,
        isBooked: !!booking,
        bookedBy: booking?.userId,
        userName: booking ? USERS.find(u => u.id === booking.userId)?.name : null
      };
    });
  }, [selectedDateString, bookings, stadium.id]);

  const handleBooking = (time: string) => {
    onBook(stadium.id, selectedDateString, time);
  };
  
  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % stadium.photos.length);
  }, [stadium.photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + stadium.photos.length) % stadium.photos.length);
  }, [stadium.photos.length]);

  const PhotoCarousel = () => (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
      <img src={stadium.photos[currentPhotoIndex]} alt={stadium.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-between items-center px-4">
        <button onClick={prevPhoto} className="bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button onClick={nextPhoto} className="bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PhotoCarousel />
      <div className="bg-white rounded-lg shadow-md p-6 mt-[-50px] relative z-10 mx-4">
        <h2 className="text-3xl font-bold text-gray-800">{stadium.name}</h2>
        <div className="flex items-center text-gray-600 mt-2">
          <LocationMarkerIcon className="w-5 h-5 me-2 text-mint-500" />
          <span>{stadium.location}</span>
        </div>
        <div className="flex items-center text-gray-800 mt-2">
          <TagIcon className="w-5 h-5 me-2 text-sky-500" />
          <span className="font-semibold text-xl">{stadium.price} {t('omr')}</span>
          <span className="text-sm text-gray-500 ms-1">/ {t('perHour')}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <CalendarIcon className="w-7 h-7 me-3 text-mint-500"/>
          {t('selectDateAndTime')}
        </h3>

        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-4">
          {dates.map(date => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-mint-500 text-white font-bold shadow'
                  : 'bg-gray-100 hover:bg-mint-100 text-gray-700'
              }`}
            >
              <div className="font-semibold">{date.toLocaleDateString(language, { weekday: 'short' })}</div>
              <div>{date.toLocaleDateString(language, { day: 'numeric', month: 'short' })}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map(slot => (
            <button
              key={slot.time}
              onClick={() => handleBooking(slot.time)}
              disabled={slot.isBooked}
              className={`p-3 rounded-lg text-center transition-transform transform disabled:cursor-not-allowed ${
                slot.isBooked
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-sky-100 hover:bg-sky-500 hover:text-white hover:scale-105 text-sky-800 font-semibold'
              }`}
            >
              <div className="flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 me-2"/>
                  <span>{slot.time}</span>
              </div>
              {slot.isBooked && <span className="text-xs">{t('booked')}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
