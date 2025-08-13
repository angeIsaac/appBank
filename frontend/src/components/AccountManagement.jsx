import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  CreditCard,
  Wallet,
  User,
  Calendar,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { bankingData, formatCurrency, formatDate, getStatusColor } from '../data/bankMockData';

const AccountCard = ({ compte, onEdit, onDelete, onView }) => {
  const soldeColor = compte.solde >= 0 ? 'text-green-600' : 'text-red-600';
  const isLowBalance = compte.solde < 1000;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{compte.typeCompte}</h3>
            <p className="text-sm text-gray-600">{compte.clientNom}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(compte.statut)}`}>
            {compte.statut}
          </span>
          {isLowBalance && compte.statut === 'actif' && (
            <AlertCircle className="w-4 h-4 text-amber-500" title="Solde faible" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Numéro de compte</p>
          <p className="text-sm font-mono text-gray-900">{compte.numeroCompte}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Solde</p>
            <p className={`text-xl font-bold ${soldeColor}`}>
              {formatCurrency(compte.solde)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Découvert</p>
            <p className="text-sm text-gray-900">
              {formatCurrency(compte.decouvertAutorise)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Ouvert le {formatDate(compte.dateOuverture)}</span>
          </div>
          {compte.tauxInteret > 0 && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>{compte.tauxInteret}% intérêt</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onView(compte)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(compte)}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(compte)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AccountModal = ({ compte, clients, isOpen, onClose, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState(compte || {
    numeroCompte: '',
    clientId: '',
    typeCompte: 'Compte Courant',
    solde: 0,
    devise: 'EUR',
    statut: 'actif',
    decouvertAutorise: 0,
    tauxInteret: 0
  });

  const generateAccountNumber = () => {
    const random = Math.floor(Math.random() * 10000000000000000);
    return `FR76 ${random.toString().padStart(16, '0').replace(/(.{4})/g, '$1 ').trim()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = clients.find(c => c.id === parseInt(formData.clientId));
    const accountData = {
      ...formData,
      clientNom: client ? `${client.prenom} ${client.nom}` : '',
      numeroCompte: formData.numeroCompte || generateAccountNumber(),
      dateOuverture: compte?.dateOuverture || new Date().toISOString().split('T')[0]
    };
    onSave(accountData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Nouveau Compte' : 
             mode === 'edit' ? 'Modifier Compte' : 'Détails du Compte'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <select
                value={formData.clientId || ''}
                onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              >
                <option value="">Sélectionner un client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.prenom} {client.nom}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de compte
              </label>
              <select
                value={formData.typeCompte || 'Compte Courant'}
                onChange={(e) => setFormData({...formData, typeCompte: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              >
                {bankingData.typesCompte.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {mode !== 'create' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de compte
              </label>
              <input
                type="text"
                value={formData.numeroCompte || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solde initial (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.solde || 0}
                onChange={(e) => setFormData({...formData, solde: parseFloat(e.target.value) || 0})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Découvert autorisé (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.decouvertAutorise || 0}
                onChange={(e) => setFormData({...formData, decouvertAutorise: parseFloat(e.target.value) || 0})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux d'intérêt (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tauxInteret || 0}
                onChange={(e) => setFormData({...formData, tauxInteret: parseFloat(e.target.value) || 0})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={formData.statut || 'actif'}
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              >
                <option value="actif">Actif</option>
                <option value="fermé">Fermé</option>
                <option value="suspendu">Suspendu</option>
              </select>
            </div>
          </div>

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

const AccountManagement = () => {
  const [comptes, setComptes] = useState(bankingData.comptes);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrage des comptes
  const filteredComptes = comptes.filter(compte => {
    const matchesSearch = 
      compte.numeroCompte.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compte.clientNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compte.typeCompte.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || compte.typeCompte === typeFilter;
    const matchesStatus = statusFilter === 'all' || compte.statut === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleViewAccount = (compte) => {
    setSelectedAccount(compte);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditAccount = (compte) => {
    setSelectedAccount(compte);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteAccount = (compte) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le compte ${compte.numeroCompte} ?`)) {
      setComptes(comptes.filter(c => c.id !== compte.id));
    }
  };

  const handleSaveAccount = (accountData) => {
    if (modalMode === 'create') {
      const newAccount = {
        ...accountData,
        id: Math.max(...comptes.map(c => c.id)) + 1,
        clientId: parseInt(accountData.clientId)
      };
      setComptes([...comptes, newAccount]);
    } else if (modalMode === 'edit') {
      setComptes(comptes.map(c => 
        c.id === selectedAccount.id ? { ...c, ...accountData } : c
      ));
    }
  };

  // Statistiques
  const totalSolde = comptes.reduce((sum, compte) => sum + compte.solde, 0);
  const comptesActifs = comptes.filter(c => c.statut === 'actif').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Comptes</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">
              {filteredComptes.length} compte{filteredComptes.length !== 1 ? 's' : ''} trouvé{filteredComptes.length !== 1 ? 's' : ''}
            </p>
            <span className="text-gray-400">•</span>
            <p className="text-gray-600">
              {comptesActifs} actif{comptesActifs !== 1 ? 's' : ''}
            </p>
            <span className="text-gray-400">•</span>
            <p className="text-green-600 font-semibold">
              Total: {formatCurrency(totalSolde)}
            </p>
          </div>
        </div>
        <button
          onClick={handleCreateAccount}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          <span>Nouveau Compte</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par numéro, client ou type de compte..."
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
            {bankingData.typesCompte.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="fermé">Fermé</option>
            <option value="suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredComptes.map((compte) => (
          <AccountCard
            key={compte.id}
            compte={compte}
            onView={handleViewAccount}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredComptes.length === 0 && (
        <div className="text-center py-12">
          <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun compte trouvé</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Aucun compte ne correspond à vos critères de recherche.'
              : 'Commencez par créer votre premier compte bancaire.'
            }
          </p>
          <button
            onClick={handleCreateAccount}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Créer un compte</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <AccountModal
        compte={selectedAccount}
        clients={bankingData.clients}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
        mode={modalMode}
      />
    </div>
  );
};

export default AccountManagement;