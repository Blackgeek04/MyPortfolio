/* Données des projets. Ce fichier est chargé par script.js : ça marche en ouvrant index.html
   directement sur ton ordinateur ET sur Vercel. Modifie seulement le contenu, garde la 1re ligne.
   Facultatif par projet : "image": "assets/capture-carnet.webp", "lien_demo": "https://...", "lien_code": "https://github.com/...".
   Page du projet (projet.html?id=...) : "demo": "assets/demos/mobile-money.html" (page de démo affichée dans un cadre),
   "captures": ["assets/captures/mm-1.webp", "assets/captures/mm-2.webp"]. */
window.PROJETS = {
  "projets": [
    {
      "ordre": 1,
      "id": "carnet-sante",
      "visible": true,
      "nom": "Mon Carnet de Santé",
      "statut": "En finalisation",
      "statut_type": "cours",
      "description": "Carnet de santé personnel en ligne : profils familiaux (enfants, parents), rendez-vous, dossier médical et suivi des vaccins, pour un suivi partagé au sein de la famille.",
      "points": [
        "Inscription et connexion sécurisées (hachage des mots de passe, sessions)",
        "Schéma pensé pour une synchronisation avec une appli mobile"
      ],
      "tags": ["PHP 8", "MySQL", "PDO", "Bootstrap 5"],
      "image": "",
      "captures": [],
      "demo": "assets/demos/carnet-sante.html",
      "lien_demo": "",
      "lien_code": ""
    },
    {
      "ordre": 2,
      "id": "mobile-money",
      "visible": true,
      "nom": "Gestion Mobile Money",
      "statut": "En développement",
      "statut_type": "dev",
      "description": "Logiciel de gestion d'agence mobile money : dépôts, retraits, float et espèces, pour quatre réseaux (Moov, Orange, MTN, Wave).",
      "points": [
        "Grand livre : les soldes sont calculés à partir des mouvements, jamais saisis à la main",
        "Chaque opération est une transaction : tout ou rien, sans doublon de référence",
        "Clôture de caisse quotidienne avec calcul de l'écart",
        "Reçus numérotés et historique pour le gérant"
      ],
      "tags": ["PHP 8", "MySQL", "Transactions SQL", "Kotlin (en conception)"],
      "image": "",
      "captures": [],
      "demo": "",
      "lien_demo": "",
      "lien_code": ""
    },
    {
      "ordre": 3,
      "id": "bibliogest",
      "visible": true,
      "nom": "BiblioGest",
      "statut": "En finalisation",
      "statut_type": "cours",
      "description": "Gestion de bibliothèque avec un poste au comptoir et un site pour les adhérents : préemprunt en ligne avec reçu, réservations, retours et rappels.",
      "points": [
        "Exemplaires individuels suivis par code-barres",
        "Règles de prêt selon le profil (durée, nombre de livres, pénalités)",
        "File de notifications sans doublon, pour SMS et push"
      ],
      "tags": ["PHP", "MySQL", "Bootstrap 5", "Tâches planifiées"],
      "image": "",
      "captures": [],
      "demo": "assets/demos/bibliogest.html",
      "lien_demo": "",
      "lien_code": ""
    }
  ]
};
