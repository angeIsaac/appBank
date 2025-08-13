import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { profiles } from '../data/mockData';

const Header = ({ onSearch, onProfileSelect, currentProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="text-red-600 text-2xl font-bold">NETFLIX</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-black/70 border border-white/30 text-white px-4 py-1 rounded-sm focus:outline-none focus:border-white w-64"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setShowSearch(false);
                  }}
                />
                <Search 
                  className="w-5 h-5 text-white ml-2 cursor-pointer" 
                  onClick={() => setShowSearch(false)}
                />
              </form>
            ) : (
              <Search 
                className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" 
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>

          {/* Notifications */}
          <Bell className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />

          {/* Profile Menu */}
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={currentProfile?.avatar || profiles[0].avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded"
              />
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 bg-black/90 border border-gray-600 rounded-md min-w-48 py-2">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      onProfileSelect(profile);
                      setShowProfileMenu(false);
                    }}
                  >
                    <img src={profile.avatar} alt={profile.name} className="w-6 h-6 rounded" />
                    <span className="text-white">{profile.name}</span>
                  </div>
                ))}
                <hr className="border-gray-600 my-2" />
                <div className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer">Manage Profiles</div>
                <div className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer">Account</div>
                <div className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer">Help Center</div>
                <hr className="border-gray-600 my-2" />
                <div className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer">Sign out of Netflix</div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Menu className="w-5 h-5 text-white md:hidden cursor-pointer hover:text-gray-300 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;