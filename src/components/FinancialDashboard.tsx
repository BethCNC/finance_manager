import React, {useState} from 'react';
import {MobileHeader} from './MobileHeader';
import {SectionHeader} from './SectionHeader';
import {CategoryProgressBar} from './CategoryProgressBar';
import {GoalCard} from './GoalCard';
import {QuestionCard} from './QuestionCard';
import {Button} from './Button';
import BottomNav from './BottomNav';
import MenuDrawer from './MenuDrawer';
import {CategoryBudget, SavingsGoal, AIQuestion} from '../types/dashboard';

const FinancialDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock data - matches Figma design
  const mockBudgetData: CategoryBudget[] = [
    {
      category: 'mortgage',
      label: 'Mortgage',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'utilities',
      label: 'Bills',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'home',
      label: 'Home Reno',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'george',
      label: 'George',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'food',
      label: 'Food',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'auto',
      label: 'Auto',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'entertainment',
      label: 'Entertainment',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'health',
      label: 'Health',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'software',
      label: 'Software',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    },
    {
      category: 'personal',
      label: 'Personal',
      spent: 85,
      budget: 150,
      alerts: {warning: true}
    }
  ];

  const mockGoalsData: SavingsGoal[] = [
    {
      name: 'Emergency Fund',
      percentage: 75,
      color: 'blue',
      current: 7500,
      target: 10000
    },
    {
      name: 'Debt Paydown',
      percentage: 50,
      color: 'green',
      current: 5000,
      target: 10000
    },
    {
      name: 'Roth IRA',
      percentage: 25,
      color: 'pink',
      current: 2500,
      target: 10000
    }
  ];

  const mockQuestions: AIQuestion[] = [
    {
      id: '1',
      question: 'Your subscriptions rose 12%. Want to see why?'
    },
    {
      id: '2',
      question: 'Your $83 under budget this month. Move that to savings?'
    }
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleGridClick = () => {
    console.log('Grid clicked');
    // TODO: Open grid view or settings
  };

  const handleQuestionClick = (questionId: string) => {
    console.log('Question clicked:', questionId);
    // TODO: Handle AI question interaction
  };

  const handleSaveMore = () => {
    console.log('Save More clicked');
    // TODO: Navigate to savings flow
  };

  const handleSeeTransactions = () => {
    console.log('See Transactions clicked');
    // TODO: Navigate to transactions
  };

  const handleAskAdvisor = () => {
    console.log('Ask AI Advisor clicked');
    // TODO: Open AI chat
  };

  return (
    <div className="bg-bg-bg-subtle flex flex-col min-h-screen">
      {/* Mobile Header */}
      <MobileHeader
        title="Dashboard"
        showMenu
        showGrid
        onMenuClick={handleMenuClick}
        onGridClick={handleGridClick}
      />

      {/* Main Content - matches Figma layout exactly */}
      <div className="flex flex-col gap-6 p-6 pb-24">
        
        {/* Budget Categories Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Budget Categories" />
          <div className="flex flex-col gap-6">
            {mockBudgetData.map((item) => (
              <CategoryProgressBar 
                key={item.category}
                category={item.category}
                label={item.label}
                spent={item.spent}
                budget={item.budget}
                alerts={item.alerts}
              />
            ))}
          </div>
        </div>

        {/* Savings Goals Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="Savings Goals" />
          <div className="flex gap-3">
            {mockGoalsData.map((goal, idx) => (
              <GoalCard 
                key={idx}
                goalName={goal.name}
                percentage={goal.percentage}
                color={goal.color}
                current={goal.current}
                target={goal.target}
              />
            ))}
          </div>
        </div>
        
        {/* AI Insights Section */}
        <div className="flex flex-col gap-6">
          <SectionHeader title="AI Insights" />
          <div className="border border-fg-border rounded-2xl p-6 flex flex-col gap-6">
            {mockQuestions.map((q) => (
              <QuestionCard 
                key={q.id}
                question={q.question}
                onClick={() => handleQuestionClick(q.id)}
                showIcon={false}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 h-14">
          <Button 
            variant="solid" 
            fullWidth
            onClick={handleSaveMore}
          >
            Save More
          </Button>
          <Button 
            variant="solid" 
            fullWidth
            onClick={handleSeeTransactions}
          >
            See Transactions
          </Button>
          <Button 
            variant="solid" 
            fullWidth
            onClick={handleAskAdvisor}
          >
            Ask AI Advisor
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
      
      {/* Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default FinancialDashboard;
