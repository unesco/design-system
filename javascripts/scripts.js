/**
 * @file
 * Theme javascript.
 */
(function ($) {
  "use strict";

// Add your custom scripts here, using Drupal.behaviors

  Drupal.behaviors.reportMenu = {
    attach: function (context, settings) {
      let menuCarousel = $('header .report .menu-level-1');

      menuCarousel.slick({
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        arrows: false,
        infinite: false,
      });
    }
  };

  Drupal.behaviors.responsiveMenu = {
    attach: function (context, settings) {
      let menuBurger = $('.navbar-toggler');
      let parentItem = $('header .menu-level-0 > .nav-item > .dropdown-toggle');

      menuBurger.on('click', function () {
        $('body').toggleClass('menu-open');
        $('body').removeClass('parent-menu-open');
      });

      parentItem.on('click', function () {
        $('body').toggleClass('parent-menu-open');
      });
    }
  };

  Drupal.behaviors.dropdownFooter = {
    attach: function (context, settings) {

      function dropdownClick() {
        let dropdownTitle = $('footer nav .navbar-nav > .nav-item .dropdown-toggle');
        dropdownTitle.unbind('click').on('click', function () {
          $(this).toggleClass('is-active');
          $(this).next('ul').slideToggle();
        });
      }

      let desktopWidth = 992;
      let initialDiff = ($(window).width() > desktopWidth) ? 1:-1;

      // Responsive
      if ($(window).width() <= desktopWidth) {
        dropdownClick();
      }

      // Resize responsive & reload page if change breakpoint
      $(window).on('resize', function () {
        let win = $(window).width();
        let  currentDiff = win - desktopWidth;
        if (win <= desktopWidth) {
          dropdownClick();
        }
        if(currentDiff*initialDiff < 0) {
          initialDiff *= -1;
          location.reload();
        }
      });
    }
  };


  Drupal.behaviors.sliderMediaFull = {
    attach: function (context, settings) {
      let fullMediaSlider = $('.field--name-field-paragraphs .paragraph--type--text-media-full .field--name-field-slides');

      fullMediaSlider.slick({
        speed: 300,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        infinite: true,
        adaptiveHeight: false,
      });
    }
  };

  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {
      const header = $('header');
      let headerHeight = header.height();
      let bodyPadding = parseInt($('body').css('padding-top'));

      let padding =  parseInt(headerHeight + bodyPadding);

      $(window).scroll(function(){
        if($(window).scrollTop() > headerHeight) {
          $('body').addClass('header-sticky');
          $('body').css('padding-top', padding);
          header.css('top', bodyPadding);
        } else {
          $('body').removeClass('header-sticky');
          $('body').css('padding-top', '');
          header.css('top', '');
        }
      });
    }
  };

})(jQuery);
