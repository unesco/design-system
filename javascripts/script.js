/**
 * @file
 * Theme javascript.
 */
(function ($) {
  "use strict";

  window.Unesco = window.Unesco || {
    isMobile: function() {
      return window.innerWidth <= 520;
    },
    initAll: function(context, settings) {
      context = context || {};
      settings = settings || {};

      this.initReportMenu(context, settings);
      this.initResponsiveMenu(context, settings);
      this.initDropdownMenu(context, settings);
      this.initDropdownFooter(context, settings);
      this.initSliderMediaFull(context, settings);
      this.initStickyHeader(context, settings);
      this.initDisplaySeeMore(context, settings);
      this.initIframeCustomHeight(context, settings);
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
      this.initStoryParallax(context, settings);
      this.initParagraphParallax(context, settings);
      this.initGalaxyMenu(context, settings);
      this.initSearchFilters(context, settings);
      this.initMapListMobile(context, settings);
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
          location.reload();
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
    initResponsiveMenu: function (context, settings) {
      let menuBurger = $('.navbar-toggler');
      let parentItem = $('header .menu-level-0 > .nav-item > .dropdown-toggle');

      menuBurger.on('click', function () {
        $('html').toggleClass('menu-open');
        $('body').toggleClass('menu-open');
        $('body').removeClass('parent-menu-open');
        $('html, body').removeClass('galaxy-menu-open');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        $('.submenu-open').removeClass('submenu-open');
        $('.menu--galaxy-menu .popin').addClass('hidden');
      });

      parentItem.on('click', function () {
        $('body').toggleClass('parent-menu-open');
      });
    },
    initDropdownMenu: function (context, settings) {
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
          $('body').removeClass('parent-menu-open');
          dropdownLink.parent().find('.dropdown-menu').removeClass('show');
        }
      });
    },
    initStickyHeader: function (context, settings) {
      const header = $('header');
      let toolbarHeight = header.offset().top;
      let headerHeight = header.outerHeight() + toolbarHeight;

      $(window).scroll(function () {
        if ($(window).scrollTop() > headerHeight) {
          $('body').addClass('header-sticky').css('padding-top', headerHeight);
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
        if ( 400 < $(window).scrollTop()) {
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
    },
    initImageMap: function (context, settings) {
      let point = $('.image-map .circle', context);

      point.on('click', function() {
        point.not(this).parent().removeClass('show-popup');
        $(this).parent().toggleClass('show-popup');
      });

      $('body', context).on('click', function(e) {
        if (!point.is(e.target) && point.parent().has(e.target).length === 0 && point.parent().find('.popup').has(e.target).length === 0) {
          point.parent().removeClass('show-popup');
        }
      });
    },
    initHeaderHubMenu: function (context, settings) {

      let hubMenu = $('.header-hub:not(".country") .hub-menu-header');
      let tabletWidth = 576;


      function menuDesktopFade() {
        let menuItem = $('.header-hub .hub-menu-header .menu-lvl1 > li.menu-item--expanded');
        menuItem.each(function () {

          menuItem.children().removeClass('active-item');

          $(this).children().unbind('click').on('click', function (e) {

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

      }


      if (hubMenu.is(':not(:empty)')) {
        if ($(window).width() < tabletWidth) {
          menuMobileItemSlide();
        } else {
          menuDesktopFade();
        }
      }


    },
    initStoryParallax: function (context, settings) {
      var storyItem = $('.story-item');
      var story = storyItem.parent();

      if (storyItem.length > 1) {
        story.prepend('<button class="btn btn-skip-story btn-outline-white">' + Drupal.t('Skip') + '</button>');

        var btnSkip = story.find('.btn-skip-story');

        // var showBtnPosition = storyItem.eq(1).offset().top;
        var showBtnPosition = 400;
        var showLastBtn = storyItem.last();
        var showLastBtnPositionTop = showLastBtn.position().top;
        var showLastBtnPositionBottom = showLastBtnPositionTop + showLastBtn.outerHeight(true);

        btnSkip.click(function() {
          $(window).scrollTop(showLastBtnPositionBottom);
        });

        $(window).scroll(function() {
          if (showBtnPosition < $(window).scrollTop() && showLastBtnPositionTop > $(window).scrollTop()) {
            btnSkip.fadeIn();
          } else {
            btnSkip.fadeOut();
          }

        });
      }


      $(window).scroll(function(){
        storyItem.each(function(){

          var difference = $(window).scrollTop() - $(this).offset().top;
          var half = (difference / 2) + 'px';
          var transform = 'translate3d( 0, ' + half + ',0)';

          $(this).find('img').css('transform', transform);
        });
      });
    },
    initParagraphParallax: function (context, settings) {
      var parallaxItem = $('.js-parallax', context);

      $(window).scroll(function(){
        parallaxItem.each(function(){
            var difference = $(window).scrollTop() - $(this).offset().top;
            var half = (difference / 2) + 'px';
            var transform = 'translate3d( 0, ' + half + ',0)';

            $(this).find('img').css('transform', transform);

        });
      });
    },
    initGalaxyMenu: function (context, settings) {
      const galaxyButton = $('.block-menu--popin .button-galaxy', context);
      const galaxyButtonMobile = $('.button-text-mobile', context);
      const galaxyPopin = $('.menu--galaxy-menu .popin', context);
      const ongletLink = $('.menu--galaxy-menu nav > ul > li > .dropdown-toggle, .menu--galaxy-menu nav .vocabulary--websites .title');
      const searchInput = $('.vocabulary--websites .dynamic-search', context);
      const searchButton = $('.dynamic-search-button', context);
      const websiteTaxo = $('.vocabulary--websites .taxonomy-term');

      galaxyButton.on('click', function () {
        galaxyPopin.removeClass('hidden');
        $('html, body').addClass('galaxy-menu-open');

        if(window.innerWidth >= 992) {
          ongletLink.eq(0).parent().addClass('active-galaxy-tab');
        }
      });

      galaxyButtonMobile.on('click', function () {
        galaxyPopin.addClass('hidden');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        $('.submenu-open').removeClass('submenu-open');
      });

      galaxyPopin.find('.top .close-popin').on('click', function () {
        galaxyPopin.addClass('hidden');
        $('html, body').removeClass('galaxy-menu-open');
        $('.active-galaxy-tab').removeClass('active-galaxy-tab');
        clearInput();
      });

      ongletLink.unbind('click');

      ongletLink.on('click', function (e) {
        e.preventDefault();
        $('.active-galaxy-tab').not($(this).parent()).removeClass('active-galaxy-tab');
        $(this).closest('.popin').toggleClass('submenu-open');

        if(window.innerWidth >= 992) {
          $(this).parent().addClass('active-galaxy-tab');
        } else {
          $(this).parent().toggleClass('active-galaxy-tab');
        }
      });

      function clearInput() {
        $('.matched-text').removeClass('matched-text');
        $('.match').removeClass('match');
        $('.search-in-progress').removeClass('search-in-progress');
        searchInput.val("");
        $('.wrapper-websites').removeClass('search-in-progress');

      }

      $.fn.highlightWord = function(searchWord) {
        let regex = RegExp('' + searchWord + '', 'gi'), replacement = '<span class="matched-text">$&</span>';
        return this.html(function() {
          return $(this).html().replace(regex, replacement);
        });
      };

      searchInput.on('change keyup', function() {
        if($(this).val() == "") {
          clearInput();
          $('.vocabulary--websites .right').removeClass('show');
        } else {
          $('.vocabulary--websites .right').addClass('show');
        }
      });

      $('.dynamic-search-button.clear').on('click', function() {
        $('.vocabulary--websites .right').toggleClass('show');
        clearInput();
      });

      searchButton.on('click', function() {
        if(searchInput.val() == "") {
          return;
        }

        $(document).find('.wrapper-websites').addClass('search-in-progress');

        websiteTaxo.each(function() {
          let searchKeyTitle = $(this).find('.title').text().toLowerCase();
          let searchKeyDesc = $(this).find('.field--name-description .field__item').text().toLowerCase();
          let searchTerm = searchInput.val().toLowerCase();

          if ( (searchKeyTitle.indexOf(searchTerm) > -1 || searchKeyDesc.indexOf(searchTerm) > -1) && searchTerm != "" ) {
            $(this).addClass('match');
            $(this).find('.title, .field--name-description .field__item').highlightWord(searchTerm);
          } else {
            $(this).removeClass('match');
          }
        });
      });
    },
    initSearchFilters: function (context, settings) {
      let blockFacet = $('.block-facets', context);
      let toggleFacets = $('.toggle-facets', context);

      toggleFacets.unbind('click').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this)
          .parents('.wrapper-facets')
          .toggleClass('active')
          .find('.facets-list')
          .slideToggle(300,"swing");
      });

      blockFacet.once('facetBehaviors').each(function () {
        let blockFacetLabel = $(this).find('.facet-label');

        blockFacetLabel.unbind('click').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active');
          $(this).next().slideToggle(300,"swing");
        });
      });
    },
    initMapListMobile: function (context, settings) {
      function explorerMapListMobile() {
        let explorerMapList = $('#explorer .map-list .tab-content .tab-pane', context);

        explorerMapList.each(function () {
          let item = $(this).children().not('.hidden');
          let count = item.length;
          let limit = 4;
          let more = 0;

          console.log(count);
          console.log(item);

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
  };
})(jQuery);
