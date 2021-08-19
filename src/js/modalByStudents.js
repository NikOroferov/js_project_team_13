import { refs } from './getRefs';
import students from './students';
import cardsMarkup from '../templates/students.hbs';
import './parallax';

refs.openModalBtn.addEventListener('click', toggleModal);

function toggleModal(e) {
  e.preventDefault();
  refs.openModalBtn.removeEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModalClose);
  document.body.style.overflowY = 'hidden';
  refs.modal.classList.toggle('is-hidden');
    refs.parallaxBody.addEventListener('click', showStudent);    
}


function showStudent() {
        refs.studentCard.removeEventListener('click', showStudent);
  refs.parallax.classList.add('is-hidden');
  refs.parallaxBody.removeEventListener('click', showStudent);  
    refs.studentCard.classList.add('is-active');
    let number = 0;

    onCreateCard();

        function onCreateCard() {
            
            
      if (refs.modal.classList.contains('is-hidden')) {
          refs.studentCard.addEventListener('click', showStudent);
          
        refs.studentCard.innerHTML = '';
        return;
      }

        const markup = cardsMarkup(students[number]);
            refs.studentCard.innerHTML = markup;
            const endMarkup = `<p class='thanks'>Спасибо за внимание!</p>
            <table>
    
  <tr>
    <td>Продюссер, скрам-мастер, помощник режиссера и художника по спецэффектам</td>
    <td>Nataliia</td>
    <td>https://github.com/nelyaterry</td>
  </tr>
  
    <td>Помощник режиссера, властелин LocalStorage</td>
    <td>Katerina</td>
    <td>https://github.com/Kateryna286</td>
    <tr>
    <td>Художник по спецэффектам, техник по пагинации и параллаксу</td>
    <td>Anastasia</td>
    <td>https://github.com/Chantsova</td>
    <tr>
    <td>Дизайнер, покоритель get-запросов</td>
    <td>Maks</td>
    <td>https://github.com/Maksym1994</td>
    <tr>
    <td>Художник по свету, главный консультант по переходу на тёмную сторону</td>
    <td>Vasilisa</td>
    <td>https://github.com/Vasiliska-A</td>
    <tr>
    <td>Декоратор и главный оформитель модальных окон</td>
    <td>Aleksei</td>
    <td>https://github.com/alexey-chernov</td>
    <tr>
    <td>Художник-оформитель, дизайнер</td>
    <td>Taisiia</td>
    <td>https://github.com/kovalchuktaisiia</td>
  </tr>
  <br>
  <tr>
  <th>Главный режиссер, тим-лид команды</th>
    <th>Nikolai</th>
    <th>'https://github.com/NikOroferov'</th>
  </tr>
</table>`;
            
            

      if (number <= 7) {
        number += 1;
      } else {
        refs.studentCard.addEventListener('click', showStudent);
          refs.studentCard.innerHTML = endMarkup;


        return;
      }

      let timerId = setTimeout(onCreateCard, 1000);
    }
}
  
function toggleModalClose(e) {
  e.preventDefault();
  document.body.style.overflowY = 'visible';
   refs.parallax.classList.remove('is-hidden');
    refs.modal.classList.toggle('is-hidden');
    refs.studentCard.classList.remove('is-active');
    refs.studentCard.removeEventListener('click', showStudent);
  refs.closeModalBtn.removeEventListener('click', toggleModalClose);
  refs.openModalBtn.addEventListener('click', toggleModal);
}
