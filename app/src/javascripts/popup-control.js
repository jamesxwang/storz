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
        if (swiper.activeIndex == 2 || swiper.activeIndex == 3) {
            var aniName;
            var pageNum = swiper.activeIndex + 1;
            var optionCount = $('.slide-' + pageNum + ' .option_wrapper div').length;
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

        if (swiper.activeIndex == 2 || swiper.activeIndex == 3) {
            var pageNum = swiper.activeIndex + 1;
            var popupCount = $('.slide-' + pageNum + ' .popup_wrapper div').length;
            for (var i = 1; i <= popupCount; ++i) {
                var $popup = $('.slide-' + pageNum + ' .popup' + i);
                $popup.on('click',function() {
                    var self = this;

                    if (this.hasClass('popup1')) {
                        $('.slide-' + pageNum + ' .option1').attr('class',  $('.slide-' + pageNum + ' .option1').data('origin-class'));
                        $('.slide-' + pageNum + ' .option1').addClass('viewed');
                        $('.slide-' + pageNum + ' .icon1').attr('class',  $('.slide-' + pageNum + ' .icon1').data('origin-class'));
                        $('.slide-' + pageNum + ' .icon1').addClass('viewed');
                    }
                    if (this.hasClass('popup2')) {
                        $('.slide-' + pageNum + ' .option2').attr('class',  $('.slide-' + pageNum + ' .option2').data('origin-class'));
                        $('.slide-' + pageNum + ' .option2').addClass('viewed');
                        $('.slide-' + pageNum + ' .icon2').attr('class',  $('.slide-' + pageNum + ' .icon2').data('origin-class'));
                        $('.slide-' + pageNum + ' .icon2').addClass('viewed');
                    }
                    if (this.hasClass('popup3')) {
                        $('.slide-' + pageNum + ' .option3').attr('class',  $('.slide-' + pageNum + ' .option3').data('origin-class'));
                        $('.slide-' + pageNum + ' .option3').addClass('viewed');
                        $('.slide-' + pageNum + ' .icon3').attr('class',  $('.slide-' + pageNum + ' .icon3').data('origin-class'));
                        $('.slide-' + pageNum + ' .icon3').addClass('viewed');
                    }
                    if (this.hasClass('popup4')) {
                        $('.slide-' + pageNum + ' .option4').attr('class',  $('.slide-' + pageNum + ' .option4').data('origin-class'));
                        $('.slide-' + pageNum + ' .option4').addClass('viewed');
                        $('.slide-' + pageNum + ' .icon4').attr('class',  $('.slide-' + pageNum + ' .icon4').data('origin-class'));
                        $('.slide-' + pageNum + ' .icon4').addClass('viewed');
                    }
                    if (this.hasClass('popup5')) {
                        $('.slide-' + pageNum + ' .option5').attr('class',  $('.slide-' + pageNum + ' .option5').data('origin-class'));
                        $('.slide-' + pageNum + ' .option5').addClass('viewed');
                    }

                    this.attr('class', this.data('origin-class'));
                    endAniName = this.data('end-ani-name');
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