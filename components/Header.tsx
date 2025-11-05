
import React from 'react';
import type { User, Language } from '../types';

interface HeaderProps {
  user: User | null;
  language: Language;
  t: (key: string) => string;
  onLogout: () => void;
  onNavigate: (view: 'stadium_list' | 'user_bookings' | 'owner_dashboard') => void;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, language, t, onLogout, onNavigate, onLanguageChange }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-mint-600 cursor-pointer" onClick={() => onNavigate('stadium_list')}>
          {t('appName')}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-mint-500"
            >
                <option value="en">{t('english')}</option>
                <option value="ar">{t('arabic')}</option>
            </select>
             <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 hidden sm:inline">{t('welcome')}, {user.name}</span>
               <button onClick={() => onNavigate('stadium_list')} className="text-gray-600 hover:text-mint-600 hidden md:block">{t('home')}</button>
                {user.role === 'user' && <button onClick={() => onNavigate('user_bookings')} className="text-gray-600 hover:text-mint-600">{t('myBookings')}</button>}
                {user.role === 'owner' && <button onClick={() => onNavigate('owner_dashboard')} className="text-gray-600 hover:text-mint-600">{t('dashboard')}</button>}
              <button
                onClick={onLogout}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
