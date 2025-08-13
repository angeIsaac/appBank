// Données mockées pour le système de gestion bancaire

export const bankingData = {
  // Statistiques du dashboard
  dashboardStats: {
    totalClients: 2847,
    totalAccounts: 3156,
    totalBalance: 24567890.50,
    todayTransactions: 1847,
    monthlyGrowth: 12.5,
    activeAccounts: 2956
  },

  // Données des clients
  clients: [
    {
      id: 1,
      nom: "Martin",
      prenom: "Jean",
      email: "jean.martin@email.com",
      telephone: "01 23 45 67 89",
      adresse: "15 rue de la Paix, 75001 Paris",
      dateNaissance: "1985-03-15",
      dateCreation: "2020-01-15",
      statut: "actif",
      avatar: "https://ui-avatars.com/api/?name=Jean+Martin&background=3b82f6&color=fff"
    },
    {
      id: 2,
      nom: "Dubois",
      prenom: "Marie",
      email: "marie.dubois@email.com",
      telephone: "01 34 56 78 90",
      adresse: "42 avenue des Champs, 75008 Paris",
      dateNaissance: "1992-07-22",
      dateCreation: "2021-03-10",
      statut: "actif",
      avatar: "https://ui-avatars.com/api/?name=Marie+Dubois&background=10b981&color=fff"
    },
    {
      id: 3,
      nom: "Rousseau",
      prenom: "Pierre",
      email: "pierre.rousseau@email.com",
      telephone: "01 45 67 89 01",
      adresse: "8 place Vendôme, 75001 Paris",
      dateNaissance: "1978-11-08",
      dateCreation: "2019-06-20",
      statut: "inactif",
      avatar: "https://ui-avatars.com/api/?name=Pierre+Rousseau&background=f59e0b&color=fff"
    },
    {
      id: 4,
      nom: "Moreau",
      prenom: "Sophie",
      email: "sophie.moreau@email.com",
      telephone: "01 56 78 90 12",
      adresse: "25 boulevard Saint-Michel, 75005 Paris",
      dateNaissance: "1990-05-12",
      dateCreation: "2022-01-08",
      statut: "actif",
      avatar: "https://ui-avatars.com/api/?name=Sophie+Moreau&background=8b5cf6&color=fff"
    }
  ],

  // Données des comptes bancaires
  comptes: [
    {
      id: 1,
      numeroCompte: "FR76 1234 5678 9012 3456 78",
      clientId: 1,
      clientNom: "Jean Martin",
      typeCompte: "Compte Courant",
      solde: 15250.75,
      devise: "EUR",
      dateOuverture: "2020-01-15",
      statut: "actif",
      decouvertAutorise: 1000,
      tauxInteret: 0.0
    },
    {
      id: 2,
      numeroCompte: "FR76 2345 6789 0123 4567 89",
      clientId: 1,
      clientNom: "Jean Martin",
      typeCompte: "Livret A",
      solde: 8500.00,
      devise: "EUR",
      dateOuverture: "2020-02-01",
      statut: "actif",
      decouvertAutorise: 0,
      tauxInteret: 3.0
    },
    {
      id: 3,
      numeroCompte: "FR76 3456 7890 1234 5678 90",
      clientId: 2,
      clientNom: "Marie Dubois",
      typeCompte: "Compte Courant",
      solde: 22890.30,
      devise: "EUR",
      dateOuverture: "2021-03-10",
      statut: "actif",
      decouvertAutorise: 2000,
      tauxInteret: 0.0
    },
    {
      id: 4,
      numeroCompte: "FR76 4567 8901 2345 6789 01",
      clientId: 3,
      clientNom: "Pierre Rousseau",
      typeCompte: "Compte Professionnel",
      solde: 45670.90,
      devise: "EUR",
      dateOuverture: "2019-06-20",
      statut: "suspendu",
      decouvertAutorise: 5000,
      tauxInteret: 0.0
    },
    {
      id: 5,
      numeroCompte: "FR76 5678 9012 3456 7890 12",
      clientId: 4,
      clientNom: "Sophie Moreau",
      typeCompte: "Compte Courant",
      solde: 3420.85,
      devise: "EUR",
      dateOuverture: "2022-01-08",
      statut: "actif",
      decouvertAutorise: 500,
      tauxInteret: 0.0
    }
  ],

  // Historique des transactions
  transactions: [
    {
      id: 1,
      compteId: 1,
      numeroCompte: "FR76 1234 5678 9012 3456 78",
      clientNom: "Jean Martin",
      type: "virement",
      montant: -450.00,
      devise: "EUR",
      libelle: "Virement vers Marie Dubois",
      beneficiaire: "Marie Dubois",
      date: "2024-01-13",
      heure: "14:30:25",
      statut: "validé",
      reference: "VIR240113001"
    },
    {
      id: 2,
      compteId: 3,
      numeroCompte: "FR76 3456 7890 1234 5678 90",
      clientNom: "Marie Dubois",
      type: "virement",
      montant: 450.00,
      devise: "EUR",
      libelle: "Virement de Jean Martin",
      beneficiaire: "Marie Dubois",
      date: "2024-01-13",
      heure: "14:30:26",
      statut: "validé",
      reference: "VIR240113001"
    },
    {
      id: 3,
      compteId: 1,
      numeroCompte: "FR76 1234 5678 9012 3456 78",
      clientNom: "Jean Martin",
      type: "retrait",
      montant: -120.00,
      devise: "EUR",
      libelle: "Retrait DAB - Place de la République",
      beneficiaire: "Jean Martin",
      date: "2024-01-12",
      heure: "16:45:12",
      statut: "validé",
      reference: "DAB240112001"
    },
    {
      id: 4,
      compteId: 2,
      numeroCompte: "FR76 2345 6789 0123 4567 89",
      clientNom: "Jean Martin",
      type: "depot",
      montant: 1500.00,
      devise: "EUR",
      libelle: "Dépôt en espèces",
      beneficiaire: "Jean Martin",
      date: "2024-01-12",
      heure: "10:15:30",
      statut: "validé",
      reference: "DEP240112001"
    },
    {
      id: 5,
      compteId: 3,
      numeroCompte: "FR76 3456 7890 1234 5678 90",
      clientNom: "Marie Dubois",
      type: "prelevement",
      montant: -89.50,
      devise: "EUR",
      libelle: "Prélèvement EDF",
      beneficiaire: "EDF",
      date: "2024-01-11",
      heure: "08:00:00",
      statut: "validé",
      reference: "PRE240111001"
    },
    {
      id: 6,
      compteId: 4,
      numeroCompte: "FR76 4567 8901 2345 6789 01",
      clientNom: "Pierre Rousseau",
      type: "virement",
      montant: 2500.00,
      devise: "EUR",
      libelle: "Virement salaire",
      beneficiaire: "Pierre Rousseau",
      date: "2024-01-10",
      heure: "09:30:00",
      statut: "validé",
      reference: "SAL240110001"
    },
    {
      id: 7,
      compteId: 5,
      numeroCompte: "FR76 5678 9012 3456 7890 12",
      clientNom: "Sophie Moreau",
      type: "carte",
      montant: -35.80,
      devise: "EUR",
      libelle: "Paiement CB - Carrefour",
      beneficiaire: "Carrefour",
      date: "2024-01-09",
      heure: "18:22:15",
      statut: "validé",
      reference: "CB240109001"
    },
    {
      id: 8,
      compteId: 1,
      numeroCompte: "FR76 1234 5678 9012 3456 78",
      clientNom: "Jean Martin",
      type: "frais",
      montant: -12.00,
      devise: "EUR",
      libelle: "Frais de tenue de compte",
      beneficiaire: "Banque",
      date: "2024-01-01",
      heure: "00:00:01",
      statut: "validé",
      reference: "FRA240101001"
    }
  ],

  // Types de comptes disponibles
  typesCompte: [
    "Compte Courant",
    "Livret A", 
    "Livret Développement Durable",
    "Compte Professionnel",
    "Compte Épargne",
    "Plan Épargne Logement"
  ],

  // Types de transactions
  typesTransaction: [
    "virement",
    "retrait", 
    "depot",
    "prelevement",
    "carte",
    "frais",
    "interets"
  ],

  // Statuts possibles
  statuts: {
    client: ["actif", "inactif", "suspendu"],
    compte: ["actif", "fermé", "suspendu"],
    transaction: ["en_attente", "validé", "rejeté", "annulé"]
  }
};

// Fonctions utilitaires
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: currency 
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const formatDateTime = (dateString, timeString) => {
  const date = new Date(`${dateString}T${timeString}`);
  return date.toLocaleString('fr-FR');
};

export const getTransactionTypeColor = (type) => {
  const colors = {
    virement: 'text-blue-600',
    retrait: 'text-red-600',
    depot: 'text-green-600',
    prelevement: 'text-orange-600',
    carte: 'text-purple-600',
    frais: 'text-gray-600',
    interets: 'text-emerald-600'
  };
  return colors[type] || 'text-gray-600';
};

export const getStatusColor = (status) => {
  const colors = {
    actif: 'text-green-600 bg-green-100',
    inactif: 'text-gray-600 bg-gray-100',
    suspendu: 'text-red-600 bg-red-100',
    fermé: 'text-red-600 bg-red-100',
    validé: 'text-green-600 bg-green-100',
    en_attente: 'text-yellow-600 bg-yellow-100',
    rejeté: 'text-red-600 bg-red-100',
    annulé: 'text-gray-600 bg-gray-100'
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};