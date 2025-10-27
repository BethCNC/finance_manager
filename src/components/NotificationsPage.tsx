import React from 'react';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import NotificationSettings from './NotificationSettings';

const NotificationsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <MobileHeader title="Notifications" showMenu showGrid={false} />

      <main className="flex-1 p-4 pb-24">
        <NotificationSettings />
      </main>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
