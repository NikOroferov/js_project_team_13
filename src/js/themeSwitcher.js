import { refs } from './getRefs';

//Theme switch
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const ThemeFooter = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const ThemeSunIcon = {
  LIGHT: 'shown',
  DARK: 'notshown',
};

const ThemeMoonIcon = {
  LIGHT: 'notshown',
  DARK: 'shown',
};

let userChosenTheme = '';
let userFooterChosenTheme = '';
let userChosenSunIcon = '';
let userChosenMoonIcon = '';

const userTheme = localStorage.getItem('userTheme');
const userFooterTheme = localStorage.getItem('userFooterTheme');
const userSunIcon = localStorage.getItem('userSunIcon');
const userMoonIcon = localStorage.getItem('userMoonIcon');

refs.page.classList.add(`${userTheme}`);
refs.darkFooter.classList.add(`${userFooterTheme}`);
refs.sunIcon.classList.add(`${userSunIcon}`);
refs.moonIcon.classList.add(`${userMoonIcon}`);

// console.log(userTheme);

if (userTheme === Theme.DARK) {
  refs.switcherButton.checked = true;
}

// && userFooterChosenTheme === ThemeFooter.DARK

export function changePageTheme() {
  if (!refs.switcherButton.checked) {
    userChosenTheme = refs.page.classList.toggle('light-theme');
    userChosenTheme = refs.page.classList.remove('dark-theme');
    userFooterChosenTheme = refs.darkFooter.classList.toggle('light-theme');
    userFooterChosenTheme = refs.darkFooter.classList.remove('dark-theme');

    // refs.filmTitle.classList.toggle;

    userChosenSunIcon = refs.sunIcon.classList.toggle('shown');
    userChosenSunIcon = refs.sunIcon.classList.remove('notshown');
    userChosenMoonIcon = refs.moonIcon.classList.add('notshown');

    localStorage.setItem('userTheme', Theme.LIGHT);
    localStorage.setItem('userFooterTheme', ThemeFooter.LIGHT);
    localStorage.setItem('userSunIcon', ThemeSunIcon.LIGHT);
    localStorage.setItem('userMoonIcon', ThemeMoonIcon.LIGHT);
  } else {
    userChosenTheme = refs.page.classList.toggle('dark-theme');
    userChosenTheme = refs.page.classList.remove('light-theme');
    userFooterChosenTheme = refs.darkFooter.classList.toggle('dark-theme');
    userFooterChosenTheme = refs.darkFooter.classList.remove('light-theme');

    userChosenSunIcon = refs.sunIcon.classList.add('notshown');
    userChosenMoonIcon = refs.moonIcon.classList.toggle('notshown');

    localStorage.setItem('userTheme', Theme.DARK);
    localStorage.setItem('userFooterTheme', ThemeFooter.DARK);
    localStorage.setItem('userSunIcon', ThemeSunIcon.DARK);
    localStorage.setItem('userMoonIcon', ThemeMoonIcon.DARK);
  }
}

localStorage.removeItem('userIconTheme');
