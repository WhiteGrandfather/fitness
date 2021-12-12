'use strict';

const DESKTOP_SCREEN = 1368;
const TABLET_SCREEN = 768;

// табы
(function() {
  if (document.querySelector('.tabs')) {
    const START_SLIDE = 1;
    const TAB_KEY = 'Tab';

    const tabsArray = document.querySelectorAll('.tabs__item');
    const tabsWrapper = document.querySelector('.tabs__cards-list');
    const line = document.querySelector('.tabs__line');

    function renderLine(number = 0) {
      const currentNumber = number > 0 ? (number + START_SLIDE): START_SLIDE;
      line.style.width = `${(currentNumber / tabsArray.length) * 100}%`;
    }

    function changeSlide(number) {
      const targetButton = tabsArray[number].querySelector('button');

      if (!targetButton.classList.contains('tabs__item-button--active')) {

        tabsWrapper.style.transform = `translateX(-${number * 100}%)`;
        renderLine(Number(number));

        tabsArray.forEach((el) => {
          const button = el.querySelector('.tabs__item-button');
          button.classList.remove('tabs__item-button--active');
        });

        targetButton.classList.add('tabs__item-button--active');
      }
    }

    tabsArray.forEach((item, number)=>{
      const button = item.querySelector('button');
      button.dataset.number = `${number}`;

      function onClickTabsChange(evt) {
        changeSlide(evt.target.dataset.number);
      }

      item.addEventListener('click', onClickTabsChange);
    });


    function onKeypressTabsChange(evt) {
      if (evt.key === TAB_KEY) {
        evt.preventDefault();
        let nextSlide;

        for(let i = 0; i < tabsArray.length; i++) {
          const button = tabsArray[i].querySelector('button');

          if (button.classList.contains('tabs__item-button--active')) {
            nextSlide = i < tabsArray.length - 1? i + 1 : 0;
            break;
          }
        }

        changeSlide(nextSlide);
      }
    }

    renderLine();
    document.addEventListener('keydown', onKeypressTabsChange)
  }
})();
// табы

// слайдер
(function() {
  const defaultSideCount = 1;

  if (document.querySelector('[data-slider="slider"]'))  {
    const sliderList = document.querySelectorAll('div[data-slider="slider"]') ;

    // активирует слайдер
    function slider(item) {
      const sliderWrapper = item.querySelector('[data-slider="list"]');
      const sliderList = item.querySelectorAll('[data-slider="slide"]');
      const nextButton = item.querySelector('[data-slider="button-next"]');
      const prevButton = item.querySelector('[data-slider="button-prev"]');

      const slidesCount = item.dataset.slides.split(','); // массив с количеством слайдов для разрешений

      const desktopSlidesCount = !isNaN(Number(slidesCount[0])) ? Number(slidesCount[0]) : defaultSideCount;
      const tabletSlidesCount = !isNaN(Number(slidesCount[1])) ? Number(slidesCount[1]) : defaultSideCount;
      const mobileSlidesCount = !isNaN(Number(slidesCount[2])) ? Number(slidesCount[2]) : defaultSideCount;

      const firstSlide = 0;
      let activeSlide = 0;

      // запускает свайп
      function renderSwipe(next = true) {
        let slidesCount;

        if (window.innerWidth >= DESKTOP_SCREEN) {
          slidesCount = Math.ceil(sliderList.length / desktopSlidesCount);
        } else if (window.innerWidth < DESKTOP_SCREEN && window.innerWidth >= TABLET_SCREEN) {
          slidesCount =  Math.ceil(sliderList.length / tabletSlidesCount);
        } else if (window.innerWidth < TABLET_SCREEN) {
          slidesCount = Math.ceil(sliderList.length /  mobileSlidesCount);
        }

        // находит последний слайд
        const lastSlide = slidesCount - 1;

        if (next && (activeSlide < lastSlide) || activeSlide === firstSlide) {
          activeSlide++;
        } else if (!next && (activeSlide !== firstSlide)) {
          activeSlide--;
        }

        sliderWrapper.style.transform = `translateX(-${100 * activeSlide}%)`;
        nextButton.disabled = activeSlide === lastSlide;
        prevButton.disabled = activeSlide === firstSlide;
      }

      function swipeNextHandler() {
        renderSwipe();
      }

      function swipePrevHandler() {
        renderSwipe(false);
      }

      prevButton.addEventListener('click', swipePrevHandler);
      nextButton.addEventListener('click', swipeNextHandler);
    }

    sliderList.forEach((el)=>slider(el));
  }
})();
// слайдер

// работа с формой
(function() {
  const timeout = 5000;

  function createPhoneNumber(el, mask){
    let format = mask;
    let inputVal = el.value;
    inputVal = inputVal.toString();

    // отключает ошибку
    el.classList.remove('error');

    // проверка на наличие букв
    for (let i = 0; i < inputVal.length; i++) {
      if (/[a-zA-Zа-яё+А-ЯЁ]/.test(inputVal[i])) {

        // показывает ошибку
        if (!el.classList.contains('error')) {
          el.classList.add('error');
        }

        // если цифр нет заканчивает и очищает input
        return '';
      }
    }

    // оставляет только цифры
    inputVal = inputVal.replace(/[^+\d]/g, '');

    // если цифр нет заканчивает и очищает input
    if (inputVal.length === 0) {
      return '';
    }

    // применяет маску
    for (let i = 0; i < inputVal.length; i++) {
      format = format.replace('_', inputVal[i]);
    }

    return format;
  }

  if (document.querySelector('[data-form="form"]')) {
    const form = document.querySelector('[data-form="form"]');
    const client = form.querySelector('[data-form="client"]');
    const phone = form.querySelector('[data-input="phone"]');
    const mask  = phone.dataset.mask;
    const phoneLength = Number(phone.dataset.phoneLength);

    function onInputPhone(evt) {
      evt.target.value = createPhoneNumber(evt.target, mask);
    }

    phone.addEventListener('input', onInputPhone);

    function onSubmitForm(evt) {
      evt.preventDefault();

      if (evt.target.value.replace(/[^+\d]/g, '').length < phoneLength) {
        evt.target.value = '';
        return;
      }

      const el = evt.target;
      const formHeight = el.offsetHeight;

      console.log(new FormData(el).get('phone'));
      console.log(new FormData(el).get('name'));

      function removeEvent() {
        el.reset();
        client.textContent = '';
        el.style.height = ' ';

        el.classList.remove('form__main--success');
      }

      el.style.height = `${formHeight}px`;
      el.classList.add('form__main--success');
      client.textContent = new FormData(el).get('name');
      setTimeout(removeEvent, timeout);
    }

    form.addEventListener('submit', onSubmitForm);
  }
})();
// работа с формой
