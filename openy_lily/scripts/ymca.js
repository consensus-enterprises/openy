/**
 * @file
 * Theme javascrip logic.
 */
(function ($, Drupal, drupalSettings) {

  'use strict';

  // It closes the ui dialog on an outside click.
  if (typeof drupalSettings.dialog != 'undefined') {
    drupalSettings.dialog.open = function (event) {
      $('.ui-widget-overlay').on('click', function () {
        $(event.target).dialog('close');
      });
    };
  }

  /**
   * Cliendside Email validation.
   */
  Drupal.behaviors.ymca_email_pattern = {
    attach: function (context, settings) {
      $("input[type=email]", context).each(function () {
        if (!$(this).attr('pattern')) {
          $(this).attr('pattern', '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\\.(?:[a-zA-Z0-9-\\.]+)*');
        }
      });
    }
  };

  /**
   * Resize header on scroll.
   */
  Drupal.behaviors.resizeHeader = {
    attach: function (context, settings) {
      $("#page-head", context).each(function () {
        $(window).on("scroll touchmove", function () {
          $('#page-head').toggleClass('tiny', $(document).scrollTop() > 0);
          $('body').toggleClass('tiny-header', $(document).scrollTop() > 0);
        });
      });
    }
  };

  /**
   * Match Height on article boxes.
   */
  Drupal.behaviors.matchHeight = {
    attach: function (context, settings) {
      $(".blog-heading", context).each(function () {
        $('.blog-heading').matchHeight();
      });
    }
  };

  /**
   * Search toggle.
   */
  Drupal.behaviors.searchToggle = {
    attach: function (context, settings) {
      $(".search-toggle", context).each(function () {
        $(this).on('click', function (event) {
          $('#search-box').toggleClass('expanded-search');
          $('#page-head').toggleClass('expanded-search');
        });
      });
    }
  };

  /**
   * Main menu toggle.
   */
  Drupal.behaviors.menuToggle = {
    attach: function (context, settings) {
      $('#block-openy-lily-main-menu .dropdown-toggle', context).each(function () {
        var $menuItem = $("#block-openy-lily-main-menu .dropdown-toggle");
        var $container = $("#main");
        $(this).on('click', function (e) {
          $(this).toggleClass('expanded-menu');
          $($menuItem).not($(this)).removeClass('expanded-menu');
          e.preventDefault();
          $($container).removeClass('expanded-menu');
          if ($(this).hasClass('expanded-menu')) {
            $($container).addClass('expanded-menu');
          }
        });
      });
      $(document).mouseup(function (e) {
        var $container = $("#block-openy-lily-main-menu");
        if (!$container.is(e.target) && $container.has(e.target).length === 0) {
          $('#main').removeClass('expanded-menu');
          $('#block-openy-lily-main-menu .dropdown-toggle').removeClass('expanded-menu');
        }
      });
    }
  };

  /**
   * Mobile menu toggle.
   */
  Drupal.behaviors.mobileMenuToggle = {
    attach: function (context, settings) {
      $(".navbar-toggler", context).each(function () {
        $(this).on('click', function (event) {
          $(this).toggleClass('expanded-mobile');
          $('#side-area, .viewport').toggleClass('expanded-mobile');
        });
      });
    }
  };

  /**
   * Main menu toggle.
   */
  Drupal.behaviors.menuMobileToggle = {
    attach: function (context, settings) {
      $('#block-mainnavigation-2 .dropdown-toggle', context).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          $(this).next('.dropdown-menu').toggleClass('open');
        });
      });
    }
  };

  /**
   * Hide menu on big screens.
   */
  Drupal.behaviors.hideMenuDesktop = {
    attach: function (context, settings) {
      $(window).resize(function () {
        if ($(window).width() > 992) {
          $('.navbar-toggler, #side-area, .viewport ', context).removeClass('expanded-mobile');
        }
      });
    }
  };

  /**
   * Scroll to next button.
   */
  Drupal.behaviors.scrollToNext = {
    attach: function (context, settings) {
      $(context).find('.calc-block-form').once('calcForm').each(function () {
        $(this).find('.btn-lg.btn').on('click', function () {
          $('html, body').animate({
            scrollTop: $(".form-submit").offset().top
          }, 2000);
        });
      });
    }
  };

  /**
   * Hide/Show membership form.
   */
  Drupal.behaviors.showMember = {
    attach: function (context, settings) {
      $(context).find('#membership-page .webform-submission-form').once('membForm').each(function () {
        $('.try-the-y-toggle').on('click', function (e) {
          e.preventDefault();
          $('.try-the-y-toggle').addClass('active');
          $('.landing-content > .paragraph:nth-child(1), .landing-content > .paragraph:nth-child(3),  article.webform').slideDown('fast');
          $('html, body').animate({
            scrollTop: $("#membership-page .webform form").offset().top - 250
          }, 500);
        });
      });
    }
  };

  /**
   * Trim description on gallery .
   */
  Drupal.behaviors.trimDesc = {
    attach: function (context, settings) {
      $(context).find('.paragraph--type--gallery .field-prgf-description p').once('glrySld').each(function () {
        $(this).text(function(index, currentText) {
          return currentText.substr(0, 175) + '...';
        });
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
