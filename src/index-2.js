const libraryBtn = document.querySelector ('.library__btn');
const header = document.querySelector('header');
const libraryFilter = document.querySelector ('.filter');
const searshForm = document.querySelector ('.search__form');
const logo = document.querySelector ('.logo__icon');
const home = document.querySelector ('.home__btn');


libraryBtn.addEventListener ('click', openBtns);
logo.addEventListener ('click', hideBtns);
home.addEventListener ('click', hideBtns);

function openBtns (evt) {
    
    header.style.backgroundImage = 'url(../images/library_desc@2x.jpg)';    
    libraryFilter.style.visibility = 'visible';
    libraryFilter.style.display = "block";
    searshForm.style.visibility = "hidden";
    searshForm.style.display = "none";
}

function hideBtns (e){
    header.style.backgroundImage = 'url(../images/header_desc@2x.jpg)'; 
    libraryFilter.style.visibility = 'hidden';
    libraryFilter.style.display = "none";
    searshForm.style.visibility = "visible";
    searshForm.style.display = "flex";
}

