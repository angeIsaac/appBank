import React, { useState } from 'react';
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
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      activeBg: 'bg-blue-50 border-blue-200 shadow-sm'
    },
    {
      id: 'clients',
      label: 'Gestion Clients',
      icon: Users,
      color: 'text-green-600',
      hoverBg: 'hover:bg-green-50',
      activeBg: 'bg-green-50 border-green-200 shadow-sm'
    },
    {
      id: 'comptes',
      label: 'Gestion Comptes',
      icon: Wallet,
      color: 'text-purple-600',
      hoverBg: 'hover:bg-purple-50',
      activeBg: 'bg-purple-50 border-purple-200 shadow-sm'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: ArrowLeftRight,
      color: 'text-orange-600',
      hoverBg: 'hover:bg-orange-50',
      activeBg: 'bg-orange-50 border-orange-200 shadow-sm'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      color: 'text-gray-600',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      id: 'logout',
      label: 'Déconnexion',
      icon: LogOut,
      color: 'text-red-600',
      hoverBg: 'hover:bg-red-50'
    }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-500 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full shadow-lg`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className={`flex items-center transition-all duration-500 ease-in-out ${
          isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
        }`}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div className="ml-2">
            <h1 className="text-lg font-bold text-gray-900 transition-colors duration-300">BankApp</h1>
            <p className="text-xs text-gray-500 transition-colors duration-300">Gestion Bancaire</p>
          </div>
        </div>
        
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 group"
          onMouseEnter={() => setHoveredItem('toggle')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <ChevronLeft 
            className={`w-4 h-4 text-gray-600 transition-all duration-500 ease-in-out group-hover:text-blue-600 ${
              isCollapsed ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {/* Collapsed Logo */}
        {isCollapsed && (
          <div className="absolute left-4 top-4 transition-all duration-500 ease-in-out">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 ease-in-out transform group ${
                  isActive 
                    ? `${item.activeBg} text-gray-800 border translate-x-1 scale-105` 
                    : `${item.hoverBg} text-gray-700 hover:translate-x-1 hover:scale-105 hover:shadow-md`
                }`}
              >
                <div className="relative">
                  <IconComponent 
                    className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                      isActive ? item.color : `${item.color} group-hover:scale-110`
                    } ${isHovered ? 'animate-pulse' : ''}`} 
                  />
                  {(isActive || isHovered) && (
                    <div className={`absolute -inset-1 rounded-full opacity-20 transition-all duration-300 ${
                      isActive ? 'bg-current scale-150' : 'bg-current scale-125'
                    }`} />
                  )}
                </div>
                
                <div className={`ml-3 transition-all duration-500 ease-in-out ${
                  isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                }`}>
                  <span className="font-medium text-sm transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomMenuItems.map((item) => {
          const IconComponent = item.icon;
          const isHovered = hoveredItem === item.id;
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => item.id === 'logout' ? alert('Déconnexion') : onPageChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 ease-in-out transform group ${
                  item.hoverBg
                } text-gray-700 hover:translate-x-1 hover:scale-105 hover:shadow-md`}
              >
                <div className="relative">
                  <IconComponent 
                    className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                      item.color
                    } group-hover:scale-110 ${isHovered ? 'animate-pulse' : ''}`} 
                  />
                  {isHovered && (
                    <div className={`absolute -inset-1 rounded-full opacity-20 bg-current scale-125 transition-all duration-300`} />
                  )}
                </div>
                
                <div className={`ml-3 transition-all duration-500 ease-in-out ${
                  isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
                }`}>
                  <span className="font-medium text-sm transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Info */}
      <div className={`p-4 border-t border-gray-200 transition-all duration-500 ease-in-out ${
        isCollapsed ? 'opacity-0 h-0 overflow-hidden p-0' : 'opacity-100 h-auto'
      }`}>
        <div 
          className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group"
          onMouseEnter={() => setHoveredItem('user')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
              alt="Admin"
              className="w-10 h-10 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
            />
            <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate transition-colors duration-300 group-hover:text-blue-700">
              Admin User
            </p>
            <p className="text-xs text-gray-500 truncate transition-colors duration-300 group-hover:text-blue-500">
              Administrateur
            </p>
          </div>
          <div className={`w-2 h-2 rounded-full bg-green-500 transition-all duration-300 ${
            hoveredItem === 'user' ? 'animate-pulse scale-150' : ''
          }`} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;