//import { refs } from './getRefs';
import FilmApiService from './apiService';

const movieApiService = new FilmApiService();

async function getMoviebyId(id) {
    const movieById = await movieApiService.getMovieInfo(id)
    console.log(movieById);
  
    return movieById
};


document.addEventListener('click', (e) => {
    const watchedBtn = document.querySelector('.add-to-watched');
    const queueBtn = document.querySelector('.add-to-queue');

    watchedBtn.addEventListener('click', setMoviesArrayForLocalStorage);
    queueBtn.addEventListener('click', setMoviesArrayForLocalStorage);
    
    
    function getWatchedArray() {
            if (localStorage.getItem("Watched") !== null) {
                const watchedArray = JSON.parse(localStorage.getItem("Watched"));
                //console.log(watchedArray);
                return watchedArray;
            }
            else {
                const watchedArray = [];
                //console.log(watchedArray);
                return watchedArray;
            }
            
    };
        
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

    function setMoviesArrayForLocalStorage() {                      // rename function
        const watchedArray = getWatchedArray();
        const queueArray = getQueueArray();

        const keyName = e.target.textContent;
        const movieId = +e.target.dataset.act;
        console.log(movieId);
        getMoviebyId(movieId)
        .then ( (selectedMovie) => {
        if (keyName === 'add to watched') {
            watchedArray.push(selectedMovie);
            localStorage.setItem("Watched", JSON.stringify(watchedArray))
            e.target.textContent = "Done";
        }
        else if (keyName === 'add to queue') {
            queueArray.push(selectedMovie);
            localStorage.setItem("Queue", JSON.stringify(queueArray));
            e.target.textContent = "Done";
        }
    });
    };
});

// const addToWatchedBtn = document.querySelector(".movie-about");
// console.log(addToWatchedBtn);
// console.log(refs);


// movieCards.forEach(card => card.addEventListener('click', getMovieInfo));

// btnWpage.addEventListener('click', markupWatched);
// btnQpage.addEventListener('click', markupQueue);

// function getWatchedArray() {
//     if (localStorage.getItem("Watched") !== null) {
//         const watchedArray = JSON.parse(localStorage.getItem("Watched"));
//         return watchedArray;
//     }
//     else {
//         return [];
//     }
// };

// function getQueueArray() {
//     if (localStorage.getItem("Queue") !== null) {
//         const queueArray = JSON.parse(localStorage.getItem("Queue"));
//         return queueArray;
//     }
//     else {
//         return [];
//     }
// };

// function getMovieInfo(event) {                      // rename function
//     const watchedArray = getWatchedArray();
//     const queueArray = getQueueArray();
//     const keyName = event.target.textContent;
//     console.log(event.target);
//     console.log(event.currentTarget);
//     const currentIdxNum = +event.currentTarget.dataset.indexNumber;
//     products.map((product) => {
//         if (product.id === currentIdxNum) {
//             if (keyName === 'Watched') {
//                 watchedArray.push(product);
//                 localStorage.setItem(keyName, JSON.stringify(watchedArray))
//                 event.target.textContent = "Remove from watched";
//             }
//             else if (keyName === 'Queue') {
//                 queueArray.push(product);
//                 localStorage.setItem(keyName, JSON.stringify(queueArray));
//                 event.target.textContent = "Remove from queue";
//             }
//             else if (keyName === "Remove from watched") {
//                 console.log(watchedArray);
//                 console.log(product);
//                 watchedArray.map((obj) => {
//                     if (product.id === obj.id) {
//                         const objIndx = watchedArray.indexOf(obj)
//                         console.log(objIndx);
//                         watchedArray.splice(objIndx, 1);
//                         console.log(watchedArray);
//                         localStorage.removeItem("Watched");
//                         localStorage.setItem('Watched', JSON.stringify(watchedArray))
//                         event.target.textContent = "Watched";
//                     }
//                 });
//             }
//         }
//     });   
// };

// function markupWatched(event) {
//     event.preventDefault();

//     movieContainer.innerHTML = '';

//     const watchedJson = localStorage.getItem("Watched");                //function?
//     const parsedWatchedJson = JSON.parse(watchedJson);                  //function?
//     const watchedMarkup = createItemCardsMarkup(parsedWatchedJson);     //function?

//     movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
// };

// function markupQueue(event) {
//     event.preventDefault();

//     movieContainer.innerHTML = '';

//     const queueJson = localStorage.getItem("Queue");                    //function?
//     const parseQueueJson = JSON.parse(queueJson);                       //function?
//     const watchedMarkup = createItemCardsMarkup(parseQueueJson);        //function?

//     movieContainer.insertAdjacentHTML('beforeend', watchedMarkup);
// };


// function createItemCardsMarkup(card) {
//   return menuCardTpl(card);
// };






