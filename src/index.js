import './sass/main.scss';
import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './js/getRefs';
import { changePageTheme } from './js/themeSwitcher';
import { getTrendMovies } from './js/pagination';
import btnUp from './js/button-up';
import showModalByStudents from './js/modalByStudents';

import './js/headerLibrary.js';
import './js/showModal';
import './js/markup-myLibrary';


//Start's functions
btnUp();
getTrendMovies();

refs.switcherButton.addEventListener('change', changePageTheme);