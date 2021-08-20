import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from './apiService';
import filmTpl from '../templates/modal-markup.hbs';
import { refs } from './getRefs';
import { markupWatched, markupQueue } from './markup-myLibrary';

const apiService = new MoviesApiService();

refs.filmList.addEventListener('click', openModal);

//Get film by ID
function getFullMovieInfo(id) {
  apiService
    .getMovieInfo(id)
    .then(movieInfo => {
      const markup = filmTpl(movieInfo);
      const modal = basicLightbox.create(markup);
      modal.show();
      document.body.style.overflowY = "hidden";

      const watchedArray = JSON.parse(localStorage.getItem("Watched"));
      const queueArray = JSON.parse(localStorage.getItem("Queue"));

      const btnW = document.querySelector('.add-to-watched');
      const btnQ = document.querySelector('.add-to-queue');
      const modalBtn = document.querySelector('.modal-btns');

      if (watchedArray) {
        watchedArray.map((obj) => {
          if (obj.id === movieInfo.id) {
            btnW.textContent = 'remove from watched';
            btnW.classList.add('remove-from-watched');
          }
        })
      };

      if (queueArray) {
        queueArray.map((obj) => {
          if (obj.id === movieInfo.id) {
            btnQ.textContent = 'remove from queue';
            btnQ.classList.add('remove-from-queue');
          }
        });
      };
  
      //Get and put elements to Local Storage
      modalBtn.addEventListener('click', (e) => {
        const watchedArray = getWatchedArray();
        const queueArray = getQueueArray();
        
        if (e.target.textContent === 'add to watched') {
          addElementToLocalStorage (watchedArray, "Watched");
          e.target.textContent = 'remove from watched';
          btnW.classList.add('remove-from-watched');
          createNewMarkupWatched();
        }

        else if (e.target.textContent === 'add to queue') {
          addElementToLocalStorage(queueArray, "Queue");
          e.target.textContent = 'remove from queue';
          btnQ.classList.add('remove-from-queue');
          createNewMarkupQueue();
        }

        else if (e.target.textContent === 'remove from watched') {
          removeElementFromLocalStorage (watchedArray, "Watched");
          e.target.textContent = 'add to watched';
          btnW.classList.remove('remove-from-watched');
          createNewMarkupWatched();
        }
      
        else if (e.target.textContent === 'remove from queue') {
          removeElementFromLocalStorage (queueArray, "Queue");
          e.target.textContent = 'add to queue';
          btnQ.classList.remove('remove-from-queue');
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

        function addElementToLocalStorage (currentArray, localStorageKey) {
          currentArray.push(movieInfo);
          localStorage.setItem(localStorageKey, JSON.stringify(currentArray));
        };

        function removeElementFromLocalStorage (currentArray, localStorageKey, newKeyName) {
          currentArray.map((obj) => {
            if (movieInfo.id === obj.id) {
              const objIndx = currentArray.indexOf(obj)
              currentArray.splice(objIndx, 1);
              localStorage.removeItem(localStorageKey);
              localStorage.setItem(localStorageKey, JSON.stringify(currentArray))
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

      //Close Film's card modal 
      const closeBtn = document.querySelector('.modal-button-close');
      const backdrop = document.querySelector('.basicLightbox ');

      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);
      backdrop.addEventListener('click', closeModalHandlerClick);
     

      //Close Film's card modal by key
      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
          document.body.style.overflowY = "visible";
        }
      }

    //Close Film's card modal by click on backdrop
      function closeModalHandlerClick(e) {
        if (e.target === backdrop) {
          window.removeEventListener('keydown', closeModalHandlerClick);
          document.body.style.overflowY = "visible";
        }
      }

      function closeModal() {
        modal.close();
        document.body.style.overflowY = "visible";

        window.removeEventListener('keydown', closeModalHandler);
      }
    })
    .catch(error => console.log('error', error));
}

//Open Film's card modal
function openModal(e) {
  e.preventDefault();
  let id = e.target.dataset.action;
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  document.body.style.overflowY = "hidden";

  getFullMovieInfo(id);
}
