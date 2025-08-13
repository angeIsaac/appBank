import React, { useState } from 'react';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  ArrowLeftRight,
  Eye,
  UserPlus,
  CreditCard,
  Activity
} from 'lucide-react';
import { bankingData, formatCurrency, formatDate } from '../data/bankMockData';

const StatCard = ({ title, value, icon: Icon, trend, color, bgColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{title}</p>
          <p className="text-2xl font-bold text-white mt-2 transition-all duration-300 group-hover:scale-110">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 transition-all duration-300 ${
              trend > 0 ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'
            } ${isHovered ? 'animate-pulse' : ''}`}>
              {trend > 0 ? '+' : ''}{trend}% ce mois
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full transition-all duration-500 ease-in-out transform ${
          isHovered ? 'scale-125 rotate-12' : ''
        } ${bgColor} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color} transition-all duration-300 ${
            isHovered ? 'animate-pulse' : ''
          }`} />
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : ''
      }`} />
    </div>
  );
};

const RecentTransaction = ({ transaction }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCredit = transaction.montant > 0;
  
  return (
    <div 
      className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0 transition-all duration-300 hover:bg-gray-700/30 hover:scale-102 rounded-lg px-2 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full transition-all duration-300 transform ${
          isCredit ? 'bg-green-500/20 group-hover:bg-green-500/30' : 'bg-red-500/20 group-hover:bg-red-500/30'
        } ${isHovered ? 'scale-110 rotate-6' : ''}`}>
          <ArrowLeftRight className={`w-4 h-4 transition-all duration-300 ${
            isCredit ? 'text-green-400' : 'text-red-400'
          } ${isHovered ? 'animate-pulse' : ''}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-300">{transaction.libelle}</p>
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{transaction.clientNom}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold transition-all duration-300 ${
          isCredit ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'
        } ${isHovered ? 'scale-110' : ''}`}>
          {formatCurrency(transaction.montant)}
        </p>
        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">{formatDate(transaction.date)}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { dashboardStats, transactions, clients, comptes } = bankingData;
  
  // Prendre les 5 dernières transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Nouveaux clients ce mois
  const nouveauxClients = clients.filter(client => {
    const dateCreation = new Date(client.dateCreation);
    const now = new Date();
    return dateCreation.getMonth() === now.getMonth() && 
           dateCreation.getFullYear() === now.getFullYear();
  });

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de votre système bancaire</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-500 delay-100">
          <StatCard
            title="Total Clients"
            value={dashboardStats.totalClients.toLocaleString()}
            icon={Users}
            trend={dashboardStats.monthlyGrowth}
            color="text-blue-400"
            bgColor="bg-blue-500"
          />
        </div>
        <div className="animate-in fade-in slide-in-from-left duration-500 delay-200">
          <StatCard
            title="Total Comptes"
            value={dashboardStats.totalAccounts.toLocaleString()}
            icon={Wallet}
            color="text-green-400"
            bgColor="bg-green-500"
          />
        </div>
        <div className="animate-in fade-in slide-in-from-left duration-500 delay-300">
          <StatCard
            title="Solde Total"
            value={formatCurrency(dashboardStats.totalBalance)}
            icon={TrendingUp}
            color="text-purple-400"
            bgColor="bg-purple-500"
          />
        </div>
        <div className="animate-in fade-in slide-in-from-left duration-500 delay-400">
          <StatCard
            title="Transactions Aujourd'hui"
            value={dashboardStats.todayTransactions.toLocaleString()}
            icon={ArrowLeftRight}
            color="text-orange-400"
            bgColor="bg-orange-500"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom duration-500 delay-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Transactions Récentes</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1 transition-all duration-300 hover:scale-105 group">
              <Eye className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Voir tout</span>
            </button>
          </div>
          <div className="space-y-0">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className={`animate-in fade-in slide-in-from-right duration-300 delay-${(index + 1) * 100}`}>
                <RecentTransaction transaction={transaction} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* New Clients */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 group animate-in fade-in slide-in-from-right duration-500 delay-600">
            <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">Nouveaux Clients</h3>
            <div className="space-y-3">
              {nouveauxClients.slice(0, 3).map((client, index) => (
                <div key={client.id} className={`flex items-center space-x-3 hover:bg-gray-700/30 rounded-lg p-2 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-right duration-300 delay-${(index + 7) * 100}`}>
                  <img
                    src={client.avatar}
                    alt={`${client.prenom} ${client.nom}`}
                    className="w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-green-300 transition-colors duration-300">
                      {client.prenom} {client.nom}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {formatDate(client.dateCreation)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center space-x-1 transition-all duration-300 hover:scale-105 group/btn">
              <UserPlus className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span>Ajouter un client</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 animate-in fade-in slide-in-from-right duration-500 delay-700">
            <h3 className="text-lg font-semibold text-white mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:translate-x-2 group">
                <CreditCard className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">Nouveau Compte</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:translate-x-2 group">
                <ArrowLeftRight className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">Nouvelle Transaction</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:translate-x-2 group">
                <Activity className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">Rapports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;