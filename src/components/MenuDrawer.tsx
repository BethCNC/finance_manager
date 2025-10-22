import {X, User, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDrawer({isOpen, onClose}: MenuDrawerProps) {
  if (!isOpen) return null;

  const menuSections = [
    {
      title: 'Account',
      items: [
        {icon: User, label: 'Profile Settings', href: '/settings'},
        {icon: Bell, label: 'Notifications', href: '/settings'},
        {icon: Shield, label: 'Privacy & Security', href: '/settings'},
      ],
    },
    {
      title: 'Financial',
      items: [
        {icon: CreditCard, label: 'Connected Accounts', href: '/settings'},
        {icon: CreditCard, label: 'Subscriptions', href: '/subscriptions'},
        {icon: CreditCard, label: 'Bills', href: '/bills'},
      ],
    },
    {
      title: 'Support',
      items: [{icon: HelpCircle, label: 'Help & Support', href: '/settings'}],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-black">Menu</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-semibold text-lg">
                B&B
              </div>
              <div>
                <p className="font-semibold text-black">Beth & Bryan</p>
                <p className="text-sm text-gray-700">Family Account</p>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className="text-gray-700" />
                        <span className="text-black font-medium">{item.label}</span>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sign Out Button */}
          <button className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
