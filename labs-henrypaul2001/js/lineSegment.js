class LineSegment extends Shape {
    constructor(pPosition, pEndPoint, pColour, pThickness, pName) {
        super(pPosition, pName);
        this.SetColour(pColour);
        this.SetThickness(pThickness);
        this.SetEndPoint(pEndPoint);
        this.setDirection();
        this.setCollided(false);
        this.setType("segLine");
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
    setDirection() {
        this.mDirection = this.GetEndPoint().subtract(this.GetPosition()).normalise();
    }
    getDirection() {
        return this.mDirection;
    }
    getCollided() {
        return this.mCollide;
    }
    setCollided(pCollide) {
        this.mCollide = pCollide;
    }

    draw(pContext, pFirstLine, pFill) {
        if (!pFill) {
            pContext.beginPath();
            pContext.moveTo(this.GetPosition().getX(), this.GetPosition().getY());
        }

        if (pFirstLine == true) {
            pContext.moveTo(this.GetPosition().getX(), this.GetPosition().getY());
        }
        pContext.lineTo(this.GetEndPoint().getX(), this.GetEndPoint().getY());
        if (pFill == true) {
            return;
        }
        pContext.lineWidth = this.GetThickness();
        pContext.strokeStyle = this.GetColour();
        pContext.stroke();
    }

    Collide(pCircle) {
        var normalVector, adjacent, hypotenuse, dotProduct, closestPoint, collisionPoint, collisionCircle;

        hypotenuse = pCircle.GetPosition().subtract(this.GetPosition());
        adjacent = this.getDirection().dotProduct(hypotenuse);

        var subtractedPoints = pCircle.GetPosition().subtract(this.GetPosition());
        dotProduct = subtractedPoints.dotProduct(this.getDirection());
        closestPoint = this.GetPosition().add(this.getDirection().multiply(dotProduct));

        var distanceBetween = closestPoint.distanceBetween(this.GetPosition());
        var lineLength = this.GetPosition().distanceBetween(this.GetEndPoint());
        if (distanceBetween > lineLength) {
            var endPointDistance = pCircle.GetPosition().distanceBetween(this.GetEndPoint());
            if (endPointDistance < (pCircle.GetRadius() * pCircle.GetRadius())) {
                collisionPoint = "endPoint";
                collisionCircle = new StaticCircle(this.GetEndPoint(), this.GetThickness(), this.GetColour());
                let { collision, normal } = collisionCircle.Collide(pCircle);
                return { collision: collision, normal: normal};
            }
            else {
                collisionPoint = "after";
                return { collision: false, normal: normalVector};
            }
        }
        else if (Math.sign(dotProduct) == -1) {
            var startPointDistance = pCircle.GetPosition().distanceBetween(this.GetPosition());
            if (startPointDistance < (pCircle.GetRadius() * pCircle.GetRadius())) {
                collisionPoint = "startPoint";
                collisionCircle = new StaticCircle(this.GetPosition(), this.GetThickness(), this.GetColour());
                let { collision, normal } = collisionCircle.Collide(pCircle);
                return { collision: collision, normal: normal};
            }
            else {
                collisionPoint = "before";
                return { collision: false, normal: normalVector};
            }
        }

        var distance = pCircle.GetPosition().distanceBetween(closestPoint);
        if (distance < (pCircle.GetRadius() * pCircle.GetRadius())) {
            collisionPoint = "line";
            normalVector = pCircle.GetPosition().subtract(closestPoint).normalise();
            return { collision: true, normal: normalVector};
        }
        else {
            return { collision: false, normal: normalVector};
        }
    }
}