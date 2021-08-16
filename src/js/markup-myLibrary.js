import { refs } from './getRefs';

import menuCardTpl from '../templates/main-card-markup.hbs';

const movieContainer = document.querySelector('.film__list');

refs.libraryButton.addEventListener('click', markupWatched); 
refs.watchedBtn.addEventListener('click', markupWatched); 
refs.queueBtn.addEventListener('click', markupQueue); 

function markupWatched(event) {
  event.preventDefault();

  movieContainer.innerHTML = '';

  const watchedJson = localStorage.getItem("Watched");                //function?
  const parsedWatchedJson = JSON.parse(watchedJson);                  //function?
  const watchedMarkup = createItemCardsMarkup(parsedWatchedJson);     //function?

   movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
};

function markupQueue(event) {
    event.preventDefault();
  
    movieContainer.innerHTML = '';
  
    const queueJson = localStorage.getItem("Queue");                //function?
    const parsedQueueJson = JSON.parse(queueJson);                  //function?
    const watchedMarkup = createItemCardsMarkup(parsedQueueJson);     //function?
  
    movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
};

function createItemCardsMarkup(card) {
  return menuCardTpl(card);
};