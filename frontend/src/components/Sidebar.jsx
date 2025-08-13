import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ArrowLeftRight, 
  Settings,
  LogOut,
  ChevronLeft,
  Home,
  CreditCard
} from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange, isCollapsed, onToggleCollapse }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-600'
    },
    {
      id: 'clients',
      label: 'Gestion Clients',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 'comptes',
      label: 'Gestion Comptes',
      icon: Wallet,
      color: 'text-purple-600'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: ArrowLeftRight,
      color: 'text-orange-600'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      id: 'logout',
      label: 'Déconnexion',
      icon: LogOut,
      color: 'text-red-600'
    }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">BankApp</h1>
              <p className="text-xs text-gray-500">Gestion Bancaire</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft 
            className={`w-4 h-4 text-gray-600 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} 
          />
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <IconComponent 
                className={`w-5 h-5 ${isActive ? 'text-blue-600' : item.color}`} 
              />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomMenuItems.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => item.id === 'logout' ? alert('Déconnexion') : onPageChange(item.id)}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <IconComponent className={`w-5 h-5 ${item.color}`} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate">
                Administrateur
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;