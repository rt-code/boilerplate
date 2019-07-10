// import './vue/main';

// libs
import 'slick-slider';
import 'jquery-custom-select/dist/js/jquery.custom-select.min';
import 'jquery-viewport-checker';
import 'jquery-lazy';
import 'theia-sticky-sidebar';
import './lib/jquery-ui.min';
import './lib/datepicker/js/datepicker.min';

// polyfill
import 'svgxuse';

import './jquery/map';

// loader
window.onload = function() {
  document.getElementById('loader').style.display = 'none';
};
$(document).ready(function() {
  // lazy
  $('.js-lazy').Lazy({
    scrollDirection: 'vertical',
    effect: 'fadeIn'
  });

  // attach "прикрепить файл"
  $('.js-attach input[type=file]').change(function() {
    var filename = $(this).val().replace(/.*\\/, '');
    $('.js-attach .attach__btn span').html(filename);
  });

  // js custom modal
  $('.js-custom-modal').click(function(e) {
    e.preventDefault();
    let currentWindow = $(this).attr('data-modal-id');
    $('.modal').removeClass('active');
    $('div.modal[id="' + currentWindow + '"]').addClass('active');
    $('body').addClass('overflow-bg');
  });
  $('.js-hide-modal').click(function(e) {
    e.preventDefault();
    $('.modal').removeClass('active');
    $('body').removeClass('overflow-bg');
  });
  // $(document).mouseup(function(e) {
  //   var div = $('.modal__block');
  //   if (!div.is(e.target) &&
  //     div.has(e.target).length === 0) {
  //     $('.modal').removeClass('active');
  //     $('body').removeClass('overflow-bg');
  //   }
  // });

  // mobile bar
  function mobileToBar() {

    if ($(window).width() < 767) {
      var offsetTop = $(window).scrollTop();
      if (offsetTop > 0) {
        $('header .main-row').addClass('bg');
      } else {
        $('header .main-row').removeClass('bg');
      }
    } else {
      $('header .main-row').removeClass('bg');
    }

  }
  $(window).scroll(function() {
    mobileToBar();
  });
  $(window).resize(function() {
    mobileToBar();
  });
  mobileToBar();


  // datepicker
  $('.js-datepicker').datepicker();

  // slider numbers
  function initCountSlider(sliderClass) {
    $('.' + sliderClass).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      let numbersBlock = $('.slider-paginate[data-class="' + sliderClass + '"]');
      console.log(sliderClass);
      numbersBlock.find('.slider-paginate__numbers').html('<strong>' + i + '</strong>' + '<span>/' + slick.slideCount + '</span>');
    });
  };
  initCountSlider('js-main-slider');
  initCountSlider('reviews-slider');
  // tabs
  $('.js-tabs').tabs();

  // accordion
  $('.js-accordion').accordion({
    collapsible: true,
    active: false,
    heightStyle: 'content'
  });

  // mega menu - show
  $('.js-show-menu').click(function() {
    $('.main-menu').toggleClass('active');
    $('body').toggleClass('overflow');
  });

  // this hide
  $('.js-hide-menu').click(function() {
    $('.main-menu').removeClass('active');
    $('body').removeClass('overflow');
  });
  //-

  // sticky
  $('.js-sticky').theiaStickySidebar({
    additionalMarginTop: 30,
    additionalMarginBottom: 30,
    minWidth: 1024
  });
  $(window).resize(function() {
    if ($(window).width() < 1024) {
      $('.js-sticky').theiaStickySidebar({
        defaultPosition: 'relative',
        minWidth: 1024
      });
    } else {
      $('.js-sticky').theiaStickySidebar({
        defaultPosition: 'relative',
        minWidth: 1024
      });
    }
  });

  // Слайдер
  $('.js-main-slider').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    prevArrow: $('.js-main-prev'),
    nextArrow: $('.js-main-next'),
  });

  $('.js-main-slider').on('lazyLoaded', function(e, slick, image, imageSource) {
    image.parent().css('background-image', 'url("' + imageSource + '")');
    image.hide();
  });


  // animate
  $('.js-animate').viewportChecker({
    classToAdd: 'active',
    offset: 200,
    repeat: false
  });


  // Наведение на якори 
  function hoverAnchor() {
    $('.js-hover-anchor').mouseover(function() {
      $('.js-hover-anchor').removeClass('active');
      $(this).addClass('active');
    });
  }
  hoverAnchor();

  // плавный якорь
  $('.js-scrollTo').click(function() {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;
    if ($(window).width() > 768) {
      $('html').animate({
        scrollTop: destination
      }, 0);
    } else {
      $('html').animate({
        scrollTop: destination - 0
      }, 0);
    }
    return false;

  });

  // view filter
  $('.view-radio input').click(function() {
    var current = $(this).val();
    $('.view-content').hide();
    $('div[id="' + current + '"]').show();
  });
  //-

  // Кнопка наверх
  $('.js-up').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, {
      duration: 500,
      easing: 'swing'
    });
    return false;
  });


  // Селекты
  $('.js-select').customSelect();

  // слайдер цитат
  $('.reviews-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: false,
    fade: true,
    prevArrow: $('.js-review-prev'),
    nextArrow: $('.js-review-next'),
  });

  // Слайдер партнеров
  $('.js-slider-partners').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    fade: false,
    prevArrow: $('.js-partner-prev'),
    nextArrow: $('.js-partner-next')
  });

  // aside nav mobile
  $('.js-show-sidebar-navigation').click(function() {
    $('.sidebar-navigation').toggleClass('active');
    $('body').toggleClass('overflow');
  });
  // $(document).mouseup(function(e) {
  //   var div = $('.sidebar-navigation');
  //   if (!div.is(e.target) &&
  //     div.has(e.target).length === 0) {
  //     div.removeClass('active');
  //     $('body').removeClass('overflow');
  //   }
  // });
  $('.js-hide-sidebar-navigation').click(function() {
    $('.sidebar-navigation').removeClass('active');
    $('body').removeClass('overflow');
  });
  //-
});
