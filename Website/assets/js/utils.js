function menuToggle() {
    var windowWidth = $(window).width();
    if (windowWidth > 767) {
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 405) {
                $('.main-nav').addClass('fixed-menu animated slideInDown');
            } else {
                $('.main-nav').removeClass('fixed-menu animated slideInDown');
            }
        });
    } else {
        $('.main-nav').addClass('fixed-menu animated slideInDown');
    }
}

function loadVideoCurrent() {
    currentItem = $('#event-carousel .item.active')
    var $iframe = $(currentItem).find('iframe');
    if ($iframe.data('src')) { // only do it once per iframe
        $iframe.prop('src', $iframe.data('src')).data('src', false);
    }
}

//Resizes all the iframes to the right height
function resize() {
    $("iframe").height($("iframe").width() * 0.5625)
}

function arrayify(obj) {
    r = []
    keys = Object.keys(obj)
    keys.forEach(function(key) {
        r.push(obj[key])
    })
    return r;
}