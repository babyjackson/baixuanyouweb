$(function(){
    $(".b-top-nav-bar-body .cen-bar-list>li").mouseover(function () {
        $(".b-top-nav-bar-body .cen-bar-list>li").find(".switch-down").stop().hide(0);
        $(this).find(".switch-down").stop().show(0);
        $(this).find(".icon-arrow").removeClass("icon-arrow-down").addClass("icon-arrow-up");
    });
    $(".b-top-nav-bar-body .cen-bar-list>li").mouseout(function () {
        $(".b-top-nav-bar-body .cen-bar-list>li").find(".switch-down").stop().hide(0);
        $(".b-top-nav-bar-body .cen-bar-list>li").find(".icon-arrow").removeClass("icon-arrow-up").addClass("icon-arrow-down");
    });
    $(".fixed-right-box .back-top").click(function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 500);
    });
    $(".phone-close").click(function () {
        $(".phone-show").hide(0);
    });
    $(".advisory .zx").click(function () {
        $(".phone-show").show(0);
    })
})