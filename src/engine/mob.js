class Mob extends Structure {
    constructor(style, width, height, x, y) {
        super(style, width, height, x, y)
        this.variable = 100;
    }
    method() {

    }
}

Object.assign(Mob.prototype, char(5));