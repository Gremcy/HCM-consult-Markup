import { Swiper, Navigation, Pagination } from 'swiper';

export default function customersSlider() {
  Swiper.use([Navigation, Pagination]);

  let swiper = Swiper;
  let init = false;

  /* Which media query
   ************************************************************* */
  function swiperMode() {
    if (!$('.js-customers-steps-slider').length) return;
    const mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
    const tablet = window.matchMedia(
      '(min-width: 768px) and (max-width: 1023px)'
    );
    const desktop = window.matchMedia('(min-width: 1024px)');

    // Enable (for mobile)
    if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper('.js-customers-steps-slider', {
          slidesPerView: 1,
          spaceBetween: 20,
          autoHeight: true,
          pagination: {
            el: '.js-customers-steps-slider-pagination',
            type: 'bullets',
            clickable: true,
          },
        });
      }
    }

    // Disable (for desktop)
    else if (
      desktop.matches &&
      swiper &&
      typeof swiper.destroy === 'function'
    ) {
      swiper.destroy();
      init = false;
    }
  }

  /* On Load
   ************************************************************* */
  window.addEventListener('load', () => {
    swiperMode();
  });

  /* On Resize
   ************************************************************* */
  window.addEventListener('resize', () => {
    swiperMode();
  });
}
