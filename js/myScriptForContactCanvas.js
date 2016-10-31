
var
 path0,
 path1,
 path2,
 path3,
 path4,
 angleTop=[],
 angleBottom=[],
 pathObj={};
marginForNav = 50;

var canWidth = view.size.width;
var canHeight = view.size.height;

diamonds();
resizeContact();
function onResize(){
    clearPaths();
    diamonds();
    resizeContact()
}
$(document).ready(function () {


    for (var i=0; i<5; i++){
        var item = pathObj["path"+i];
        angleTop.push(item.segments[1].point.y);
        angleBottom.push(item.segments[3].point.y);
    }

    $(".link").mouseover(function () {

        var i = $(".link").index(this);
        pathObj["pathAnimate"+i]=true;
        pathObj["path"+i].onFrame = function(event) {
            var item = pathObj["path"+i];

            if( pathObj["pathAnimate"+i]){
                if(item.segments[1].point.y < angleBottom[i]){
                    item.segments[1].point.y+=5;
                }

                if(item.segments[3].point.y > angleTop[i]){
                    item.segments[3].point.y-=5;
                }
            }else{
                if (item.segments[1].point.y > angleTop[i]) {
                    item.segments[1].point.y -= 6;
                }
                if (item.segments[3].point.y < angleBottom[i]) {
                    item.segments[3].point.y += 6;
                }
            }
         }
    });

    $(".link").mouseleave(function () {
        var i = $(".link").index(this);
        pathObj["pathAnimate"+i]=false;
       });

});




function resizeContact(){
    document.getElementById("contact").style.height = window.innerHeight-marginForNav+"px";
}

function clearPaths(){
    path0.remove();
    path1.remove();
    path2.remove();
    path3.remove();
    path4.remove();
}

function diamonds(){
    canWidth = view.size.width;
    canHeight =view.size.height;

    path1 = new Path();
    path1.strokeColor = 'rgb(255,255,178)';
    path1.strokeWidth = 1;
    path1.add(canWidth*0.236, canHeight*0.301);
    path1.add(canWidth*0.2735, canHeight*0.2215);
    path1.add(canWidth*0.311, canHeight*0.301);
    path1.add(canWidth*0.2735, canHeight*0.3795);
    path1.closed = true;

    path2 = new Path();
    path2.strokeColor = 'rgb(255,255,178)';
    path2.strokeWidth = 2;
    path2.add(canWidth*0.311, canHeight*0.301);
    path2.add(canWidth*0.3585, canHeight*0.2015);
    path2.add(canWidth*0.406, canHeight*0.301);
    path2.add(canWidth*0.3585, canHeight*0.3995);
    path2.closed = true;

    path0 = new Path();
    path0.strokeColor = 'rgb(255,255,178)';
    path0.strokeWidth = 3;
    path0.add(canWidth*0.406, canHeight*0.301);
    path0.add(canWidth*0.5, canHeight*0.102);
    path0.add(canWidth*0.595, canHeight*0.301);
    path0.add(canWidth*0.5, canHeight*0.5);
    path0.closed = true;

     path3 = new Path();
    path3.strokeColor = 'rgb(255,255,178)';
    path3.strokeWidth = 2;
    path3.add(canWidth*0.595, canHeight*0.301);
    path3.add(canWidth*0.6415, canHeight*0.2015);
    path3.add(canWidth*0.689, canHeight*0.301);
    path3.add(canWidth*0.6415, canHeight*0.3995);
    path3.closed = true;

     path4 = new Path();
    path4.strokeColor = 'rgb(255,255,178)';
    path4.strokeWidth = 1;
    path4.add(canWidth*0.689, canHeight*0.301);
    path4.add(canWidth*0.7265, canHeight*0.2215);
    path4.add(canWidth*0.764, canHeight*0.301);
    path4.add(canWidth*0.7265, canHeight*0.3795);
    path4.closed = true;

    path0.position.y+=50;
    path1.position.y+=50;
    path2.position.y+=50;
    path3.position.y+=50;
    path4.position.y+=50;

    pathObj ={
        path0: path0,
        pathAnimate0: false,
        path1: path1,
        pathAnimate1: false,
        path2: path2,
        pathAnimate2: false,
        path3: path3,
        pathAnimate3: false,
        path4: path4,
        pathAnimate4: false
    };
}


