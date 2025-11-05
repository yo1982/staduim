
import React, { useState, useMemo } from 'react';
import type { Stadium, Booking, TimeSlot, OwnerDashboardView, MaintenanceInvoice } from '../types';
import { USERS, TIME_SLOTS_TEMPLATE } from '../constants';
import { CalendarIcon, ClockIcon, DollarSignIcon, WrenchIcon } from './icons';
import { FinancialReports } from './FinancialReports';
import { MaintenanceInvoices } from './MaintenanceInvoices';

interface OwnerDashboardProps {
  stadium: Stadium;
  bookings: Booking[];
  maintenanceInvoices: MaintenanceInvoice[];
  onToggleSlot: (stadiumId: number, date: string, time: string, isBooked: boolean) => void;
  onAddInvoice: (newInvoice: Omit<MaintenanceInvoice, 'id'>) => void;
  t: (key: string) => string;
  language: string;
}

const ScheduleManager: React.FC<Pick<OwnerDashboardProps, 'stadium' | 'bookings' | 'onToggleSlot' | 't' | 'language'>> = ({ stadium, bookings, onToggleSlot, t, language }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dates = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => {
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
        const userName = booking ? USERS.find(u => u.id === booking.userId)?.name : null;
        return {
            time,
            isBooked: !!booking,
            bookedBy: booking?.userId,
            userName: userName,
        };
        });
    }, [selectedDateString, bookings, stadium.id]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <CalendarIcon className="w-7 h-7 me-3 text-mint-500"/>
                {t('manageSchedule')}
            </h3>

            <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-4">
            {dates.map(date => (
                <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-shrink-0 ${
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
                <div
                key={slot.time}
                className={`p-3 rounded-lg text-center border-2 ${
                    slot.isBooked ? 'bg-sky-100 border-sky-300' : 'bg-gray-50 border-gray-200'
                }`}
                >
                <div className="flex items-center justify-center font-semibold text-gray-800">
                    <ClockIcon className="w-4 h-4 me-2"/>
                    <span>{slot.time}</span>
                </div>
                {slot.isBooked ? (
                    <div className="text-sm mt-2">
                        <p className="text-sky-800 font-semibold">{t('booked')}</p>
                        <p className="text-xs text-gray-500">{slot.userName || 'Unknown'}</p>
                    </div>
                ) : (
                    <button 
                    onClick={() => onToggleSlot(stadium.id, selectedDateString, slot.time, true)}
                    className="mt-2 w-full bg-mint-500 text-white text-xs px-2 py-1 rounded hover:bg-mint-600"
                    >
                    {t('addSlot')}
                    </button>
                )}
                </div>
            ))}
            </div>
      </div>
    )
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = (props) => {
    const { stadium, bookings, maintenanceInvoices, onAddInvoice, t } = props;
    const [view, setView] = useState<OwnerDashboardView>('schedule');

    const NavButton: React.FC<{
        onClick: () => void;
        isActive: boolean;
        icon: React.ReactNode;
        label: string;
    }> = ({ onClick, isActive, icon, label }) => (
        <button
            onClick={onClick}
            className={`flex-1 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                isActive
                ? 'bg-mint-500 text-white shadow-md'
                : 'bg-white hover:bg-mint-100 text-gray-700'
            }`}
        >
            {icon}
            <span className="font-semibold text-sm">{label}</span>
        </button>
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard')}</h2>
            <h3 className="text-xl text-gray-600 mb-6">{stadium.name}</h3>
            
            <div className="flex gap-4 mb-6">
                <NavButton
                    onClick={() => setView('schedule')}
                    isActive={view === 'schedule'}
                    icon={<CalendarIcon className="w-6 h-6" />}
                    label={t('manageSchedule')}
                />
                <NavButton
                    onClick={() => setView('financial')}
                    isActive={view === 'financial'}
                    icon={<DollarSignIcon className="w-6 h-6" />}
                    label={t('financialReports')}
                />
                <NavButton
                    onClick={() => setView('maintenance')}
                    isActive={view === 'maintenance'}
                    icon={<WrenchIcon className="w-6 h-6" />}
                    label={t('maintenanceInvoices')}
                />
            </div>

            <div>
                {view === 'schedule' && <ScheduleManager {...props} />}
                {view === 'financial' && <FinancialReports stadium={stadium} bookings={bookings} t={t} />}
                {view === 'maintenance' && <MaintenanceInvoices invoices={maintenanceInvoices} stadiumId={stadium.id} onAddInvoice={onAddInvoice} t={t} />}
            </div>
        </div>
    );
};
