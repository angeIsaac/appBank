import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  ArrowUpDown,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Building2,
  Banknote,
  Receipt,
  TrendingUp
} from 'lucide-react';
import { bankingData, formatCurrency, formatDate, formatDateTime, getTransactionTypeColor, getStatusColor } from '../data/bankMockData';

const TransactionTypeIcon = ({ type }) => {
  const icons = {
    virement: ArrowUpDown,
    retrait: ArrowDownLeft,
    depot: ArrowUpRight,
    prelevement: Building2,
    carte: CreditCard,
    frais: Receipt,
    interets: TrendingUp
  };
  
  const IconComponent = icons[type] || ArrowUpDown;
  return <IconComponent className="w-4 h-4" />;
};

const TransactionRow = ({ transaction, onView }) => {
  const isCredit = transaction.montant > 0;
  const typeColor = getTransactionTypeColor(transaction.type);
  
  return (
    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => onView(transaction)}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            isCredit ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <TransactionTypeIcon type={transaction.type} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{transaction.libelle}</div>
            <div className="text-sm text-gray-500">Réf: {transaction.reference}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.clientNom}</div>
        <div className="text-sm text-gray-500 font-mono">
          {transaction.numeroCompte.slice(-8)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${typeColor} bg-gray-100`}>
          {transaction.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDateTime(transaction.date, transaction.heure)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.beneficiaire}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className={`text-sm font-semibold ${
          isCredit ? 'text-green-600' : 'text-red-600'
        }`}>
          {isCredit ? '+' : ''}{formatCurrency(transaction.montant)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.statut)}`}>
          {transaction.statut}
        </span>
      </td>
    </tr>
  );
};

const TransactionModal = ({ transaction, comptes, isOpen, onClose, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState(transaction || {
    compteId: '',
    type: 'virement',
    montant: 0,
    libelle: '',
    beneficiaire: '',
    date: new Date().toISOString().split('T')[0],
    heure: new Date().toTimeString().slice(0, 8),
    statut: 'en_attente'
  });

  const generateReference = (type) => {
    const prefix = type.toUpperCase().slice(0, 3);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${date}${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const compte = comptes.find(c => c.id === parseInt(formData.compteId));
    const transactionData = {
      ...formData,
      numeroCompte: compte?.numeroCompte || '',
      clientNom: compte?.clientNom || '',
      reference: transaction?.reference || generateReference(formData.type),
      devise: 'EUR'
    };
    onSave(transactionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Nouvelle Transaction' : 
             mode === 'edit' ? 'Modifier Transaction' : 'Détails de la Transaction'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compte
              </label>
              <select
                value={formData.compteId || ''}
                onChange={(e) => setFormData({...formData, compteId: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              >
                <option value="">Sélectionner un compte</option>
                {comptes.filter(c => c.statut === 'actif').map(compte => (
                  <option key={compte.id} value={compte.id}>
                    {compte.clientNom} - {compte.typeCompte}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de transaction
              </label>
              <select
                value={formData.type || 'virement'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              >
                {bankingData.typesTransaction.map(type => (
                  <option key={type} value={type} className="capitalize">{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant (€)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.montant || 0}
              onChange={(e) => setFormData({...formData, montant: parseFloat(e.target.value) || 0})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Utilisez un montant négatif pour les débits (retraits, paiements)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Libellé
            </label>
            <input
              type="text"
              value={formData.libelle || ''}
              onChange={(e) => setFormData({...formData, libelle: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              placeholder="Description de la transaction..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bénéficiaire
            </label>
            <input
              type="text"
              value={formData.beneficiaire || ''}
              onChange={(e) => setFormData({...formData, beneficiaire: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              placeholder="Nom du bénéficiaire..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heure
              </label>
              <input
                type="time"
                step="1"
                value={formData.heure || ''}
                onChange={(e) => setFormData({...formData, heure: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={formData.statut || 'en_attente'}
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              >
                <option value="en_attente">En attente</option>
                <option value="validé">Validé</option>
                <option value="rejeté">Rejeté</option>
                <option value="annulé">Annulé</option>
              </select>
            </div>
          </div>

          {mode !== 'create' && transaction && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Référence:</strong> {transaction.reference}
              </p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {mode === 'view' ? 'Fermer' : 'Annuler'}
            </button>
            {mode !== 'view' && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === 'create' ? 'Créer' : 'Sauvegarder'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState(bankingData.transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Filtrage et tri des transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = 
        transaction.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.clientNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.beneficiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || transaction.statut === statusFilter;
      
      const matchesDateRange = (!dateRange.start || transaction.date >= dateRange.start) &&
                              (!dateRange.end || transaction.date <= dateRange.end);
      
      return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'date') {
        aValue = new Date(`${a.date}T${a.heure}`);
        bValue = new Date(`${b.date}T${b.heure}`);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleCreateTransaction = () => {
    setSelectedTransaction(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (transactionData) => {
    if (modalMode === 'create') {
      const newTransaction = {
        ...transactionData,
        id: Math.max(...transactions.map(t => t.id)) + 1,
        compteId: parseInt(transactionData.compteId)
      };
      setTransactions([...transactions, newTransaction]);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Heure,Référence,Type,Libellé,Client,Montant,Bénéficiaire,Statut\n"
      + filteredTransactions.map(t => 
          `${t.date},${t.heure},${t.reference},${t.type},"${t.libelle}","${t.clientNom}",${t.montant},"${t.beneficiaire}",${t.statut}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistiques
  const totalTransactions = transactions.length;
  const montantTotal = transactions.reduce((sum, t) => sum + t.montant, 0);
  const transactionsAujourdhui = transactions.filter(t => t.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historique des Transactions</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} trouvée{filteredTransactions.length !== 1 ? 's' : ''}
            </p>
            <span className="text-gray-400">•</span>
            <p className="text-gray-600">
              {transactionsAujourdhui} aujourd'hui
            </p>
            <span className="text-gray-400">•</span>
            <p className={`font-semibold ${montantTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Volume: {formatCurrency(Math.abs(montantTotal))}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
          <button
            onClick={handleCreateTransaction}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Transaction</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par libellé, client, bénéficiaire ou référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les types</option>
              {bankingData.typesTransaction.map(type => (
                <option key={type} value={type} className="capitalize">{type}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="validé">Validé</option>
              <option value="rejeté">Rejeté</option>
              <option value="annulé">Annulé</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Date de début"
          />
          <span className="text-gray-500">à</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Date de fin"
          />
          {(dateRange.start || dateRange.end) && (
            <button
              onClick={() => setDateRange({ start: '', end: '' })}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('libelle')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Transaction</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('clientNom')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Client & Compte</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Type</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date & Heure</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bénéficiaire
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('montant')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Montant</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('statut')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Statut</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onView={handleViewTransaction}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune transaction trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' || dateRange.start || dateRange.end
                ? 'Aucune transaction ne correspond à vos critères de recherche.'
                : 'Les transactions apparaîtront ici une fois créées.'
              }
            </p>
            <button
              onClick={handleCreateTransaction}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une transaction</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        comptes={bankingData.comptes}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        mode={modalMode}
      />
    </div>
  );
};

export default TransactionManagement;