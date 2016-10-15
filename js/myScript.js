

if(window.innerWidth!==768) {


    var dance;
    var canWidth = view.size.width;
    var canHeight = view.size.height;
    var toSurround = false;
    var smallScreen = true;

    function onResize(event) {
        canWidth = view.size.width;
        canHeight = view.size.height;
    }

    if (canWidth > 1024) {
        dance = true;
        smallScreen = false;
    }
    if (canWidth > 600 && canWidth < 1024) {
        var count = Math.round(canWidth / 20);
    } else {
        var count = Math.round(canWidth / 17);
    }
    var segments = [];
    var symbols = [];
    var goToPoint = false;
    var slow = true;
    var frolic = false;
    for (var i = 0; i < count; i++) {
        var radius = 4 + (i / 15);
        var center = Point.random() * (view.size - 20) + 10;
        symbols[i] = new Path.Circle({
            center: center,
            blowOut: true,
            vector: Point(),
            radius: radius
        });
        symbols[i].fillColor = {
            gradient: {
                stops: [[{hue: 60, saturation: 1, brightness: 1, alpha: 1}, 0.05], [{
                    hue: 60,
                    saturation: 0.5,
                    brightness: 1,
                    alpha: 0.5
                }, 0.1], [{alpha: 0}, 1]],
                radial: true
            },
            origin: center,
            destination: symbols[i].bounds.rightCenter
        };
        symbols[i].radius = radius;
        symbols[i].color = symbols[i].fillColor;
        symbols[i].relationPoints = [];
        symbols[i].relations = [];

        if (i > 100) {
            symbols[i].alpha = Math.random();
        } else {
            symbols[i].alpha = 1;
        }
        var vector = new Point({
            angle: 360 * Math.random(),
            length: i / 200
        });
        symbols[i].vector = vector;
        segments[i] = [new Point(center)];
    }

    var leftTop = new Point(canWidth * 0.325 - 10, canHeight * 0.35 - 10);
    var rightTop = new Point(canWidth * 0.675 + 10, canHeight * 0.35 - 10);
    var rightBottom = new Point(canWidth * 0.675 + 10, canHeight * 0.65 + 10);
    var leftBottom = new Point(canWidth * 0.325 - 10, canHeight * 0.65 + 10);

    var surround = new Path();
    surround.addSegments([[leftTop], [rightTop], [rightBottom], [leftBottom]]);

    var pointMouse = new Point(view.center);

    var path = new Path(segments);

    function onFrame(event) {
        if (!onFrameOff) {
            frameloop()
        }

    }

    var path1;
    var correctPath = false;
    $(".logo-cont").click(function () {
        toSurround = !toSurround;
        goToPoint = false;
    });

    function onMouseDown(event) {
        toSurround = false;
        if (frolic) {
            frolic = false;
        }
        pointMouse = event.point;
        if (path1) {
            path1.remove();
        }
        path1 = new Path({
            alpha: 0.5,
            segments: [event.point],
            strokeColor: {
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
            },
            strokeWidth: 10,
            nearPointNum: []
        });
    }

    function onMouseDrag(event) {
        if (!smallScreen) {
            if (!goToPoint) {
                path1.addSegment(event.point);
            }
            if (path1.segments.length > 3) {
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
        slow = !slow;
        if (path1.segments.length > 3) {
            correctPath = true;
        } else {
            correctPath = false;
        }
        if (path1.segments.length > 3) {
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
                origin: path1.segments[Math.round(path1.segments.length / 2)].point
            };
            path1.smooth();
        }
        for (var i = 0; i < count; i++) {
            var minDist = 9999999;
            for (var j = 0; j < path1.segments.length - 1; j++) {
                var dist = path.segments[i].point.getDistance(path1.segments[j].point);
                if (dist < minDist) {
                    minDist = dist;
                    path1.nearPointNum[i] = j;
                }
            }
        }
    }


    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    function frameloop() {

        for (var i = 0; i < count; i++) {
            var item = symbols[i];
            item.position += item.vector;
            if (item.bounds.right > canWidth) {
                item.vector.angle = 180 - item.vector.angle;
            }
            if (item.bounds.left < 0) {
                item.vector.angle = 180 - item.vector.angle;
            }
            if (item.bounds.bottom > canHeight) {
                item.vector.angle = -item.vector.angle;
            }
            if (item.bounds.top < 0) {
                item.vector.angle = -item.vector.angle;
            }
            path.segments[i].point = item.position;
            item.fillColor = item.color;

            if (dance && getInternetExplorerVersion() === -1) {
                for (var j = 0; j < count; j++) {
                    if (j !== i) {
                        var dist = path.segments[i].point.getDistance(path.segments[j].point);
                        if (dist < 40) {
                            if (dist < item.radius + symbols[j].radius && dist != 0) {
                                var overlap = item.radius + symbols[j].radius - dist;
                                var direc = (item.position - symbols[j].position).normalize(overlap * 0.01);
                                item.vector += direc;
                                symbols[j].vector -= direc;
                            }
                            if (frolic && !toSurround) {
                                var overlap = item.radius + symbols[j].radius - dist;
                                var direc = (item.position - symbols[j].position).normalize(overlap * 0.0005);
                                item.vector += direc;
                                symbols[j].vector -= direc;
                            }
                        }
                    }
                }
            }
            if (goToPoint && path1.segments.length < 3) {

                var directToMousebig = pointMouse - item.position;
                var directToMouse = directToMousebig.normalize(0.1);
                item.vector += directToMouse;
                item.vector -= item.vector / 1000;
            }
            if (goToPoint && path1.segments.length > 3) {
                var directToPathBig = item.position - path1.segments[path1.nearPointNum[i]].point;
                var directToPath = directToPathBig.normalize(10 * 0.01);
                item.vector -= directToPath;
                if (item.vector.length > 1) {
                    item.vector -= item.vector / 100;
                }
            }

            if (slow && item.vector.length > 3) {
                item.vector -= item.vector / 100;
            }
            if (toSurround) {

                var numberSigment = 1;
                if (item.position.x < 0.675 * canWidth &&
                    item.position.y < 0.35 * canHeight) {
                    numberSigment = 1;
                }
                if (item.position.x > 0.675 * canWidth &&
                    item.position.y < 0.65 * canHeight
                ) {
                    numberSigment = 2;
                }
                if (item.position.x > 0.325 * canWidth &&
                    item.position.y > 0.65 * canHeight
                ) {
                    numberSigment = 3;
                }
                if (item.position.x < 0.325 * canWidth &&
                    item.position.y > 0.35 * canHeight
                ) {
                    numberSigment = 0;
                }
                var directToFirst = item.position - surround.segments[numberSigment].point;
                var directToFirst = directToFirst.normalize(0.1);
                item.vector -= directToFirst;
                if (item.vector.length > 1) {
                    item.vector -= item.vector / 70;
                }
            }
        }
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
}