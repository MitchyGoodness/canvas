const drawHandler = (function () {
    const colors = ["red", "orangered", "orange", "yellow", "turquoise", "green", "darkcyan", "blue", "rebeccapurple"];

    function init() {
        const rectangleCtx = getContext("rectangle");
        const squareCtx = getContext("square");
        const triangleCtx = getContext("triangle");
        const arrowCtx = getContext("arrow");
        const cubeCtx = getContext("cube");

        drawRectangle(rectangleCtx);
        drawSquare(squareCtx);
        drawSquarePoints(squareCtx);
        drawTriangle(triangleCtx);
        drawArrow(arrowCtx, 10, 10, 150, 150, colors[0]);

        drawCube(cubeCtx);
        getVerticesOfCube(100, 100, 30);
    }

    function getContext(id) {
        return document.getElementById(id).getContext("2d");
    }

    function drawRectangle(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 10, 150, 100);
    }

    function drawSquare(ctx) {
        ctx.beginPath();
        ctx.moveTo(80, 10);
        ctx.arcTo(150, 10, 150, 80, 20);
        ctx.arcTo(150, 150, 80, 150, 20);
        ctx.arcTo(10, 150, 10, 80, 20);
        ctx.arcTo(10, 10, 80, 10, 20);
        ctx.lineTo(80, 10);
        ctx.closePath();
        ctx.stroke();
    }

    function drawSquarePoints(ctx) {
        drawPoint(ctx, 80, 10, colors[0]);
        drawPoint(ctx, 150, 10, colors[1]);
        drawPoint(ctx, 150, 80, colors[2]);
        drawPoint(ctx, 150, 150, colors[3]);
        drawPoint(ctx, 80, 150, colors[4]);
        drawPoint(ctx, 10, 150, colors[5]);
        drawPoint(ctx, 10, 80, colors[6]);
        drawPoint(ctx, 10, 10, colors[7]);
        drawPoint(ctx, 80, 10, colors[8]);
    }

    function drawPoint(ctx, x, y, color = "red") {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawTriangle(ctx) {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "yellow";
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(10, 150);
        ctx.lineTo(150, 150);
        ctx.lineTo(80, 10);
        ctx.lineTo(10, 150);

        ctx.closePath();

        ctx.stroke();
        ctx.fill();
    }

    function drawArrow(ctx, startX, startY, endX, endY, color) {
        const slope = (startY - endY) / (startX - endX);
        const yIntercept = -slope * startX + startY;

        console.log("arrow equation: y =", slope, "* x +", yIntercept);

        const slopeArrowTop = slope;
        const yInterceptArrowTop = yIntercept;

        const slopeArrowBottom = slope;
        const yInterceptArrowBottom = yIntercept;


        ctx.lineWidth = 2;
        ctx.strokeStyle = color;

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();



        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(285, 28);
        ctx.arcTo(289, 30, 285, 32, 8);
        ctx.lineTo(150, 150);

        ctx.closePath();

        ctx.stroke();
        ctx.fill();
    }

    function drawCube(ctx) {


    }

    function getVerticesOfCube(centerX, centerY, radius) {
        const vertices = [];

        for (let i = 0; i < 6; i++) {
            const x = Number.parseInt(radius * Math.sin(Math.PI / 3 * i)) + centerX;
            const y = Number.parseInt(radius * Math.cos(Math.PI / 3 * i)) + centerY;

            vertices.push({x: x, y: y});
        }

        vertices.push({x: centerX, y: centerY});

        return vertices;
    }

    return {init: init};
})();
window.onload = drawHandler.init;