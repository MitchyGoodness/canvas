const drawHandler = (function () {
    const colors = ["red", "orangered", "orange", "yellow", "turquoise", "green", "darkcyan", "blue", "rebeccapurple"];

    function init() {
        drawRectangle();
        drawArrow();

        const squareCtx = getContext("square");
        const triangleCtx = getContext("triangle");
        const cubeCtx = getContext("cube");
        const linearGradientCtx = getContext("linearGradient");
        const radialGradientCtx = getContext("radialGradient");

        drawSquare(squareCtx);
        drawSquarePoints(squareCtx);
        drawTriangle(triangleCtx);

        drawCube(cubeCtx);
        getVerticesOfCube(100, 100, 30);

        drawLinearGradient(linearGradientCtx);
        drawRadialGradient(radialGradientCtx);
        drawMateriaGrid();
    }

    function getContext(id) {
        return document.getElementById(id).getContext("2d");
    }

    function drawRectangle() {
        const rectangleCtx = getContext("rectangle");
        const rectangle = new Rectangle(new Point(10, 10), 140, 100);
        rectangle.draw(rectangleCtx, "black", false);
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
        new Point(80, 10).draw(ctx, colors[0]);
        new Point(150, 10).draw(ctx, colors[1]);
        new Point(150, 80).draw(ctx, colors[2]);
        new Point(150, 150).draw(ctx, colors[3]);
        new Point(80, 150).draw(ctx, colors[4]);
        new Point(10, 150).draw(ctx, colors[5]);
        new Point(10, 80).draw(ctx, colors[6]);
        new Point(10, 10).draw(ctx, colors[7]);
        new Point(80, 10).draw(ctx, colors[8]);
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

    function drawArrow() {
        const arrowCtx = getContext("arrow");

        const startPoint = new Point(20, 20);
        const endPoint = new Point(100, 100);

        const line = new Line(startPoint, endPoint);

        requestAnimationFrame(function () {
            line.drawRotatingArrow(arrowCtx, colors[0]);
        });
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

    function drawLinearGradient(ctx) {
        const centerX = ctx.canvas.width / 2;
        const gradient = ctx.createLinearGradient(centerX, 10, centerX, 80);

        gradient.addColorStop(0, "green");
        gradient.addColorStop(1 / 2, "blue");
        gradient.addColorStop(1, "red");

        ctx.strokeStyle = "black";
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.rect(10, 10, 130, 80);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    function drawRadialGradient(ctx) {
        const centerX = ctx.canvas.width / 2;
        const gradient = ctx.createRadialGradient(80, 80, 100, 80, 80, 10);

        gradient.addColorStop(0, "green");
        gradient.addColorStop(.5, "blue");
        gradient.addColorStop(1, "red");

        ctx.strokeStyle = "black";
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.rect(10, 10, 130, 80);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    function drawMateriaGrid() {
        const canvas = document.getElementById("materiaGrid");
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = colors[0];
        ctx.fillStyle = colors[0];

        ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2, false);
    }

    return {init: init};
})();
window.onload = drawHandler.init;