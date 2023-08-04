class PhysicsCircle {
    constructor(pPosition, pRadius, pVelocity, pColour, pName, pMass) {
        this.SetPosition(pPosition);
        this.SetRadius(pRadius);
        this.SetVelocity(pVelocity);
        this.SetOldPos(pPosition);
        this.SetColour(pColour);
        this.SetMass(pMass);
        this.mType = "physCircle";
        this.mName = pName;
    }

    SetPosition(pPosition) {
        this.mPosition = pPosition;
    }
    GetPosition() {
        return this.mPosition;
    }
    SetOldPos(pPosition) {
        this.mOldPosition = pPosition;
    }
    GetOldPos() {
        return this.mOldPosition;
    }
    SetRadius(pRadius) {
        this.mRadius = pRadius;
    }
    GetRadius() {
        return this.mRadius;
    }
    SetVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }
    GetVelocity() {
        return this.mVelocity;
    }
    SetColour(pColour) {
        this.mColour = pColour;
    }
    GetColour() {
        return this.mColour;
    }
    getType() {
        return this.mType;
    }
    getName() {
        return this.mName;
    }
    SetMass(pMass) {
        this.mMass = pMass;
    }
    GetMass() {
        return this.mMass;
    }

    draw(pContext) {
        pContext.beginPath();
        pContext.arc(this.GetPosition().getX(), this.GetPosition().getY(), this.GetRadius(), 0, Math.PI * 2, false);
        pContext.fillStyle = this.GetColour();
        pContext.fill();
        pContext.strokeStyle = "#000000";
        pContext.lineWidth = 5;
        pContext.stroke();
    }

    CollisionResponse(pNormal, pCollidableObjects, pIndex) {
        var collidingObject = pCollidableObjects[pIndex];

        if (collidingObject.getType() == "physCircle") {
            var currentVelocity = this.GetVelocity();
            var otherCurrentVelocity = collidingObject.GetVelocity();
            // Moving circle collision
            var hypotenuse = this.GetVelocity();
            var otherHypotenuse = collidingObject.GetVelocity();
            var negativeNormal = new Vector(-pNormal.getX(), -pNormal.getY());
            var dotProduct = hypotenuse.dotProduct(pNormal);
            var otherDotProduct = otherHypotenuse.dotProduct(negativeNormal);

            var thisMass = this.GetMass();
            var otherMass = collidingObject.GetMass();

            var v1 = ((thisMass * dotProduct) + (otherMass * otherDotProduct) + (otherMass * (otherDotProduct - dotProduct))) / (thisMass + otherMass);
            var v2 = ((thisMass * dotProduct) + (otherMass * otherDotProduct) + (thisMass * (dotProduct - otherDotProduct))) / (thisMass + otherMass);
            
            var parVelocity1 = pNormal.multiply(v1);
            var perpVelocity1 = currentVelocity.subtract(parVelocity1);

            var parVelocity2 = negativeNormal.multiply(v2);
            var perpVelocity2 = otherCurrentVelocity.subtract(parVelocity2);
            
            //var addedVelocity = currentVelocity.add(otherCurrentVelocity);
            

            //var parVelocity = pNormal.multiply(v1 + v2);
            //var perpVelocity = currentVelocity.subtract(parVelocity);
            
            //var parVelocity = parVelocity1.add(parVelocity2);
            //var perpVelocity = perpVelocity1.add(perpVelocity2);

            //var perpVelocity = addedVelocity.subtract(parVelocity);
            
            if (thisMass != otherMass) {
                this.SetVelocity(perpVelocity1.add(parVelocity2)); //perpVelocity
                collidingObject.SetVelocity(perpVelocity2.add(parVelocity1)); //parVelocity
            }
            else {
                this.SetVelocity(perpVelocity1); //perpVelocity
                collidingObject.SetVelocity(perpVelocity2); //parVelocity
            }
        }
        else {
            // I'm not sure if this is right but I think it is
            var currentVelocity = this.GetVelocity();
            var negativeNormal = new Vector(-pNormal.getX(), -pNormal.getY());
            var adjacent = negativeNormal.dotProduct(currentVelocity);
            var newVelocity = pNormal.multiply(adjacent).multiply(2).add(currentVelocity);

            // Collision response
            this.SetVelocity(newVelocity);
        }

        if (pCollidableObjects[pIndex].getType() == "poly") {
            collidingObject = collidingObject.getCollidingObject();
        }
        this.SetColour(collidingObject.GetColour());
    }

    Update(pDeltaTime, pCollidableObjects) {
        var currentPos = this.GetPosition();
        this.SetOldPos(currentPos);

        var affectedVel = this.GetVelocity().multiply(pDeltaTime);
        var newPos = currentPos.add(affectedVel);
        this.SetPosition(newPos);

        // Collision detection
        for (var i = 0; i < pCollidableObjects.length; i++) {
            if (this.getName() == pCollidableObjects[i].getName()) {
                continue;
            }
            else {
                let { collision, normal } = pCollidableObjects[i].Collide(this);
                if (collision) {
                    this.SetPosition(this.GetOldPos());
                    this.CollisionResponse(normal, pCollidableObjects, i);
                }
            }
        }
    }

    Collide(pOtherCircle) {
        var centre = this.GetPosition();
        var otherCentre = pOtherCircle.GetPosition();
        var distance = centre.distanceBetween(otherCentre);
        var radii = (this.GetRadius() + pOtherCircle.GetRadius())
        var normalVector, subtractedCentres;
        if (distance < (radii * radii)) {
            subtractedCentres = otherCentre.subtract(centre);
            normalVector = subtractedCentres.normalise();
            return { collision: true, normal: normalVector};
        }
        else {
            return { collision: false, normal: normalVector};
        }
    }
}