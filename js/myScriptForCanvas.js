/**
 * Created by AlexBogdan on 29.09.2016.
 */
function Firefly(r, p, v) {
    this.path =  new Path.Circle(new Point(p), r);
    this.point = p;
    this.path.position = p;
    this.path.vector = v;
    this.path.radius = r;
    this.path.fillColor = {
        gradient: {
            stops: [[{hue:60, saturation: 1, brightness: 1, alpha:1}, 0.05], [{hue:60, saturation: 0.5, brightness: 1, alpha:0.5}, 0.1], [{alpha:0},1]],
            radial: true
        },
        origin: this.point,
        destination: this.path.bounds.rightCenter
    };
}

Firefly.prototype = {
    iterate: function() {
        this.bounce();
        this.point += this.path.vector;
    },

    react: function(b) {
        var dist = this.point.getDistance(b.point);
        if (dist < this.path.radius + b.path.radius && dist != 0) {
            var overlap = this.path.radius + b.path.radius - dist;
            this.path.vector += (this.point - b.point).normalize(overlap * 0.01);
       }
    },

    bounce: function() {
        var item = this.path;

        if (item.bounds.right >= canWidth) {
            item.vector.angle = 180 - item.vector.angle;
            this.point.x -=0.1;
        }
        if (item.bounds.left <= 0) {
            item.vector.angle = 180 - item.vector.angle;
           this.point.x+=0.1;
        }
        if (item.bounds.bottom >= canHeight ) {
            item.vector.angle = -item.vector.angle;
           this.point.y-=0.1;
        }
        if (item.bounds.top <= 0  ) {
            item.vector.angle = -item.vector.angle;
           this.point.y += 0.1;
        }
    },

    goToPoint: function (pointMouse) {
        var directToMousebig = pointMouse - this.point;
        this.path.vector += directToMousebig.normalize(0.1);
        if (this.path.vector.length > 3) {
            this.path.vector -= this.path.vector / 100;
        }
    },

    goToPath: function (path1,i) {

        var directToPathBig =  this.point - path1.segments[path1.nearPointNum[i]].point ;

        this.path.vector -= directToPathBig.normalize(0.1);
        if (this.path.vector.length > 1) {
            this.path.vector -= this.path.vector / 100;
        }
    },

    goToSurround: function () {
        var numberSigment = 1;
        if (this.point.x < 0.675 * canWidth &&
            this.point.y < 0.35 * canHeight) {
            numberSigment = 1;
        }
        if (this.point.x > 0.675 * canWidth &&
            this.point.y < 0.65 * canHeight
        ) {
            numberSigment = 2;
        }
        if (this.point.x > 0.325 * canWidth &&
            this.point.y > 0.65 * canHeight
        ) {
            numberSigment = 3;
        }
        if (this.point.x < 0.325 * canWidth &&
            this.point.y > 0.35 * canHeight
        ) {
            numberSigment = 0;
        }
        var directToFirst = this.point - surround.segments[numberSigment].point;
        this.path.vector -= directToFirst.normalize(0.08);
        if (this.path.vector.length > 1) {
            this.path.vector -=this.path.vector /((Math.random()*50)+ 30);
        }
    }
};

var
 dance,
 smallScreen = true,
 canWidth,
 canHeight,
 numFireflys,
 fireflys = [],
 path1,
 goToPath = false,
 toSurround = false,
 leftTop,
 rightTop,
 rightBottom,
 leftBottom,
 surround,
 pointMouse,
 goToPoint = false,
 explorer = getInternetExplorerVersion();

getCanSize();
getNumFireflys();

function onResize(){
    getCanSize();
    surround.remove();
    createSurroundPath();
}

createSurroundPath();

for (var i = 0; i < numFireflys; i++) {
    var position = Point.random() * (view.size-20) +10;
    var vector = new Point({
        angle: 360 * Math.random(),
        length: i/200
    });
    var radius = 5+(i/15);
    fireflys.push(new Firefly(radius, position, vector));
}

$( '.logo-cont' ).click(function() {
    toSurround = !toSurround;
    goToPoint = false;
});
console.log(getInternetExplorerVersion());

function onFrame()  {
        fireflys.forEach(function(item, index, fireflys) {
            item.iterate();
            if (toSurround){
                item.goToSurround();
            }
            if (goToPoint && goToPath ) {
                item.goToPath(path1,index);
            }
            if (goToPoint && !goToPath){
                item.goToPoint(pointMouse);
            }
            else{
            if (dance && explorer===-1) {
                    fireflys.forEach(function(itemJ){
                        item.react(itemJ);
                    });
                }
            }
            item.path.position = item.point;
        });
    if (goToPoint || toSurround && path1) {
        if (path1.alpha > 0) {
            path1.alpha -= 0.005;
        }
        path1.strokeColor.gradient.stops =
            [[{hue: 60, saturation: 1, brightness: 1, alpha: path1.alpha * 2}, 0.05],
                [{hue: 60, saturation: 0.5, brightness: 1, alpha: path1.alpha}, 0.1],
                [{alpha: 0}, 1]];
    }
}

function onMouseDown(event) {
    toSurround = false;
    goToPath = false;
    pointMouse = event.point;
    if (path1) {
        path1.remove();
    }
    path1= new Path({
        alpha:0.5,
        segments: [event.point],
        strokeColor: {
            gradient: {
                stops: [[{hue:60, saturation: 1, brightness: 1, alpha:1}, 0.05], [{hue:60, saturation: 0.5, brightness: 1, alpha:0.5}, 0.1], [{alpha:0},1]],
                radial: true
            },
            origin: event.point
        },
        strokeWidth: 10,
        nearPointNum: []
    });
}
function onMouseDrag(event) {
    if (!smallScreen) {
        path1.addSegment(event.point);
        if (path1.segments.length > 5) {
            path1.strokeColor = {
                gradient: {
                    stops: [[{hue: 60, saturation: 1, brightness: 1, alpha: 1}, 0.05], [{
                        hue: 60,
                        saturation: 0.5,
                        brightness: 1,
                        alpha: 0.5
                    }, 0.1], [{alpha: 0}, 1]],
                    radial: true
                },
                origin: event.point
            };
        }
        path1.smooth();
    }
}

function onMouseUp() {
    goToPoint = !goToPoint;
    if (path1.segments.length>5){
        path1.strokeColor = {
            gradient: {
                stops: [[{hue:60, saturation: 1, brightness: 1, alpha:1}, 0.05], [{hue:60, saturation: 0.5, brightness: 1, alpha:0.5}, 0.1], [{alpha:0},1]],
                radial: true
            },
            origin: path1.segments[Math.round(path1.segments.length/2)].point
        };
        path1.smooth();
        goToPath = true;
    }

    for (var i= 0; i <numFireflys; i++) {
        var minDist = 9999999;
        for (var j= 0; j <path1.segments.length-1; j++) {
            var dist = fireflys[i].point.getDistance(path1.segments[j].point);
            if(dist<minDist){
                minDist = dist;
                path1.nearPointNum[i] = j;
            }
        }
    }
}

function getInternetExplorerVersion()
{
    var ua;
    var re;
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        ua = navigator.userAgent;
        re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        ua = navigator.userAgent;
        re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

function createSurroundPath() {
    leftTop  = new Point(canWidth*0.325-10,canHeight*0.35-10);
    rightTop = new Point(canWidth*0.675+10,canHeight*0.35-10);
    rightBottom = new Point(canWidth*0.675+10,canHeight*0.65+10);
    leftBottom = new Point(canWidth*0.325-10,canHeight*0.65+10);
    surround = new Path();
    surround.addSegments([[leftTop], [rightTop], [rightBottom], [leftBottom]]);
}

function getCanSize() {
    canWidth = view.size.width;
    canHeight = view.size.height;
    if (canWidth>1024){
        dance = true;
        smallScreen=false;
    }
}

function getNumFireflys() {
    if (canWidth>600&&canWidth<1024){
        numFireflys = Math.round(canWidth/20);
    }else{
        numFireflys = Math.round(canWidth/17);
    }
    if(explorer!==-1){
        numFireflys = numFireflys/1.5;
    }
}