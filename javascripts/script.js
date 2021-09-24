/**
 * @file
 * Theme javascript.
 */
(function ($) {
  "use strict";

  window.Unesco = window.Unesco || {
    isMobile: function () {
      return window.innerWidth <= 520;
    },

    initAll: function (context, settings) {
      context = context || {};
      settings = settings || {};

      this.initReportMenu(context, settings);
      this.initHorizontalMenu(context, settings);
      this.initResponsiveMenu(context, settings);
      this.initDropdownMenu(context, settings);
      this.initDropdownFooter(context, settings);
      this.initSliderMediaFull(context, settings);
      this.initStickyHeader(context, settings);
      this.initDisplaySeeMore(context, settings);
      this.initIframeCustomHeight(context, settings);
      this.initWebformEmbedIframe(context, settings);
      this.initMediaSlider(context, settings);
      this.initDropdownParagraph(context, settings);
      this.initDropdownDocument(context, settings);
      this.initSequencedBlock(context, settings);
      this.initRelatedItemsBlock(context, settings);
      this.initBackToTop(context, settings);
      this.initAuthorReadMore(context, settings);
      this.initTeaserListBorder(context, settings);
      this.initCommonExternalLink(context, settings);
      this.initSummaryMobile(context, settings);
      this.initRessourceModal(context, settings);
      this.initCarouselCards(context, settings);
      this.initImageMap(context, settings);
      this.initHeaderHubMenu(context, settings);
      this.initFooterHubMobile(context, settings);
      this.initStoryParallax(context, settings);
      this.initParagraphParallax(context, settings);
      this.initGalaxyMenu(context, settings);
      this.initSearchFilters(context, settings);
      this.initMapListMobile(context, settings);
      this.initMapSizeMobile(context, settings);
      this.initFilterAlphabetical(context, settings);
      this.initFilterSearch(context, settings);
      this.initAudioPlayers(context, settings);
      this.initEventParagraph(context, settings);
      this.initMultiSelect(context, settings);
      this.initwebformScrollUp(context, settings);
    },

    initSliderMediaFull: function (context, settings) {
      // .once('SliderMediaFullBehaviors')
      $('.js-slider-full', context).each(function () {
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
    },

    initMediaSlider: function (context, settings) {
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
          autoplay: true,
          autoplaySpeed: 3000
        });

        $(this).on("afterChange", function (event, slick, currentSlide) {
          let $count = (slick.currentSlide + 1) + '/' + (slick.slideCount);
          $countSpan.text($count);
        });
      });
    },

    initCarouselCards: function (context, settings) {
      $('.carousel-cards').each(function () {

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
    },

    initDropdownFooter: function (context, settings) {
      function dropdownClick() {
        let dropdownTitle = $('footer .footer .nav-item .dropdown-toggle', context);

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
          // location.reload();
        }
      });
    },

    initReportMenu: function (context, settings) {
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

      if (!this.isMobile()) {
        $('.nav-link.dropdown-toggle').once().on('click', function () {
          menuCarousel.slick('refresh');
        });
      }
    },

    initHorizontalMenu: function (context, settings) {
      let menuCarousel = $('header .horizontal .menu-level-1');

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

      if (!this.isMobile()) {
        $('.nav-link.dropdown-toggle').once().on('click', function () {
          menuCarousel.slick('refresh');
        });
      }
    },

    initResponsiveMenu: function (context, settings) {
      let menuBurger = $('.navbar-toggler');
      let parentItem = $('header .menu-level-0 > .nav-item > .dropdown-toggle');
      let siteName = $('.js-site-name');

      menuBurger.on('click', function () {
        $('html, body').toggleClass('menu-open').removeClass('galaxy-menu-open');
        $('body').removeClass('parent-menu-open');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        $('.submenu-open').removeClass('submenu-open');
        $('.menu--galaxy-menu .popin').addClass('hidden');
      });

      parentItem.on('click', function () {
        $('body').toggleClass('parent-menu-open');
      });

      if (siteName.length >= 1 && window.innerWidth < 992) {
        let siteNameHeight = siteName[1].offsetHeight;
        $('body:not(.portail-unesco) header.navbar').css({height: `calc(4.5rem + ${siteNameHeight}px)`});
        $( '<style>' +
          '.menu-open .parent-menu-open:not(.portail-unesco) header::before, ' +
          '.menu-open .transparent-header:not(.portail-unesco) header::before, ' +
          '.menu-open .header-with-line:not(.header-sticky.portail-unesco) header::before { height: calc(4.5rem + ' + siteNameHeight + 'px); }' +
          '.menu-open .parent-menu-open:not(.portail-unesco) header::after, ' +
          '.menu-open .transparent-header:not(.portail-unesco) header::after, ' +
          '.menu-open .header-with-line:not(.header-sticky.portail-unesco) header::after { top: calc(4.5rem + ' + siteNameHeight + 'px); }' +
          '.menu-open body:not(.portail-unesco) .menu--main .main-navigation { margin-top: calc(4.5rem + ' + siteNameHeight + 'px); }' +
          '</style>').appendTo('head');
      }


    },

    initDropdownMenu: function (context, settings) {
      let dropdownLink = $('.navbar .dropdown-toggle');

      dropdownLink.on('click', function (e) {
        e.preventDefault();
        dropdownLink.not(this).parent().removeClass('show');
        dropdownLink.not(this).parent().find('.dropdown-menu').fadeOut();
        $(this).parent().toggleClass('show');
        $(this).parent().find('.dropdown-menu').fadeToggle();
      });

      $('body').on('click', function (e) {
        if (!dropdownLink.is(e.target) && dropdownLink.parent().has(e.target).length === 0 && dropdownLink.parent().find('.dropdown-menu').has(e.target).length === 0) {
          $('.dropdown-menu').parent().removeClass('show');
          $('body').removeClass('parent-menu-open');
          dropdownLink.parent().find('.dropdown-menu').fadeOut();
        }
      });
    },

    initStickyHeader: function (context, settings) {
      const header = $('header');
      if (header.length == 0) {
        return;
      }
      let toolbarHeight = header.offset().top;
      let headerHeight = header.outerHeight() + toolbarHeight;

      if ($('.transparent-header .pre_header').length > 0) {
        headerHeight = headerHeight + $('.transparent-header .pre_header').outerHeight();
      }

      $(window).scroll(function () {
        if ($(window).scrollTop() > headerHeight) {
          $('body').addClass('header-sticky');
          $('body:not(.transparent-header)').css('padding-top', headerHeight);

        } else {
          $('body').removeClass('header-sticky').removeAttr('style');
        }
      });
    },

    initDisplaySeeMore: function (context, settings) {
      $(window).on('load', function () {

        $('.display-see-more', context).each(function () {
          let image = $(this).find('.wrapper-image');
          let imageHeight = 300;
          let content = $(this).find('.wrapper-infos');
          let contentHeight = content.outerHeight(true);

          if (image.length > 0) {
            imageHeight = $(this).find('img').outerHeight(true);
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
    },

    initIframeCustomHeight: function (context, settings) {
      let iframeParagraph = $('.paragraph--type--iframe');

      iframeParagraph.each(function () {
        let desktop = $(this).attr('data-height') ? $(this).attr('data-height') : 0;
        let mobile = $(this).attr('data-height-mobile') ? $(this).attr('data-height-mobile') : desktop;
        let tablet = $(this).attr('data-height-tablet') ? $(this).attr('data-height-tablet') : mobile;
        let eq = $(this).parent().index();
        $(this).addClass('iframe' + eq);

        $('head').append('<style>.iframe' + eq + ' .field--name-field-iframe { height:' + mobile + 'px;} @media only screen and (min-width: 576px) {.iframe' + eq + ' .field--name-field-iframe { height:' + tablet + 'px; }} @media only screen and (min-width: 992px) {.iframe' + eq + ' .field--name-field-iframe {height:' + desktop + 'px; }}</style>');
      });
    },

    initWebformEmbedIframe: function (context, settings) {
      // Resize iframe.
      let iframeWebFormParagraph = $('.iframe-webform');
      if (iframeWebFormParagraph.length == 0) {
        return;
      }
      window.onmessage = function (e) {
        if (e.data.hasOwnProperty("frameHeight")) {
          iframeWebFormParagraph[0].style.height = "".concat(e.data.frameHeight + 30, "px");
        }
      };
    },

    initDropdownParagraph: function (context, settings) {
      let dropdown = $('.js-dropdown', context);

      dropdown.once('dropdownBehaviors').each(function () {
        $(this).append('<button class="btn btn-sm btn-primary"> <span>' + Drupal.t('Read more') + '</span> <i class="material-icons-sharp">expand_more</button>');

        let dropdownBtn = $(this).find('.btn-primary');

        dropdownBtn.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active');
          $(this).prev().slideToggle();

          if ($(this).hasClass('active')) {
            $(this).find('span').text(Drupal.t('Read less'));
          } else {
            $(this).find('span').text(Drupal.t('Read more'));
          }
        });
      });
    },

    initDropdownDocument: function (context, settings) {
      let dropdownDocument = $('.document-wrapper .dropdown .dropdown-toggle', context);

      $(document).click(function () {
        dropdownDocument.next('.dropdown-menu').removeClass('show');
      });

      dropdownDocument.on('click', function (e) {
        e.stopPropagation();
        $(this).next('.dropdown-menu').addClass('show');
      });
    },

    initSequencedBlock: function (context, settings) {
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
    },

    initRelatedItemsBlock: function (context, settings) {
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
    },

    initBackToTop: function (context, settings) {
      const backToTopTrigger = $("#back-top", context);

      // Fade in and out #back-top.
      $(window).scroll(function () {
        if (400 < $(window).scrollTop()) {
          backToTopTrigger.fadeIn();
        } else {
          backToTopTrigger.fadeOut();
        }
      });

      // Scroll body to 0px on click.
      backToTopTrigger.on("click", "a", function (e) {
        e.preventDefault();
        $("body,html").animate({scrollTop: 0}, 0);
        $(":focus").blur();
      });
    },

    initAuthorReadMore: function (context, settings) {
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
    },

    initTeaserListBorder: function (context, settings) {
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
    },

    initCommonExternalLink: function (context, settings) {
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
    },

    initSummaryMobile: function (context, settings) {
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
    },

    initRessourceModal: function (context, settings) {
      $('body').removeClass('is-fixed');

      $(window).once('resourceModal-behavior').on('dialog:aftercreate', function() {
        let resourceModal = $('.js-resource-modal');
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

          $(document).on('keydown', function(e) {
            if(e.keyCode == 37) {
              resourceModal.slick('slickPrev');
            }
            if(e.keyCode == 39) {
              resourceModal.slick('slickNext');
            }
          });

          $('.modal-close').on('click', function () {
            $('.ui-icon-closethick').trigger('click');
            $('body').removeClass('is-fixed');
          });
        });
      });
    },

    initImageMap: function (context, settings) {
      let point = $('.image-map .circle', context);
      let positionPoint = $('.image-map .point', context);

      positionPoint.each(function () {
        let wrapperWidth = positionPoint.next('img').get(0).naturalWidth;
        let wrapperHeight = positionPoint.next('img').get(0).naturalHeight;
        let PointLeft = $(this).css('left');
        let positionPointLeft = parseFloat(PointLeft);
        let PointTop = $(this).css('top');
        let positionPointTop = parseFloat(PointTop);
        let percentagePointLeft = positionPointLeft / wrapperWidth * 100 + '%';
        let percentagePointTop = positionPointTop / wrapperHeight * 100 + '%';

        $(this).css({
          'left': percentagePointLeft,
          'top': percentagePointTop
        });
      });

      point.on('click', function () {
        point.not(this).next().fadeOut();
        $(this).next().fadeToggle();
      });

      $('body', context).on('click', function (e) {
        if (!point.is(e.target) && point.parent().has(e.target).length === 0 && point.parent().find('.popup').has(e.target).length === 0) {
          point.next().fadeOut();
        }
      });
    },

    initHeaderHubMenu: function (context, settings) {
      let hubMenu = $('.header-hub:not(".country, .explorer") .hub-menu-header');
      let menuItem = $('.header-hub .hub-menu-header .menu-lvl1 > li.menu-item--expanded');
      let tabletWidth = 576;

      function menuDesktopFade() {
        menuItem.each(function () {
          menuItem.children().removeClass('active-item');
          $(this).children(':first').unbind('click').on('click', function (e) {
            e.preventDefault();
            if ($(this).next('.lvl1-wrapper').hasClass('is-visible')) {
              $(this).next('.lvl1-wrapper').removeClass('is-visible').css('display', 'none');
              $(this).removeClass('active-item');
            } else {
              $(this).next('.lvl1-wrapper').css('display', 'flex').addClass('is-visible');
              $(this).addClass('active-item');
            }
          });
        });
      }

      function menuMobileItemSlide() {

        let hubHeaderTexts = $('.header-hub .hero-wrapper .header-texts');
        let hubHeaderMenu = $('.header-hub .hub-menu-header');

        hubHeaderTexts.append('<button class="btn btn-sm btn-blue2 hub-menu-btn">' + Drupal.t('Menu') + '</button>');

        hubHeaderTexts.children('.hub-menu-btn').on('click', function () {
          $(this).toggleClass('is-active');
          hubHeaderMenu.slideToggle();
        });

        menuItem.each(function () {
          $(this).children(':first').unbind('click').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active-item');
            $(this).next('.lvl1-wrapper').slideToggle();
          });
        });

      }


      if (hubMenu.is(':not(:empty)')) {
        if ($(window).width() < tabletWidth) {
          menuMobileItemSlide();
        } else {
          menuDesktopFade();
        }
      }
    },

    initFooterHubMobile: function (context, settings) {
      function dropdownClick() {
        let dropdownTitle = $('.footer-hub .hub-name', context);

        dropdownTitle.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active-item');
          $(this).next('.hub-menu-footer').slideToggle();
        });
      }

      let desktopWidth = 992;

      // Responsive
      if ($(window).width() <= desktopWidth) {
        dropdownClick();
      }

    },

    initStoryParallax: function (context, settings) {
      var storyItem = $('.story-item');
      var story = storyItem.parent();

      $('.story-item:not(:first) .text-wrapper').hide();

      var controller = new ScrollMagic.Controller();

      var wipeAnimation = new TimelineMax()
        .staggerTo(".story-item:not(:last)", 1, {
          y: "-100%",
          ease: Linear.easeNone,
          onStartParams: ["{self}"],
          onStart: function fadeOut(tween) {
            $(tween.target).find('.text-wrapper').fadeOut();
            $(tween.target).next().find('.text-wrapper').delay(600).fadeIn();
          },
          onReverseCompleteParams: ["{self}"],
          onReverseComplete: function fadeIn(tween) {
            $(tween.target).find('.text-wrapper').fadeIn();
            $(tween.target).next().find('.text-wrapper').fadeOut();
          },
        }, 2, 1)
        .staggerTo(".story-item:last", 1, {
          onCompleteParams: ["{self}"],
          onComplete: function (tween) {
            $(tween.target).find('.text-wrapper').fadeOut();
          },
          onReverseCompleteParams: ["{self}"],
          onReverseComplete: function (tween) {
            $(tween.target).find('.text-wrapper').fadeIn();
          },
        }, 1);

      new ScrollMagic.Scene({
        triggerElement: ".header-node-content.story",
        triggerHook: "onLeave",
        duration: "300%"
      })
        .setPin(".header-node-content.story")
        .setTween(wipeAnimation)
        .addTo(controller);


      if (storyItem.length > 1) {
        story.prepend('<button class="btn btn-skip-story btn-outline-white">' + Drupal.t('Skip') + '</button>');
        let btnSkip = story.find('.btn-skip-story');
        let showBtnPosition = 400;
        let lastSlidePosition = $('.scrollmagic-pin-spacer').outerHeight(true);
        let hideBtnPosition = lastSlidePosition - $(window).outerHeight(true);

        btnSkip.click(function () {
          $(window).scrollTop(lastSlidePosition);
        });
        $(window).scroll(function () {
          if (showBtnPosition < $(window).scrollTop() && hideBtnPosition > $(window).scrollTop()) {
            btnSkip.fadeIn();
          } else {
            btnSkip.fadeOut();
          }
        });
      }

    },

    initParagraphParallax: function (context, settings) {
      var parallaxItem = $('.js-parallax', context);

      $(window).scroll(function () {
        parallaxItem.each(function () {
          var difference = $(window).scrollTop() - $(this).offset().top;
          var half = (difference / 2) + 'px';
          var transform = 'translate3d( 0, ' + half + ',0)';

          $(this).find('img').css('transform', transform);

        });
      });
    },

    initGalaxyMenu: function (context, settings) {
      const alertBanner = $('#block-unescoalertbanner', context);
      const galaxyButton = $('.block-menu--popin .button-galaxy', context);
      const galaxyButtonMobile = $('.button-text-mobile', context);
      const galaxyPopin = $('.menu--galaxy-menu .popin', context);
      const ongletLink = $('.menu--galaxy-menu nav > ul > li > .dropdown-toggle, .menu--galaxy-menu nav .vocabulary--websites .title');
      const searchInput = $('.vocabulary--websites .dynamic-search', context);
      const websiteTaxo = $('.vocabulary--websites .taxonomy-term');

      galaxyButton.on('click', function () {
        galaxyPopin.removeClass('hidden');
        if (alertBanner.length) {
          alertBanner.addClass('hidden');
        }
        $('html, body').addClass('galaxy-menu-open');

        if (window.innerWidth >= 992) {
          ongletLink.eq(0).parent().addClass('active-galaxy-tab');
        } else {
          $('html, body').addClass('menu-open');
          $('#navbarNav').addClass('show');
        }
      });

      galaxyButtonMobile.on('click', function () {
        galaxyPopin.addClass('hidden');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        $('.submenu-open').removeClass('submenu-open');
      });

      galaxyPopin.find('.top .close-popin').on('click', function () {
        galaxyPopin.addClass('hidden');
        if (alertBanner.length) {
          alertBanner.removeClass('hidden');
        }
        $('html, body').removeClass('galaxy-menu-open');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        clearInput();
      });

      ongletLink.unbind('click');

      ongletLink.on('click', function (e) {
        e.preventDefault();
        $('.active-galaxy-tab').not($(this).parent()).removeClass('active-galaxy-tab');
        $(this).closest('.popin').toggleClass('submenu-open');

        if (window.innerWidth >= 992) {
          $(this).parent().addClass('active-galaxy-tab');
        } else {
          $(this).parent().toggleClass('active-galaxy-tab');
        }
      });

      function clearInput() {
        $('.search-in-progress').removeClass('search-in-progress');
        searchInput.val("");
        $('.wrapper-websites').removeClass('search-in-progress');
      }

      searchInput.on('keyup change click', function () {
        let searchTerm = $(this).val().toLowerCase();

        $(document).find('.wrapper-websites').addClass('search-in-progress');
        $('.vocabulary--websites .right').addClass('show');

        if (searchTerm == "") {
          clearInput();
        }

        websiteTaxo.each(function () {
          let searchKeyTitle = $(this).find('.title').text().toLowerCase();
          let searchKeyDesc = $(this).find('.field--name-description *').text().toLowerCase();

          if ((searchKeyTitle.indexOf(searchTerm) > -1 || searchKeyDesc.indexOf(searchTerm) > -1) && searchTerm != "") {
            $(this).addClass('match');
          } else {
            $(this).removeClass('match');
          }
        });
      });
    },

    // Used $(document) to fix issues when user is logged in
    initSearchFilters: function (context, settings) {
      let toggleFacets = $(document).find('.toggle-facets', context);
      let toggleMoreFacets = $(document).find('.toggle-more-facets', context);
      let desktopWidth = 992;

      if ($(window).width() >= desktopWidth) {
        let wrapperFilter = $('.wrapper-facets', context);
        let sliderFilterUsed = wrapperFilter.find('.filter-used-wrapper');
        if (sliderFilterUsed.outerWidth(true) >= wrapperFilter.outerWidth(true) - 100) {
          sliderFilterUsed.parent().css('width', 'calc(100% - ' + toggleFacets.outerWidth(true) + 'px)');
          sliderFilterUsed.slick({
            speed: 300,
            dots: false,
            arrows: true,
            variableWidth: true,
            infinite: true
          });
        }
      }

      toggleFacets.on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this)
          .parents('.wrapper-facets')
          .toggleClass('active')
          .find('.facets-list')
          .slideToggle(300, "swing");
      });

      toggleMoreFacets.unbind('click').on('click', function (e) {
        e.preventDefault();
        $(this).parent().prev('.facets-more').find('.block-facets:not(.hidden)').fadeToggle();
        $(this).toggleClass('less');
      });

      $(document).on('click', '.block-facets .facet-label', function (e) {
        e.preventDefault();
        $(document).find('.facet-label').not($(this)).removeClass('active').next().slideUp();
        $(this).toggleClass('active').next().slideToggle(300, "swing");

        let searchAutoComplete = $(this).next('.wrapper-facet-checkbox-search').children('.search-autocomplete');

        searchAutoComplete.find('input').on("keyup", function () {
          let value = $(this).val().toLowerCase();
          let listAutoComplete = searchAutoComplete.next().find('.js-facets-checkbox-links li');
          listAutoComplete.filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
        });

        searchAutoComplete.find('input').bind("keypress", function (e) {
          if (e.keyCode == 13) {
            return false;
          }
        });
      });

      let submitDate = $('.facet-daterange .form-submit', context);
      submitDate.unbind('click').on('click', function (e) {
        e.preventDefault();
        let dateFrom = $('.facet-daterange  #date_from', context);
        let dateTo = $('.facet-daterange  #date_to', context);
        let url = new URL(window.location);
        let search_params = url.searchParams;
        let val_date_from = dateFrom.val();
        let val_date_to = dateTo.val();
        // Date from
        if (val_date_from) {
          if (search_params.has('date_from')) {
            search_params.set('date_from', val_date_from);
          }
          else {
            search_params.append('date_from', val_date_from);
          }
        }
        else {
          if (search_params.has('date_from')) {
            search_params.delete('date_from');
          }
        }

        // Date to
        if (val_date_to) {
          if (search_params.has('date_to')) {
            search_params.set('date_to', val_date_to);
          }
          else {
            search_params.append('date_to', val_date_to);
          }
        }
        else {
          if (search_params.has('date_to')) {
            search_params.delete('date_to');
          }
        }

        url.search = search_params.toString();
        window.location.replace(url.toString());
      });

      let sortBy = $('.form-item-sort-by', context);
      if (sortBy.length) {
        let button = sortBy.siblings('.form-actions').find('.form-submit');
        button.hide();
        sortBy.find('select').change(function () {
          button.click();
        });
      }
    },

    initMapListMobile: function (context, settings) {
      function explorerMapListMobile() {
        let explorerMapList = $('#explorer .map-list .tab-content .tab-pane', context);

        explorerMapList.each(function () {
          let item = $(this).children().not('.hidden');
          let count = item.length;
          let limit = 4;
          let more = 0;

          if (count > limit) {

            $(this).append('<button class="btn btn-outline-grey4 btn-load-more">' + Drupal.t('Load more') + '<i class="material-icons-sharp">arrow_downward</i></button>');
            item.each(function (index) {
              if (index >= limit) {
                $(this).addClass('is-hide');
                more++;
              }
            });

            $(this).find('.btn-load-more').on('click', function () {
              item.each(function () {
                $(this).removeClass('is-hide');
              });
              $(this).hide();
            });

          }

        });
      }

      let desktopWidth = 992;
      if ($(window).width() <= desktopWidth) {
        explorerMapListMobile();
      }
    },

    initMapSizeMobile: function (context, settings) {
      function explorerMapListMobile() {
        let explorerMap = $('.js-explore-map', context);

        explorerMap.removeClass('fullscreen').prepend('<span class="round-fullscreen round round-lg round-grey1"><i class="material-icons-sharp">fullscreen</i></span>');
        let btnFullscreenMap = $('.js-explore-map .round-fullscreen');

        btnFullscreenMap.on('click', function (){
          $(this).children().text(function(i, text){
            return text === "fullscreen" ? "fullscreen_exit" : "fullscreen";
          });
          $(this).parent().toggleClass('fullscreen');
        });
      }

      let desktopWidth = 992;
      if ($(window).width() <= desktopWidth) {
        explorerMapListMobile();
      }
    },

    initFilterAlphabetical: function (context, settings) {
      let explorer = $('#explorer', context);
      let alphabeticalItem = explorer.find('.alphabetical-filter li');
      let mapWrapper = explorer.find('.map-wrapper');

      alphabeticalItem.on('click', function () {
        let letter = $(this).text()[0];
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.list-wrapper').children().not('.hidden').show();
        } else {
          alphabeticalItem.removeClass('active');
          $(this).addClass('active');
          $('.list-wrapper').children().not('.hidden').hide().filter(function () {
            return $(this).attr('data-letter') == letter;
          }).show();
        }

        if (mapWrapper.length) {
          Drupal.unescoMap.updateMap(explorer);
        }
      });
    },

    initFilterSearch: function (context, settings) {
      const input = $('.hubslist .dynamic-search', context);
      const results = $('.hubslist .list-wrapper .node--type-hub', context);

      function updateInput(element) {
        let search = element.val().toLowerCase();
        if (search == "") {
          input.val("");
        }

        results.each(function () {
          const textWrapper = $(this).find('.text-wrapper');
          let keyTitle = textWrapper.find('.title').text().toLowerCase();
          let keyTermLabel = textWrapper.find('.term-universe').text().toLowerCase();

          if (search != "" && (keyTitle.indexOf(search) > -1 || keyTermLabel.indexOf(search) > -1)) {
            $(this).removeClass('unmatch');
          } else {
            $(this).addClass('unmatch');
          }
        });
      }

      input.on('keyup change click', function () {
        setTimeout(function () {
          updateInput($(this));
        }, 500);
      });
    },

    initAudioPlayers: function (context, settings) {

      function mediaAudio() {
        const playersWrapper = $('.media--type-audio', context);
        playersWrapper.each(function () {
          const parent = $(this);
          const cover = parent.find('.field--name-field-media-image');
          const icons = parent.find('.icons--audio .material-icons-sharp');
          const player = parent.find('.field--name-field-media-audio-file audio');
          if (!player.length) {
            return;
          }

          const audio = player[0];
          let duration;
          let reset = false;

          function format(time) {
            const hrs = ~~(time / 3600);
            const min = ~~((time % 3600) / 60);
            const sec = ~~time % 60;

            let ret = "";
            if (hrs > 0) {
              ret += "" + hrs + ":" + (min < 10 ? "0" : "");
            }
            ret += "" + min + ":" + (sec < 10 ? "0" : "");
            ret += "" + sec;

            return ret;
          }

          // audio.addEventListener('loadedmetadata', function () { console.log('loadedmetadata'); });
          audio.addEventListener('loadeddata', function () {
              duration = audio.duration;
              cover.prepend('<span class="metadata">' + format(duration) + '</span>');
            }
          );
          audio.addEventListener('timeupdate', function () {
            duration = audio.duration;
            let diffDuration = duration - audio.currentTime;

            if (!cover.find('.metadata').length) {
              cover.prepend('<span class="metadata">' + format(duration) + '</span>');
            }

            if (diffDuration >= 1) {
              cover.find('.metadata').text('-' + format(diffDuration));
            }

            if (diffDuration == 0) {
              cover.find('.metadata').text(format(duration));

              if (!reset) {
                // Reset mic icon.
                parent.find('.icons--audio').trigger('click');

                reset = true;
              }
            }
          });

          parent.find('.icons--audio').on('click', function () {
            if (parent.hasClass('audio-playing')) {
              audio.pause();
              parent.removeClass('audio-playing');
            } else {
              audio.play();
              parent.addClass('audio-playing');
            }

            icons.each(function () {
              $(this).toggleClass('hidden');
            });
          });
        });
      }
      mediaAudio();
      $(window).once('resourceModalAudio-behavior').on('dialog:aftercreate', function() {
        mediaAudio();
      });

    },

    initEventParagraph: function (context, settings) {
      var calendarLink = $('.calendar-links-wrapper');

      calendarLink.on('mouseleave', function() {
        $(this).find('.calendar-links').collapse('hide');
      });
    },

    initMultiSelect: function (context, settings) {
      var multiSelect = $('.form-select[multiple]', context);
      var select = [];

      multiSelect.once().each(function () {
        var label = $(this).parent().find('label').text();
        let slimSelect = new SlimSelect({
          select: '#' + $(this).attr('id'),
          placeholder: label,
        });
        select.push(slimSelect);
      });
    },

    initwebformScrollUp: function (context, settings) {
      window.addEventListener('message', function(event) {
        // Listen for a keyword coming from the webform iframe on first step submit and then scroll parent window to iframe
        if(event.data.keyword == "scrolltop") {
          let scrollValue = $('.iframe-webform').offset().top - 240;
          $("body,html").animate({
            scrollTop: scrollValue,
          }, 500);
        }
      });
    },
  };

})(jQuery);
