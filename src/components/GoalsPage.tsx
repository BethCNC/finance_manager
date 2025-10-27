import React from 'react';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import FinancialGoals from './FinancialGoals';

const GoalsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <MobileHeader title="Goals" showMenu showGrid={false} />

      <main className="flex-1 p-4 pb-24">
        <FinancialGoals />
      </main>

      <BottomNav />
    </div>
  );
};

export default GoalsPage;
