export const refs = {
  body: document.querySelector('body'),
  header: document.querySelector('header'),
  headerLogo: document.querySelector('.logo__title'),
  headerLogoEl: document.querySelector('.logo__icon'),

  searchForm: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__text'),
  searchButton: document.querySelector('.search__btn'),
  searchLogo: document.querySelector('.search__logo'),

  myLibrary: document.querySelector('.my-library'),
  homeButton: document.querySelector('.home__btn'),
  libraryButton: document.querySelector('.library__btn'),

  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),

  filmList: document.querySelector('.film__list'),

  addToWatched: document.getElementById('add-to-watched'),
  addToQueue: document.getElementById('add-to-queue'),

  observerElement: document.querySelector('.observer'),

  backdrop: document.querySelector('.backdrop'),
  spinnerLoader: document.querySelector('.loader'),

  btn: document.querySelector('#button-up'),

  containerPagination: document.getElementById('pagination'),
  btnLoadMore: document.querySelector('[data-action = "load-more"]'),

  switcherButton: document.querySelector('.theme-switch__toggle'),
  page: document.querySelector('body'),
  // filmTitle: document.querySelector('.film__name'),
  // modalPage: document.querySelector('.card-film'),
  darkFooter: document.querySelector('footer'),
  sunIcon: document.querySelector('.sun'),
  moonIcon: document.querySelector('.moon'),
};
