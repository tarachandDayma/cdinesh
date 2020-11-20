/* NAVIGATION MENU */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

/* TOOLTIPS */
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

/* Own Carousel */

$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 5,
    responsiveClass: true,
    responsive: {
        0: {
            items: 4,
            nav: false
        },
        600: {
            items: 8,
            nav: false
        },
        1000: {
            items: 12,
            nav: true,
            loop: false
        }
    }
})


// $(document).ready(function(){
//     $("").click(function(){


//         if( $(this).checked

//     });
// });