import './sass/main.scss';
import './js/headerLibrary.js';

import { showSpinner } from './js/spinner';
import { hideSpinner } from './js/spinner';

import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import cardMarkup from './templates/main-card-markup.hbs';
import { refs } from './js/getRefs';
import FilmApiService from './js/apiService';

const apiService = new FilmApiService();

getTrendFilms();

async function getTrendFilms() {
  try {
    let films = await apiService.fetchTrendingMovies();
    appendMarkup(films);
  } catch (error) {
    console.log(error);
  }
}

refs.searchForm.addEventListener('submit', onClick);

async function onClick(e) {
  showSpinner();
  e.preventDefault();

  apiService.query = e.currentTarget.elements.searchQuery.value.trim('');

  //console.log(apiService.query);

  apiService.resetPage();

  try {
    let films = await apiService.fetchSearch();

    if (films.length !== 0) {
      clearGallery();
      appendMarkup(films);
      apiService.incrementPage();
      loadMore();
    }

    hideSpinner();
  } catch (error) {
    console.log(error);
  }
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
  let data = await apiService.fetchSearch();

  setTimeout(renderingNewPage, 300);

  function renderingNewPage() {
    apiService.incrementPage();
    appendMarkup(data);
  }

  if (data.length === 0) {
    console.log('End of search results.');
    return;
  }
}

function clearGallery() {
  refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
  refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data));
}
