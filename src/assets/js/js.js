
$(window).on("scroll", function() {
    if(jQuery(window).scrollTop() >= 300) {
        $('#brand').removeClass("hidden");
    } else{
        $('#brand').addClass("hidden");
    }

    if (window.matchMedia("(max-width: 992px)").matches) {
        if(jQuery(window).scrollTop() >= 200) {
            $('#brand').removeClass("hidden");
        } else{
            $('#brand').addClass("hidden");
        }
    }

    if(jQuery(window).scrollTop() > 60) {
        jQuery(".sticky").addClass("active");
    } else {
       jQuery(".sticky").removeClass("active");
    }
});


// jQuery(document).ready(function(){
//     jQuery('[data-toggle="popover"]').popover();
//     if (window.matchMedia('(max-width: 767.98px)').matches){
//         jQuery(".timeline-btn").popover('hide');
//         jQuery(".mobile-timeline-btn").popover('show');
//     }else{
//         jQuery(".mobile-timeline-btn").popover('hide');
//         jQuery(".timeline-btn").popover('show');
//     }
//     if (window.matchMedia('(min-width: 768px)').matches){
//         jQuery(".timeline-btn").popover('show');
//         jQuery(".mobile-timeline-btn").popover('hide');
//     }else{
//         jQuery(".mobile-timeline-btn").popover('show');
//         jQuery(".timeline-btn").popover('hide');
//     }
// });






