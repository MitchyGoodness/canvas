class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
    }

    getPerpendicular() {
        return new Vector(-this.y, this.x);
    }

    getProjection(vertex) {
        return vertex.x * this.x + vertex.y * this.y;
    }

    static getVector(vertex1, vertex2) {
        return new Vector(vertex2.x - vertex1.x, vertex2.y - vertex1.y);
    }

    static isOverlapping(aMin, aMax, bMin, bMax) {
        return (aMin < bMax && aMin > bMin) || (bMin < aMax && bMin > aMin);
    }

    static isGapped(aMin, aMax, bMin, bMax) {
        return (aMin >= bMax || aMin <= bMin) && (bMin >= aMax || bMin <= aMin);
    }
}