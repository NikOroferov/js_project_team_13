import './sass/main.scss';

import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import cardMarkup from './templates/main-card-markup.hbs';
import { refs } from './js/getRefs';
import { showSpinner, hideSpinner } from './js/spinner';
import { changePageTheme } from './js/themeSwitcher';
import { clearGallery, appendMarkup } from './js/supportFunction';
import { getTrendMovies } from './js/trendPagination';

import FilmApiService from './js/apiService';
<<<<<<< HEAD
import btnUp from './js/button-up'

import appendErrorMessage from './js/errorMessage';
import appendBlankPage from './js/blankPage';

import './js/headerLibrary.js';
import './js/showModal';


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
=======
import btnUp from './js/button-up';
import appendErrorMessage from './js/errorMessage';
import appendBlankPage from './js/blankPage';
import deleteErrorMassage from './js/deleteErrorMassage';
import clearBlankPage from './js/clearBlankPage';
import LoadMoreBtn from './js/loadMoreBtn';
>>>>>>> ad8ef606cfa31c5676807ca4c3aea67f0b3773d4

import showModalByStudents from './js/modalByStudents';

import './js/headerLibrary.js';
import './js/showModal';
//import './js/localStorage';
import './js/markup-myLibrary';



const apiService = new FilmApiService();

btnUp();
getTrendMovies();

refs.switcherButton.addEventListener('change', changePageTheme);



