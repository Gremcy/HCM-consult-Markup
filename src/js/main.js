/* eslint-disable no-undef */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'slick-carousel';
import customersSlider from './modules/customersSlider';
// import cursor from './modules/cursor';

function fixHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

$(document).ready(() => {
  fixHeight();

  window.addEventListener('resize', () => {
    fixHeight();
  });

  $.fn.modalOpen = function () {
    $('.js-modal').modalCloseAll();
    $('body').addClass('is-hidden');
    $(this).fadeIn(1);
    $(this).addClass('is-open');

    // hotfix for zoomer inside modal
    window.PinchZoomer.remove();
    $('.controlHolder').remove();
    window.PinchZoomer.init();
    return this;
  };

  $.fn.modalClose = function () {
    $(this).fadeOut(1);
    $(this).removeClass('is-open');
    $('body').removeClass('is-hidden');
    return this;
  };

  $.fn.modalCloseAll = function () {
    $('.js-modal').modalClose();
    return this;
  };

  if ($('#video-in-popup').length > 0) {
    const videoPopup = document.querySelector('#video-in-popup');
    videoPopup.pause();
    videoPopup.currentTime = 0;

    $(document).on('click', '.js-close-modal', () => {
      $('.js-modal').modalCloseAll();
      videoPopup.pause();
      videoPopup.currentTime = 0;
    });
  }

  $(document).on('click', '.js-close-modal', () => {
    $('.js-modal').modalCloseAll();
    videoPopup.pause();
    videoPopup.currentTime = 0;
  });

  $(document).on('click', '.js-modal-link', (e) => {
    const target = $(e.currentTarget).attr('data-target');
    const $modal = $(`.js-modal[data-modal="${target}"]`);

    if ($modal.length) {
      $modal.modalOpen();
    }
  });

  $(document).on('click', '.header-burger', () => {
    $('.menu-wrapper').addClass('show');
    $('.menu-overlay').addClass('show');
    $('body').addClass('is-hidden');
  });
  $(document).on('click', '.menu-close', () => {
    $('.menu-wrapper').removeClass('show');
    $('.menu-overlay').removeClass('show');
    $('body').removeClass('is-hidden');
  });

  $(document).on('click', '.menu-overlay', () => {
    $('.menu-wrapper').removeClass('show');
    $('.menu-overlay').removeClass('show');
    $('body').removeClass('is-hidden');
  });

  $(document).on('click', '.menu-links-containing-heading', () => {
    $('.menu-links-drop').slideToggle();
    $('.menu-links-containing-heading').toggleClass('active');
    $('.menu-links-containing-heading img').toggleClass('rotate');
  });

  $(document).on('click', '.menu-search-btn', () => {
    $('.menu-search-input').slideToggle();
    $('.menu-search-btn').toggleClass('active');
  });

  $(document).on('click', '.header-search-btn, .header-desktop-overlay', () => {
    $('.header-desktop-search-fluid').toggleClass('show');
    $('.header-search-btn').toggleClass('active');
    $('.header-desktop-overlay').toggleClass('show');
  });

  $(document).on(
    'click',
    '.cookies-right-accept-btn, .cookies-right-close-btn',
    () => {
      $('.cookies-fluid').addClass('hide');
    }
  );

  const articleButtons = document.querySelectorAll('.article__button');
  const articleTexts = document.querySelectorAll('.article__description');
  const articles = document.querySelectorAll('.article');
  if (articleTexts && articleButtons) {
    articleButtons.forEach((button, i) => {
      button.addEventListener('click', () => {
        if (articleTexts[i].style.height === '0px') {
          articleTexts[i].style.height = `${articleTexts[i].scrollHeight}px`;
        } else {
          articleTexts[i].style.height = `${articleTexts[i].scrollHeight}px`;
          // eslint-disable-next-line no-unused-expressions
          `${articleTexts[i].clientHeight}px`;
          articleTexts[i].style.height = '0';
        }
        articles[i].classList.toggle('open');
      });
      articleTexts[i].addEventListener('transitionend', () => {
        if (articleTexts[i].style.height !== '0px') {
          articleTexts[i].style.height = 'auto';
        }
      });
    });
  }

  // загрузка файла

  const uploadCv = document.querySelector('.upload-cv-delete');
  const uploadLeter = document.querySelector('.upload-leter-delete');

  // загрузка файла

  $('[type=file]').on('change', function () {
    // Name of file and placeholder
    const file = this.files[0].name;
    const dflt = $(this).attr('placeholder');
    // eslint-disable-next-line eqeqeq
    if ($(this).val() != '') {
      $(this).next().text(file);
      $(this).closest('.wrapper-input-file').addClass('active');
    } else {
      $(this).next().text(dflt);
    }
  });

  $('.upload-cv-delete').on('click', function () {
    $(this).closest('.wrapper-input-file').removeClass('active');
    $('#upload-file-cv').val('');
    const dflt = $('#upload-file-cv').attr('placeholder');
    $('.wwu-upload-sv-btn').text(dflt);
  });
  $('.upload-leter-delete').on('click', function () {
    $(this).closest('.wrapper-input-file').removeClass('active');
    $('#upload-file-letter').val('');
    const dflt = $('#upload-file-letter').attr('placeholder');
    $('.wwu-upload-letter-btn').text(dflt);
  });

  // Magnetic Hover
  const mArea = document.querySelector('#magnetic-area');

  // 1. Set the function and variables
  function parallaxIt(e, target, movement = 1) {
    const boundingRect = mArea.getBoundingClientRect();
    const relX = e.pageX - boundingRect.left;
    const relY = e.pageY - boundingRect.top;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    gsap.to(target, {
      x: (relX - boundingRect.width / 11) * movement,
      y: (relY - boundingRect.height / 2 - scrollTop) * movement,
      ease: 'power1',
      duration: 0.4,
    });
  }

  // 2. Call the function
  function callParallax(e) {
    parallaxIt(e, '#magnetic-content');
  }

  mArea.addEventListener('mousemove', (e) => {
    callParallax(e);
  });

  mArea.addEventListener('mouseleave', (e) => {
    gsap.to('#magnetic-content', {
      scale: 1,
      x: 0,
      y: 0,
      ease: 'power3',
      duration: 0.4,
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  const homeCircle = gsap.timeline();
  homeCircle.fromTo(
    '.home-bottom-circle',
    {
      y: '50%',
      scale: '.5',
    },
    {
      y: '0',
      duration: '2',
      scale: '1',
      ease: 'elastic.out(.5, 0.3)',
    }
  );
  ScrollTrigger.create({
    animation: homeCircle,
    trigger: '.home-contact-left',
    start: 'top bottom',
    // markers: true
  });

  const aboutCircle = gsap.timeline();
  aboutCircle.fromTo(
    '.about-approach-circle',
    {
      scale: '.1',
    },
    {
      scale: '1',
    }
  );
  ScrollTrigger.create({
    animation: aboutCircle,
    trigger: '.about-approach-container',
    start: 'top+=300 bottom',
    end: 'center+=200 center',
    scrub: true,
    // markers: true,
  });

  gsap.to('.pin-label1', {
    scrollTrigger: {
      trigger: '.pin-label1',
      start: 'top top+=130',
      end: 'bottom center+=45',
      scrub: true,
      pin: '.pin-label1',
      // pinSpacing: false,
      // pinSpacer: false,
      // markers: true,
    },
    scale: 1,
  });

  gsap.to('.pin-label2', {
    scrollTrigger: {
      trigger: '.pin-label2',
      start: 'top top+=130',
      end: 'bottom center+=45',
      scrub: true,
      pin: '.pin-label2',
      // pinSpacing: false,
      // pinSpacer: false,
      // markers: true,
    },
    scale: 1,
  });

  gsap.to('.pin-label3', {
    scrollTrigger: {
      trigger: '.pin-label3',
      start: 'top top+=130',
      end: 'bottom center+=45',
      scrub: true,
      pin: '.pin-label3',
      // pinSpacing: false,
      // pinSpacer: false,
      // markers: true,
    },
    scale: 1,
  });

  // eslint-disable-next-line no-unused-vars
  // gsap.utils.toArray('.panel-scroll').forEach((panel, i) => {
  //   ScrollTrigger.create({
  //     trigger: panel,
  //     start: 'top top+=120',
  //     end: 'bottom-=250 center',
  //     pin: true,
  //     pinSpacing: false,
  //     markers: true,
  //   });
  // });
  // eslint-disable-next-line prefer-arrow-callback

  customersSlider();

  window.updateTrigger = () => ScrollTrigger.refresh();
});
