
import React, { useMemo } from 'react';
import type { Booking, Stadium } from '../types';

interface FinancialReportsProps {
  stadium: Stadium;
  bookings: Booking[];
  t: (key: string) => string;
}

export const FinancialReports: React.FC<FinancialReportsProps> = ({ stadium, bookings, t }) => {
  const stadiumBookings = useMemo(() => {
    return bookings.filter(b => b.stadiumId === stadium.id);
  }, [bookings, stadium.id]);

  const totalRevenue = useMemo(() => {
    return stadiumBookings.length * stadium.price;
  }, [stadiumBookings, stadium.price]);
  
  const monthlyRevenue = useMemo(() => {
    const revenueByMonth: Record<string, number> = {};
    stadiumBookings.forEach(booking => {
      const month = new Date(booking.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
      }
      revenueByMonth[month] += stadium.price;
    });
    return Object.entries(revenueByMonth).sort((a,b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [stadiumBookings, stadium.price]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-600">{t('totalRevenue')}</h4>
          <p className="text-4xl font-bold text-mint-600 mt-2">{totalRevenue} <span className="text-2xl">{t('omr')}</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-600">{t('monthlyRevenue')}</h4>
          <div className="mt-2 space-y-1">
            {monthlyRevenue.length > 0 ? monthlyRevenue.map(([month, revenue]) => (
              <div key={month} className="flex justify-between items-baseline">
                <span className="text-gray-700">{month}</span>
                <span className="font-semibold text-mint-700">{revenue} {t('omr')}</span>
              </div>
            )) : <p className="text-gray-500">{t('noBookings')}</p>}
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-4">{t('bookingsLog')}</h4>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">{t('invoiceDate')}</th>
                  <th scope="col" className="px-6 py-3">{t('description')}</th>
                  <th scope="col" className="px-6 py-3">{t('amount')}</th>
                </tr>
              </thead>
              <tbody>
                {stadiumBookings.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(booking => (
                  <tr key={booking.id} className="bg-white border-b">
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">Booking at {booking.time}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{stadium.price} {t('omr')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
