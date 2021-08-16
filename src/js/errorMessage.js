import {refs} from './getRefs';

export default function appendErrorMessage(searchQueryIncorrect) {
    refs.searchForm.insertAdjacentHTML('beforeend', `<div class='searchQueryIncorrect'> "${searchQueryIncorrect}" not successful Enter the correct movie name</div>`);
}