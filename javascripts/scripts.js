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

})(jQuery);
