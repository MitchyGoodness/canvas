const drawHandler = (function () {
    const colors = ["red", "orangered", "orange", "yellow", "turquoise", "green", "darkcyan", "blue", "rebeccapurple"];
    const globalCompositeOperationOptions = [
        "source-over", "source-in", "source-out", "source-atop", "destination-over",
        "destination-in", "destination-out", "destination-atop", "lighter", "copy",
        "xor", "multiply", "screen", "overlay", "darken",
        "lighten", "color-dodge", "color-burn", "hard-light", "soft-light",
        "difference", "exclusion", "hue", "saturation", "color",
        "luminosity"
    ];
    let mousePointerLocation;
    let collisionBallCenterPoint;
    let spriteLocation;
    let spriteVector;


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
        drawRingOfSquares();
        const materiaGridTimer = requestAnimationFrame(drawRotatingMateriaGrid);
        const redColorPalettePixelTimer = requestAnimationFrame(() => drawColorPalette("red"));
        const greenColorPalettePixelTimer = requestAnimationFrame(() => drawColorPalette("green"));
        const blueColorPalettePixelTimer = requestAnimationFrame(() => drawColorPalette("blue"));

        mousePointerLocation = new Point(0, 0);
        setupMouseListeners();
        requestAnimationFrame(drawMousePointerLocation);

        collisionBallCenterPoint = new Point(30, 30);
        requestAnimationFrame(drawCollisionDetectionDemo);

        setupAudioListeners();

        spriteLocation = new Point(127, 127);
        spriteVector = new Vector(0,0);
        setupKeyboardControlListeners();
        requestAnimationFrame(drawKeyboardControlDemo);
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

    function drawRotatingMateriaGrid() {
        const canvas = document.getElementById("materiaGrid");
        const ctx = canvas.getContext("2d");
        const time = new Date().getTime();

        ctx.clearRect(0, 0, 160, 160);
        ctx.save();

        ctx.translate(80, 80);
        ctx.rotate(time % 360000 / 1000);
        ctx.translate(-80, -80);
        drawMateriaGrid(canvas, ctx);
        ctx.restore();

        requestAnimationFrame(drawRotatingMateriaGrid);
    }

    function drawMateriaGrid(canvas, ctx) {

        ctx.strokeStyle = colors[0];
        ctx.fillStyle = colors[0];

        drawCircle(canvas, ctx, canvas.width / 2, canvas.height / 2, 20, colors[0]);
        drawCircle(canvas, ctx, canvas.width / 2, canvas.height / 2, 79, colors[0]);

        drawCircle(canvas, ctx, canvas.width * .25, canvas.height * .5, 10, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .15, canvas.height * .4, 5, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .15, canvas.height * .6, 5, colors[0]);

        drawCircle(canvas, ctx, canvas.width * .5, canvas.height * .25, 10, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .4, canvas.height * .15, 5, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .6, canvas.height * .15, 5, colors[0]);

        drawCircle(canvas, ctx, canvas.width * .75, canvas.height * .5, 10, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .85, canvas.height * .4, 5, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .85, canvas.height * .6, 5, colors[0]);

        drawCircle(canvas, ctx, canvas.width * .5, canvas.height * .75, 10, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .4, canvas.height * .85, 5, colors[0]);
        drawCircle(canvas, ctx, canvas.width * .6, canvas.height * .85, 5, colors[0]);
    }

    function drawCircle(canvas, ctx, centerX, centerY, radius, color) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
    }

    function drawRingOfSquares() {
        const canvas = document.getElementById("ringOfSquares");
        const ctx = canvas.getContext("2d");

        const radianConstant = Math.PI / 20;

        const sin = Math.sin(radianConstant);
        const cos = Math.cos(radianConstant);


        ctx.translate(canvas.width / 1.5, canvas.height / 4);

        for (let i = 0; i <= 39; i++) {
            const red = parseInt(Math.sin(radianConstant * i) * 255);
            const green = parseInt(Math.cos(radianConstant * i) * 255);
            const blue = parseInt(Math.tan(radianConstant * i) * 255);

            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.strokeStyle = `rgb(${255 - red}, ${255 - green}, ${255 - blue})`;

            ctx.fillRect(0, 0, canvas.width / 10, canvas.width / 10);
            ctx.strokeRect(0, 0, canvas.width / 10, canvas.width / 10);

            ctx.transform(cos, sin, -sin, cos, 5, 5);
        }
    }

    function drawColorPalette(colorFocus) {
        const canvas = document.getElementById(`${colorFocus}ColorPalette`);
        const ctx = canvas.getContext("2d");
        const pixelData = ctx.createImageData(canvas.height, canvas.width);

        const time = new Date().getTime();
        const i = parseInt(Math.sin(time / 5000) * 255);

        ctx.clearRect(0, 0, 255, 255);

        for (let j = 0; j < pixelData.height; j++) {
            for (let k = 0; k < pixelData.width; k++) {
                const length = j * (pixelData.width * 4) + k * 4;

                if (colorFocus === "red") {
                    pixelData.data[length] = i;
                    pixelData.data[length + 1] = j;
                    pixelData.data[length + 2] = k;
                } else if (colorFocus === "green") {
                    pixelData.data[length] = j;
                    pixelData.data[length + 1] = i;
                    pixelData.data[length + 2] = k;
                } else {
                    pixelData.data[length] = j;
                    pixelData.data[length + 1] = k;
                    pixelData.data[length + 2] = i;
                }

                pixelData.data[length + 3] = 255;
            }
        }

        ctx.putImageData(pixelData, 0, 0);

        requestAnimationFrame(() => drawColorPalette(colorFocus));
    }

    function setupMouseListeners() {
        const canvas = document.getElementById("mouseTracker");

        canvas.addEventListener("mouseenter", () => addEventListener("mousemove", trackMouse, false));
        canvas.addEventListener("mouseleave", () => removeEventListener("mousemove", trackMouse));
    }

    function setupAudioListeners(){
        const $audio = new Audio("assets/audio/Ding.wav");

        document.addEventListener("keydown", event => {
            if(!event.isComposing && event.code === "KeyP"){
                $audio.play();
            }
        });

        document.addEventListener("keyup", event => {
            if (!event.isComposing && event.keyCode !== 229) {
                $audio.pause();
                $audio.currentTime = 0;
            }
        });
    }

    function setupKeyboardControlListeners(){
        document.addEventListener("keydown", event => {
            if (event.isComposing || event.keyCode === 229) {
                //do nothing

            } else if(event.code === "ArrowUp"){
                spriteVector.y = -1;

            } else if(event.code === "ArrowDown"){
                spriteVector.y = 1;

            } else if(event.code === "ArrowLeft"){
                spriteVector.x = -1;

            } else if(event.code === "ArrowRight"){
                spriteVector.x = 1;
            }
        });

        document.addEventListener("keyup", event => {
            if (event.isComposing || event.keyCode === 229) {
                //do nothing

            } else if(event.code === "ArrowUp"){
                spriteVector.y += 1;

            } else if(event.code === "ArrowDown"){
                spriteVector.y -= 1;

            } else if(event.code === "ArrowLeft"){
                spriteVector.x += 1;

            } else if(event.code === "ArrowRight"){
                spriteVector.x -= 1;
            }
        });
    }

    function animateKeyboardControlDemo(canvas){
        const newX = spriteLocation.x + spriteVector.x;
        const newY = spriteLocation.y + spriteVector.y;

        const maxX = canvas.width - 10;
        const maxY = canvas.height - 10;

        if(10 > newX) {
            spriteLocation.x = 10;

        } else if(newX > maxX){
            spriteLocation.x = maxX;

        } else {
            spriteLocation.x = newX;
        }

        if(10 > newY) {
            spriteLocation.y = 10;

        } else if(newY > maxY){
            spriteLocation.y = maxY;

        } else {
            spriteLocation.y = newY;
        }
    }

    function drawKeyboardControlDemo() {
        const canvas = document.getElementById("keyboardControl");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(spriteLocation.x, spriteLocation.y, 10, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        animateKeyboardControlDemo(canvas);
        requestAnimationFrame(drawKeyboardControlDemo);
    }

    function trackMouse(event) {
        const canvas = document.getElementById("mouseTracker");
        const bounds = canvas.getBoundingClientRect();

        const offsetX = event.clientX - bounds.left;
        if (10 > offsetX) {
            mousePointerLocation.x = 10;
        } else if (offsetX > (canvas.width - 10)) {
            mousePointerLocation.x = canvas.width - 10;
        } else {
            mousePointerLocation.x = offsetX;
        }

        const offsetY = event.clientY - bounds.top;
        if (10 > offsetY) {
            mousePointerLocation.y = 10;
        } else if (offsetY > (canvas.height - 10)) {
            mousePointerLocation.y = canvas.height - 10;
        } else {
            mousePointerLocation.y = offsetY;
        }
    }

    function drawMousePointerLocation() {
        const canvas = document.getElementById("mouseTracker");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(mousePointerLocation.x, mousePointerLocation.y, 10, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        requestAnimationFrame(drawMousePointerLocation);
    }

    function animateCollisionDetectionDemo() {
        collisionBallCenterPoint.x++;
        collisionBallCenterPoint.y++;
    }

    function drawCollisionDetectionDemo() {
        const canvas = document.getElementById("collisionDetection");
        const ctx = canvas.getContext("2d");

        const rectangle1 = new Rectangle(new Point(canvas.width / 2, canvas.height / 2), 50, 5);
        const rectangle2 = new Rectangle(new Point(0, canvas.height / 2), 50, 5);

        animateCollisionDetectionDemo();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rectangle1.draw(ctx);
        rectangle2.draw(ctx);

        ctx.beginPath();
        ctx.arc(collisionBallCenterPoint.x, collisionBallCenterPoint.y, 10, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        requestAnimationFrame(drawCollisionDetectionDemo);
    }

    return {init: init};
})();
window.onload = drawHandler.init;