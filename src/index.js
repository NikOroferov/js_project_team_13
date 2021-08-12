import './sass/main.scss';
import './js/headerLibrary.js';
//import './js/temporaryInfiniteScroll.js'

import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import cardMarkup from './templates/main-card-markup.hbs';
import {refs} from './js/getRefs';
import FilmApiService from './js/apiService';

const apiService = new FilmApiService();


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





async function getNewPage() {
	let data = await apiService.fetchSearch();
	
	setTimeout(renderingNewPage, 300);

	function renderingNewPage() {
		appendMarkup(data);
		apiService.incrementPage();
	}

    // if (data.length === 0) {
    //   return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    // }
}


function clearGallery () {
    refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
	refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data))
}