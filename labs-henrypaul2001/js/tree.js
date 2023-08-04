class Tree {
    constructor(pPosition) {
        this.setPosition(pPosition);
    }
    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    drawTrunk(pContext) {
        pContext.beginPath();
        pContext.moveTo(this.getPosition().getX(), this.getPosition().getY());
        pContext.lineTo(this.getPosition().getX(), this.getPosition().getY() - 200);
        pContext.lineTo(this.getPosition().getX() + 30, this.getPosition().getY() - 200);
        pContext.lineTo(this.getPosition().getX() + 30, this.getPosition().getY());
        pContext.closePath();
        pContext.fillStyle = "#765C48";
        pContext.fill();
        secondContext.lineWidth = 3;
        pContext.stroke();
    }

    drawLeaves(pContext) {
        pContext.beginPath();
        pContext.arc(this.getPosition().getX() + 15, this.getPosition().getY() - 230, 75, 0, Math.PI * 2, false);
        pContext.fillStyle = "green";
        pContext.fill();
        pContext.stroke();
    }

    draw(pContext) {
        this.drawTrunk(pContext);
        this.drawLeaves(pContext);
    }
}