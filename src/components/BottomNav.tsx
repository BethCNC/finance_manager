import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Home, Layers, CreditCard, TrendingUp, Map} from 'lucide-react';

/**
 * Bottom Navigation Component
 * Based on Figma design: node-id=307:9608
 *
 * Features:
 * - 5 navigation items with icons and labels
 * - Slate color scheme (bg-slate-200, text-slate-500)
 * - Borders between items
 * - 92px height with 24px padding
 */
export default function BottomNav() {
  const location = useLocation();

  // Main 5 navigation items (Dashboard, Accounts, Transactions, Cash Flow, Budget)
  const mainNavItems = [
    {icon: Home, label: 'Dashboard', href: '/'},
    {icon: Layers, label: 'Accounts', href: '/accounts'},
    {icon: CreditCard, label: 'Transactions', href: '/transactions'},
    {icon: TrendingUp, label: 'Cash Flow', href: '/advisor'},
    {icon: Map, label: 'Budget', href: '/budget'},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-slate-300 z-40">
      <div className="flex items-center h-[92px] max-w-md mx-auto">
        {mainNavItems.map((item, index) => {
          const isActive = item.href === location.pathname;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center gap-3 p-6 h-full justify-center transition-colors ${
                index < mainNavItems.length - 1 ? 'border-r border-slate-300' : ''
              } ${isActive ? 'bg-blue-100' : 'bg-slate-200'} flex-1`}
            >
              <Icon
                size={24}
                className={isActive ? 'text-blue-600' : 'text-slate-500'}
                strokeWidth={2}
              />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
