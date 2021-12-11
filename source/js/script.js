'use strict';

const DESKTOP_SCREEN = 1368;
const TABLET_SCREEN = 768;

function renderTabs() {
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
}

function renderSlider() {
  const desktopSlidesCount = 4;
  const tabletSlidesCount = 2;

  if (document.querySelector('.coaches'))  {
    const slider = document.querySelector('.coaches__container');
    const sliderWrapper = slider.querySelector('.coaches__list');
    const sliderList = slider.querySelectorAll('.coaches__item');
    const nextButton = document.querySelector('.coaches__button--next');
    const prevButton = document.querySelector('.coaches__button--prev');
    const firstSlide = 0;
    let activeSlide = 0;

    function renderSwipe(next = true) {
      let slidesCount;

      if (window.innerWidth >= DESKTOP_SCREEN) {
        slidesCount = Math.ceil(sliderList.length / desktopSlidesCount);
      } else if (window.innerWidth < DESKTOP_SCREEN && window.innerWidth >= TABLET_SCREEN) {
        slidesCount =  Math.ceil(sliderList.length / tabletSlidesCount);
      } else if (window.innerWidth < TABLET_SCREEN) {
        slidesCount =  sliderList.length;
      }

      const lastSlide = slidesCount - 1;

      if (next && activeSlide < lastSlide || activeSlide === firstSlide) {
        activeSlide++;
      } else if (!next && activeSlide !== firstSlide) {
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
}

renderTabs();
renderSlider();
