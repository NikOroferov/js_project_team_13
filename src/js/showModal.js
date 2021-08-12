import filmTpl from '../templates/Modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import FilmApiService from './apiService';

const filmsApiService = new FilmApiService();

const cardFilm = document.querySelector('.film__list');
cardFilm.addEventListener('click', openModal);

//функція отримання фільму по id

function getFullMovieInfo(id) {
  filmsApiService
    .getFullMovieInfo(id)
    .then(movieInfo => {
      const markup = filmTpl(movieInfo);
      const modal = basicLightbox.create(markup);
      modal.show();

      addToLibrary(id);

      const buttonCls = document.querySelector('button#btnclose');
      buttonCls.addEventListener('click', closeModal);
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
  toastify.joySuccess();
}
