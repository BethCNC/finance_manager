import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {HomeIcon, Receipt, PieChart, MessageCircle, Menu, CreditCard, FileText, Settings, X} from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainNavItems = [
    {icon: HomeIcon, label: 'Home', href: '/'},
    {icon: Receipt, label: 'Transactions', href: '/transactions'},
    {icon: PieChart, label: 'Budget', href: '/budget'},
    {icon: MessageCircle, label: 'Advisor', href: '/advisor'},
    {icon: Menu, label: 'More', href: '#', onClick: () => setShowMoreMenu(true)},
  ];

  const moreMenuItems = [
    {icon: CreditCard, label: 'Subscriptions', href: '/subscriptions'},
    {icon: FileText, label: 'Bills', href: '/bills'},
    {icon: Settings, label: 'Settings', href: '/settings'},
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-100 border-t border-slate-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          {mainNavItems.map((item, index) => {
            const isActive = item.href === location.pathname;
            const isMoreButton = item.label === 'More';

            if (isMoreButton) {
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors"
                >
                  {React.createElement(item.icon, {
                    size: 22,
                    className: 'text-gray-700',
                    strokeWidth: 2,
                  })}
                  <span className="text-xs font-medium text-gray-700">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={index}
                to={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors"
              >
                {React.createElement(item.icon, {
                  size: 22,
                  className: isActive ? 'text-black' : 'text-gray-700',
                  strokeWidth: isActive ? 2.5 : 2,
                })}
                <span className={`text-xs font-medium ${isActive ? 'text-black' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowMoreMenu(false)}>
          <div className="bg-white w-full rounded-t-3xl shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-black">More Options</h3>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={18} className="text-gray-700" />
                </button>
              </div>

              <div className="space-y-2">
                {moreMenuItems.map((item, index) => {
                  const isActive = item.href === location.pathname;

                  return (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setShowMoreMenu(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-gray-50 border border-gray-200'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      {React.createElement(item.icon, {
                        size: 24,
                        className: isActive ? 'text-black' : 'text-gray-700',
                        strokeWidth: isActive ? 2.5 : 2,
                      })}
                      <span className={`text-base font-medium ${isActive ? 'text-black' : 'text-gray-900'}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
