/**
 * Created by AlexBogdan on 16.07.2016.
 */
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem);
    } else {
        return getOffsetSum(elem);
    }
}

function getOffsetSum(elem) {
    var top=0, left=0;
    while(elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return {top: top, left: left}
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}

function imgResize(){
    var widthImg;
   if($(window).width()<=736&&$(window).height()<=414){
        widthImg = $(window).height()*0.4;
   } else{
        widthImg = ($(window).width()*-0.000260416+0.53333312)*$(window).width();
   }
    var widthImgCalc = widthImg*1.416666666666667;
    var marginImg = widthImg*0.2066666666666667;
    $('.img-items').css('width',widthImgCalc);
    $('.img-items').css('height',widthImgCalc);
    $('.img-items').css('margin-left',-marginImg );
    $('.img-items').css('margin-top',-marginImg );
    $('.img-items-cont').css('width',widthImg );
    $('.img-items-cont').css('height',widthImg );
    $('.item-image-cont').css('width',widthImg);
    $('.item-image-cont').css('height',widthImg);
}

function onFrameOffFun() {
        var onFrameOff = false;
        var scrollTop = $(window).scrollTop() + $(window).height()-marginForNav;
        var offsetTop = getOffset( $('#portfolio')[0]).top;
        onFrameOff = scrollTop >= offsetTop * 1.8;
        return onFrameOff;

}
/*---------------------------------------- MAIN ----------------------------------------------------------------------*/
onFrameOff = false;
var marginForNav = 50;
$(document).ready(function(){
    if(window.innerWidth<=768){
        document.getElementById("anchor-2").innerHTML = 'Contact';
        document.getElementById("anchor-2").setAttribute('href','about.html#contact');
        document.getElementById("anchor-3").innerHTML = 'About';
        document.getElementById("anchor-3").setAttribute('href','about.html#about');
    }
    $('ul.nav>li').click(function() {
        $('.navbar-collapse.in').removeClass('in');
    });
    imgResize();
    $(document).scroll(function () {
        onFrameOff = onFrameOffFun();
    });
    $(window).resize(function(){
        imgResize();
    });
});




