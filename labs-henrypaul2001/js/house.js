class House {
    constructor(pPosition, pDoor, pRotation, pScale) {
        this.setPosition(pPosition);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.setDoorC(pDoor);
        this.initialiseSceneGraph();
    }
    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    getDoorC() {
        return this.mDoor;
    }
    setDoorC(pDoor) {
        this.mDoor = pDoor;
    }
    getRotation() {
        return this.mRotation;
    }
    setRotation(pRotation)
    {
        this.mRotation = pRotation;
    }
    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
    }
    getSceneGraphRoot() {
        return this.mRootNode;
    }
    setSceneGraphRoot(pSceneGraphNode) {
        this.mRootNode = pSceneGraphNode;
    }

    initialiseSceneGraph() {
        var localTranslation = Matrix.createTranslation(this.getPosition());
        var localRotation = Matrix.createRotation(this.getRotation());
        var localScale = Matrix.createScale(this.getScale());

        var translationNode = new TransformNode(localTranslation);
        var rotationNode = new TransformNode(localRotation);
        var scaleNode = new TransformNode(localScale);
        var houseGroup = new GroupNode();

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(houseGroup);

        var vertices = [];
        vertices.push(new LineSegment(new Vector(0, -150), new Vector(300, -150), "#000000", 5));
        vertices.push(new LineSegment(new Vector(300, -150), new Vector(300, 0), "#000000", 5));
        vertices.push(new LineSegment(new Vector(300, 0), new Vector(0, 0), "#000000", 5));
        vertices.push(new LineSegment(new Vector(0, 0), new Vector(0, -150), "#000000", 5));
        var wall = new Polygon(vertices, "#FFFDD0", true);
        var wallNode = new GeometryNode(wall);
        houseGroup.addChild(wallNode);
    
        var roofTranslation = Matrix.createTranslation(new Vector(0, -150));
        var roofTranslationNode = new TransformNode(roofTranslation);
        houseGroup.addChild(roofTranslationNode);

        vertices = [];
        vertices.push(new LineSegment(new Vector(0, 0), new Vector(150, -100), "#000000", 5));
        vertices.push(new LineSegment(new Vector(150, -100), new Vector(300, 0), "#000000", 5));
        vertices.push(new LineSegment(new Vector(300, 0), new Vector(0, 0), "#000000", 5));
        var roof = new Polygon(vertices, "red", true);
        var roofNode = new GeometryNode(roof);
        roofTranslationNode.addChild(roofNode);
    
        var doorTranslation = Matrix.createTranslation(new Vector(0, 50));
        var doorTranslationNode = new TransformNode(doorTranslation);
        houseGroup.addChild(doorTranslationNode);

        vertices = [];
        vertices.push(new LineSegment(new Vector(125, -150), new Vector(125, -50), "#000000", 5));
        vertices.push(new LineSegment(new Vector(125, -50), new Vector(175, -50), "#000000", 5));
        vertices.push(new LineSegment(new Vector(175, -50), new Vector(175, -150), "#000000", 5));
        vertices.push(new LineSegment(new Vector(175, -150), new Vector(125, -150), "#000000", 5));
        var door = new Polygon(vertices ,this.getDoorC(), true);
        var doorNode = new GeometryNode(door);
        doorTranslationNode.addChild(doorNode);
    
        var lWindowTranslation = Matrix.createTranslation(new Vector(0, 30));
        var lWindowTranslationNode = new TransformNode(lWindowTranslation);
        houseGroup.addChild(lWindowTranslationNode);

        var leftWindow = new Window();
        var lWindowNode = new GeometryNode(leftWindow);
        lWindowTranslationNode.addChild(lWindowNode);
    
        var rWindowTranslation = Matrix.createTranslation(new Vector(180, 30));
        var rWindowTranslationNode = new TransformNode(rWindowTranslation);
        houseGroup.addChild(rWindowTranslationNode);

        var rightWindow = new Window();
        var rWindowNode = new GeometryNode(rightWindow);
        rWindowTranslationNode.addChild(rWindowNode);

        this.setSceneGraphRoot(translationNode);
    }

    Update(pDeltaTime) {
        var housePosition = this.getPosition();
        this.setPosition(housePosition.add(new Vector(0.1, 0).multiply(pDeltaTime)));

        var houseRotation = this.getRotation();
        this.setRotation(houseRotation + (1 * pDeltaTime));

        var houseScale = this.getScale();
        this.setScale(houseScale.add(new Vector(-0.1, -0.1).multiply(pDeltaTime)));
        this.initialiseSceneGraph();
    }
}