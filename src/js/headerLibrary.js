import { refs } from './getRefs';
import MovieApiService from './apiService';
import cardMarkup from '../templates/main-card-markup.hbs';

const apiService = new MovieApiService();

const header = document.querySelector('header');
const libraryBtn = document.querySelector ('.library__btn');
const myLibrary = document.querySelector ('.my-library');
const searshForm = document.querySelector ('.search__form');
const logoEl = document.querySelector ('.logo__icon');
const homeEl = document.querySelector ('.home__btn');


libraryBtn.addEventListener ('click', openLibrary);
logoEl.addEventListener ('click', openHome);
homeEl.addEventListener ('click', openHome);

function openLibrary(evt) {
	evt.preventDefault();

	changeHidden(searshForm, myLibrary, 'second-image', 'first-image')
	
}

function openHome(evt) {
	evt.preventDefault();

refs.filmList.innerHTML = '';
	getTrendFilms();

	changeHidden(myLibrary, searshForm, 'first-image', 'second-image');
}


function changeHidden(addHidden, remoteHidden, addImage, remoteImage) {
	remoteHidden.classList.remove('hidden');
	addHidden.classList.add('hidden');
	header.classList.remove(remoteImage);
	header.classList.add(addImage);
}





async function getTrendFilms() {
	try {
		let films = await apiService.fetchTrendingMovies();
		appendMarkup(films);
	} catch (error) {
		console.log(error);
	}
}

function appendMarkup(data) {
	refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data))
}