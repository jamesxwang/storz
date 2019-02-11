var $ = require('jquery');
var animationControl = require('./animation-control');

module.exports = {
    handlePopupEvents: function(swiper) {
        this.initPopupItems();
        this.showPopup(swiper);
        this.hidePopup(swiper);
    },
    initPopupItems: function() {
        var self = this;
        $('.popup_wrapper div').each(function() {
            var aniDuration;

            $(this).attr('data-origin-class', $(this).attr('class'));

            aniDuration = $(this).data('ani-duration');

            $(this).css({
                'visibility': 'hidden',
                'animation-duration': aniDuration,
                '-webkit-animation-duration': aniDuration,
            });
            self.clearAnimation();
        });
    },
    showPopup: function(swiper) {
        if (swiper.activeIndex == 2) {
            var aniName;
            var pageNum = swiper.activeIndex + 1;
            var optionCount = $('.slide-3 .option_wrapper div').length;
            for (var i = 1; i <= optionCount; ++i) {
                var $option = $('.slide-' + pageNum + ' .option' + i);
                $option.on('click', function() {
                    var $popup = $('.slide-' + pageNum + ' .popup' + this);
                    $popup.css({ 'visibility': 'visible' });
                    aniName = $popup.data('ani-name');
                    $popup.attr('class', $popup.data('origin-class'));
                    $popup.addClass(aniName);
                }.bind(i));
            }
        }
    },
    hidePopup: function(swiper) {
        var animationEnd = animationControl.initAnimationEnd();
        var endAniName;

        if (swiper.activeIndex == 2) {
            var pageNum = swiper.activeIndex + 1;
            var popupCount = $('.slide-' + pageNum + ' .popup_wrapper div').length;
            console.log(popupCount);
            for (var i = 1; i <= popupCount; ++i) {
                var $popup = $('.slide-' + pageNum + ' .popup' + i);
                console.log('popup: ', $popup);

                $popup.on('click',function() {
                    var self = this;
                    console.log(this.data('origin-class'));
                    this.attr('class', this.data('origin-class'));
                    endAniName = this.data('end-ani-name');
                    console.log(endAniName);
                    this.addClass(endAniName);
                    this.one(animationEnd, function() {
                        self.css({ 'visibility': 'hidden' });
                    });
                }.bind($popup));
            }
        }
    },
    clearAnimation: function() {
        $('.popup_wrapper div').each(function() {
            $(this).css({ 'visibility': 'hidden' });
            $(this).attr('class', $(this).data('origin-class'));
        });
    }
};