/**
 * Created by AlexBogdan on 01.11.2016.
 */
var swipeYOff = false,
    marginForNav = 50,
    smallScreen = window.innerWidth <= 1024,
    maxAnchorIndex,
    anchorItemHeight=[],
    scrollTop = $(window).scrollTop(),
    anchorIndex;
$(document).ready(function(){
    var anchorForScroll = $('.anchorForScroll');
    var elem = document.getElementById('home');
    maxAnchorIndex = anchorForScroll.length-1;
    for (var i=0; i<anchorForScroll.length;i++){
        anchorItemHeight[i]=($(anchorForScroll[i]).height());
    }
    scrollTop = $(window).scrollTop();
    anchorIndex = getAnchorIndex(anchorItemHeight,scrollTop);
    $(window).resize(function(){
        smallScreen = window.innerWidth <= 1024;
        for (var i=0; i<anchorForScroll.length;i++){
            anchorItemHeight[i]=($(anchorForScroll[i]).height());
        }
    });
    $('.nav').mouseup(function () {
        setTimeout(function () {
            anchorIndex = getAnchorIndex(anchorItemHeight,scrollTop);
        },50);
    });
    $(document).mousedown(function() {
        var rightScroll = this.offsetWidth-this.clientWidth;
        var mouseX = event.pageX;
        if (rightScroll > 0
            && (mouseX >= this.clientWidth && mouseX <= this.offsetWidth)) {
            return true;
        }
        $(this).mouseup(function() {
        anchorIndex = getAnchorIndex(anchorItemHeight,scrollTop);
        });
    });
if( !smallScreen){
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }
}
    if(window.innerWidth!==768) {
        var body =  $('body')[0],
            initialPoint,
            finalPoint;
        body.addEventListener('touchstart', function (event) {
            initialPoint = event.changedTouches[0];
        }, false);
        body.addEventListener('touchmove', function (event) {
            //event.preventDefault();
        }, false);
        body.addEventListener('touchend', function (event) {
            if (!swipeYOff) {
                finalPoint = event.changedTouches[0];
                var delta;
                if (initialPoint.pageY < finalPoint.pageY) {
                    delta = -(finalPoint.pageY-initialPoint.pageY);
                } else {
                    delta = initialPoint.pageY -finalPoint.pageY;
                }
                swiper(delta);
            }
        }, false);
    } else{
        $('#myCanvas').remove();
    }
    $(document).scroll(function () {
    scrollTop = $(window).scrollTop();
    });
});
/**------------------------------------------------------------------------------------------------------------------**/
function onWheel(e) {
    if (!swipeYOff) {
        e = e || window.event;
        var delta;
        if (smallScreen){
        }else{
            delta = e.deltaY || e.detail || e.wheelDelta;
        }
        return swiper(delta);
    }else{
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
}
function swiper(delta) {
    var scrollTop = $(window).scrollTop(),
        scrollBottom = $(window).scrollTop() + $(window).height() - marginForNav,
        anchorForScroll = $('.anchorForScroll');
    if(Math.abs(delta)>5){
        if (delta > 0 && anchorIndex!==maxAnchorIndex && (scrollBottom < $(document).height()-marginForNav)) {
            if (scrollBottom+marginForNav >= (getOffset(anchorForScroll[anchorIndex]).top)+ $(anchorForScroll[anchorIndex])[0].clientHeight) {
                anchorIndex += 1;
                $('html, body').animate({scrollTop: getOffset(anchorForScroll[anchorIndex]).top - marginForNav}, 500);
                swipeYOff = true;
                setTimeout(swipeYOffTimePassed, 500);
            }
        } else {
            if (delta < 0) {
                if(anchorIndex !== 0){
                    if ((scrollTop+marginForNav)<= getOffset(anchorForScroll[anchorIndex]).top) {
                        anchorIndex -= 1;
                        $('html, body').animate({scrollTop: getOffset(anchorForScroll[anchorIndex]).top + $(anchorForScroll[anchorIndex])[0].clientHeight - window.innerHeight}, 500);
                        swipeYOff = true;
                        setTimeout(swipeYOffTimePassed, 500);
                    }
                }
            }
        }
    }

    return anchorIndex;
}
function swipeYOffTimePassed() {
    swipeYOff = false;
}
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
    var box = elem.getBoundingClientRect(),
    body = document.body,
    docElem = document.documentElement,
    scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    top  = box.top +  scrollTop - clientTop,
    left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}
function getAnchorIndex(anchorItemHeight,scrollTop) {
    var index = -1;
    var sum=0;
    do{
        index++;
        sum += anchorItemHeight[index];
    }while(sum<=scrollTop);
    return index;
}