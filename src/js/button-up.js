import {refs} from './getRefs';

//Button-Up
export default function buttonUp() {
    window.addEventListener('scroll', function () {
        if (pageYOffset>400) {
            refs.btn.classList.add('show');
        } else {
            refs.btn.classList.remove('show');
        }
    });


    refs.btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo(pageYOffset, 0);
    });
    
}