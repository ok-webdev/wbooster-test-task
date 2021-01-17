
window.addEventListener('DOMContentLoaded', () => {
  const cardsLayer = document.querySelector('.cards');
  // Получаем данные
  async function generateCards () {
    await fetch('../assets/data/goods.JSON').then(response => {
      return response.json();
    }).then(data => {
      // Генерируем карточки
      data.product.forEach((item, i) => {
        let newCard = document.createElement('DIV');
        
        newCard.classList.add('card');
        newCard.insertAdjacentHTML(
          'afterbegin',
          `
            <img src="${item.img}" alt="photo" class="card__img" />
            <p class="card__descr">${item.name}</p>
            <p class="card__price">${item.price} &#8381;</p>
            <button class="btn btn_card">Купить</button>
          `
        );

        cardsLayer.appendChild(newCard);
      });
    });
    // Получаем элементы со страницы
    const cardBtns = document.querySelectorAll('.btn_card'),
          overlay = document.querySelector('.overlay'),
          modal = overlay.querySelector('.modal'),
          modalForm = modal.querySelector('form'),
          close = modal.querySelector('.modal__close');

      // Показываем/прячем модальное окно по кнопке закрытия, клику мимо формы, после отправки формы
      function showModal () {
        overlay.style.display = 'block';
      }

      function hideModal () {
        overlay.style.display = 'none';
      }

      cardsLayer.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('btn_card')) {
          cardBtns.forEach ((item) => {
            if (target == item) {
              showModal();
            }
          });
        };
      });

      close.addEventListener('click', hideModal);
      modalForm.addEventListener('submit', hideModal);
      overlay.addEventListener('click', (event) => {
        if (event.target.classList.contains('overlay')) {
          hideModal();
        }
      });
  }
  
  generateCards();
});

