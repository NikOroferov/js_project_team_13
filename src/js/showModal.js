import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './apiService';
import filmTpl from '../templates/Modal.hbs';
import { refs } from './getRefs';

const apiService = new MoviesApiService();

refs.filmList.addEventListener('click', openModal);

//функція отримання фільму по id

function getFullMovieInfo(id) {
  apiService
    .getFullMovieInfo(id)
    .then(movieInfo => {
      const markup = filmTpl(movieInfo);
      const modal = basicLightbox.create(markup);
      modal.show();

      const closeBtn = document.querySelector('button#btnclose');
      

      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);

      //функція закриття форми по клавіші Esc
      function closeModalHandler(evt) {
        if (evt.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal() {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }
    })
    .catch(error => console.log('error', error));
  
  
}

function openModal(evt) {
  evt.preventDefault();
  let id = evt.target.dataset.action;
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  getFullMovieInfo(id);
}
