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
import './js/showModal';

import btnUp from './js/button-up'

const apiService = new FilmApiService();

getTrendMovies();

console.log(refs);

async function getTrendMovies() {
  try {
    let movies = await apiService.fetchTrendMovies();
    appendMarkup(movies.moviesData)
  } catch (error) {
    console.log(error);
  }
}

refs.searchForm.addEventListener('submit', onClick);

async function onClick(e) {
  showSpinner();
  e.preventDefault();

  apiService.query = e.currentTarget.elements.searchQuery.value.trim('');
  apiService.resetPage();

  try {
    let movies = await apiService.fetchSearchMovies();

    if (movies.moviesData.length !== 0) {
      clearGallery();
      appendMarkup(movies.moviesData);
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
  let movies = await apiService.fetchSearchMovies();

  if (movies.moviesData.length === 0) {
    console.log('End of search results.');
    return;
  }
  else {
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


btnUp();
