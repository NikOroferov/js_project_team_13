import './sass/main.scss';
import './js/headerLibrary.js';

import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import cardMarkup from './templates/main-card-markup.hbs';
import {refs} from './js/getRefs';
import MovieApiService from './js/apiService';

const apiService = new MovieApiService();


getTrendFilms();

async function getTrendFilms() {
	try {
		let films = await apiService.fetchTrendingMovies();
		appendMarkup(films);
	} catch (error) {
		console.log(error);
	}
}

refs.searchButton.addEventListener('click', onClick);

async function onClick(e) {
	e.preventDefault();
	apiService.query = refs.searchInput.value.trim('');
	console.log(apiService.query);

	try {
		clearGallery();
		let films = await apiService.fetchSearch();
		if (films.length !== 0) {
			appendMarkup(films);
		}
			
	} catch (error) {
		console.log(error);
	}
}







function clearGallery () {
    refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
	refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data))
}