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

    if ($(window).width() < desktopWidth) {
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
        start: function () {
          jQuery(this).css('display','flex');
        }
      });
    });
  }

  function menuDesktop() {
    let navbarWidth = $('header .navbar').outerWidth();
    let navbarLogoWidth = $('header .navbar .navbar_logo').outerWidth();
    let navbarDifference = navbarWidth - navbarLogoWidth;
    let navbarMenu = $('header .navbar .navbar_wrapper .navbar_menu');
    let navbarMenuWidth = 0;

    navbarMenu.find('li').each(function () {
      navbarMenuWidth += $(this).outerWidth();
    });

    if (navbarMenuWidth > navbarDifference) {
      navbarMenu.css('max-width', navbarDifference - 120).addClass('slider');
    } else {
      navbarMenu.css('max-width', '').removeClass('slider');
    }

    navbarMenu.prev('.slider_back').remove();
    navbarMenu.next('.slider_next').remove();

    if (navbarMenu.hasClass('slider')) {
      navbarMenu.before('<div class="slider_back"></div>');
      navbarMenu.after('<div class="slider_next"></div>');
    } else {
      navbarMenu.prev('.slider_back').remove();
      navbarMenu.next('.slider_next').remove();
    }

    navbarMenu.prev('.slider_back').on('click', function () {
      navbarMenu.stop().animate({scrollLeft: "-=150"}, 400);
      return false;
    });
    navbarMenu.next('.slider_next').on('click', function () {
      navbarMenu.stop().animate({scrollLeft: "+=150"}, 400);
      return false;
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

      wrapper.prepend('<div class="submenu-header"><div class="submenu-back material-icons-sharp">chevron_left</div><div class="submenu-title">' + $(this).text() + '</div></div>');

      $(this).unbind('click').on('click', function (e) {
        e.preventDefault();
        if ($(window).width() < desktopWidth) {
          wrapper.css('display', '');
          $(this).parent().toggleClass('submenu-active');
          navBar.parent().toggleClass('is-active');
          wrapper.find('.submenu-header .submenu-back').on('click', function () {
            $(this).closest('li').removeClass('submenu-active');
          });
        } else {
          if ($(this).hasClass('submenu-active')) {
            closeSubMenu();
          } else {
            closeSubMenu();
            $(this).addClass('submenu-active');
            navBar.parent().addClass('is-active');
            $(this).next().fadeIn();
          }
        }
      });

      $('body').on('click', function (e) {
        if (!navSubMenu.is(e.target) && navSubMenu.parent().has(e.target).length === 0 && $(window).width() > desktopWidth) {
          closeSubMenu();
        }
        if ( $(window).width() < desktopWidth) {
          wrapper.css('display', '');
        }
      });

    });
  }

  function subMenuCarousel() {
    let menuCarousel = $('.submenu_carousel');
    let navSubMenu = $('header .navbar_menu-item.is-expanded');

    menuCarousel.each(function () {
      $(this).children('ul').slick({
        slidesToShow: 4,
        swipeToSlide: true,
        autoplay: false,
        arrows: true,
        infinite: false,
        speed: 500,
        responsive: [
          {
            breakpoint: 951,
            settings: {
              slidesToShow: 3,
              arrows: false,
            }
          },
          {
            breakpoint: 520,
            settings: 'unslick',
          },
        ]
      });
    });

    if ($(window).width() >= desktopWidth) {
      navSubMenu.on('click', function () {
        menuCarousel.children('ul').slick('refresh');
      });
    }
  }

  function stickyMenu() {
    let navBarSticky = $('header .navbar_sticky');
    let navBarHeight = navBar.outerHeight();

    $(window).scroll(function () {
      if ($(window).scrollTop() > navBarHeight) {
        navBarSticky.addClass('is-sticky');
      } else {
        navBarSticky.removeClass('is-sticky');
      }
    });

    if (navBarSticky.hasClass('bg-white')) {
      navBarSticky.find('.navbar_logo img').attr('src',function () {
        return $(this).attr('src').replace("logo.svg","logo-blue.svg");
      });
    }
  }

  function galaxyPopin() {
    const $explores = $('.galaxy-popin');
    const $links = $('.galaxy-popin__tabs__nav__link');
    const $title = $('[data-popin="text"]', $explores);
    const $toggle = $('[data-popin="toggle"]', $explores);
    const $searchInput = $('[data-search-for="unesco"]', $explores);
    const $searchItems = $('[data-search-id="unesco"] > *', $explores);
    const originTitle = $title.text();
    let memWidth = null;

    function size() {
      const width = window.innerWidth;
      if (width <= 768 && memWidth !== 'small') {
        memWidth = 'small';
        $toggle.removeClass('active');
        $title.text(originTitle);
        $links.each(function() {
          const hashtag = this.getAttribute('href');
          if(!/^#/.test(hashtag)) return;
          $(hashtag).removeClass('active');
        });
      } else if (width > 768 && memWidth !== 'large') {
        memWidth = 'large';
        let isActive = false;
        $links.each(function() {
          if( this.classList.contains('active') ) {
            isActive = true;
            const hashtag = this.getAttribute('href');
            $(hashtag).addClass('active');
          }
        });
        if(!isActive) {
          const hashtag = $links[0].getAttribute('href');
          $(hashtag).removeClass('active');
        }
      }
    }

    $(window).on('resize', () => size() );
    size();

    $toggle.on('click', function() {
      $toggle.removeClass('active');
      $title.text(originTitle);
      $links.each(function() {
        const hashtag = this.getAttribute('href');
        if(!/^#/.test(hashtag)) return;
        $(hashtag).removeClass('active');
      });
    });

    $links.each(function() {
      const width = window.innerWidth;
      const $this = $(this);

      $this.on('click', function(e) {
        const href = this.getAttribute('href');
        if(!/^#/.test(href)) return;
        e.preventDefault();

        $links.each(function() {
          const hashtag = this.getAttribute('href');
          if(!/^#/.test(hashtag)) return;
          $(hashtag).removeClass('active');
        });
        $(this.getAttribute('href')).addClass('active');

        $links.removeClass('active');
        $this.addClass('active');

        $toggle.addClass('active');

        $title.text($this.text());
      });
    });

    $explores.each(function() {
      const $explore = $(this);
      const $buttons = $(`[for="${this.id}"]`);
      $buttons.on('click', function(e) {
        e.preventDefault();
        $explore.fadeToggle({
          duration: 300,
          start: function () {
            jQuery(this).css('display','flex');
          }
        });
      });
    });

    $searchInput.on('input', function() {
      const val = this.value.toLowerCase();

      if(this.value){
        $searchItems.each(function() {
          const text = this.innerText.toLowerCase();
          if(text.includes(val)) {
            this.classList.remove('hidden');
          }else {
            this.classList.add('hidden');
          }
        });
      }else {
        $searchItems.removeClass('hidden');
      }
    });
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

  function dropdownDocument() {
    const $dropdownButton = $('.js-dropdown-menu');

    $dropdownButton.on('click', function (e) {

      e.stopPropagation();

      if(this.classList.contains('js-dropdown-menu')){
        $dropdownButton.next().removeClass('show');
      }

      const $this = $(this).next();
      $this.addClass('show');

      $(document).one('click', function () {
        $this.removeClass('show');
      });
    });

  }

  menuMobile();
  menuDesktop();
  subMenu();
  subMenuCarousel();
  navWrapperHeight();
  stickyMenu();
  galaxyPopin();
  themingOption();
  dropdownDocument();

  $( window ).resize(function () {
    navWrapperHeight();
    menuDesktop();
  });

})(jQuery);
