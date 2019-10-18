class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}