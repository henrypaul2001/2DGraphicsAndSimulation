class Window {
    constructor() {}

    draw(pContext) {
        pContext.beginPath();
        pContext.moveTo(35, -130);
        pContext.lineTo(85, -130);
        pContext.lineTo(85, -50);
        pContext.lineTo(35, -50);
        pContext.lineTo(35, -130);
        pContext.closePath();
        pContext.fillStyle = "#67B7D1";
        pContext.fill();
        
        pContext.moveTo(60, -130);
        pContext.lineTo(60, -50);
        pContext.moveTo(35, -90);
        pContext.lineTo(85, -90);
        pContext.stroke();
    }
}