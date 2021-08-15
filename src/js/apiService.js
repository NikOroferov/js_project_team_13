import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '92ffb34e08e714eb390805a25b0a06d3';


let currentPage = 1;


export default class FilmApiService {
  constructor() {
    this.searchQuery = '';
    this.page = '1';
    this.id = '';
  }

  async fetchTrendMovies() {
    const movies = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${this.page}`);

    const moviesResults = movies.data.results;
    const totalResults = movies.data.total_results;
    const totalPages = movies.data.total_pages;
    const page = movies.data.page;

    const genres = await this.fetchFilmGenre();

    const moviesArr = moviesResults.map(result => ({
      ...result,
      release_date: result.release_date.slice(0, 4),
      genres: this.filterGenres(genres, result)
    }))

    const infoMoviesArr = {
      moviesData: moviesArr,
      totalResults: totalResults,
      totalPages: totalPages,
      page: page
    };

    return infoMoviesArr;
  }

  async fetchSearchMovies() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    const movies = await axios.get(url);

    const moviesResults = movies.data.results;
    const totalResults = movies.data.total_results;
    const totalPages = movies.data.total_pages;
    const page = movies.data.page;

    const genres = await this.fetchFilmGenre();

    const moviesArr = moviesResults.map(result => ({
      ...result,
      release_date: result.release_date.slice(0, 4),
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


  fetchPagination(currentPage) {
    return fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${this.page}`,
    )
      .then(response => response.json())
      .then(results => {
        return results;
      })
      .catch(error => console.log(error));
  }

  fetchPaginationSearch(currentPage) {
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`,
    )
      .then(response => response.json())
      .then(results => {
        return results;
      })
      .catch(error => console.log(error));
  }

  fetchPopularArticles() {
    const url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }

  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }

  // insertGenresToMovieObj() {
  //   return this.fetchPopularArticles().then(data => {
  //     return this.fetchGenres().then(genresList => {
  //       return data.map(movie => ({
  //         ...movie,
  //         release_date: movie.release_date.split('-')[0],
  //         genres: movie.genre_ids.map(id => genresList.filter(el => el.id === id)).flat(),
  //       }));
  //     });
  //   });
  // }

  getFullMovieInfo(movie_id) {
    const url = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(result => ({
        ...result,
        release_date: result.release_date.slice(0, 4),
        genres: this.filterGenresLibrary(result),
      }));
  }

  async fetchFilmGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
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
      return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
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
      return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
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

  watchedLocalStorage(id) {
    const savedItems = JSON.parse(localStorage.getItem('watched'));
    let filmsArray;

    if (savedItems) {
      filmsArray = savedItems.MovieIDW;
    }

    if (filmsArray && filmsArray.length && !filmsArray.includes(id)) {
      filmsArray.push(id);
    } else if (filmsArray && filmsArray.length && filmsArray.includes(id)) {
      filmsArray = filmsArray.filter(el => el !== id);
    } else {
      filmsArray = [];
      filmsArray.push(id);
    }

    let movieIdStorageW = {
      MovieIDW: filmsArray,
    };

    localStorage.setItem('watched', JSON.stringify(movieIdStorageW));
  }

  queueLocalStorage(id) {
    const savedItems = JSON.parse(localStorage.getItem('queue'));
    let filmsArray;
    if (savedItems) {
      filmsArray = savedItems.MovieIDQ;
    }

    //---------------------

    if (filmsArray && filmsArray.length && !filmsArray.includes(id)) {
      filmsArray.push(id);
    } else if (filmsArray && filmsArray.length && filmsArray.includes(id)) {
      filmsArray = filmsArray.filter(el => el !== id);
    } else {
      filmsArray = [];
      filmsArray.push(id);
    }

    //----------------------

    let movieIdStorageQ = {
      MovieIDQ: filmsArray,
    };

    localStorage.setItem('queue', JSON.stringify(movieIdStorageQ));
  }
}
