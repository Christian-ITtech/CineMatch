import { fetchPopularMovies } from './api.js';
import { renderMovies } from './render.js';
import { initSearch } from './search.js';
import { initFavorites, syncFavButtonsState } from './favorites.js'; // <-- IMPORTS AJOUTÉS

const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const logoHome = document.getElementById('logo-home');
const sectionTitle = document.getElementById('section-title');

let currentMovies = [];

/**
 * Initialise l'application CinéMatch
 */
async function initApp() {
  try {
    loader.removeAttribute('hidden');
    errorMessage.setAttribute('hidden', '');

    // 1. Charger les films populaires depuis l'API TMDB
    currentMovies = await fetchPopularMovies();
    loader.setAttribute('hidden', '');
    
    // 2. Afficher la grille de films
    renderMovies(currentMovies);
    
    // 3. Activer la barre de recherche (Niveau 2)
    initSearch();

    // 4. Activer le gestionnaire de favoris (Niveau 3)
    initFavorites(currentMovies);
    
    // 5. Synchroniser le style des boutons cœurs au démarrage
    syncFavButtonsState();

    console.log("CinéMatch démarré et fonctionnel !");

  } catch (error) {
    console.error("Erreur durant le chargement de l'application :", error);
    loader.setAttribute('hidden', '');
    errorMessage.removeAttribute('hidden');
  }
}

// Permet de revenir à l'accueil en cliquant sur le logo
if (logoHome) {
  logoHome.addEventListener('click', (e) => {
    e.preventDefault();
    if (sectionTitle) sectionTitle.textContent = "Films populaires du moment";
    renderMovies(currentMovies);
    syncFavButtonsState();
  });
}

if (retryBtn) {
  retryBtn.addEventListener('click', initApp);
}

document.addEventListener('DOMContentLoaded', initApp);
