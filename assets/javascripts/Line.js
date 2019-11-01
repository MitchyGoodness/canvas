class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;

        this.slope = (start.y - end.y) / (start.x - end.x);
        this.yIntercept = -this.slope * start.x + start.y;
    }

    getDeltaX() {
        return this.start.x - this.end.x;
    }

    getDeltaY() {
        return this.start.y - this.end.y;
    }

    getLength() {
        const xSquared = Math.pow(this.getDeltaX(), 2);
        const ySquared = Math.pow(this.getDeltaY(), 2);

        return Math.sqrt(xSquared + ySquared);
    }

    getArrowHeadBase() {
        const length = this.getLength() * .2;
        const slopeAngle = Math.atan(this.slope);

        const xLength = Math.sin(slopeAngle) * length;
        const yLength = Math.cos(slopeAngle) * length;

        const x = this.end.x - xLength;
        const y = this.end.y - yLength;

        return new Point(x, y);
    }

    getRotatedPoint(angle) {
        const base = this.getArrowHeadBase();

        const xc = this.end.x;
        const yc = this.end.y;

        const xa = base.x;
        const ya = base.y;

        const xb = xc + (xa - xc) * Math.cos(angle) + (ya - yc) * Math.sin(angle);
        const yb = yc - (xa - xc) * Math.sin(angle) + (ya - yc) * Math.cos(angle);

        return new Point(xb, yb);
    }

    draw(ctx, color) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;

        ctx.beginPath();

        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);

        ctx.closePath();
        ctx.stroke();
    }

    drawArrow(ctx, color) {
        this.draw(ctx, color);

        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineJoin = "round";

        const angle = Math.PI / 4;

        const arrowPointA = this.getRotatedPoint(angle / 2);
        const arrowPointB = this.getRotatedPoint(-angle / 2);


        ctx.beginPath();

        ctx.moveTo(this.end.x, this.end.y);
        ctx.lineTo(arrowPointA.x, arrowPointA.y);
        ctx.arcTo(this.end.x, this.end.y, arrowPointB.x, arrowPointB.y, 10);
        ctx.lineTo(this.end.x, this.end.y);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    drawRotatingArrow(ctx, color) {
        const that = this;
        ctx.clearRect(0, 0, 160, 160);
        ctx.save();

        const time = new Date();

        ctx.translate(80, 80);
        ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        ctx.translate(-80, -80);

        this.drawArrow(ctx, color);

        ctx.restore();

        requestAnimationFrame(function () {
            that.drawRotatingArrow(ctx, color);
        });
    }
}