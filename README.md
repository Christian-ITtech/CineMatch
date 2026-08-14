# CinéMatch — Catalogue de films et gestion de favoris

CinéMatch est une application web responsive de type Single Page Application (SPA) permettant de consulter un catalogue cinématographique en temps réel. En se connectant directement à l'API internationale de The Movie Database (TMDB), l'application agrège les données des films populaires, intègre un système de recherche ciblé, adapte dynamiquement son interface selon les notes obtenues et gère un espace personnalisé pour les œuvres favorites de l'utilisateur.

---

## Fonctionnalités du Projet

Le développement de l'application s'articule autour de trois niveaux d'exigences techniques :

### Niveau 1 : Les Fondamentaux (Validé)
*   **Connexion API Sécurisée :** Authentification et requêtes asynchrones vers l'API TMDB (endpoint de popularité) via fetch() et la syntaxe async/await, exploitant un jeton d'accès sécurisé (Bearer Token).
*   **Affichage Dynamique :** Injection programmatique des cartes de films (affiches officielles, titres, dates de sortie et notes moyennes) au sein du DOM.
*   **Résilience UX :** Prise en charge complète des états de l'application avec un indicateur visuel de chargement (Spinner animé) et une gestion rigoureuse des exceptions réseau (bloc try/catch avec bouton de réinitialisation).
*   **Mise en page fluide :** Structure globale construite en CSS moderne à l'aide de Flexbox et d'une grille adaptative CSS Grid optimisée pour les formats d'affiches de cinéma.

### Niveau 2 : L'Interactivité (Validé)
*   **Moteur de Recherche Dédié :** Intégration d'une barre de recherche reliée à l'endpoint de recherche de TMDB, s'activant à la validation (clic sur l'icône ou touche Entrée) pour actualiser la grille en temps réel.
*   **Indicateurs Visuels Dynamiques :** Algorithme appliquant des classes CSS conditionnelles en JavaScript sur les notes des films pour un code couleur instantané (Vert pour les notes supérieures ou égales à 7, Orange entre 5 et 7, Rouge en dessous de 5).

### Niveau 3 : L'Expérience Avancée (Validé)
*   **Fenêtre Modale de Détails :** Superposition d'un composant de détails (synopsis complet, image grand format et date précise) au clic sur une affiche de film, gérée dynamiquement sans rechargement de page et avec gel du défilement de l'arrière-plan.
*   **Espace Favoris Persistant :** Boutons d'activation unitaires permettant d'ajouter ou de retirer une œuvre d'un index de favoris local. Les données sont sauvegardées dans le localStorage pour garantir la persistance des choix après fermeture du navigateur.

---

## Arborescence Complète du Projet

Le projet respecte une architecture modulaire stricte, isolant les responsabilités graphiques, logiques et réseau dans des fichiers indépendants :

```text
cinematch/
│
├── index.html          # Structure HTML5 sémantique, conteneurs d'états et structure de la modale
│
├── css/
│   └── styles.css      # Design system cinéma (thème sombre), mise en page responsive et transitions
│
└── js/
    ├── app.js          # Point d'entrée de l'application (Orchestrateur global et gestion de l'accueil)
    ├── api.js          # Module réseau (Configuration des requêtes fetch et stockage du jeton TMDB)
    ├── render.js       # Gestionnaire graphique (Génération des cartes de films et cycle de vie de la modale)
    ├── search.js       # Logique événementielle liée aux requêtes du champ de recherche
    └── favorites.js    # Moteur de sauvegarde (Algorithme du toggle de favoris et gestion du localStorage)
```

---

## Spécifications Design & UI

*   **Palette de couleurs :** Une esthétique dark mode immersive associant un fond sombre de terminal (#0a0e17) à un accent rouge cinéma (#ff5252) pour les éléments d'action principaux.
*   **Typographies :** Utilisation de la police Poppins pour les titres afin d'apporter du caractère à l'interface, associée à la clarté de Inter pour la lisibilité des synopsis et des métadonnées.
*   **Adaptabilité Responsive :** Redimensionnement adaptatif de la grille de films pour maintenir un confort de lecture visuelle aussi bien sur moniteur de bureau que sur écran mobile, couplé à une réorganisation verticale des composants de la barre de navigation.

---

## Installation et Lancement Local

En raison de l'utilisation des modules JavaScript natifs (ES6 Modules), le projet doit obligatoirement s'exécuter derrière un serveur local pour respecter les règles de sécurité relatives aux requêtes réseau.

1.  **Cloner le dépôt du projet :**
    ```bash
    git clone https://github.com](https://github.com/Christian-ITtech/CineMatch.git
    cd CineMatch
    ```
2.  **Configuration des identifiants :**
    *   Ouvrez le fichier `js/api.js`.
    *   Insérez votre jeton d'accès TMDB personnel au sein de la variable `API_TOKEN`.
3.  **Démarrage de l'application :**
    *   **Via PyCharm :** Ouvrez le dossier racine, ouvrez `index.html`, survolez le code et cliquez sur l'icône de votre navigateur pour démarrer le serveur de l'IDE.
    *   **Via VS Code :** Utilisez l'extension Live Server en effectuant un clic droit sur `index.html` > *Open with Live Server*.

---

## Technologies Employées

*   **HTML5** (Balises sémantiques, intégration de dessins vectoriels SVG)
*   **CSS3** (CSS Grid, Flexbox Layout, Keyframes Animations, Variables personnalisées)
*   **JavaScript Vanille (ES6+)** (Syntaxe Async/Await, Requêtes Fetch, API LocalStorage, Modules de script natifs, Traitements de tableaux JavaScript)
