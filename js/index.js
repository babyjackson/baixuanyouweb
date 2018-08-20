$(function () {
    ban();
    var wrapTop = $(".light-dot").offset().top;
    var istrue = true;
    $(window).on("scroll",
        function () {
            var s = $(window).scrollTop();
            if (s > wrapTop - 500 && istrue) {
                $(".timer").each(count);
                function count(a) {
                    var b = $(this);
                    a = $.extend({},
                        a || {},
                        b.data("countToOptions") || {});
                    b.countTo(a)
                };
                istrue = false;
            };
        });

    $(".market .slide-mark").mouseover(function () {
        $(this).addClass("show").siblings().removeClass("show");
    });
    $(".advantage .slide-item").mouseover(function () {
        $(this).addClass("show").siblings().removeClass("show");
    });
    $(".sch-bar .suffix-box").hover(function(){
        $(".suffix-list").show(0);
    },function(){
        $(".suffix-list").hide(0);
    },0);
    $(".suffix-box ul>li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        var suffixName = $(this).text();
        $(".suffix-name").text(suffixName);
        $(".suffix-list").hide(0);
    });
})

var ban = function () {
    var $indexTopBanner = $(".index-top-banner"),
        isNow = 0,
        $bannerTabLi = $(".banner-tab .banner-tab-li");

    $bannerTabLi.click(function () {
        clearInterval(timer);
        $bannerTabLi.find("b").css({ display: 'none' });
        $index = $(this).index();
        isNow = $index;
        $bannerTabLi.find("i").css({ display: "block" });
        $(this).addClass("active").siblings().removeClass("active");
        $indexTopBanner.find(".slider-group").eq(isNow).addClass("animating-enter-down center")
            .siblings().removeClass("animating-enter-down center");
    });

    timer = setInterval(autoBan, 4000);

    function autoBan() {
        isNow++;

        var $length = $indexTopBanner.find(".slider-group").length;

        if (isNow > $length) {
            isNow = 0;
        }
        move();
    }

    function move() {
        $bannerTabLi.eq(isNow).addClass("active").siblings().removeClass("active");
        $indexTopBanner.find(".slider-group").eq(isNow).addClass("animating-enter-down center")
            .siblings().removeClass("animating-enter-down center");
    }
}

/* 设置计数 */
$.fn.countTo = function (options) {
    options = options || {};
    return $(this).each(function () {
        // 当前元素的选项
        var settings = $.extend({}, $.fn.countTo.defaults, {
            from: $(this).data('from'),
            to: $(this).data('to'),
            speed: $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals: $(this).data('decimals')
        }, options);
        // 更新值
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
            increment = (settings.to - settings.from) / loops;
        // 更改应用和变量
        var self = this,
            $self = $(this),
            loopCount = 0,
            value = settings.from,
            data = $self.data('countTo') || {};
        $self.data('countTo', data);

        // 如果有间断，找到并清除
        if (data.interval) {
            clearInterval(data.interval);
        };
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // 初始化起始值
        render(value);
        
        function updateTimer() {
            value += increment;
            loopCount++;
            render(value);
            if (typeof (settings.onUpdate) == 'function') {
                settings.onUpdate.call(self, value);
            }
            if (loopCount >= loops) {
                // 移出间隔
                $self.removeData('countTo');
                clearInterval(data.interval);
                value = settings.to;
                if (typeof (settings.onComplete) == 'function') {
                    settings.onComplete.call(self, value);
                }
            }
        }
        function render(value) {
            var formattedValue = settings.formatter.call(self, value, settings);
            $self.html(formattedValue);
        }
    });
};
$.fn.countTo.defaults = {
    from: 0,               // 数字开始的值
    to: 0,                 // 数字结束的值
    speed: 1000,           // 设置步长的时间
    refreshInterval: 100,  // 隔间值
    decimals: 0,           // 显示小位数
    formatter: formatter, // 渲染之前格式化
    onUpdate: null,        // 每次更新前的回调方法
    onComplete: null       // 完成更新的回调方法
};
function formatter(value, settings) {
    return value.toFixed(settings.decimals);
}
// // 自定义格式
// $('.count-number').data('countToOptions', {
//     formmatter: function (value, options) {
//         return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
//     }
// });
// 定时器
$('.timer').each(count);
function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
}
