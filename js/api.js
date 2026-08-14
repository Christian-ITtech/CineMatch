// Configuration de base pour l'API TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
// Mettez votre jeton d'accès (Bearer token) entre les guillemets ci-dessous :
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTY0NTA2OWY4MTJlYjE4Y2E1Nzk3OGNmNTZkYTliZCIsIm5iZiI6MTc2MjI3MzU3OC4wNzIsInN1YiI6IjY5MGEyOTJhZTJlMDllZGVjOGM5NmI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CuuJwLJBnddKrx2QAT589pBJYvNK-GmY5CIQfr1Ovrc';

// Options d'en-tête requises par TMDB pour s'authentifier
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

/**
 * Récupère les films populaires du moment (Niveau 1)
 * @returns {Promise<Array>} Liste des 20 films populaires
 */
export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?language=fr-FR&page=1`, options);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data.results; // Renvoie uniquement le tableau des films
}

/**
 * Recherche des films par mot-clé (Niveau 2)
 * @param {string} query Texte tapé par l'utilisateur
 * @returns {Promise<Array>} Liste des films correspondants
 */
export async function searchMovies(query) {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`${BASE_URL}/search/movie?query=${encodedQuery}&include_adult=false&language=fr-FR&page=1`, options);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}
