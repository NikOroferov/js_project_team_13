import cardMarkup from '../templates/main-card-markup.hbs';
import { refs } from './getRefs';

//Clean Gallery and Append markup
function clearGallery() {
  refs.filmList.innerHTML = '';
}

function appendMarkup(data) {
  refs.filmList.insertAdjacentHTML('beforeend', cardMarkup(data));
}

export {clearGallery, appendMarkup}