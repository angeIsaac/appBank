import React from 'react';
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

const StatCard = ({ title, value, icon: Icon, trend, color, bgColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% ce mois
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

const RecentTransaction = ({ transaction }) => {
  const isCredit = transaction.montant > 0;
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${
          isCredit ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <ArrowLeftRight className={`w-4 h-4 ${
            isCredit ? 'text-green-600' : 'text-red-600'
          }`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{transaction.libelle}</p>
          <p className="text-xs text-gray-500">{transaction.clientNom}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${
          isCredit ? 'text-green-600' : 'text-red-600'
        }`}>
          {formatCurrency(transaction.montant)}
        </p>
        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre système bancaire</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={dashboardStats.totalClients.toLocaleString()}
          icon={Users}
          trend={dashboardStats.monthlyGrowth}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Total Comptes"
          value={dashboardStats.totalAccounts.toLocaleString()}
          icon={Wallet}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Solde Total"
          value={formatCurrency(dashboardStats.totalBalance)}
          icon={TrendingUp}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatCard
          title="Transactions Aujourd'hui"
          value={dashboardStats.todayTransactions.toLocaleString()}
          icon={ArrowLeftRight}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Transactions Récentes</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Voir tout</span>
            </button>
          </div>
          <div className="space-y-0">
            {recentTransactions.map((transaction) => (
              <RecentTransaction key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* New Clients */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveaux Clients</h3>
            <div className="space-y-3">
              {nouveauxClients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center space-x-3">
                  <img
                    src={client.avatar}
                    alt={`${client.prenom} ${client.nom}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {client.prenom} {client.nom}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(client.dateCreation)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center space-x-1">
              <UserPlus className="w-4 h-4" />
              <span>Ajouter un client</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Nouveau Compte</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ArrowLeftRight className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Nouvelle Transaction</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Activity className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Rapports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;