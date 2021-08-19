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
import './js/smoothScrollBar';



const apiService = new FilmApiService();

btnUp();
getTrendMovies();

refs.switcherButton.addEventListener('change', changePageTheme);



