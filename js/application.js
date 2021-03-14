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
        max: ($('.reviews__single').length) - 1,
        value: Math.floor($('.reviews__single').length / 2),
        create: function () {
            var current = Math.floor($('.reviews__single').length / 2);
            var move = `translateX(${offset*(1-current)}%)`;
            $(".reviews .row").css("transform", move);
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

    $('#addToCart').on('click', function () {
        if ($(".product__size").find('button.selected').length !== 0) {
            var cartTotal = $("#cartCount").attr('data-totalitems');
            var newCartTotal = parseInt(cartTotal) + 1;
            $("#cartCount").attr('data-totalitems', newCartTotal);
            $("#cartCount").text(newCartTotal);
            var notification = createNotification("success", 'Item added to your cart');
            setTimeout(() => {
                removeNotification(notification);
            }, 2000);
        } else {
            var notification = createNotification("error", 'Select size first');
            setTimeout(() => {
                removeNotification(notification);
            }, 2000);
        }
    })

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
    $(".product__size .row .col-20 button").each(function () {
        $(this).on("click", function () {
            $(".product__size .row .col-20 button").removeClass("selected");
            $(this).addClass("selected");
        });
    });
});

function createNotification(type, text) {
    newNotification = $("<div>", {
            "class": `notification notification__${type}`
        })
        .html(`${text}`)
    $('.notification__container').append(newNotification);

    return newNotification;
}

function removeNotification(notification) {
    notification.addClass('notification__hide');

    // remove notification from the DOM after 0.5 seconds
    setTimeout(() => {
        $(notification).remove();
    }, 500);
}
