/**
 * @file
 * Theme javascript.
 */
(function ($) {
  "use strict";

// Add your custom scripts here, using Drupal.behaviors

  function isMobile() {
    return window.innerWidth <= 520;
  }

  Drupal.behaviors.reportMenu = {
    attach: function (context, settings) {
      let menuCarousel = $('header .report .menu-level-1');

      menuCarousel.slick({
        slidesToShow: 4,
        swipeToSlide: true,
        autoplay: false,
        arrows: true,
        infinite: false,
        speed: 1500,
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

      if (!isMobile()) {
        $('.nav-link.dropdown-toggle').once().on('click', function () {
          menuCarousel.slick('refresh');
        });
      }
    }
  };

  Drupal.behaviors.responsiveMenu = {
    attach: function (context, settings) {
      let menuBurger = $('.navbar-toggler');
      let parentItem = $('header .menu-level-0 > .nav-item > .dropdown-toggle');

      menuBurger.on('click', function () {
        $('html').toggleClass('menu-open');
        $('body').toggleClass('menu-open');
        $('body').removeClass('parent-menu-open');
      });

      parentItem.on('click', function () {
        $('body').toggleClass('parent-menu-open');
      });
    }
  };

  Drupal.behaviors.dropdownMenu = {
    attach: function (context, settings) {
      let dropdownLink = $('.navbar .dropdown-toggle');

      dropdownLink.on('click', function (e) {
        e.preventDefault();
        dropdownLink.not(this).parent().removeClass('show');
        dropdownLink.not(this).parent().find('.dropdown-menu').removeClass('show');
        $(this).parent().toggleClass('show');
        $(this).parent().find('.dropdown-menu').toggleClass('show');
      });

      $('body').on('click', function (e) {
        if (!dropdownLink.is(e.target) && dropdownLink.parent().has(e.target).length === 0 && dropdownLink.parent().find('.dropdown-menu').has(e.target).length === 0) {
          $('.dropdown-menu').parent().removeClass('show');
          dropdownLink.parent().find('.dropdown-menu').removeClass('show');
        }
      });
    }
  };

  Drupal.behaviors.dropdownFooter = {
    attach: function (context, settings) {

      function dropdownClick() {
        let dropdownTitle = $('footer nav .navbar-nav > .nav-item .dropdown-toggle');
        dropdownTitle.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active-item');
          $(this).next('ul').slideToggle();
        });
      }

      let desktopWidth = 992;
      let initialDiff = ($(window).width() > desktopWidth) ? 1 : -1;

      // Responsive
      if ($(window).width() <= desktopWidth) {
        dropdownClick();
      }

      // Resize responsive & reload page if change breakpoint
      $(window).on('resize', function () {
        let win = $(window).width();
        let currentDiff = win - desktopWidth;
        if (win <= desktopWidth) {
          dropdownClick();
        }
        if (currentDiff * initialDiff < 0) {
          initialDiff *= -1;
          location.reload();
        }
      });
    }
  };

  Drupal.behaviors.sliderMediaFull = {
    attach: function (context, settings) {
      $('.paragraph--type--text-media-full .field--name-field-slides').each(function () {
        if ($(this).children().length > 1) {
          $(this).slick({
            speed: 300,
            slidesToShow: 1,
            dots: true,
            arrows: false,
            infinite: true,
            adaptiveHeight: false,
          });
        }
      });
    }
  };

  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {
      const header = $('header');
      let toolbarHeight = header.offset().top;
      let headerHeight = header.height() + toolbarHeight;

      $(window).scroll(function () {
        if ($(window).scrollTop() > headerHeight) {
          $('body').addClass('header-sticky');
        } else {
          $('body').removeClass('header-sticky');
        }
      });
    }
  };

  Drupal.behaviors.displaySeeMore = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        let displaySeeMore = $('.field--name-field-paragraphs .paragraph.display-see-more');

        displaySeeMore.each(function () {
          let image = $(this).find('.wrapper-image');
          let imageHeight = 300;
          let content = $(this).find('.wrapper-infos');
          let contentHeight = content.outerHeight(true);

          if (image.length > 0) {
            imageHeight = $(this).find('.field--name-field-media-image').outerHeight(true);
          }

          let multiLine = ~~(imageHeight / 40);

          if (contentHeight >= imageHeight) {
            content.wrapInner('<div class="display_more-wrapper" style="max-height:' + (imageHeight - 32) + 'px; -webkit-line-clamp:' + multiLine + '"></div>');
            content.append('<button class="btn-display-more">' + Drupal.t('Read more') + '</button>');

            content.children('.btn-display-more').on('click', function () {
              $(this).toggleClass('is-active');
              if ($(this).hasClass('is-active')) {
                $(this).prev().css({
                  'max-height': contentHeight,
                  '-webkit-line-clamp': 'initial'
                });
                $(this).text(Drupal.t('Read less'));
              } else {
                $(this).prev().css('max-height', (imageHeight - 32));
                $(this).prev().delay(600).queue(function (next) {
                  $(this).css('-webkit-line-clamp', '' + multiLine + '');
                  next();
                });
                $(this).text(Drupal.t('Read more'));
              }
            });
          }
        });
      });
    }
  };

  Drupal.behaviors.iframeCustomHeight = {
    attach: function (context, settings) {
      let iframeParagraph = $('.paragraph--type--iframe');

      iframeParagraph.each(function () {
        let desktop = $(this).attr('data-height') ? $(this).attr('data-height') : 0;
        let mobile = $(this).attr('data-height-mobile') ? $(this).attr('data-height-mobile') : 0;
        let tablet = $(this).attr('data-height-tablet') ? $(this).attr('data-height-tablet') : 0;
        let eq = $(this).parent().index();
        $(this).addClass('iframe' + eq);

        $('head').append('<style>.iframe' + eq + ' .field--name-field-iframe { height:' + mobile + 'px;} @media only screen and (min-width: 576px) {.iframe' + eq + ' .field--name-field-iframe { height:' + tablet + 'px; }} @media only screen and (min-width: 992px) {.iframe' + eq + ' .field--name-field-iframe {height:' + desktop + 'px; }}</style>');
      });
    }
  };

  Drupal.behaviors.mediaSlider = {
    attach: function (context, settings) {
      const slider = $('.slider-medias', context);

      slider.each(function () {
        const next = $(this).parent().find('.next');
        const prev = $(this).parent().find('.previous');
        const $countSpan = $(this).parent().find('.slider-nav .count');
        let $slideNum = $(this).find('>.field__item').length;

        $('.carousel-button').on('click', function (e) {
          e.preventDefault();
        });

        $(slider).on('init', function (event, slick) {
          let $count = (1) + '/' + ($slideNum);
          $countSpan.text($count);
        });

        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: prev,
          nextArrow: next,
          infinite: false,
        });

        $(this).on("afterChange", function (event, slick, currentSlide) {
          let $count = (slick.currentSlide + 1) + '/' + (slick.slideCount);
          $countSpan.text($count);
        });
      });
    }
  };

  Drupal.behaviors.dropdownParagraph = {
    attach: function (context, settings) {
      let dropdown = $('.paragraph--type--dropdown');

      dropdown.each(function () {
        $(this).append('<button class="btn btn-sm btn-primary">' + Drupal.t('Read more') + '<i class="material-icons-sharp">expand_more</button>');

        let dropdownBtn = $(this).find('.btn-primary');

        dropdownBtn.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active');
          $(this).prev().slideToggle();
        });
      });
    }
  };

  Drupal.behaviors.dropdownDocument = {
    attach: function (context, settings) {

      let dropdownDocument = $('.paragraph--type--document .dropdown-toggle');

      $(document).click(function () {
        dropdownDocument.next('.dropdown-menu').removeClass('show');
      });

      dropdownDocument.on('click', function (e) {
        e.stopPropagation();
        $(this).next('.dropdown-menu').addClass('show');
      });

    }
  };

  Drupal.behaviors.sequencedBlock = {
    attach: function (context, settings) {
      let sequencedContainer = $('.sequenced-block');
      let sequencedLink = sequencedContainer.find('li');
      let limit = 5;
      let more = 0;

      sequencedLink.each(function (index) {
        if (index >= limit) {
          $(this).hide();
          more++;
        }
      });

      sequencedContainer.find('.btn-primary').on('click', function () {
        sequencedLink.each(function () {
          $(this).show();
        });
        $(this).hide();
      });

    }
  };

  Drupal.behaviors.relatedItemsBlock = {
    attach: function (context, settings) {
      let relatedItemsContainer = $('.content-tags');
      let relatedLink = relatedItemsContainer.find('li');
      let limit = 5;
      let more = 0;

      relatedLink.each(function (index) {
        if (index >= limit) {
          $(this).hide();
          more++;
        }
      });

      relatedItemsContainer.find('.js-trigger-see-more').parent('li').show();

      relatedItemsContainer.find('.js-trigger-see-more').on('click', function () {
        relatedLink.each(function () {
          $(this).show();
        });
        $(this).hide();
      });

    }
  };

  Drupal.behaviors.backToTop = {
    attach: function (context, settings) {
      const backToTopTrigger = $("#back-top", context);

      // Fade in and out #back-top.
      $(window).scroll(function () {
        backToTopTrigger.toggleClass(
          "fade-back-top",
          $(this).scrollTop() > 400
        );
      });

      // Scroll body to 0px on click.
      backToTopTrigger.on("click", "a", function (e) {
        e.preventDefault();
        $("body,html").animate({scrollTop: 0}, 0);
        $(":focus").blur();
      });
    }
  };

  Drupal.behaviors.authorReadMore = {
    attach: function (context, settings) {
      let maxLength = 150;
      let authorText = $(".vocabulary-people .rich-text p");

      authorText.each(function () {
        let myStr = $(this).text();

        if ($.trim(myStr).length > maxLength) {
          let newStr = myStr.substring(0, maxLength);
          let removedStr = myStr.substring(maxLength, $.trim(myStr).length);
          $(this).empty().html(newStr);
          $(this).append('<span class="btn-read-more">' + Drupal.t('Read more') + '</span>');
          $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
      });

      $(".btn-read-more").click(function () {
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
      });

    }
  };

  Drupal.behaviors.teaserListBorder = {
    attach: function (context, settings) {
      let teaserListContainerLanding = $(".paragraph--type--content-list-custom-landing");
      let teaserListContainerArticle = $(".paragraph--type--content-list-custom-article");
      let teaserListContainer = teaserListContainerArticle && teaserListContainerLanding;

      teaserListContainer.each(function () {
        if (
          ($(this).children('.field--name-field-title').length === 0) &&
          ($(this).children('.field--name-field-description').length === 0)) {
          $(this).addClass('no-border');
        }
      });

    }
  };

  Drupal.behaviors.commonExternalLink = {
    attach: function (context, settings) {
      const host = window.location.host.replace(/\./g, "\\.");
      const match = new RegExp("^http(s)?:\\/\\/(?!" + host + ")");

      $("a", context)
        .on("click", function (event) {
            // The content that had the event listener attached.
            const target = event.currentTarget;
            const href = target.href;
            if (href === "#") {
              return;
            }

            if (match.test(href) || target.rel === "external") {
              event.stopPropagation();

              window.open(href, target);
              return false;
            }
          }
        );
    }
  };

  Drupal.behaviors.summaryMobile = {
    attach: function (context, settings) {

      function summaryClick() {
        let summaryTitle = $('.main-node-content .content-summary .item-list h3');
        summaryTitle.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active-item');
          $(this).next('ul').slideToggle();
        });
      }

      let desktopWidth = 992;
      if ($(window).width() <= desktopWidth) {
        summaryClick();
      }

    }
  };

  Drupal.behaviors.ressourceModal = {
    attach: function (context, settings) {
      let resourceModal = $('.js-resource-modal');
      $('body').removeClass('is-fixed');

      resourceModal.each(function () {
        let initialSlide = $(this).attr('current-delta');

        $('body').addClass('is-fixed');

        $(this).parent().prepend(
          '<div class="resource-modal-actions"><button class="modal-previous"></button><button class="modal-next"></button><button class="modal-close"></button></div>'
        );

        $(this).slick({
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          adaptiveHeight: false,
          initialSlide: parseInt(initialSlide),
          prevArrow: $('.modal-previous'),
          nextArrow: $('.modal-next'),
          fade: true,
          cssEase: 'linear'
        });

        $('.modal-close').on('click', function () {
          $('.ui-icon-closethick').trigger('click');
          $('body').removeClass('is-fixed');
        });

      });

    }
  };

  Drupal.behaviors.carouselCards = {
    attach: function (context, settings) {
      $('.paragraph--type--cards-landing.carousel').each(function () {

        $(this).children('.row').slick({
          speed: 300,
          slidesToShow: 4,
          dots: false,
          arrows: true,
          infinite: false,
          adaptiveHeight: false,
          variableWidth: true,
          responsive: [
            {
              breakpoint: 1400, // desktop
              settings: {
                slidesToShow: 3,
                variableWidth: true
              }
            },
            {
              breakpoint: 992, // tablet breakpoint
              settings: {
                slidesToShow: 2,
                variableWidth: true
              }
            },
            {
              breakpoint: 576, // mobile breakpoint
              settings: {
                slidesToShow: 1,
                variableWidth: false
              }
            }
          ]
        });
      });
    }
  };

  Drupal.behaviors.dropdownFAQ = {
    attach: function (context, settings) {
      let dropdownFAQTitle = $('.faq-wrapper .faq-title');

      dropdownFAQTitle.each(function () {

        $(this).unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active-item');
          $(this).next('.faq-text').slideToggle();
        });

      });

    }
  };

  Drupal.behaviors.imageMap = {
    attach: function (context, settings) {
      let point = $('.image-map .circle');

      point.on('click', function() {
        point.not(this).parent().removeClass('show-popup');
        $(this).parent().toggleClass('show-popup');
      });

      $('body').on('click', function(e) {
        if (!point.is(e.target) && point.parent().has(e.target).length === 0 && point.parent().find('.popup').has(e.target).length === 0) {
          point.parent().removeClass('show-popup');
        }
      });
    }
  };

})
(jQuery);
