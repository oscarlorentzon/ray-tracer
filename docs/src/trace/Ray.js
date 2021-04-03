export class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    clone() {
        const self = this;
        return new Ray(self.origin.clone(), self.direction.clone());
    }
    copy(r) {
        const self = this;
        const o = self.origin;
        o.copy(r.origin);
        const d = self.direction;
        d.copy(r.direction);
        return self;
    }
    position(t) {
        const self = this;
        const translation = self.direction
            .clone()
            .mulScalar(t);
        return self.origin
            .clone()
            .addVector(translation);
    }
    applyMatrix(m) {
        const self = this;
        self.origin
            .mulMatrix4(m);
        self.direction
            .mulMatrix4(m);
        return self;
    }
}
//# sourceMappingURL=Ray.js.map