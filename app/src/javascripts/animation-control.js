var $ = require('jquery');

module.exports = {
    initAnimationEnd: function() {
        return animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };
            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));
    },

    initCalendarAnimation: function(swiper) {
        var self = this;

        if (swiper.activeIndex != 5) 
            self.resetCalendarAnimation();

        var animationEnd = self.initAnimationEnd();
        $('.calendar1').one(animationEnd, function() {
            var i = 0;
            setTimeout(function calendarAni() {
                $(".calendar1_date1").css({"width":i+++ "%"});
                if (i < 100) setTimeout(calendarAni, 10);
            }, 0);

            var j = 0;
            setTimeout(function calendarAni2() {
                $(".calendar1_date2").css({"width":j+++ "%"});
                if (j < 100) setTimeout(calendarAni2, 10);
            }, 900);

            var k = 0;
            setTimeout(function calendarAni3() {
                $(".calendar2_date1").css({"width":k+++ "%"});
                if (k < 100) setTimeout(calendarAni3, 10);
            }, 1800);

            var l = 0;
            setTimeout(function calendarAni4() {
                $(".calendar2_date2").css({"width":l+++ "%"});
                if (l < 100) setTimeout(calendarAni4, 10);
            }, 2700);

            var n = 0;
            setTimeout(function calendarAni5() {
                $(".calendar2_date3").css({"width":n+++ "%"});
                if (n < 100) setTimeout(calendarAni5, 10);
            }, 3600);

            var m = 0;
            setTimeout(function calendarAni6() {
                $(".calendar2_date4").css({"width":m+++ "%"});
                if (m < 100) setTimeout(calendarAni6, 10);
            }, 4500);
        });
    },

    resetCalendarAnimation: function() {
        $(".calendar1_date1").css({"width": 0 + "%"});
        $(".calendar1_date2").css({"width": 0 + "%"});
        $(".calendar2_date1").css({"width": 0 + "%"});
        $(".calendar2_date2").css({"width": 0 + "%"});
        $(".calendar2_date3").css({"width": 0 + "%"});
        $(".calendar2_date4").css({"width": 0 + "%"});
    },

    initAnimationItems: function() {
        $('.animated').each(function () {
            var aniDuration, aniDelay;
            
            $(this).attr('data-origin-class', $(this).attr('class'));
            
            aniDuration = $(this).data('ani-duration');
            aniDelay = $(this).data('ani-delay');

            $(this).css({
                'visibility': 'hidden',
                'animation-duration': aniDuration,
                '-webkit-animation-duration': aniDuration,
                'animation-delay': aniDelay,
                '-webkit-animation-delay': aniDelay
            });
        });
    },

    playAnimation: function (swiper) {
        var self = this;
        var animationEnd = self.initAnimationEnd();
        self.clearAnimation();

        var aniItems = swiper.slides[swiper.activeIndex].querySelectorAll('.animated');

        $(aniItems).each(function () {
            var preAniName, postAniName;
            var aniName;
            $(this).css({ 'visibility': 'visible' });
            preAniName = $(this).data('pre-ani-name');
            postAniName = $(this).data('post-ani-name');
            aniName = $(this).data('ani-name');
            if (preAniName && postAniName) {
                $(this).addClass(preAniName);
                $(this).on(animationEnd, function() {
                    $(this).attr('class', $(this).data('origin-class'));
                    $(this).addClass(postAniName);
                });
            } else {
                $(this).addClass(aniName);
            }
        });
    },

    clearAnimation: function () {
        $('.animated').each(function () {
            $(this).css({ 'visibility': 'hidden' });
            $(this).attr('class', $(this).data('origin-class'));
        });
    }
};