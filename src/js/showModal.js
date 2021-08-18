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
      
      //отрисовка правильных кнопочек. Начало
      const watchedArray = JSON.parse(localStorage.getItem("Watched"));     
      const queueArray = JSON.parse(localStorage.getItem("Queue")); 

      const btnW = document.querySelector('.add-to-watched');                
      const btnQ = document.querySelector('.add-to-queue');  

      if (watchedArray) {
        watchedArray.map((obj) => {                                           
          if (obj.id === movieInfo.id) {                                      
            btnW.textContent = 'remove from watched';
          }
        })
      };

      if (watchedArray) { 
        queueArray.map((obj) => {
          if (obj.id === movieInfo.id) {
            btnQ.textContent = 'remove from queue';
          }
        });
      };
      //отрисовка правильных кнопочек. Конец  
      
      //Local Storage. Start
      btnW.addEventListener('click', (e) => {

        const watchedArray = getWatchedArray();
        const keyName = e.target.textContent;

        function getWatchedArray() {
          if (localStorage.getItem("Watched") !== null) {
            const watchedArray = JSON.parse(localStorage.getItem("Watched"));
                        
            return watchedArray;
          }
          else {
            const watchedArray = [];
                        
            return watchedArray;
          }
                    
        };

        if (keyName === 'add to watched') {
          watchedArray.push(movieInfo);
          localStorage.setItem("Watched", JSON.stringify(watchedArray))
          e.target.textContent = 'remove from watched';
          if (!refs.myLibrary.classList.contains('hidden')) {
            markupWatched(e);
          };
          
        }

        else if (keyName === 'remove from watched') {
          watchedArray.map((obj) => {
              if (movieInfo.id === obj.id) {
                  const objIndx = watchedArray.indexOf(obj)            
                  watchedArray.splice(objIndx, 1);
                  localStorage.removeItem("Watched");
                  localStorage.setItem('Watched', JSON.stringify(watchedArray))
                  e.target.textContent = 'add to watched';
              }
              if (!refs.myLibrary.classList.contains('hidden')) {
                markupWatched(e);
              };
          });
        }
      });

      btnQ.addEventListener('click', (e) => {

        const queueArray = getQueueArray();
        const keyName = e.target.textContent;

        function getQueueArray() {
          if (localStorage.getItem("Queue") !== null) {
              const queueArray = JSON.parse(localStorage.getItem("Queue"));
              return queueArray;
          }
          else {
              const queueArray = [];
              return queueArray;
          }
        };


        if (keyName === 'add to queue') {
          queueArray.push(movieInfo);
          localStorage.setItem("Queue", JSON.stringify(queueArray));
          e.target.textContent = 'remove from queue';
          if (!refs.myLibrary.classList.contains('hidden')) {
            markupQueue(e);
          };
        }

        else if (keyName === 'remove from queue') {
          queueArray.map((obj) => {
              if (movieInfo.id === obj.id) {
                  const objIndx = queueArray.indexOf(obj)            
                  queueArray.splice(objIndx, 1);
                  localStorage.removeItem("Queue");
                  localStorage.setItem('Queue', JSON.stringify(queueArray))
                  e.target.textContent = 'add to queue';
              }
          });
          if (!refs.myLibrary.classList.contains('hidden')) {
            markupQueue(e);
          };
        }
      });

      //Local Storage. End
      

      const closeBtn = document.querySelector('.modal-button-close');

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
        document.body.style.overflowY = "visible";
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
  document.body.style.overflowY = "hidden";
  getFullMovieInfo(id);
}

document.onclick = function () {
  document.body.style.overflowY = "visible";
}
