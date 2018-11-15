$.root_ = $("body");
jQuery(document).ready(function() {
    $.root_.on("click", '[data-action="minifyMenu"]', function() {
        $.root_.toggleClass("minified");
    });
    var $window = $(window);
    function resize() {
        if ($window.width() < 514) {
            $("li#minifyButton").hide();
            return $.root_.toggleClass("minified",true);
        }
    }
    $window.resize(resize).trigger('resize');
});
