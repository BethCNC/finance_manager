import React from 'react';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import ReportsPage from './ReportsPage';

const ReportsPageWrapper: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <MobileHeader title="Reports" showMenu showGrid={false} />

      <main className="flex-1 p-4 pb-24">
        <ReportsPage />
      </main>

      <BottomNav />
    </div>
  );
};

export default ReportsPageWrapper;
