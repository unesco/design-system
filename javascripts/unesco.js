(function ($) {
  "use strict";

  Unesco.initSliderMediaFull();
  Unesco.initMediaSlider();
  Unesco.initCarouselCards();
  Unesco.initDropdownFooter();

  let desktopWidth = 992;

  function navWrapperHeight() {
    let navBar = $('header .navbar');
    let navBarHeight = navBar.outerHeight();

    if ($(window).width() <= desktopWidth) {
      navBar.children('.navbar_wrapper').css({
        top: navBarHeight,
        height: `calc(100vh - ${navBarHeight}px)`,
      });
    } else {
      navBar.children('.navbar_wrapper').css({
        top: 0,
        height: 'auto'
      });
    }
  }

  function menuMobile() {
    let navBurger = $('header .navbar_burger');
    let navSubMenu = $('header .navbar_menu-item.is-expanded');
    navBurger.on('click', function () {
      if ($(this).parent().hasClass('active')) {
        $(this).next('.navbar_wrapper').find('.submenu-active').removeClass('submenu-active');
      }

      $(this).parent().toggleClass('active');
      $(this).parent().toggleClass('closing');
      $(this).next('.navbar_wrapper').slideToggle({
        duration: 300,
        start: function() {
          jQuery(this).css('display','flex');
        }
      });
    });

    navSubMenu.each(function () {
      let wrapper = $(this).next('.navbar_submenu');
      wrapper.prepend('<div class="submenu-header"><div class="submenu-back material-icons-sharp">chevron_left</div><div class="submenu-title">' + $(this).text() + '</div></div>');
      $(this).unbind('click').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('submenu-active');
      });
      wrapper.find('.submenu-header .submenu-back').on('click', function () {
        $(this).closest('li').removeClass('submenu-active');
      });
    });
  }

  menuMobile();
  navWrapperHeight();

  $( window ).resize(function() {
    navWrapperHeight();
  });


})(jQuery);

