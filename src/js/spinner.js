import { refs } from './getRefs';

export function showSpinner() {
  console.log('frfr');
  refs.spinnerLoader.classList.toggle('visible');
  refs.backdrop.classList.remove('is-hidden');
}

export function hideSpinner() {
  refs.spinnerLoader.classList.toggle('visible');
  refs.backdrop.classList.add('is-hidden');
}
