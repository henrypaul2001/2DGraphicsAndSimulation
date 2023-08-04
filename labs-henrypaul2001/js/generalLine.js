class GeneralLine extends Shape {
    constructor(pPosition, pPoint1, pPoint2, pEndPoint, pColour, pThickness, pName) {
        super(pPosition, pName);
        this.setPoint1(pPoint1);
        this.setPoint2(pPoint2);
        this.setDirection();
        this.SetColour(pColour);
        this.SetThickness(pThickness);
        this.SetEndPoint(pEndPoint);
        this.setType("generalLine");
    }

    setPoint1(pPoint) {
        this.mPoint = pPoint;
    }
    getPoint1() {
        return this.mPoint;
    }
    setPoint2(pPoint) {
        this.mPoint2 = pPoint;
    }
    getPoint2() {
        return this.mPoint2;
    }
    setDirection() {
        this.mDirection = this.getPoint2().subtract(this.getPoint1()).normalise();
    }
    getDirection() {
        return this.mDirection;
    }
    SetColour(pColour) {
        this.mColour = pColour;
    }
    GetColour() {
        return this.mColour;
    }
    SetThickness(pThickness) {
        this.mThickness = pThickness;
    }
    GetThickness() {
        return this.mThickness;
    }
    SetEndPoint(pEndPoint) {
        this.mEndPoint = pEndPoint;
    }
    GetEndPoint() {
        return this.mEndPoint;
    }

    draw(pContext) {
        pContext.beginPath();
        pContext.moveTo(this.GetPosition().getX(), this.GetPosition().getY());
        pContext.lineTo(this.GetEndPoint().getX(), this.GetEndPoint().getY());
        pContext.lineWidth = this.GetThickness();
        pContext.strokeStyle = this.GetColour();
        pContext.stroke();
    }

    Collide(pCircle) {
        var normalVector, adjacent, hypotenuse, dotProduct, closestPoint;

        hypotenuse = pCircle.GetPosition().subtract(this.getPoint1());
        adjacent = this.getDirection().dotProduct(hypotenuse);

        var subtractedPoints = pCircle.GetPosition().subtract(this.getPoint1());
        dotProduct = subtractedPoints.dotProduct(this.getDirection());
        closestPoint = this.getPoint1().add(this.getDirection().multiply(dotProduct));
        var distance = pCircle.GetPosition().distanceBetween(closestPoint);
        if (distance < (pCircle.GetRadius() * pCircle.GetRadius())) {
            normalVector = pCircle.GetPosition().subtract(closestPoint).normalise();
            return { collision: true, normal: normalVector};
        }
        else {
            return { collision: false, normal: normalVector};
        }
    }
}