import { refs } from './getRefs';
import MovieApiService from './apiService';
import cardMarkup from '../templates/main-card-markup.hbs';
import deleteErrorMessag from './deleteErrorMassage';

const apiService = new MovieApiService();

refs.libraryButton.addEventListener ('click', openLibrary);
refs.headerLogoEl.addEventListener ('click', openHome);
refs.homeButton.addEventListener('click', openHome);
refs.watchedBtn.addEventListener('click', (e) => {
	e.preventDefault();
	refs.watchedBtn.classList.add('is-active')
	refs.queueBtn.classList.remove('is-active')
})
refs.queueBtn.addEventListener('click', (e) => {
	e.preventDefault();
	refs.watchedBtn.classList.remove('is-active')
	refs.queueBtn.classList.add('is-active')
})

function openLibrary(evt) {
	evt.preventDefault();

	deleteErrorMessag();
	clearGallery();

	changeClass(refs.searchForm, refs.myLibrary, 'second-image', 'first-image');
};

function openHome(evt) {
	evt.preventDefault();

	deleteErrorMessag();
	clearGallery();

	getTrendMovies();

	changeClass(refs.myLibrary, refs.searchForm, 'first-image', 'second-image');
};

async function getTrendMovies() {
	try {
		
		clearGallery();

		let movies = await apiService.fetchTrendMovies();
		appendMarkup(movies.moviesData);
	} catch (error) {
		console.log(error);
	}
};

function appendMarkup(data) {
	refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data))
}

function changeClass(addClass, remoteClass, addImage, remoteImage) {
	remoteClass.classList.remove('hidden');
	addClass.classList.add('hidden');
	refs.header.classList.remove(remoteImage);
	refs.header.classList.add(addImage);
};

function clearGallery() {
  refs.filmList.innerHTML = '';
}