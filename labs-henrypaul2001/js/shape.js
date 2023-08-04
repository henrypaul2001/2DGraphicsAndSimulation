class Shape {
    constructor(pPosition, pName) {
        this.SetPosition(pPosition);
        this.mType;
        this.mName = pName;
    }

    SetPosition(pPosition) {
        this.mPosition = pPosition;
    }
    GetPosition() {
        return this.mPosition;
    }
    setType(pType) {
        this.mType = pType;
    }
    getType() {
        return this.mType;
    }
    getName() {
        return this.mName;
    }
}