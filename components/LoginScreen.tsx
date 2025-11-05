
import React from 'react';
import type { User } from '../types';

interface LoginScreenProps {
    onLogin: (user: User) => void;
    t: (key: string) => string;
    users: User[];
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, t, users }) => {
    const user = users.find(u => u.role === 'user');
    const owner = users.find(u => u.role === 'owner');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg text-center">
                <h1 className="text-4xl font-bold text-mint-600 mb-8">{t('appName')}</h1>
                <div className="space-y-4">
                    {user && (
                         <button
                            onClick={() => onLogin(user)}
                            className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            {t('loginAsUser')}
                        </button>
                    )}
                   {owner && (
                         <button
                            onClick={() => onLogin(owner)}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            {t('loginAsOwner')}
                        </button>
                   )}
                </div>
            </div>
        </div>
    );
}
