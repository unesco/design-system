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

    menuBurger.on('click', function() {
      $('body').toggleClass('menu-open');
      $('body').removeClass('parent-menu-open');
    });

    parentItem.on('click', function() {
      $('body').toggleClass('parent-menu-open');
    });
  }
};

})(jQuery);
