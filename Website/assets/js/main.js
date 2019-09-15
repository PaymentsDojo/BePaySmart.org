var currentIndex = 0;
var pages;

jQuery(function($) {
    'use strict',


    $(document).ready(function() {

        menuToggle()


        // Carousel Auto Slide Off
        $('#event-carousel').carousel({
            interval: false
        });


        $(window).resize(function() {
            menuToggle();
        });

        //Set a timer to load the video (if it changes)
        setTimeout(loadVideoCurrent, 500)

		//Iframe resize timers
        $(window).resize(resize)
        setTimeout(resize, 500)


        $('#event-carousel').on('slid.bs.carousel', function() {

            var carouselData = $(this).data('bs.carousel');
            currentIndex = carouselData.getActiveIndex();

            //Load youtube video
            loadVideoCurrent()

			//Update the angular currentIndex variable
            var appElement = document.querySelector('[ng-app=ddp]');
            var $scope = angular.element(appElement).scope();
            $scope = $scope.$$childHead; // add this and it will work
            $scope.$apply(function() {
                $scope.currentIndex = currentIndex;
            });

        });


    });
});

//Used in the menu links
window.goto = function(index) {
    $("#event-carousel").carousel(index)
}

// Angular
angular.module('ddp', [])
    .controller('PageController', ["$http", "$scope", "$sce", function($http, $scope, $sce) {
        $scope.currentIndex = 0;

        //1: get page titles from server
        $http({
            "method": "GET",
            "url": "/pagesJSON"
        }).then(function(res) {
            d = arrayify(res.data);
            $scope.pages = d;
            pages = d;
        });

        $scope.getProjURL = function(url) {
            return $sce.trustAsResourceUrl(url)
        }
    }])
    .filter('trust', ['$sce', function($sce) {
        return function(value, type) {
            return $sce.trustAs(type || 'html', value);
        }
    }]);