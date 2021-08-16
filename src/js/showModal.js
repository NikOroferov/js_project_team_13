import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './apiService';
import filmTpl from '../templates/modal-markup.hbs';
import { refs } from './getRefs';

const apiService = new MoviesApiService();

refs.filmList.addEventListener('click', openModal);

//функція отримання фільму по id

function getFullMovieInfo(id) {
  apiService
    .getMovieInfo(id)
    .then(movieInfo => {
      const markup = filmTpl(movieInfo);
      const modal = basicLightbox.create(markup);
      modal.show();
      
      const watchedArray = JSON.parse(localStorage.getItem("Watched"));     //отрисовка правильных кнопочек. Начало
      const queueArray = JSON.parse(localStorage.getItem("Queue"));         
      const btn = document.querySelector('.add-to-watched');                
      const btnQ = document.querySelector('.add-to-queue');                 
      watchedArray.map((obj) => {                                           
        if (obj.id === movieInfo.id) {                                      
          btn.textContent = 'remove from watched';
        }
      });
      queueArray.map((obj) => {
        if (obj.id === movieInfo.id) {
          btnQ.textContent = 'remove from queue';
        }
      });                                                                   //отрисовка правильных кнопочек. Конец
      

      const closeBtn = document.querySelector('button#btnclose');

      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);

      //функція закриття форми по клавіші Esc
      function closeModalHandler(evt) {
        if (evt.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
          document.body.style.overflowY = "visible";
        }
      }

      function closeModal() {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
        document.body.style.overflowY = "visible";
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
  document.body.style.overflowY = "hidden";
  getFullMovieInfo(id);
  toastify.joySuccess();
}
