import './sass/main.scss';

import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import cardMarkup from './templates/main-card-markup.hbs';
import { refs } from './js/getRefs';
import { showSpinner, hideSpinner } from './js/spinner';
import { changePageTheme } from './js/themeSwitcher';

import FilmApiService from './js/apiService';
import btnUp from './js/button-up';
import appendErrorMessage from './js/errorMessage';
import appendBlankPage from './js/blankPage';
import deleteErrorMassage from './js/deleteErrorMassage';
import clearBlankPage from './js/clearBlankPage';
import LoadMoreBtn from './js/loadMoreBtn';

import showModalByStudents from './js/modalByStudents';

import './js/headerLibrary.js';
import './js/showModal';
//import './js/localStorage';
import './js/markup-myLibrary';

const apiService = new FilmApiService();
const loadMoreButton = new LoadMoreBtn({
  selector: '[data-action = "load-more"]',
});

btnUp();
getTrendMovies();

async function getTrendMovies() {
  try {
    let movies = await apiService.fetchTrendMovies();
    appendMarkup(movies.moviesData);
    // apiService.incrementPage();
    // loadMoreTrend();
  } catch (error) {
    console.log(error);
  }
}

refs.switcherButton.addEventListener('change', changePageTheme);
refs.searchForm.addEventListener('submit', onClick);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onClick(e) {
  showSpinner();
  e.preventDefault();

  deleteErrorMassage();
  clearBlankPage();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim('');
  apiService.resetPage();

  try {
    let movies = await apiService.fetchSearchMovies();

    if (movies.moviesData.length === 0) {
      refs.containerPagination.classList.add('is-hidden');
	loadMoreButton.hide();
	evt.preventDefault();
      appendErrorMessage(apiService.query);
      appendBlankPage();
    }

    if (movies.moviesData.length !== 0) {
      if (movies.moviesData.length === 1) {
        clearBlankPage();
        clearGallery();
        appendMarkup(movies.moviesData);
      }
      if (movies.moviesData.length > 1 && movies.page != movies.totalPages) {
        clearBlankPage();
        clearGallery();
        appendMarkup(movies.moviesData);
        clearBlankPage();
        clearGallery();
        appendMarkup(movies.moviesData);
        apiService.incrementPage();
        createPagination(movies.totalPages, movies.page);
        loadMoreButton.show();
      }
      if (movies.page == movies.totalPages) {
        loadMoreButton.hide();
      }
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
      createPagination(movies.totalPages, movies.page);
      hideSpinner();
    }
    if (movies.moviesData.length > 1 && movies.page !== movies.totalPages) {
      loadMoreButton.show();
    }
    if (movies.moviesData.length > 1 && movies.page == movies.totalPages) {
      loadMoreButton.hide();
    }
  }
}

function createPagination(totalPages, currentApiPage) {
  refs.containerPagination.classList.remove('is-hidden');
  const container = refs.containerPagination;

  const options = {
    totalItems: totalPages,
    itemsPerPage: 1,
    visiblePages: 10,
    page: currentApiPage,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', event => {
    const currentPage = event.page;
    apiService.page = currentPage;
    clearGallery();
    getNewPage();
  });
}

function onLoadMore(e) {
  getNewPage();
}

function clearGallery() {
  refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
  refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data));
}
