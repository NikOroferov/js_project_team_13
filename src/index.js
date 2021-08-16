import './sass/main.scss';

import axios from 'axios';
import cardMarkup from './templates/main-card-markup.hbs';
import { refs } from './js/getRefs';
import { showSpinner, hideSpinner } from './js/spinner';

import FilmApiService from './js/apiService';
import btnUp from './js/button-up';
import appendErrorMessage from './js/errorMessage';
import appendBlankPage from './js/blankPage';

import './js/headerLibrary.js';
import './js/showModal';
import './js/localStorage';

const apiService = new FilmApiService();

btnUp();
getTrendMovies();

async function getTrendMovies() {
  try {
    let movies = await apiService.fetchTrendMovies();
    appendMarkup(movies.moviesData);
  } catch (error) {
    console.log(error);
  }
}

refs.searchForm.addEventListener('submit', onClick);

async function onClick(e) {
  showSpinner();
  e.preventDefault();

  const arrorMessage = document.querySelector('.searchQueryIncorrect');
  const elBlankPage = document.querySelector('.blankPage');
  if (arrorMessage) {
    arrorMessage.remove();
  }
  if (arrorMessage) {
    elBlankPage.remove();
  }

  apiService.query = e.currentTarget.elements.searchQuery.value.trim('');
  apiService.resetPage();

  try {
    let movies = await apiService.fetchSearchMovies();

    if (movies.moviesData.length === 0) {
      appendErrorMessage(apiService.query);
      appendBlankPage();
    }

    if (movies.moviesData.length !== 0) {
      if (elBlankPage) {
        elBlankPage.remove();
      }
      clearGallery();
      appendMarkup(movies.moviesData);
      apiService.incrementPage();
      loadMore();
    }

    hideSpinner();
  } catch (error) {
    console.log(error);
    appendErrorMessage(apiService.query);
    appendBlankPage();
    hideSpinner();
  }

  refs.searchForm.reset();
}

function loadMore() {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && apiService.query !== '') {
        getNewPage();
      }
    });
  };

  const options = {
    rootMargin: '330px',
  };
  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.observerElement);
}

async function getNewPage() {
  let movies = await apiService.fetchSearchMovies();

  if (movies.moviesData.length === 0) {
    console.log('End of search results.');
    return;
  } else {
    showSpinner();
    setTimeout(renderingNewPage, 450);

    function renderingNewPage() {
      apiService.incrementPage();
      appendMarkup(movies.moviesData);
      hideSpinner();
    }
  }
}

function clearGallery() {
  refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
  refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data));
}

console.log(apiService.asyncfetchGenres());
console.log(apiService.fetchGenres());
