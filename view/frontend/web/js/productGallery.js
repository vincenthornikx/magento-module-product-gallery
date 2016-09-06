/*
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 3.0).
 * This license is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/gpl-3.0.en.php
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future.
 *
 * @category    Maxserv: Magento Modules
 * @package     MaxServ_ProductGallery
 * @author      Vincent Hornikx <vincent.hornikx@maxser.com>
 * @copyright   Copyright (c) 2016 MaxServ (http://www.maxserv.com)
 * @license     http://opensource.org/licenses/gpl-3.0.en.php General Public License (GPL 3.0)
 */

define([
    'jquery',
    'owl.carousel',
    'domReady!'
], function($) {
    "use strict";

    $.widget('maxServ.productGallery', {
        _create: function() {
            var widget = this;
            widget.elementParent = widget.element.parent();
            widget.large = widget.element.find('.productGallery-images');
            widget.largeOptions = {
                items: 1,
                autoHeight: true,
                singleItem: true,
                pagination: false,
                afterMove: function() {
                    widget.setImage(this.currentItem);
                    widget.blockLarge = true;
                    setTimeout(function() {
                        widget.blockLarge = false;
                    }, 100);
                }
            };
            widget.large.owlCarousel(widget.largeOptions).find('a').on('click', function(e) {
                e.preventDefault();
                widget.showLarge();
            });
            widget.largeOwl = widget.large.data('owlCarousel');

            widget.thumbs = widget.element.find('.productGallery-thumbnails');
            widget.thumbsOptions = {
                items: 5,
                itemsDesktop: [1050, 5],
                itemsDesktopSmall: [980, 4],
                itemsTablet: [768, 3],
                itemsTabletSmall: false,
                itemsMobile: false
            };
            widget.thumbs.owlCarousel(widget.thumbsOptions).find('a').on('click', function(e) {
                e.preventDefault();
                widget.setImage($(this).data('index'));
            }).eq(0).addClass('active');
            widget.thumbsOwl = widget.thumbs.data('owlCarousel');

            $(document).on('click', '.productGallery-lightbox-close', function(e) {
                e.preventDefault();
                widget.hideLarge();
            });

            $(window).on('resize', function() {
                clearTimeout(widget.windowResizeTimeout);
                widget.windowResizeTimeout = setTimeout(function() {
                    widget.afterWindowResize();
                }, 300);
            }).resize();
        },
        setImage: function(index) {
            var widget = this;
            widget.currentIndex = index;
            widget.thumbs.find('a').removeClass('active').eq(index).addClass('active');
            widget.large.data('owlCarousel').goTo(index);
            widget.thumbs.data('owlCarousel').goTo(index);
        },
        afterWindowResize: function() {
            var widget = this;
            if (widget.isLarge) {
                return;
            }
            if (!widget.thumbs.is(':visible')) {
                var largeOptions = $.extend({}, widget.largeOptions, {
                    pagination: true
                });
                widget.largeOwl.reinit(largeOptions);
            } else {
                widget.largeOwl.reinit(widget.largeOptions);
            }
        },
        showLarge: function() {
            var widget = this;
            if (widget.isLarge) {
                return;
            }
            if (widget.blockLarge) {
                widget.blockLarge = false;
                return;
            }
            if (!widget.thumbs.is(':visible')) {
                return;
            }
            widget.isLarge = true;
            var largeOptions = $.extend({}, widget.largeOptions, {
                    autoHeight: false,
                    pagination: false
                }),
                thumbCount = widget.thumbs.find('a').length,
                thumbsOptions = $.extend({}, widget.thumbsOptions, {
                    items: 12,
                    itemsDesktop: [1200, Math.min(12, thumbCount)],
                    itemsDesktopSmall: [1050, Math.min(8, thumbCount)],
                    itemsTablet: [980, Math.min(4, thumbCount)],
                    itemsTabletSmall: false,
                    itemsMobile: false
                }),
                index = widget.currentIndex;

            widget.lightBox = $($('#productGallery-lightbox-template').html());
            widget.lightBox.append(widget.element).appendTo($('body'));

            widget.largeOwl.reinit(largeOptions);
            widget.largeOwl.jumpTo(index);
            widget.thumbsOwl.reinit(thumbsOptions);
            widget.thumbsOwl.jumpTo(index);
        },
        hideLarge: function() {
            var widget = this,
                index = widget.currentIndex;
            widget.element.appendTo(widget.elementParent);
            widget.lightBox.detach();
            widget.lightBox = null;
            widget.isLarge = false;

            widget.largeOwl.reinit(widget.largeOptions);
            widget.largeOwl.jumpTo(index);
            widget.thumbsOwl.reinit(widget.thumbsOptions);
            widget.thumbsOwl.jumpTo(index);
        }
    });

    return $.maxServ.productGallery;
});
