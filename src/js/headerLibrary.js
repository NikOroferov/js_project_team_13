import { refs } from './getRefs';
import MovieApiService from './apiService';
import cardMarkup from '../templates/main-card-markup.hbs';

const apiService = new MovieApiService();

refs.libraryButton.addEventListener ('click', openLibrary);
refs.headerLogoEl.addEventListener ('click', openHome);
refs.homeButton.addEventListener ('click', openHome);

function openLibrary(evt) {
	evt.preventDefault();

	refs.filmList.innerHTML = '';

	changeHidden(refs.searchForm, refs.myLibrary, 'second-image', 'first-image');
};

function openHome(evt) {
	evt.preventDefault();

	refs.filmList.innerHTML = '';
	getTrendMovies();

	changeHidden(refs.myLibrary, refs.searchForm, 'first-image', 'second-image');
};

async function getTrendMovies() {
	try {
		refs.filmList.innerHTML = '';
		let movies = await apiService.fetchTrendMovies();
		appendMarkup(movies.moviesData);
	} catch (error) {
		console.log(error);
	}
};

function appendMarkup(data) {
	refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data))
}

function changeHidden(addHidden, remoteHidden, addImage, remoteImage) {
	remoteHidden.classList.remove('hidden');
	addHidden.classList.add('hidden');
	refs.header.classList.remove(remoteImage);
	refs.header.classList.add(addImage);
};