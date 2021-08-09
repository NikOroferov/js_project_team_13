import axios from "axios";

const KEY = "8b01b570d2ebdf9fc3f47ddefbdd70fc";
const URL = "https://api.themoviedb.org/3/";

export default class NewsApiService {
    
    constructor() {
        
        this.media_type = "movie";
        this.time = 'day';
        this.query = "Небо";
        this.language = "ru-RU";
        this.adult = false;
    }
    
    async getMoviesRequest(query) {
        const url = `${URL}search${this.media_type}?api_key=${KEY}&query=${this.query}&language=${this.language}&page=${this.page}&include_adult=${this.adult}`;
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    };

    async getMoviesDate(page) {
        const url = `${URL}trending${this.media_type}${this.time}?api_key=${KEY}&page=${page}`;
        const response = await axios.get(url);
        return response.data;
    };
   
    async getMoviesById(movieId) {
        const URL = `${url}movie${movieId}?api_key=${KEY}`;
        const response = await axios.get(url);
        return response.data;
    }
}