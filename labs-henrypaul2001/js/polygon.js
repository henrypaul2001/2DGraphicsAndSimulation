class Polygon {
    constructor(pVertices, pFillColour, pFill, pName) {
        this.setVertices(pVertices);
        this.setFillColour(pFillColour);
        this.setFill(pFill);
        this.mType = "poly";
        this.mName = pName;
    }
    setVertices(pVertices) {
        this.mVertices = pVertices;
    }
    getVertices() {
        return this.mVertices;
    }
    getFillColour() {
        return this.mFillColour;
    }
    setFillColour(pFillColour) {
        this.mFillColour = pFillColour
    }
    getNumberOfVertices() {
        return this.mVertices.length;
    }
    getVertex(pIndex) {
        return this.mVertices[pIndex];
    }
    setFill(pFill) {
        this.mFill = pFill;
    }
    getFill() {
        return this.mFill;
    }
    getCollidingObject() {
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            if (this.getVertex(i).getCollided() == true) {
                return this.getVertex(i);
            }
        }
        return false;
    }
    getType() {
        return this.mType;
    }
    getName() {
        return this.mName;
    }

    draw(pContext) {
        pContext.beginPath();
        var fillStyle = this.getFillColour();
        var firstLine = true;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            this.getVertex(i).draw(pContext, firstLine, this.getFill());
            firstLine = false;
        }

        if (this.getFill() == true) {
            pContext.fillStyle = fillStyle;
            pContext.fill();
            pContext.stroke();
        }
    }

    Collide(pCircle) {
        var normal;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            let { collision, normal } = this.getVertex(i).Collide(pCircle);
            if (collision) {
                this.getVertex(i).setCollided(true);
                return { collision: collision, normal: normal};
            }
            else {
                this.getVertex(i).setCollided(false);
            }
        }
        return { collision: false, normal: normal};
    }
}