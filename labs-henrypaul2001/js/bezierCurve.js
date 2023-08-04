class BezierCurve {
    constructor(pPointsArray) {
        this.setArray(pPointsArray);
    }

    setArray(pPoints) {
        this.mPoints = pPoints;
    }

    getArray() {
        return this.mPoints;
    }

    getArrayLength() {
        return this.mPoints.length;
    }

    getIndexAt(pIndex) {
        return this.mPoints[pIndex];
    }

    draw(pContext) {
        var currentArray = this.getArray();
        pContext.moveTo(this.getIndexAt(0).getX(), this.getIndexAt(0).getY());

        for (var interpolateValue = 0.1; interpolateValue < 1; interpolateValue += 0.01) {
            //duplicate array
            var array = new Array();
            for (var i = 0; i < currentArray.length; i++) {
                array[i] = currentArray[i];
            }

            //interpolate array
            for (var i = 0; i < currentArray.length - 1; i ++) {
                for (var j = 0; j < array.length - 1; j++) {
                    array[j] = array[j].interpolate(array[j + 1], interpolateValue);
                }
                array.pop();
            }
            pContext.lineTo(array[0].getX(), array[0].getY());
            pContext.stroke();
        }   
    }
}