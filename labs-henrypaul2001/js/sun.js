class Sun {
    drawBall(pContext) {
        pContext.beginPath();
        pContext.arc(0, 0, 100, 0, 25, false)
        pContext.fillStyle = "orange";
        pContext.fill();
        pContext.stroke();
    }

    drawTriangle(pContext) {
        pContext.beginPath();
        pContext.moveTo(0, 0);
        pContext.lineTo(40, -15);
        pContext.lineTo(0, -30);
        pContext.closePath();
        pContext.fillStyle = "orange";
        pContext.fill();
        pContext.stroke();
    }

    draw(pContext, pMatrix) {
        matrix = Matrix.createTranslation(new Vector(-250, -400));
        matrix = matrix.multiply(pMatrix);
        matrix.setTransform(pContext);
        this.drawBall(pContext, pMatrix);


        matrix = Matrix.createTranslation(new Vector(-265, -280));
        matrix = matrix.multiply(pMatrix);
        var rotationMatrix = Matrix.createRotation(Math.PI / 2);
        matrix = matrix.multiply(rotationMatrix);
        matrix.setTransform(pContext);
        this.drawTriangle(pContext, pMatrix);

        matrix = Matrix.createTranslation(new Vector(-215, -285));
        matrix = matrix.multiply(pMatrix);
        var rotationMatrix = Matrix.createRotation(Math.PI / 2.8);
        matrix = matrix.multiply(rotationMatrix);
        matrix.setTransform(pContext);
        this.drawTriangle(pContext, pMatrix);

        matrix = Matrix.createTranslation(new Vector(-170, -315));
        matrix = matrix.multiply(pMatrix);
        var rotationMatrix = Matrix.createRotation(Math.PI / 4.5);
        matrix = matrix.multiply(rotationMatrix);
        matrix.setTransform(pContext);
        this.drawTriangle(pContext, pMatrix);

        matrix = Matrix.createTranslation(new Vector(-140, -365));
        matrix = matrix.multiply(pMatrix);
        var rotationMatrix = Matrix.createRotation(Math.PI / 10.5);
        matrix = matrix.multiply(rotationMatrix);
        matrix.setTransform(pContext);
        this.drawTriangle(pContext, pMatrix);

        matrix = Matrix.createTranslation(new Vector(-135, -412));
        matrix = matrix.multiply(pMatrix);
        matrix.setTransform(pContext);
        this.drawTriangle(pContext, pMatrix);
    }
}
