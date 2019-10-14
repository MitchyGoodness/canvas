class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;

        this.slope = (start.y - end.y) / (start.x - end.x);
        this.yIntercept = -this.slope * start.x + start.y;
    }

    getLength(){
        const deltaX = this.start.x - this.end.x;
        const deltaY = this.start.y - this.end.y;

        return Math.abs(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }

    getArrowHeadStartPoint() {
        const length = this.getLength() * .1;

        return new Point(
            Math.sin(this.slope) * length,
            Math.cos(this.slope) * length
        );
    }

    getRotatedPoint(start, pivot, angle) {
        const endX = (start.x - pivot.x) * Math.cos(angle) + (start.y - pivot.y) * Math.sin(angle) + start.x;
        const endY = -(start.x - pivot.x) * Math.sin(angle) + (start.y - pivot.y) * Math.cos(angle) + start.y;

        return new Point(endX, endY);
    }


}