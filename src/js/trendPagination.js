import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './getRefs';
import { showSpinner, hideSpinner } from './spinner';
import { clearGallery, appendMarkup } from './supportFunction';
import FilmApiService from './apiService';
import LoadMoreBtn from './loadMoreBtn';
import appendErrorMessage from './errorMessage';
import appendBlankPage from './blankPage';
import deleteErrorMassage from './deleteErrorMassage';
import clearBlankPage from './clearBlankPage';

const apiService = new FilmApiService();
const loadMoreButtonTrend = new LoadMoreBtn({
  selector: '[data-action = "load-more-trend"]',
});
const loadMoreButton = new LoadMoreBtn({
  selector: '[data-action = "load-more"]',
});

refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.btnLoadMoreTrend.addEventListener('click', onLoadMoreTrend);
refs.searchForm.addEventListener('submit', onClick);

//Search
async function onClick(e) {
  showSpinner();
  e.preventDefault();

  deleteErrorMassage();
  clearBlankPage();

  refs.containerPagination.classList.add('is-hidden');
  loadMoreButton.hide();
  loadMoreButtonTrend.hide();
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim('');
  apiService.resetPage();

  try {
    let movies = await apiService.fetchSearchMovies();

    if (movies.moviesData.length === 0) {
      e.preventDefault();
      appendErrorMessage(apiService.query);
      appendBlankPage();
    }

    if (movies.moviesData.length !== 0) {
      if (movies.page != movies.totalPages) {
        clearBlankPage();
        clearGallery();
        appendMarkup(movies.moviesData);
        apiService.incrementPage();
        createPagination(movies.totalPages, movies.page);
        loadMoreButton.show();
      }
      if (movies.page == movies.totalPages) {
        clearBlankPage();
        clearGallery();
        appendMarkup(movies.moviesData);
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
    if (movies.page !== movies.totalPages) {
      loadMoreButton.show();
    }
    if (movies.page == movies.totalPages) {
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

//Trend
async function getTrendMovies() {
    clearGallery();
    apiService.resetPage();
  loadMoreButton.hide();
  try {
    let movies = await apiService.fetchTrendMovies();
    if (movies.moviesData.length !== 0) {
      if (movies.page != movies.totalPages) {
        appendMarkup(movies.moviesData);
        createPaginationTrend(movies.totalPages, movies.page);
        loadMoreButtonTrend.show();
      }
      if (movies.page == movies.totalPages) {
        appendMarkup(movies.moviesData);
        loadMoreButtonTrend.hide();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNewPageTrend() {
  let movies = await apiService.fetchTrendMovies();
  if (movies.moviesData.length === 0) {
    console.log('End of search results.');
    return;
  } else {
    showSpinner();
    setTimeout(renderingNewPage, 450);

    function renderingNewPage() {
      appendMarkup(movies.moviesData);
      createPaginationTrend(movies.totalPages, movies.page);
      hideSpinner();
      }
    if (movies.page !== movies.totalPages) {
      loadMoreButtonTrend.show();
    }
      if (movies.page === movies.totalPages) {
      loadMoreButtonTrend.hide();
    }
  }
}

function createPaginationTrend(totalPages, currentApiPage) {
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
    getNewPageTrend();
  });
}

function onLoadMoreTrend(e) {
  apiService.incrementPage();
  getNewPageTrend();
}

export { getTrendMovies, createPaginationTrend };
