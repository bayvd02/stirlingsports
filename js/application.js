$(document).ready(function () {
    
    var offset = setupSlides();
    $(".btn-search").hover(
        function () {
            $(".search-field").addClass('hover')
        },
        function () {
            $(".search-field").removeClass('hover')
        }
    )

    $("#search").focus(function () {
        $(".search-field").addClass('hover')
    })
    $("#search").blur(function () {
        $(".search-field").removeClass('hover')
    })
    $("#slider").slider({
        range: 'false',
        animate: "fast",
        min: 0,
        max: ($('.reviews__single').length)-1,
        value: Math.floor($('.reviews__single').length / 2),
        create: function () {
            var current = Math.floor($('.reviews__single').length / 2);
            $(".reviews .row").css("transform", `translateX(${offset*(1-current)}%)`);
        },
        slide: function (event, ui) {
            console.log("previous value:" + $(this).slider('option', 'value'));
        },
        stop: function (event, ui) {
            var current = $(this).slider('option', 'value');
            $(".reviews .row").css("transform", `translateX(${offset*(1-current)}%)`);
            console.log("Current value:" + current);
        }
    });
});

function setupSlides() {
    var slideWidth = parseInt($(".reviews .col-lg-4").css("width"), 10);
    var rowWidth = parseInt($(".reviews .row").css("width"), 10);
    var offset = (slideWidth * 100 / rowWidth);
    $(".reviews .row").css("transform", `translateX(${offset}%)`);
    $(".reviews .col-lg-4").each(function (i) {
        $(this).css("left", `${offset*i}%`)
    })
    return offset;
}
