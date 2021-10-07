/**
 * @file
 * Theme Drupal behaviors.
 */
(function ($) {
  "use strict";

  Drupal.behaviors.initUnesco = {
    attach: function (context, settings) {
      $(window, context).once().each(function () {
        Unesco.initAll(context, settings);
      });
    }
  };

})(jQuery);
