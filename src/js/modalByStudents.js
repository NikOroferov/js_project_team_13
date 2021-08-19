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
          const endMarkup = `<p class='desc__thanks'>Спасибо за внимание!</p>
            <p class="desc__team">Team 13: Apocalypse Now</p>

            <table class="desc__list">
    
  <tr class="desc__item">
    <td class="desc__position">Scrum-master, помощник режиссера и художника по спецэффектам</td>
    <td class="desc__name">Nataliia</td>
    <td class="desc__link">https://github.com/nelyaterry</td>

  <tr class="desc__item">  
    <td class="desc__position">Помощник режиссера, властелин LocalStorage</td>
    <td class="desc__name">Katerina</td>
    <td class="desc__link">https://github.com/Kateryna286</td>

    <tr class="desc__item">
    <td class="desc__position">Художник по спецэффектам, техник по пагинации и параллаксу</td>
    <td class="desc__name">Anastasia</td>
    <td class="desc__link">https://github.com/Chantsova
    </td>

    <tr class="desc__item">
    <td class="desc__position">Дизайнер, постановщик get-запросов</td>
    <td class="desc__name">Maks</td>
    <td class="desc__link">https://github.com/Maksym1994</td>

    <tr class="desc__item">
    <td class="desc__position">Художник по свету, консультант по переходу на тёмную сторону</td>
    <td class="desc__name">Vasilisa</td>
    <td class="desc__link">https://github.com/Vasiliska-A</td>

    <tr class="desc__item">
    <td class="desc__position">Декоратор и оформитель модальных окон</td>
    <td class="desc__name">Aleksei</td>
    <td class="desc__link">https://github.com/alexey-chernov</td>

    <tr class="desc__item">
    <td class="desc__position">Художник-оформитель, дизайнер</td>
    <td class="desc__name">Taisiia</td>
    <td class="desc__link">https://github.com/kovalchuktaisiia</td>
    
</tr>
  <tr class="desc__item-lead">
  <td class="desc__position-lead">Главный режиссер, teamLead команды</td>
    <td class="desc__name-lead">Nikolai</td>
    <td class="desc__link">https://github.com/NikOroferov</td>
</table>`;
            
            

      if (number <= 8) {
        number += 1;
      } else {
        refs.studentCard.addEventListener('click', showStudent);
        refs.studentCard.innerHTML = endMarkup;
        refs.studentCard.removeEventListener('click', showStudent);


        return;
      }

      let timerId = setTimeout(onCreateCard, 1500);
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
