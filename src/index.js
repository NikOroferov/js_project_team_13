import './sass/main.scss';

import { refs } from './js/getRefs';
import { changePageTheme } from './js/themeSwitcher';
import { getTrendMovies } from './js/trendPagination';

import btnUp from './js/button-up';
import showModalByStudents from './js/modalByStudents';

import './js/headerLibrary.js';
import './js/showModal';
import './js/markup-myLibrary';

btnUp();
getTrendMovies();

refs.switcherButton.addEventListener('change', changePageTheme);

