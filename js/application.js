$(document).ready(function () {

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
        range: 'min',
        min: 0,
        max: ($('.reviews__single').length-1),
        start: function(){
            $(".ui-slider-horizontal").css("width", $('.reviews__single').length*160+"px")
        },
        slide: function (event, ui) {
            console.log("previous value:" + $(this).slider('option', 'value'));
        },
        stop: function (event, ui) {
            console.log("Current value:" + $(this).slider('option', 'value'));
        }
    });
});
