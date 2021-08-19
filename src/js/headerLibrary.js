import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './getRefs';
import { clearGallery, appendMarkup } from './supportFunction';
import deleteErrorMessage from './deleteErrorMassage';
import { getTrendMovies } from './trendPagination';
import LoadMoreBtn from './loadMoreBtn';

const loadMoreButtonTrend = new LoadMoreBtn({
  selector: '[data-action = "load-more-trend"]',
});
const loadMoreButton = new LoadMoreBtn({
  selector: '[data-action = "load-more"]',
});

refs.libraryButton.addEventListener ('click', openLibrary);
refs.logoBox.addEventListener ('click', openHome);
refs.homeButton.addEventListener('click', openHome);
refs.watchedBtn.addEventListener('click', (e) => {
	e.preventDefault();
	switchLibraryBtn(refs.watchedBtn, refs.queueBtn);
})
refs.queueBtn.addEventListener('click', (e) => {
	e.preventDefault();
	switchLibraryBtn(refs.queueBtn, refs.watchedBtn)
})

function openLibrary(e) {
	refs.containerPagination.classList.add('is-hidden');
	loadMoreButton.hide();
	loadMoreButtonTrend.hide();
	e.preventDefault();
	
	switchLibraryBtn(refs.watchedBtn, refs.queueBtn);
	deleteErrorMessage();
	clearGallery();

	changeHeader(refs.searchForm, refs.myLibrary, 'second-image', 'first-image');
};

function openHome(e) {
	e.preventDefault();

	deleteErrorMessage();
	clearGallery();
	getTrendMovies();

	changeHeader(refs.myLibrary, refs.searchForm, 'first-image', 'second-image');
};

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
