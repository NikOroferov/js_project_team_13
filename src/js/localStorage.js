//import { refs } from './getRefs';
import FilmApiService from './apiService';

const movieApiService = new FilmApiService();

document.addEventListener('click', (e) => {
    
    const watchedArray = getWatchedArray();
    const queueArray = getQueueArray();

    const keyName = e.target.textContent;
    const movieId = +e.target.dataset.act;
        
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

    async function getMoviebyId(id) {
            const movieById = await movieApiService.getMovieInfo(id)
            if (keyName === 'add to watched') {
                watchedArray.push(movieById);
                localStorage.setItem("Watched", JSON.stringify(watchedArray))
                e.target.textContent = 'remove from watched';
            }
            else if (keyName === 'add to queue') {
                queueArray.push(movieById);
                localStorage.setItem("Queue", JSON.stringify(queueArray));
                e.target.textContent = 'remove from queue';
            }
            else if (keyName === 'remove from watched') {
                watchedArray.map((obj) => {
                    if (movieById.id === obj.id) {
                        const objIndx = watchedArray.indexOf(obj)            
                        watchedArray.splice(objIndx, 1);
                        localStorage.removeItem("Watched");
                        localStorage.setItem('Watched', JSON.stringify(watchedArray))
                        e.target.textContent = 'add to watched';
                    }
                });
            }
            else if (keyName === 'remove from queue') {
                queueArray.map((obj) => {
                    if (movieById.id === obj.id) {
                        const objIndx = queueArray.indexOf(obj)            
                        queueArray.splice(objIndx, 1);
                        localStorage.removeItem("Queue");
                        localStorage.setItem('Queue', JSON.stringify(queueArray))
                        e.target.textContent = 'add to queue';
                    }
                });
            }
    };

    getMoviebyId(movieId);  
});





