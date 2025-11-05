
import React, { useEffect } from 'react';
import type { Notification } from '../types';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const baseClasses = "fixed bottom-5 right-5 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300";
  const typeClasses = notification.type === 'success' ? 'bg-mint-500' : 'bg-red-500';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {notification.message}
    </div>
  );
};
