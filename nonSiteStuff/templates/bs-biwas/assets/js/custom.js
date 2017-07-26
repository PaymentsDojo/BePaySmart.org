var pages,
    currentIndex;
/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
             CUSTOM LINKS SCROLLING FUNCTION 
            ======================================*/

            $('a[href*=#]').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
               && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target
                    || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html,body')
                        .animate({ scrollTop: targetOffset }, 800); //set scroll speed here
                        return false;
                    }
                }
            });
            /*====================================
            VAGAS SLIDESHOW SCRIPTS
            ======================================*/
            $(function () {
                $.vegas('slideshow', {
                    backgrounds: [
                      { src: 'assets/img/1.jpg', fade: 1000, delay: 9000 }, //CHANGE THESE IMAGES WITH YOUR ORIGINAL IMAGES
                      { src: 'assets/img/2.jpg', fade: 1000, delay: 9000 }, //THESE IMAGES ARE FOR DEMO PURPOSE ONLY YOU, CAN NOT USE THEM WITHOUT AUTHORS PERMISSION
                       { src: 'assets/img/3.jpg', fade: 1000, delay: 9000 }, 
                     
                    ]
                })('overlay', {
                    /** SLIDESHOW OVERLAY IMAGE **/
                    src: 'assets/plugins/vegas/overlays/01.png' // THERE ARE TOTAL 01 TO 15 .png IMAGES AT THE PATH GIVEN, WHICH YOU CAN USE HERE
                });

            });

       

            /*====================================
               SIDE MENU SCRIPTS BELOW 
           ======================================*/
            var menuLeft = document.getElementById('cbp-spmenu-s1'),
               menuRight = document.getElementById('cbp-spmenu-s2'),
           showLeftPush = document.getElementById('showLeftPush'),
           showRightPush = document.getElementById('showRightPush'),
           body = document.body;

            showLeftPush.onclick = function () {
                classie.toggle(this, 'active');
                classie.toggle(body, 'cbp-spmenu-push-toright');
                classie.toggle(menuLeft, 'cbp-spmenu-open');
                disableOther('showLeftPush');
            };
            showRightPush.onclick = function () {
                classie.toggle(this, 'active');
                classie.toggle(body, 'cbp-spmenu-push-toleft');
                classie.toggle(menuRight, 'cbp-spmenu-open');
                disableOther('showRightPush');
            };
            function disableOther(button) {

                if (button !== 'showLeftPush') {
                    classie.toggle(showLeftPush, 'disabled');
                }
                if (button !== 'showRightPush') {
                    classie.toggle(showRightPush, 'disabled');
                }
            }


            /*====================================
               WRITE YOUR SCRIPTS BELOW 
           ======================================*/
           $('#page-carousel').carousel({
		        interval: false
	        });

            function resize(){
            //if($(window).width() >= 768){
                $("iframe").height($("iframe").width() * 0.5625)
            //}
            }
            $(window).resize(resize)
            setTimeout(resize,500)

            $('#page-carousel').on('slid.bs.carousel', function () {

                // This variable contains all kinds of data and methods related to the carousel
                var carouselData = $(this).data('bs.carousel');
                // EDIT: Doesn't work in Boostrap >= 3.2
                currentIndex = carouselData.getActiveIndex();
                //currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));

                var appElement = document.querySelector('[ng-app=ddp]');
                var $scope = angular.element(appElement).scope();
                $scope = $scope.$$childHead; // add this and it will work
                $scope.$apply(function() {
                    $scope.currentIndex = currentIndex;
                });

            });
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));



//Angular

// Angular
angular.module('ddp',[])
	   .controller('PageController',function ($http,$scope,$sce){
			$scope.currentIndex = 0;

			function arrayify (obj){
				r = []
				keys = Object.keys(obj)
				keys.forEach(function (key){
					r.push(obj[key])
				})
				return r;
			}

			//1: get page titles from server
			$http({
				"method": "GET",
				"url": "/pagesJSON"
			}).then (function (res){
				d = arrayify(res.data);
				$scope.pages = d;
				pages = d;
			}); 

			$scope.getProjURL = function (url){
				return $sce.trustAsResourceUrl(url)
			}
	   })
	   .filter('trust', ['$sce',function($sce) {
			return function(value, type) {
				return $sce.trustAs(type || 'html', value);
			}
			}]);