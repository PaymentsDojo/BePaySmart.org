var currentIndex = 0;
var pages;
jQuery(function($) {'use strict',
	
	
	$(document).ready(function(){

	function menuToggle()
	{
		var windowWidth = $(window).width();

		if(windowWidth > 767 ){
			$(window).on('scroll', function(){
				if( $(window).scrollTop()>405 ){
					$('.main-nav').addClass('fixed-menu animated slideInDown');
				} else {
					$('.main-nav').removeClass('fixed-menu animated slideInDown');
				}
			});
		}else{
			
			$('.main-nav').addClass('fixed-menu animated slideInDown');
				
		}
	}

	menuToggle()
	
	
	// Carousel Auto Slide Off
	$('#event-carousel, #twitter-feed, #sponsor-carousel ').carousel({
		interval: false
	});


	$( window ).resize(function() {
		menuToggle();
	});

	//Load first video
	function loadVideoCurrent(){
		currentItem = $('#event-carousel .item.active')
		var $iframe=$(currentItem).find('iframe');
		if ($iframe.data('src')){ // only do it once per iframe
			$iframe.prop('src', $iframe.data('src')).data('src', false);
		}
	}
	setTimeout(loadVideoCurrent,500)

	/*$('.main-nav ul').onePageNav({
		currentClass: 'active',
	    changeHash: false,
	    scrollSpeed: 900,
	    scrollOffset: 0,
	    scrollThreshold: 0.3,
	    filter: ':not(.no-scroll)'
	});*/

 		function resize(){
            //if($(window).width() >= 768){
                $("iframe").height($("iframe").width() * 0.5625)
            //}
        }
		$(window).resize(resize)
		setTimeout(resize,500)


		$('#event-carousel').on('slid.bs.carousel', function () {

		// This variable contains all kinds of data and methods related to the carousel
		var carouselData = $(this).data('bs.carousel');
		// EDIT: Doesn't work in Boostrap >= 3.2
		currentIndex = carouselData.getActiveIndex();
		//currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));

		//Load youtube video
		loadVideoCurrent()

		var appElement = document.querySelector('[ng-app=ddp]');
		var $scope = angular.element(appElement).scope();
		$scope = $scope.$$childHead; // add this and it will work
		$scope.$apply(function() {
			$scope.currentIndex = currentIndex;
		});

	});
	

	});
});

window.goto = function (index){
	$("#event-carousel").carousel(index)
}


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