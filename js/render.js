const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function getRatingClass(rating) {
  if (rating >= 7) return 'movie-card__rating--good';
  if (rating >= 5) return 'movie-card__rating--average';
  return 'movie-card__rating--bad';
}

function createMovieCardHTML(movie) {
  const posterPath = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}` 
    : 'https://unsplash.com';

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Date inconnue';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0';
  const ratingClass = getRatingClass(movie.vote_average);

  return `
    <article class="movie-card" data-id="${movie.id}">
      <div class="movie-card__poster-wrapper">
        <img src="${posterPath}" alt="${movie.title}" class="movie-card__poster" loading="lazy" />
        <span class="movie-card__rating ${ratingClass}">${rating}</span>
        <button class="movie-card__fav-btn" data-id="${movie.id}" aria-label="Ajouter aux favoris">
          ❤
        </button>
      </div>
      <div class="movie-card__body">
        <h3 class="movie-card__title" title="${movie.title}">${movie.title}</h3>
        <p class="movie-card__date">${releaseYear}</p>
      </div>
    </article>
  `;
}

/**
 * Injecte la liste des films et configure l'écouteur de clic pour la modale
 */
export function renderMovies(moviesList) {
  const grid = document.getElementById('movies-grid');
  const emptyMessage = document.getElementById('empty-message');

  if (!grid || !emptyMessage) return;

  if (moviesList.length === 0) {
    grid.innerHTML = '';
    emptyMessage.removeAttribute('hidden');
    return;
  }

  emptyMessage.setAttribute('hidden', '');
  grid.innerHTML = moviesList.map(movie => createMovieCardHTML(movie)).join('');

  // CONFIGURATION DE LA MODALE : On écoute le clic sur chaque carte de film
  setupModalEvents(moviesList);
}

/**
 * Gère l'ouverture de la modale avec les détails du film sélectionné
 */
function setupModalEvents(moviesList) {
  const cards = document.querySelectorAll('.movie-card');
  const modal = document.getElementById('movie-modal');
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal || !overlay || !modalContent || !closeBtn) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Si on clique sur le bouton favori, on n'ouvre pas la modale
      if (e.target.classList.contains('movie-card__fav-btn')) return;

      const movieId = parseInt(card.getAttribute('data-id'), 10);
      const movie = moviesList.find(m => m.id === movieId);

      if (movie) {
        // Construction du HTML interne de la modale
        const backdropPath = movie.backdrop_path 
          ? `${IMAGE_BASE_URL}${movie.backdrop_path}` 
          : `${IMAGE_BASE_URL}${movie.poster_path}`;

        modalContent.innerHTML = `
          <div class="modal-layout" style="display: flex; flex-direction: column; gap: 1.5rem; padding-top: 1rem;">
            <img src="${backdropPath}" alt="${movie.title}" style="width: 100%; border-radius: 8px; max-height: 250px; object-fit: cover;" />
            <h2 style="font-size: 1.5rem; margin: 0;">${movie.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;"><strong>Date de sortie :</strong> ${movie.release_date || 'Inconnue'}</p>
            <p style="line-height: 1.6; font-family: var(--font-sub); color: #e2e8f0;">${movie.overview || 'Aucun synopsis disponible pour ce film.'}</p>
          </div>
        `;

        // Affichage de la fenêtre modale
        modal.removeAttribute('hidden');
        overlay.removeAttribute('hidden');
        document.body.style.overflow = 'hidden'; // Bloque le défilement de la page arrière
      }
    });
  });

  // Fonctions de fermeture
  const closeModal = () => {
    modal.setAttribute('hidden', '');
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = ''; // Réactive le défilement de la page
  };

  closeBtn.onclick = closeModal;
  overlay.onclick = closeModal;
}
