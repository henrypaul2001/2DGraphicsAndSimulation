class Cloud {
    constructor(pPosition) {
        this.setPosition(pPosition);
    }
    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    draw(pContext) {
        pContext.beginPath();
        pContext.moveTo(this.getPosition().getX(), this.getPosition().getY());
        pContext.lineTo(this.getPosition().getX() + 90, this.getPosition().getY());
        pContext.arc(this.getPosition().getX() + 90, this.getPosition().getY() - 25, 25, 1.5, 3.9, true);
        pContext.arc(this.getPosition().getX() + 47.4, this.getPosition().getY() - 42.6, 25, 0, 3.1, true);
        pContext.arc(this.getPosition().getX() + 5, this.getPosition().getY() - 25, 25, 5.5, 1.5, true);
        pContext.fillStyle = "white";
        pContext.fill();
        pContext.stroke();
    }
}