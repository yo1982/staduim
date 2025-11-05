
import React from 'react';
import type { Stadium } from '../types';
import { LocationMarkerIcon, TagIcon } from './icons';

interface StadiumListProps {
  stadiums: Stadium[];
  onSelectStadium: (id: number) => void;
  t: (key: string) => string;
}

const StadiumCard: React.FC<{ stadium: Stadium; onSelectStadium: (id: number) => void; t: (key: string) => string; }> = ({ stadium, onSelectStadium, t }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      onClick={() => onSelectStadium(stadium.id)}
    >
      <img src={stadium.photos[0]} alt={stadium.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{stadium.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <LocationMarkerIcon className="w-5 h-5 me-2 text-mint-500" />
          <span>{stadium.location}</span>
        </div>
        <div className="flex items-center text-gray-800">
          <TagIcon className="w-5 h-5 me-2 text-sky-500" />
          <span className="font-semibold">{stadium.price} {t('omr')}</span>
          <span className="text-sm text-gray-500 ms-1">/ {t('perHour')}</span>
        </div>
      </div>
    </div>
  );
};


export const StadiumList: React.FC<StadiumListProps> = ({ stadiums, onSelectStadium, t }) => {
  return (
    <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('stadiums')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stadiums.map(stadium => (
                <StadiumCard key={stadium.id} stadium={stadium} onSelectStadium={onSelectStadium} t={t} />
            ))}
        </div>
    </div>
  );
};
