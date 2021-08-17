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
	switchLibraryBtn(refs.watchedBtn, refs.queueBtn);
})
refs.queueBtn.addEventListener('click', (e) => {
	e.preventDefault();
	switchLibraryBtn(refs.queueBtn, refs.watchedBtn)
})

function openLibrary(evt) {
	evt.preventDefault();

	deleteErrorMessag();
	clearGallery();

	changeHeader(refs.searchForm, refs.myLibrary, 'second-image', 'first-image');
};

function openHome(evt) {
	evt.preventDefault();

	deleteErrorMessag();
	clearGallery();

	getTrendMovies();

	changeHeader(refs.myLibrary, refs.searchForm, 'first-image', 'second-image');
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

function switchLibraryBtn(add, remote) {
	add.classList.add('is-active')
	remote.classList.remove('is-active')
}

function changeHeader(addHidden, remoteHidden, addImage, remoteImage) {
	remoteHidden.classList.remove('hidden');
	addHidden.classList.add('hidden');
	refs.header.classList.remove(remoteImage);
	refs.header.classList.add(addImage);
};

function clearGallery() {
  refs.filmList.innerHTML = '';
}