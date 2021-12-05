'use strict';
// Тут будет кот ж)

function renderTabs() {
  if (document.querySelector('.tabs')) {
    const START_SLIDE = 1;

    const tabsArray = document.querySelectorAll('.tabs__item');
    const tabsWrapper = document.querySelector('.tabs__cards-list');
    const line = document.querySelector('.tabs__line');

    function renderLine(number = 0) {
      const currentNumber = number > 0? (number + START_SLIDE): START_SLIDE;
      line.style.width = `${(currentNumber / tabsArray.length) * 100}%`;
    }


    tabsArray.forEach((item, number)=>{

      function onClickTabsChange(evt) {
        const targetButton = evt.target;

        if (!targetButton.classList.contains('tabs__item-button--active')) {
          tabsWrapper.style.transform = `translateX(-${number * 100}%)`;
          renderLine(number);

          tabsArray.forEach((el)=> {
            const button = el.querySelector('.tabs__item-button');
            button.classList.remove('tabs__item-button--active');
          });

          targetButton.classList.add('tabs__item-button--active');
        }
      }

      item.addEventListener('click', onClickTabsChange);
    });

    renderLine();
  }
}

renderTabs();
