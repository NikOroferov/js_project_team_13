import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import cardMarkup from './templates/main-card-markup.hbs';
import { getRefs } from './js/getRefs';
import NewsApiService from './js/getMoviesRequest';