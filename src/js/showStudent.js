import students from "./students";
import cardsMarkup from "../templates/students.hbs"
import { refs } from './getRefs';


refs.studentCard.addEventListener('click', showStudent);


function showStudent() {
    refs.studentCard.removeEventListener('click', showStudent);

    let number = 0;

    onCreateCard();

    function onCreateCard() {

        if (refs.modal.classList.contains('is-hidden')) {
            refs.studentCard.addEventListener('click', showStudent);
            refs.studentCard.innerHTML = '';
            return;
        }

        // console.log(number);
        const markup = cardsMarkup(students[number]);
        refs.studentCard.innerHTML = markup;
        
        if (number <= 7) {
            number += 1;
        } else {
            refs.studentCard.addEventListener('click', showStudent);
            refs.studentCard.innerHTML = `<p class='thanks'>Спасибо за внимание!!</p>`;
            return;
        }

        let timerId = setTimeout(onCreateCard, 1500);
           
    };
 
    
}





