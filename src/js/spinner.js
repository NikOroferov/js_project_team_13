import { refs } from './getRefs';

//Spinner
export function showSpinner() {
  document.body.style.overflowY = 'hidden';
  refs.spinnerLoader.classList.toggle('visible');
  refs.backdrop.classList.remove('is-hidden');
}

export function hideSpinner() {
  document.body.style.overflowY = 'visible';
  refs.spinnerLoader.classList.toggle('visible');
  refs.backdrop.classList.add('is-hidden');
}
