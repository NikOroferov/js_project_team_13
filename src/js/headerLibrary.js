import { refs } from './getRefs';
import MovieApiService from './apiService';
import cardMarkup from '../templates/main-card-markup.hbs';

const apiService = new MovieApiService();


const logoEl = document.querySelector ('.logo__icon');
const homeEl = document.querySelector ('.home__btn');


refs.libraryButton.addEventListener ('click', openLibrary);
logoEl.addEventListener ('click', openHome);
homeEl.addEventListener ('click', openHome);

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

function changeHidden(addHidden, remoteHidden, addImage, remoteImage) {
	remoteHidden.classList.remove('hidden');
	addHidden.classList.add('hidden');
	refs.header.classList.remove(remoteImage);
	refs.header.classList.add(addImage);
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