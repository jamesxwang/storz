(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');


    $(document).ready(function () {
        /***********************************************
         *                   Loader                    *
         ***********************************************/
        var loader = new PxLoader();
        var $upArrow = $('.up-arrow');
        // Images
        // var BASE_IMAGE_PATH = '/dist/images/';
        var BASE_IMAGE_PATH = '/images/';
        var fileList = [
            'logo.png',
            'slide_1_background.png',
            'slide_1_title.png',
            'slide_1_text.png',
            'slide_1_start.png',
            'slide_1_search.png',
            'slide_2_title.png',
            'slide_3_background.png',
            'slide_3_title.png',
            'slide_3_option1.png',
            'slide_3_option2.png',
            'slide_3_option3.png',
            'slide_3_option4.png',
            'slide_3_option5.png',
            'slide_4_background.png',
            'slide_4_title.png',
            'slide_4_option1.png',
            'slide_4_option2.png',
            'slide_4_option3.png',
            'slide_4_option4.png',
            'slide_5_background.png',
            'slide_5_title.png',
            'slide_5_scene1.png',
            'slide_5_scene2.png',
            'slide_5_scene3.png',
            'slide_5_footprint1.png',
            'slide_5_footprint2.png',            
            'slide_5_footprint3.png',            
            'slide_6_background.png',
            'slide_6_title.png',

        ];
        for(var i = 0; i < fileList.length; i++){
            var pxImage = new PxLoaderImage(BASE_IMAGE_PATH + fileList[i]);
            pxImage.imageNumber = i + 1;
            loader.add(pxImage);
        }
        loader.addCompletionListener(function(){
            console.log("Preload: "+fileList.length+" images in total.");
            
            // init Swiper
            new Swiper('.swiper-container', {
                mousewheelControl: true,
                effect: 'coverflow',    // slide, fade, coverflow or flip
                speed: 400,
                direction: 'vertical',
                fade: {
                    crossFade: false
                },
                coverflow: {
                    rotate: 100,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false     // do disable shadows for better performance
                },
                flip: {
                    limitRotation: true,
                    slideShadows: false     // do disable shadows for better performance
                },
                onInit: function (swiper) {
                    animationControl.initAnimationItems();  // get items ready for animations
                    animationControl.playAnimation(swiper); // play animations of the first slide
                },
                onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                    if (swiper.activeIndex === swiper.slides.length - 1) {
                        $upArrow.hide();
                    } else {
                        $upArrow.show();
                    }
                },
                onTransitionEnd: function (swiper) {       // play animations of the current slide
                    animationControl.playAnimation(swiper);
                },
            });

            // hide loading animation since everything is ready
            $(".loading-overlay").slideUp();
        });

        loader.addProgressListener(function(e){
            var percent = Math.round( (e.completedCount / e.totalCount) * 100);
            $(".loadingProgress2").css({"width":percent+"%"});
            $(".progressNumb").html(percent + "%");
        });

        loader.start();
        /***********************************************/
    });
})();
