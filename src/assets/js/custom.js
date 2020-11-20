new WOW().init();
$(document).ready(function($) {
    console.log("ready!");
    $("a[href^='#']").click(function(e) {
        e.preventDefault();

        var position = $($(this).attr("href")).offset().top - 110;

        $("body, html").animate({
            scrollTop: position
        } /* speed */ );
    });
    $('[data-toggle="tooltip"]').tooltip()
});