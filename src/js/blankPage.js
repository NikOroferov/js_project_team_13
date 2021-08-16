import { refs } from './getRefs';

const blankPage = `
    <div class="blankPage">
        <span class="searchIncorrect">Sorry, no results were found for your search.</span>
    </div>`
    
export default function appendBlankPage() {
    refs.filmList.innerHTML = blankPage;
}