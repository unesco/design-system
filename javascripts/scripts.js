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

      $(window).scroll(function() {
        if($(window).scrollTop() > headerHeight) {
          $('body').addClass('header-sticky');
        } else {
          $('body').removeClass('header-sticky');
        }
      });
    }
  };

  Drupal.behaviors.displaySeeMore = {
    attach: function (context, settings) {
      let displaySeeMore = $('.field--name-field-paragraphs .paragraph.display-see-more');

      displaySeeMore.each(function() {
        let imageHeight = $(this).find('.field--name-field-media-image').outerHeight(true);
        let content = $(this).children('.wrapper-infos');
        let contentHeight = content.outerHeight(true);
        let multiLine = ~~(imageHeight / 40);

        if ( contentHeight >= imageHeight) {
          content.wrapInner( '<div class="display_more-wrapper" style="max-height:' + (imageHeight - 32) + 'px; -webkit-line-clamp:' + multiLine + '"></div>' );
          content.append('<button class="btn-display-more">' + Drupal.t('Read more') + '</button>');

          content.children('.btn-display-more').on('click', function () {
            $(this).toggleClass('is-active');
            if ($(this).hasClass('is-active')) {
              $(this).prev().css({
                'max-height': contentHeight,
                '-webkit-line-clamp': 'initial'
              });
            } else {
              $(this).prev().css('max-height', (imageHeight - 32));
              $(this).prev().delay(600).queue(function (next) {
                $(this).css('-webkit-line-clamp', '' + multiLine + '');
                next();
              });
            }
          });
        }
      });
    }
  };

  Drupal.behaviors.stickyShare = {
    attach: function (context, settings) {
      const shareButton = $('.sticky-share');

      shareButton.on('click', function(e) {
        e.preventDefault();
        $(this).closest('.content-menu-sticky').toggleClass('open-share');
      });
    }
  };

})(jQuery);
