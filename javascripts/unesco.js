(function ($) {
  "use strict";

  Unesco.initSliderMediaFull();
  Unesco.initMediaSlider();
  Unesco.initCarouselCards();
  Unesco.initDropdownFooter();

  let desktopWidth = 992;

  let navBar = $('header .navbar');

  function navWrapperHeight() {
    let main = $('main');
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

    if (navBar.parent().hasClass('bg-primary')) {
      main.css({
        'padding-top': navBarHeight
      });
    } else {
      main.css({
        'padding-top': 'initial'
      });
    }
  }

  function menuMobile() {
    let navBurger = $('header .navbar_burger');
    navBurger.on('click', function () {
      if ($(this).parent().hasClass('active')) {
        $(this).next('.navbar_wrapper').find('.submenu-active').removeClass('submenu-active');
        $('html').css('overflow', 'auto');
      } else {
        $('html').css('overflow', 'hidden');
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

      function closeSubMenu() {
        navSubMenu.removeClass('submenu-active');
        navBar.parent().removeClass('is-active');
        navSubMenu.next().fadeOut();
      }
      if ($(window).width() <= desktopWidth) {
        wrapper.prepend('<div class="submenu-header"><div class="submenu-back material-icons-sharp">chevron_left</div><div class="submenu-title">' + $(this).text() + '</div></div>');
        $(this).unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).parent().toggleClass('submenu-active');
          navBar.parent().toggleClass('is-active');
        });
        wrapper.find('.submenu-header .submenu-back').on('click', function () {
          $(this).closest('li').removeClass('submenu-active');
        });
      } else {
        $(this).unbind('click').on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('submenu-active')) {
            closeSubMenu();
          } else {
            closeSubMenu();
            $(this).addClass('submenu-active');
            navBar.parent().addClass('is-active');
            $(this).next().fadeIn();
          }
        });
        $('body').on('click', function (e) {
          if (!navSubMenu.is(e.target) && navSubMenu.parent().has(e.target).length === 0 ) {
            closeSubMenu();
          }
        });
      }
    });
  }

  function stickyMenu() {
    let navBarSticky = $('header .navbar_sticky');
    let navBarHeight = navBar.outerHeight();

    $('.navbar_logo').clone().prependTo(navBarSticky);
    navBarSticky.wrapInner( "<div class='navbar_sticky-wrapper'></div>");
    $(window).scroll(function () {
      if ($(window).scrollTop() > navBarHeight) {
        navBarSticky.addClass('is-sticky');
      } else {
        navBarSticky.removeClass('is-sticky');
      }
    });

    if (navBarSticky.hasClass('bg-white')) {
      navBarSticky.find('.navbar_logo img').attr('src',function(){
        return $(this).attr('src').replace("logo.svg","logo-blue.svg");
      });
    }
  }

  function themingOption() {
    let header = $('header.header');
    $('input[name=headerBG]').on('click', function () {
      header.toggleClass('bg-primary');
      if (navBar.parent().hasClass('bg-primary')) {
        $('main').css({
          'padding-top': navBar.innerHeight()
        });
      } else {
        $('main').css({
          'padding-top': 'initial'
        });
      }
    });
    $('input[name=headerBorder]').on('click', function () {
      header.toggleClass('is-border');
    });
    $('input[name=headerBaseline]').on('click', function () {
      header.find('.navbar_baseline').toggle();
      if (navBar.parent().hasClass('bg-primary')) {
        $('main').css({
          'padding-top': navBar.innerHeight()
        });
      } else {
        $('main').css({
          'padding-top': 'initial'
        });
      }
    });
  }

  menuMobile();
  subMenu();
  navWrapperHeight();
  themingOption();
  stickyMenu();

  $( window ).resize(function() {
    navWrapperHeight();
  });

})(jQuery);

