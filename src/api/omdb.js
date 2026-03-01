import axios from 'axios'

const OMDB_API_KEY = 'trilogy'
const OMDB_BASE = 'https://www.omdbapi.com'

/**
 * Extract IMDB ID from a URL if present
 */
function extractImdbId(input) {
  const match = input.match(/tt\d{7,8}/)
  return match ? match[0] : null
}

/**
 * Fetch movie data from OMDB by title or IMDB ID
 */
export async function fetchMovie(input) {
  const imdbId = extractImdbId(input)

  const params = {
    apikey: OMDB_API_KEY,
    plot: 'full',
  }

  if (imdbId) {
    params.i = imdbId
  } else {
    params.t = input.trim()
  }

  const { data } = await axios.get(OMDB_BASE, { params })

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found')
  }

  return {
    title: data.Title,
    year: data.Year,
    rated: data.Rated,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    language: data.Language,
    country: data.Country,
    awards: data.Awards,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    ratings: data.Ratings || [],
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    imdbID: data.imdbID,
    type: data.Type,
    boxOffice: data.BoxOffice,
  }
}
