class StaticLine extends Shape {
    constructor(pPosition, pEndPoint, pColour, pThickness, pName) {
        super(pPosition, pName);
        this.SetColour(pColour);
        this.SetThickness(pThickness);
        this.SetEndPoint(pEndPoint);
        this.setType("statLine");
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
        var normalVector;
        var subtractedVectors;
        // Right line
        if ((700 - pCircle.GetPosition().getX()) < pCircle.GetRadius() && this.GetName() == "right") {
            subtractedVectors = pCircle.GetPosition().subtract(new Vector(-700, pCircle.GetPosition().getY()));
            normalVector = subtractedVectors.normalise();
            return { collision: true, normal: normalVector};
        }
        
        // Left line
        if ((pCircle.GetPosition().getX() - 100) < pCircle.GetRadius() && this.GetName() == "left") {
            subtractedVectors = pCircle.GetPosition().subtract(new Vector(100, pCircle.GetPosition().getY()));
            normalVector = subtractedVectors.normalise();
            return { collision: true, normal: normalVector};
        }

        // Top line
        if ((pCircle.GetPosition().getY() - 100) < pCircle.GetRadius() && this.GetName() == "top") {
            subtractedVectors = pCircle.GetPosition().subtract(new Vector(pCircle.GetPosition().getX(), 100));
            normalVector = subtractedVectors.normalise();
            return { collision: true, normal: normalVector};
        }

        // Bottom line
        if ((500 - pCircle.GetPosition().getY()) < pCircle.GetRadius() && this.GetName() == "bottom") {
            subtractedVectors = pCircle.GetPosition().subtract(new Vector(pCircle.GetPosition().getX(), -500));
            normalVector = subtractedVectors.normalise();
            return { collision: true, normal: normalVector};
        }

        return { collision: false, normal: normalVector};
    }
}