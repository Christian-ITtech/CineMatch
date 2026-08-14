import { searchMovies, fetchPopularMovies } from './api.js';
import { renderMovies } from './render.js';
import { syncFavButtonsState } from './favorites.js'; // <-- IMPORTATION AJOUTÉE

export function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const sectionTitle = document.getElementById('section-title');
  const loader = document.getElementById('loader');

  if (!searchInput || !searchBtn) return;

  const handleSearch = async () => {
    const query = searchInput.value.trim();

    if (query === '') {
      if (sectionTitle) sectionTitle.textContent = "Films populaires du moment";
      try {
        if (loader) loader.removeAttribute('hidden');
        const popular = await fetchPopularMovies();
        renderMovies(popular);
        syncFavButtonsState(); // <-- SYNCHRONISATION
      } catch (err) {
        console.error(err);
      } finally {
        if (loader) loader.setAttribute('hidden', '');
      }
      return;
    }

    try {
      if (loader) loader.removeAttribute('hidden');
      if (sectionTitle) sectionTitle.textContent = `Résultats pour "${query}"`;
      
      const results = await searchMovies(query);
      renderMovies(results);
      syncFavButtonsState(); // <-- SYNCHRONISATION APPRÈS LA RECHERCHE
    } catch (error) {
      console.error("Erreur durant la recherche :", error);
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) errorMessage.removeAttribute('hidden');
    } finally {
      if (loader) loader.setAttribute('hidden', '');
    }
  };

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
}
