
import React, { useState } from 'react';
import type { MaintenanceInvoice } from '../types';

interface MaintenanceInvoicesProps {
  invoices: MaintenanceInvoice[];
  stadiumId: number;
  onAddInvoice: (newInvoice: Omit<MaintenanceInvoice, 'id'>) => void;
  t: (key: string) => string;
}

export const MaintenanceInvoices: React.FC<MaintenanceInvoicesProps> = ({ invoices, stadiumId, onAddInvoice, t }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || isNaN(parseFloat(amount))) return;
    
    onAddInvoice({
      stadiumId,
      date: new Date().toISOString().split('T')[0],
      description,
      amount: parseFloat(amount),
      status: 'Pending',
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">{t('newInvoice')}</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('description')}</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint-500 focus:ring-mint-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">{t('amount')} ({t('omr')})</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mint-500 focus:ring-mint-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="md:col-start-3 w-full justify-center bg-mint-500 hover:bg-mint-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            {t('addInvoice')}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">{t('invoiceDate')}</th>
                <th scope="col" className="px-6 py-3">{t('description')}</th>
                <th scope="col" className="px-6 py-3">{t('amount')}</th>
                <th scope="col" className="px-6 py-3">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id} className="bg-white border-b">
                  <td className="px-6 py-4">{invoice.date}</td>
                  <td className="px-6 py-4">{invoice.description}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{invoice.amount} {t('omr')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t(invoice.status.toLowerCase())}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
