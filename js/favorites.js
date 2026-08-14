import { renderMovies } from './render.js';

// Tableau en mémoire pour stocker nos objets de films favoris
let favorites = [];

// Ciblage des éléments de la barre de navigation
const favCountElement = document.getElementById('fav-count');
const viewFavoritesBtn = document.getElementById('view-favorites-btn');
const sectionTitle = document.getElementById('section-title');

/**
 * Initialise le gestionnaire de favoris
 * @param {Array} initialMoviesList Liste des films actuellement affichés (pour pouvoir les ajouter)
 */
export function initFavorites(initialMoviesList) {
  // 1. Charger les favoris sauvegardés au démarrage
  const savedFavs = localStorage.getItem('cinematch_favorites');
  if (savedFavs) {
    favorites = JSON.parse(savedFavs);
    updateFavCountDOM();
  }

  // 2. Écouter les clics globaux sur la grille pour attraper le bouton Cœur
  const grid = document.getElementById('movies-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      // On vérifie si l’élément cliqué est le bouton favori (ou s'il contient le cœur)
      if (e.target.classList.contains('movie-card__fav-btn')) {
        e.stopPropagation(); // Évite de déclencher d'autres événements sur la carte
        const movieId = parseInt(e.target.getAttribute('data-id'), 10);
        
        // On cherche le film dans la liste globale fournie par l'API
        const movie = initialMoviesList.find(m => m.id === movieId);
        if (movie) {
          toggleFavorite(movie, e.target);
        }
      }
    });
  }

  // 3. Écouter le clic sur le bouton "Mes Favoris" dans la navbar
  if (viewFavoritesBtn) {
    viewFavoritesBtn.addEventListener('click', () => {
      if (sectionTitle) sectionTitle.textContent = "Mes Films Favoris";
      renderMovies(favorites);
      syncFavButtonsState(); // S'assure que les cœurs restent rouges dans l'affichage des favoris
    });
  }
}

/**
 * Ajoute ou supprime un film des favoris (Toggle)
 */
function toggleFavorite(movie, buttonElement) {
  const index = favorites.findIndex(m => m.id === movie.id);

  if (index === -1) {
    // Le film n'est pas dans les favoris -> On l'ajoute
    favorites.push(movie);
    buttonElement.classList.add('movie-card__fav-btn--active');
    buttonElement.style.color = 'var(--rating-bad)'; // Force le cœur en rouge cinéma
  } else {
    // Le film est déjà favori -> On le retire
    favorites.splice(index, 1);
    buttonElement.classList.remove('movie-card__fav-btn--active');
    buttonElement.style.color = 'var(--text-main)'; // Remet le cœur en blanc
    
    // Si l'utilisateur est actuellement sur la vue "Mes Favoris", on rafraîchit la grille immédiatement
    if (sectionTitle && sectionTitle.textContent === "Mes Films Favoris") {
      renderMovies(favorites);
      syncFavButtonsState();
    }
  }

  // Sauvegarde persistante dans le localStorage
  localStorage.setItem('cinematch_favorites', JSON.stringify(favorites));
  updateFavCountDOM();
}

/**
 * Met à jour le compteur numérique dans la barre de navigation
 */
function updateFavCountDOM() {
  if (favCountElement) {
    favCountElement.textContent = favorites.length;
  }
}

/**
 * Parcourt les cartes affichées pour allumer en rouge les cœurs des films déjà favoris
 */
export function syncFavButtonsState() {
  const buttons = document.querySelectorAll('.movie-card__fav-btn');
  buttons.forEach(button => {
    const id = parseInt(button.getAttribute('data-id'), 10);
    const isFav = favorites.some(m => m.id === id);
    
    if (isFav) {
      button.classList.add('movie-card__fav-btn--active');
      button.style.color = 'var(--rating-bad)';
    } else {
      button.classList.remove('movie-card__fav-btn--active');
      button.style.color = 'var(--text-main)';
    }
  });
}
