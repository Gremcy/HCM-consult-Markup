// add js-hide-cursor class to prevent custom cursor on element
import $ from 'jquery'

export default function cursor () {
  const $cursor = $('.js-cursor')
  const $hideCursor = $('.js-hide-cursor')

  function moveCursor (e) {
    $cursor.css({
      left: e.clientX,
      top: e.clientY,
    });
  }

  function hideCursor () {
    $cursor.addClass('is-hidden')
  }

  function showCursor () {
    $cursor.removeClass('is-hidden')
  }

  document.addEventListener('mousemove', moveCursor)
  document.addEventListener('scroll', moveCursor)
  $hideCursor.on('mouseenter', hideCursor)
  $hideCursor.on('mouseleave', showCursor)
}
