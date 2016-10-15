/**
 * Created by AlexBogdan on 15.10.2016.
 */
$(document).ready(function() {
    if (window.innerWidth <= 768) {
        document.getElementById("anchor-2").innerHTML = 'Contact';
        document.getElementById("anchor-2").setAttribute('href', '#contact');
        document.getElementById("anchor-3").innerHTML = 'About';
        document.getElementById("anchor-3").setAttribute('href', '#about');
    }
    $('ul.nav>li').click(function() {
        $('.navbar-collapse.in').removeClass('in');
    });
});