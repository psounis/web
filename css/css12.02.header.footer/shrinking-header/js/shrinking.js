
// src (altered): https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        let image = document.getElementById("logo");
        image.style.display = "none"
    } else {
        let image = document.getElementById("logo");
        image.style.display = "block"
    }
}