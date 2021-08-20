import { refs } from './getRefs';
import menuCardTpl from '../templates/library-card-markup.hbs';

const movieContainer = document.querySelector('.film__list');

refs.libraryButton.addEventListener('click', markupWatched); 
refs.watchedBtn.addEventListener('click', markupWatched); 
refs.queueBtn.addEventListener('click', markupQueue); 

function markupWatched(event) {
  event.preventDefault();

  movieContainer.innerHTML = '';

  const watchedJson = localStorage.getItem("Watched");                
  const parsedWatchedJson = JSON.parse(watchedJson);                  
  const watchedMarkup = createItemCardsMarkup(parsedWatchedJson);     

  movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
};

function markupQueue(event) {
    event.preventDefault();
  
    movieContainer.innerHTML = '';
  
    const queueJson = localStorage.getItem("Queue");                
    const parsedQueueJson = JSON.parse(queueJson);                  
    const watchedMarkup = createItemCardsMarkup(parsedQueueJson);   
  
    movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
};

function createItemCardsMarkup(card) {
  return menuCardTpl(card);
};

export { markupWatched, markupQueue };