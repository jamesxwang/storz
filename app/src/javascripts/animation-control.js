var $ = require('jquery');

module.exports = {
    initAnimationEnd() {
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