import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { bankingData, formatDate, getStatusColor } from '../data/bankMockData';

const ClientCard = ({ client, onEdit, onDelete, onView }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img
          src={client.avatar}
          alt={`${client.prenom} ${client.nom}`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900">
            {client.prenom} {client.nom}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.statut)}`}>
            {client.statut}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onView(client)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(client)}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(client)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Mail className="w-4 h-4 mr-2" />
        <span>{client.email}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Phone className="w-4 h-4 mr-2" />
        <span>{client.telephone}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-2" />
        <span className="truncate">{client.adresse}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Client depuis {formatDate(client.dateCreation)}</span>
      </div>
    </div>
  </div>
);

const ClientModal = ({ client, isOpen, onClose, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState(client || {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    dateNaissance: '',
    statut: 'actif'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Nouveau Client' : 
             mode === 'edit' ? 'Modifier Client' : 'Détails du Client'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                value={formData.prenom || ''}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={formData.nom || ''}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.telephone || ''}
              onChange={(e) => setFormData({...formData, telephone: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <textarea
              value={formData.adresse || ''}
              onChange={(e) => setFormData({...formData, adresse: e.target.value})}
              disabled={mode === 'view'}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={formData.dateNaissance || ''}
                onChange={(e) => setFormData({...formData, dateNaissance: e.target.value})}
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
                value={formData.statut || 'actif'}
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              >
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
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

const ClientManagement = () => {
  const [clients, setClients] = useState(bankingData.clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrage des clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateClient = () => {
    setSelectedClient(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClient = (client) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.prenom} ${client.nom} ?`)) {
      setClients(clients.filter(c => c.id !== client.id));
    }
  };

  const handleSaveClient = (clientData) => {
    if (modalMode === 'create') {
      const newClient = {
        ...clientData,
        id: Math.max(...clients.map(c => c.id)) + 1,
        dateCreation: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${clientData.prenom}+${clientData.nom}&background=3b82f6&color=fff`
      };
      setClients([...clients, newClient]);
    } else if (modalMode === 'edit') {
      setClients(clients.map(c => 
        c.id === selectedClient.id ? { ...c, ...clientData } : c
      ));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600">
            {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} trouvé{filteredClients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleCreateClient}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nouveau Client</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
            <option value="suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onView={handleViewClient}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun client trouvé</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Aucun client ne correspond à vos critères de recherche.'
              : 'Commencez par ajouter votre premier client.'
            }
          </p>
          <button
            onClick={handleCreateClient}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un client</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <ClientModal
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        mode={modalMode}
      />
    </div>
  );
};

export default ClientManagement;