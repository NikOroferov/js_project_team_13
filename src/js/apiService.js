import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '92ffb34e08e714eb390805a25b0a06d3';

export default class FilmApiService {

  constructor() {
    this.searchQuery = '';
    this.page = '1';
    this.id = '';
    this.language = 'en-En'
  }

  async fetchTrendMovies() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=${this.language}&page=${this.page}`;

    return this.fetchMovies(url);
  }

  async fetchSearchMovies() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${this.language}&page=${this.page}&query=${this.searchQuery}`;
    
    return this.fetchMovies(url);
  }

  async fetchMovies(url) {
    const movies = await axios.get(url);

    const moviesResults = movies.data.results;
    const totalResults = movies.data.total_results;
    const totalPages = movies.data.total_pages;
    const page = movies.data.page;

    const genres = await this.fetchFilmGenre();

    const moviesArr = moviesResults.map(result => ({
      ...result,
      release_date: result.release_date
          ? result.release_date.slice(0, 4)
          : "Дата неизвестна",
      genres: this.filterGenres(genres, result)
    }));

    const infoMoviesArr = {
      moviesData: moviesArr,
      totalResults: totalResults,
      totalPages: totalPages,
      page: page
    };

    return infoMoviesArr;
  }

  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }


  getFullMovieInfo(movie_id) {
    const url = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=${this.language}`;

    return fetch(url)
      .then(response => response.json()
      )
      .then(result => ({
        ...result,
        release_date: result.release_date
          ? result.release_date.slice(0, 4)
          : 'дата отсутствует',
        genres: this.filterGenresLibrary(result),
      }));
  }

  async fetchFilmGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${this.language}`;

    const genres = await (await axios.get(url)).data.genres;
    return genres;
  }
  
  filterGenres(genres, result) {
    let genreList = result.genre_ids
      .map(id => genres.filter(genre => genre.id === id).map(genre => genre.name))
      .flat();
    if (genreList.length === 0) {
      return (genreList = [`Unknown`]);
    }
    if (genreList.length === 1) {
      return (genreList = [`${genreList[0]}`]);
    }
    if (genreList.length === 2) {
      return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
    } else if (genreList.length > 2) {
      return (genreList = `${genreList[0]}, ${genreList[1]}, other`);
    }
  }

  filterGenresLibrary(result) {
    let genreList = result.genres.map(genre => genre.name).flat();
    if (genreList.length === 0) {
      return (genreList = [`Unknown`]);
    }
    if (genreList.length === 1) {
      return (genreList = [`${genreList[0]}`]);
    }
    if (genreList.length === 2) {
      return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
    } else if (genreList.length > 2) {
      return (genreList = `${genreList[0]}, ${genreList[1]}, other`);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

}
