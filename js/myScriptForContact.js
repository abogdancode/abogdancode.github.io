
var paths=[];

marginForNav = 50;

var canWidth = view.size.width;
var canHeight = view.size.height;

diamonds();
resizeContact();

function onResize(event){
    clearPaths();
    diamonds();
    resizeContact()
}

function resizeContact(){
    document.getElementById("contact").style.height = window.innerHeight-marginForNav+"px";
}

function clearPaths(){

    paths[0].remove();
    paths[1].remove();
    paths[2].remove();
    paths[3].remove();
    paths[4].remove();
}






function diamonds(){
    canWidth = view.size.width;
    canHeight =view.size.height;

     paths[0] = new Path();
    paths[0].strokeColor = 'rgb(255,255,178)';
    paths[0].strokeWidth = 1;
    paths[0].add(canWidth*0.236, canHeight*0.301);
    paths[0].add(canWidth*0.2735, canHeight*0.2215);
    paths[0].add(canWidth*0.311, canHeight*0.301);
    paths[0].add(canWidth*0.2735, canHeight*0.3795);
    paths[0].closed = true;

    paths[1] = new Path();
    paths[1].strokeColor = 'rgb(255,255,178)';
    paths[1].strokeWidth = 2;
    paths[1].add(canWidth*0.311, canHeight*0.301);
    paths[1].add(canWidth*0.3585, canHeight*0.2015);
    paths[1].add(canWidth*0.406, canHeight*0.301);
    paths[1].add(canWidth*0.3585, canHeight*0.3995);
    paths[1].closed = true;

    paths[2] = new Path();
    paths[2].strokeColor = 'rgb(255,255,178)';
    paths[2].strokeWidth = 3;
    paths[2].add(canWidth*0.406, canHeight*0.301);
    paths[2].add(canWidth*0.5, canHeight*0.102);
    paths[2].add(canWidth*0.595, canHeight*0.301);
    paths[2].add(canWidth*0.5, canHeight*0.5);
    paths[2].closed = true;

     paths[3] = new Path();
    paths[3].strokeColor = 'rgb(255,255,178)';
    paths[3].strokeWidth = 2;
    paths[3].add(canWidth*0.595, canHeight*0.301);
    paths[3].add(canWidth*0.6415, canHeight*0.2015);
    paths[3].add(canWidth*0.689, canHeight*0.301);
    paths[3].add(canWidth*0.6415, canHeight*0.3995);
    paths[3].closed = true;

     paths[4] = new Path();
    paths[4].strokeColor = 'rgb(255,255,178)';
    paths[4].strokeWidth = 1;
    paths[4].add(canWidth*0.689, canHeight*0.301);
    paths[4].add(canWidth*0.7265, canHeight*0.2215);
    paths[4].add(canWidth*0.764, canHeight*0.301);
    paths[4].add(canWidth*0.7265, canHeight*0.3795);
    paths[4].closed = true;

    paths[0].position.y+=50;
    paths[1].position.y+=50;
    paths[2].position.y+=50;
    paths[3].position.y+=50;
    paths[4].position.y+=50;
}
