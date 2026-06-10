import fallbackMovies from './fallbackMovies'

const MY_API_KEY = '61345bc09ba520115d90cddf8063eb84'
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

async function tryFetch(url) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) return null
    const json = await res.json()
    return json
  } catch (err) {
    return null
  }
}

export async function fetchPopularMovies() {
  const json = await tryFetch(
    `${BASE_URL}/movie/popular?api_key=${MY_API_KEY}&language=en-US&page=1`
  )
  if (!json || !json.results || json.results.length === 0) {
    return { data: fallbackMovies, source: 'fallback' }
  }
  return { data: json.results, source: 'api' }
}

export async function fetchTopRatedMovies() {
  const json = await tryFetch(
    `${BASE_URL}/movie/top_rated?api_key=${MY_API_KEY}&language=en-US&page=1`
  )
  if (!json || !json.results || json.results.length === 0) {
    const topFallback = fallbackMovies.filter(m => m.vote_average >= 8.0)
    return { data: topFallback, source: 'fallback' }
  }
  return { data: json.results, source: 'api' }
}

export async function searchMovieByName(query) {
  if (!query || query.trim().length === 0) {
    return { data: [], source: 'api' }
  }
  const json = await tryFetch(
    `${BASE_URL}/search/movie?api_key=${MY_API_KEY}&query=${encodeURIComponent(query.trim())}`
  )
  if (!json || !json.results) {
    const localResult = fallbackMovies.filter(m =>
      m.title.toLowerCase().includes(query.trim().toLowerCase())
    )
    return { data: localResult, source: 'fallback' }
  }
  return { data: json.results, source: 'api' }
}

export const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}