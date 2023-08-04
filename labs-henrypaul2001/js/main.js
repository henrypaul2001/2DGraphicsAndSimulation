// the window load event handler
function onLoad() {
    var mainCanvas, mainContext, rootNode, house, bouncyCircle, staticCircle, staticCircle2;
    var lastTime = Date.now();
    visitor = new RenderVisitor();
    // this function will initialise our variables
    function initialiseCanvasContext() {
        // Find the canvas element using its id attribute.
        mainCanvas = document.getElementById('mainCanvas');
        secondCanvas = document.getElementById('secondCanvas');
        // if it couldn't be found
        if (!mainCanvas) {
            // make a message box pop up with the error.
            alert('Error: I cannot find the main canvas element');
            return;
        }
        else if (!secondCanvas) {
            // make a message box pop up with the error.
            alert('Error: I cannot find the second canvas element');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        secondContext = secondCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context');
            return;
        }
        else if (!secondContext) {
            alert('Error: failed to get context');
            return;            
        }
    }

    function initialiseSceneGraph() {
        origin = new Vector((mainCanvas.width * 0.5), (mainCanvas.height * 0.5));
        originMatrix = Matrix.createTranslation(origin);
        rootNode = new TransformNode(originMatrix);

        rootNode.addChild(house.getSceneGraphRoot());
    }

    // this function will actually draw on the canvas
    function draw() {
        origin = new Vector(0, 0);
        matrix = Matrix.createTranslation(origin);
        mainContext.setTransform(matrix);
        // set the draw fill style colour to grey
        mainContext.fillStyle = "blue";

        // fill the canvas with grey
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

        // choose a line width
        mainContext.lineWidth = 5;

        // set the line join
        mainContext.lineJoin = 'round';

        initialiseSceneGraph();
        rootNode.accept(visitor, mainContext);
        
        origin = new Vector((mainCanvas.width * 0.5) - 150, (mainCanvas.height * 0.5) + 100);
        matrix = Matrix.createTranslation(origin);
        sun = new Sun();
        sun.draw(mainContext, matrix);

        point1 = new Vector(100, 20, 1);
        point2 = new Vector(150, 30, 1);
        point3 = new Vector(200, 150, 1);
        point4 = new Vector(250, 330, 1);
        point5 = new Vector(90, 520, 1);
        points = [point1, point2, point3, point4, point5];
        curve = new BezierCurve(points);
        curve.draw(mainContext);




        // Second canvas

        // set the draw fill style colour to grey
        secondContext.fillStyle = "blue";

        // fill the canvas with grey
        secondContext.fillRect(0, 0, secondCanvas.width, secondCanvas.height);

        // choose a line width
        secondContext.lineWidth = 5;

        // set the line join
        secondContext.lineJoin = 'round';

        drawGrid(secondContext);
        drawBox(lines, secondContext);

        //draw physics circle
        bouncyCircle.draw(secondContext);

        staticCircle.draw(secondContext);
        staticCircle2.draw(secondContext);

        rampPolygon.draw(secondContext);
        segmentedLine3.draw(secondContext, false);

        bouncyCircle2.draw(secondContext);
        bouncyCircle3.draw(secondContext);

        bouncyCircle4.draw(secondContext);
        bouncyCircle5.draw(secondContext);

        bouncyCircle6.draw(secondContext);
        bouncyCircle7.draw(secondContext);

        bouncyCircle8.draw(secondContext);
        bouncyCircle9.draw(secondContext);

        borderLineBottom.draw(secondContext);
        borderLineLeft.draw(secondContext);
        borderLineRight.draw(secondContext);
        borderLineTop.draw(secondContext);

        subBorderTop.draw(secondContext);
        subBorderBottom.draw(secondContext);
    }

    function update(deltaTime) {
        deltaTime = deltaTime / 1000;

        for (var i = 0; i < updateableObjects.length; i++) {
            updateableObjects[i].Update(deltaTime, collidableObjects);
        }
    }
    
    function animationLoop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        update(deltaTime);
        draw();
        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    function drawGrid(pContext) {
        pContext.beginPath();
        pContext.moveTo(100, 0);
        pContext.lineTo(100, 600);
        pContext.moveTo(200, 0);
        pContext.lineTo(200, 600);
        pContext.moveTo(300, 0);
        pContext.lineTo(300, 600);
        pContext.moveTo(400, 0);
        pContext.lineTo(400, 600);
        pContext.moveTo(500, 0);
        pContext.lineTo(500, 600);
        pContext.moveTo(600, 0);
        pContext.lineTo(600, 600);
        pContext.moveTo(700, 0);
        pContext.lineTo(700, 600);

        pContext.moveTo(0, 100);
        pContext.lineTo(800, 100);
        pContext.moveTo(0, 200);
        pContext.lineTo(800, 200);
        pContext.moveTo(0, 300);
        pContext.lineTo(800, 300);
        pContext.moveTo(0, 400);
        pContext.lineTo(800, 400);
        pContext.moveTo(0, 500);
        pContext.lineTo(800, 500);
        pContext.lineWidth = 1;
        pContext.strokeStyle = "#000000";
        pContext.stroke();
    }

    function drawBox(pLines, pContext) {
        for(var i = 0; i < pLines.length; i++) {
            pLines[i].draw(pContext, true, false);
        }
    }

    var circlePos = new Vector(250, 350, 1);
    var circleRad = 35.0;
    var circleVel = new Vector(250, -100, 0);
    bouncyCircle = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "1", 50);

    circlePos = new Vector(600, 400, 1);
    circleRad = 75.0;
    staticCircle = new StaticCircle(circlePos, circleRad, "red", "circle1");

    circlePos = new Vector(200, 200, 1);
    circleRad = 25.0;
    staticCircle2 = new StaticCircle(circlePos, circleRad, "orange", "circle2");

    var lines = new Array();
    rightLine = new LineSegment(new Vector(700, 100), new Vector(700, 500), "#00FF00", 7, "line1")
    leftLine = new LineSegment(new Vector(100, 100), new Vector(100, 500), "#FF0000", 7, "line2")
    topLine = new LineSegment(new Vector(100, 100), new Vector(700, 100), "#FE019A", 7, "line3")
    bottomLine = new LineSegment(new Vector(100, 500), new Vector(700, 500), "#FFA500", 7, "line4")
    lines.push(rightLine, leftLine, topLine, bottomLine);

    // new polygon
    var rampPoly = new Array();
    var segmentedLine1 = new LineSegment(new Vector(200, 400), new Vector(400, 400), "red", 7, "line5");
    var segmentedLine2 = new LineSegment(new Vector(400, 400), new Vector(550, 300), "#4DFF18", 7, "line6");
    rampPoly.push(segmentedLine1, segmentedLine2);

    var rampPolygon = new Polygon(rampPoly, "#000000", false, "poly1");

    var segmentedLine3 = new LineSegment(new Vector(350, 275), new Vector(550, 175), "#FFFB00", 7, "line7");

    circlePos = new Vector(50, 200, 1);
    circleRad = 35.0;
    circleVel = new Vector(0, 0, 0);
    bouncyCircle2 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "2", circleRad);

    circlePos = new Vector(50, 400, 1);
    circleRad = 35.0;
    circleVel = new Vector(0, -300, 0);
    bouncyCircle3 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "3", circleRad);

    circlePos = new Vector(750, 100, 1);
    circleRad = 20.0;
    circleVel = new Vector(10, -250, 0);
    bouncyCircle4 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "4", circleRad);

    circlePos = new Vector(750, 500, 1);
    circleRad = 25.0;
    circleVel = new Vector(0, -300, 0);
    bouncyCircle5 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "5", circleRad);

    circlePos = new Vector(150, 50, 1);
    circleRad = 20.0;
    circleVel = new Vector(300, -25, 0);
    bouncyCircle6 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "6", circleRad);

    circlePos = new Vector(150, 550, 1);
    circleRad = 15.0;
    circleVel = new Vector(250, 15, 0);
    bouncyCircle7 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "7", circleRad);

    circlePos = new Vector(450, 50, 1);
    circleRad = 22.0;
    circleVel = new Vector(-300, 50, 0);
    bouncyCircle8 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "8", circleRad);

    circlePos = new Vector(450, 550, 1);
    circleRad = 17.0;
    circleVel = new Vector(-250, -50, 0);
    bouncyCircle9 = new PhysicsCircle(circlePos, circleRad, circleVel, "white", "9", circleRad);

    var borderLineLeft = new LineSegment(new Vector(0, 0), new Vector(0, 600), "#FE019A", 5, "line8");
    var borderLineBottom = new LineSegment(new Vector(0, 600), new Vector(800, 600), "#FFA500", 5, "line9");
    var borderLineRight = new LineSegment(new Vector(800, 600), new Vector(800, 0), "#00FF00", 5, "line10");
    var borderLineTop = new LineSegment(new Vector(800, 0), new Vector(0, 0), "#FF0000", 5, "line11");

    var subBorderTop = new LineSegment(new Vector(100, 0), new Vector(100, 100), "#00FF17", 5, "line12");
    var subBorderBottom = new LineSegment(new Vector(100, 500), new Vector(100, 600), "#00FFF3", 5, "line13");

    house = new House(new Vector(-150, 100), "#964B00", 0, new Vector(1, 1));

    var collidableObjects = new Array();
    var updateableObjects = new Array();

    updateableObjects.push(house, bouncyCircle, bouncyCircle2, bouncyCircle3, bouncyCircle4, bouncyCircle5, bouncyCircle6, bouncyCircle7, bouncyCircle8, bouncyCircle9);
    collidableObjects.push(rightLine, leftLine, topLine, bottomLine, staticCircle, staticCircle2, rampPolygon, segmentedLine3, bouncyCircle2, bouncyCircle3, borderLineLeft, borderLineBottom, borderLineRight, borderLineTop, bouncyCircle4, bouncyCircle5, subBorderBottom, subBorderTop, bouncyCircle6, bouncyCircle7, bouncyCircle8, bouncyCircle9);

    initialiseCanvasContext();
    animationLoop();
}

window.addEventListener('load', onLoad, false);
