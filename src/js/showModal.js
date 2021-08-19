import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './apiService';
import filmTpl from '../templates/modal-markup.hbs';
import { refs } from './getRefs';
import { markupWatched, markupQueue } from './markup-myLibrary';

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
      document.body.style.overflowY = "hidden";

      //отрисовка правильных кнопочек. Начало
      const watchedArray = JSON.parse(localStorage.getItem("Watched"));
      const queueArray = JSON.parse(localStorage.getItem("Queue"));

      const btnW = document.querySelector('.add-to-watched');
      const btnQ = document.querySelector('.add-to-queue');
      const modalBtn = document.querySelector('.modal-btns');

      if (watchedArray) {
        watchedArray.map((obj) => {
          if (obj.id === movieInfo.id) {
            btnW.textContent = 'remove from watched';
          }
        })
      };

      if (queueArray) {
        queueArray.map((obj) => {
          if (obj.id === movieInfo.id) {
            btnQ.textContent = 'remove from queue';
          }
        });
      };
      //отрисовка правильных кнопочек. Конец  

      //Local Storage. Start

      modalBtn.addEventListener('click', (e) => {
        const watchedArray = getWatchedArray();
        const queueArray = getQueueArray();
        let keyName = e.target.textContent;

        if (keyName === 'add to watched') {
          addElementToLocalStorage (watchedArray, "Watched", 'remove from watched');
          createNewMarkupWatched();
        }

        else if (keyName === 'add to queue') {
          addElementToLocalStorage(queueArray, "Queue", 'remove from queue');
          createNewMarkupQueue();
        }

        else if (keyName === 'remove from watched') {
          removeElementFromLocalStorage (watchedArray, "Watched", 'add to watched');
          createNewMarkupWatched();
        }
      
        else if (keyName === 'remove from queue') {
          removeElementFromLocalStorage (queueArray, "Queue", 'add to queue');
          createNewMarkupQueue();
        };

        function getWatchedArray() {
          if (localStorage.getItem("Watched") !== null) {
            return JSON.parse(localStorage.getItem("Watched"));
          }
          else {
            return [];
          }

        };

        function getQueueArray() {
          if (localStorage.getItem("Queue") !== null) {
            return JSON.parse(localStorage.getItem("Queue"));
          }
          else {
            return [];
          }
        };

        function addElementToLocalStorage (currentArray, localStorageKey, newKeyName) {
          currentArray.push(movieInfo);
          localStorage.setItem(localStorageKey, JSON.stringify(currentArray));
          keyName = newKeyName;
        };

        function removeElementFromLocalStorage (currentArray, localStorageKey, newKeyName) {
          currentArray.map((obj) => {
            if (movieInfo.id === obj.id) {
              const objIndx = currentArray.indexOf(obj)
              currentArray.splice(objIndx, 1);
              localStorage.removeItem(localStorageKey);
              localStorage.setItem(localStorageKey, JSON.stringify(currentArray))
              keyName = newKeyName;
            }
          });
        };

        function createNewMarkupWatched() {
          if (!refs.myLibrary.classList.contains('hidden')) {
            markupWatched(e);
          }
        };

        function createNewMarkupQueue() {
          if (!refs.myLibrary.classList.contains('hidden')) {
            markupQueue(e);
          };
        };
      });


      
      //Local Storage. End


      const closeBtn = document.querySelector('.modal-button-close');


      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);
      window.addEventListener('keydown', closeModalHandler);
      window.addEventListener('click', closeModalHandlerClick);
     

      //функція закриття форми по клавіші Esc
      function closeModalHandler(evt) {
        if (evt.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
          document.body.style.overflowY = "visible";
        }
      }

      function closeModalHandlerClick(evt) {
        modal.close();
        
        window.removeEventListener('keydown', closeModalHandlerClick);
        document.body.style.overflowY = "visible";

      }

      function closeModal() {
        modal.close();
        document.body.style.overflowY = "visible";

        window.removeEventListener('keydown', closeModalHandler);
        window.removeEventListener('keydown', closeModalHandlerClick);
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
}
