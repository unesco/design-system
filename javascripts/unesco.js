(function ($) {
  "use strict";

  Unesco.initSliderMediaFull();
  Unesco.initMediaSlider();
  Unesco.initCarouselCards();
  Unesco.initDropdownFooter();

  let desktopWidth = 992;

  let navBar = $('header .navbar');
  let navBarHeight = navBar.outerHeight();

  function navWrapperHeight() {

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
  }

  function subMenu() {
    let navSubMenu = $('header .navbar_menu-item.is-expanded');
    navSubMenu.each(function () {
      let wrapper = $(this).next('.navbar_submenu');

      if ($(window).width() <= desktopWidth) {
        wrapper.prepend('<div class="submenu-header"><div class="submenu-back material-icons-sharp">chevron_left</div><div class="submenu-title">' + $(this).text() + '</div></div>');
        $(this).unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).parent().toggleClass('submenu-active');
        });
        wrapper.find('.submenu-header .submenu-back').on('click', function () {
          $(this).closest('li').removeClass('submenu-active');
        });
      } else {
        $(this).unbind('click').on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('submenu-active')) {
            navSubMenu.removeClass('submenu-active');
            navSubMenu.next().fadeOut();
          } else {
            navSubMenu.removeClass('submenu-active');
            navSubMenu.next().fadeOut();
            $(this).addClass('submenu-active');
            $(this).next().fadeIn();
          }
        });
        $('body').on('click', function (e) {
          if (!navSubMenu.is(e.target) && navSubMenu.parent().has(e.target).length === 0 ) {
            navSubMenu.removeClass('submenu-active');
            navSubMenu.next().fadeOut();
          }
        });
      }
    });
  }

  function stickyMenu() {
    let navBarSticky = $('header .navbar_sticky');

    $('.navbar_logo').clone().prependTo(navBarSticky);
    navBarSticky.wrapInner( "<div class='navbar_sticky-wrapper'></div>");
    $(window).scroll(function () {
      if ($(window).scrollTop() > navBarHeight) {
        navBarSticky.addClass('is-sticky');
      } else {
        navBarSticky.removeClass('is-sticky');
      }
    });

    if (navBarSticky.hasClass('is-white')) {
      navBarSticky.find('.navbar_logo img').attr('src',function(){
        return $(this).attr('src').replace("logo.svg","logo-blue.svg");
      });
    }
  }

  menuMobile();
  subMenu();
  navWrapperHeight();
  stickyMenu();

  $( window ).resize(function() {
    navWrapperHeight();
  });


})(jQuery);

