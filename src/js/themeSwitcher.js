import { refs } from './getRefs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

let userChosenTheme = '';

const userTheme = localStorage.getItem('userTheme');
refs.page.classList.add(`${userTheme}`);
// console.log(userTheme);

if (userTheme === Theme.DARK) {
  refs.switcherButton.checked = true;
}

export function changePageTheme() {
  if (!refs.switcherButton.checked) {
    userChosenTheme = refs.page.classList.toggle('light-theme');
    userChosenTheme = refs.page.classList.remove('dark-theme');
    localStorage.setItem('userTheme', Theme.LIGHT);
  } else {
    userChosenTheme = refs.page.classList.toggle('dark-theme');
    userChosenTheme = refs.page.classList.remove('light-theme');
    localStorage.setItem('userTheme', Theme.DARK);
  }
}