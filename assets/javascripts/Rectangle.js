class Rectangle {
    constructor(startPoint, width, height) {
        this.startPoint = startPoint;
        this.width = width;
        this.height = height;
        
        this.upperLeftCorner = this.getUpperLeftCorner();
        this.upperRightCorner = this.getUpperRightCorner();
        this.lowerRightCorner = this.getLowerRightCorner();
        this.lowerLeftCorner = this.getLowerLeftCorner();
        
        this.upperMidPoint = this.getUpperMidPoint();
        this.rightMidPoint = this.getRightMidPoint();
        this.lowerMidPoint = this.getLowerMidPoint();
        this.leftMidPoint = this.getLeftMidPoint();
    }

    draw(ctx, fillStyle = "black", roundedCorners = false) {
        ctx.fillStyle = fillStyle;
        if(roundedCorners){
            ctx.beginPath();
            ctx.moveTo(80, 10);
            ctx.arcTo(150, 10, 150, 80, 20);
            ctx.arcTo(150, 150, 80, 150, 20);
            ctx.arcTo(10, 150, 10, 80, 20);
            ctx.arcTo(10, 10, 80, 10, 20);
            ctx.lineTo(80, 10);
            ctx.closePath();
            ctx.stroke();
        }else {
            ctx.fillRect(this.startPoint.x, this.startPoint.y, this.width, this.height);
        }
    }

    getUpperLeftCorner() {
        return this.startPoint;
    }

    getUpperRightCorner() {
        return new Point(this.startPoint.x + this.width, this.startPoint.y);
    }

    getLowerRightCorner() {
        return new Point(this.startPoint.x + this.width, this.startPoint.y + this.height);
    }

    getLowerLeftCorner() {
        return new Point(this.startPoint.x, this.startPoint.y + this.height);
    }


    getUpperMidPoint() {
        return new Point(this.startPoint.x + this.width / 2, this.startPoint.y);
    }

    getRightMidPoint() {
        return new Point(this.startPoint.x + this.width, this.startPoint.y + this.height / 2);
    }

    getLowerMidPoint() {
        return new Point(this.startPoint.x + this.width / 2, this.startPoint.y + this.height);
    }

    getLeftMidPoint() {
        return new Point(this.startPoint.x, this.startPoint.y + this.height / 2);
    }

    drawPoints(ctx) {
        const colors = ["red", "orangered", "orange", "yellow", "turquoise", "green", "darkcyan", "blue", "rebeccapurple"];

        this.getUpperLeftCorner().draw(ctx, colors[0]);
        this.getUpperMidPoint().draw(ctx, colors[1]);
        this.getUpperRightCorner().draw(ctx, colors[2]);
        this.getRightMidPoint().draw(ctx, colors[3]);
        this.getLowerRightCorner().draw(ctx, colors[4]);
        this.getLowerMidPoint().draw(ctx, colors[5]);
        this.getLowerLeftCorner().draw(ctx, colors[6]);
        this.getLeftMidPoint().draw(ctx, colors[7]);
    }
}