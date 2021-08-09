import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import cardMarkup from './templates/main-card-markup.hbs';
import { getRefs } from './js/getRefs';
import getMovieRequest from './js/getMoviesRequest';

const searchForm = document.querySelector('.search__form')
const searchBtn = document.querySelector('.search__btn');
const inputEl = document.querySelector('.search__text');
const galleryEl = document.querySelector('.film__list');


// inputEl.addEventListener("input", onSearch)

class NewsApiService{
    constructor() {
        this.KEY = "05b379a62bb2f2e51c79837a2df0fc22";
        this.URL = "https://api.themoviedb.org/3/";
        this.page = 1;
        this.type = "search";
        this.media_type = "movie";
        this.queryValue = "небо";
        this.language = "ru-RU";
        this.adult = false;
    }

    async getMoviesRequest() {
        const URL = `${this.URL}${this.type}/${this.media_type}?api_key=${this.KEY}&query=${this.query}&language=${this.language}&page=${this.page}&include_adult=${this.adult}`;
        const response = await axios.get(URL);
        console.log(response.data.results);

        return response.data.results;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.queryValue;
    }

    set query(newQuery) {
        this.queryValue = newQuery;
    }
}


const queryService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();
    queryService.query = inputEl.value.trim('');

    try {
        const results = await queryService.getMoviesRequest();
        console.log(results);
        if (queryService.query === '' || results.length === 0) {
            Notiflix.Notify.failure('Кина не будет');
        } else {
            appendCards(results);
        }
    } catch (error) {
        console.log(error);
    }
}




queryService.getMoviesRequest();


function appendCards(data) {
    galleryEl.insertAdjacentHTML('beforeend', cardMarkup(data));
}
