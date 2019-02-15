(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');
    var popupControl = require('./popup-control.js');

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
            'background.png',
            'grass.gif',
            'loading_people.gif',
            'slide_1_title.png',
            'slide_1_text.png',
            'slide_1_start.png',
            'slide_1_search.png',
            'slide_2_title1.png',
            'slide_2_title2.png',
            'slide_2_title3.png',
            'slide_2_title4.png',
            'slide_2_title5.png',
            'slide_2_title6.png',
            'slide_2_title7.png',
            'slide_2_title8.png',
            'slide_2_title9.png',
            'slide_2_text1.png',
            'slide_2_text2.png',
            'slide_2_text3_1.png',
            'slide_2_text3_2.png',
            'slide_2_text3_3.png',
            'slide_2_text3_4.png',
            'slide_2_text3_5.png',
            'slide_3_title.png',
            'slide_3_option1.png',
            'slide_3_option2.png',
            'slide_3_option3.png',
            'slide_3_option4.png',
            'slide_3_option5.png',
            'slide_3_popup1.png',
            'slide_3_popup2.png',
            'slide_3_popup3.png',
            'slide_3_popup4.png',
            'slide_3_popup5.png',
            'slide_3_continue.png',
            'slide_4_title.png',
            'slide_4_option1.png',
            'slide_4_option2.png',
            'slide_4_option3.png',
            'slide_4_option4.png',
            'slide_4_popup1.png',
            'slide_4_popup2.png',
            'slide_4_popup3.png',
            'slide_4_popup4.png',
            'slide_5_title.png',
            'slide_5_text.png',
            'slide_5_scene1.png',
            'slide_5_scene2.png',
            'slide_5_scene3.png',
            'slide_5_footprint1.png',
            'slide_5_footprint2.png',
            'slide_5_footprint3.png',
            'slide_5_people1.gif',
            'slide_5_people2.gif',
            'slide_5_people3.gif',
            'slide_6_title.png',
            'slide_6_calendar.png',
            'slide_7_title.png',
            'slide_7_info1.png',
            'slide_7_info2.png',
            'slide_8_title.png',
            'slide_8_contact1.png',
            'slide_8_contact2.png',
            'slide_8_contact3.png',
            'arrow.png',

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
                nextButton: '.swiper-button-next',
                effect: 'fade',    // slide, fade, coverflow or flip
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
                    popupControl.handlePopupEvents(swiper);
                },
                onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                    if (swiper.activeIndex === 0) {
                        $upArrow.show();
                    } else {
                        $upArrow.hide();
                    }
                },
                onTransitionEnd: function (swiper) {       // play animations of the current slide
                    animationControl.playAnimation(swiper);
                    popupControl.handlePopupEvents(swiper);
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
