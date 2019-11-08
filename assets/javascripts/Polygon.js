class Polygon {
    constructor(verticesInClockwiseOrder) {
        this.vertices = verticesInClockwiseOrder;
    }

    getEdges() {
        let previousVertex = this.vertices[this.vertices.length - 1];

        // const edges = this.vertices.map(currentVertex => {
        return this.vertices.map(currentVertex => {
            const newVector = Vector.getVector(previousVertex, currentVertex);
            previousVertex = currentVertex;

            return newVector;
        });

        //edges.push(edges.splice(0, 1)[0]);

        // return edges;
    }

    isColliding(polygonB) {
        const polygonA = this;
        const edges = this.getEdges().concat(polygonB.getEdges());

        return !edges.some(function (edge) {
            const perpendicularVector = edge.getPerpendicular();

            const polygonAProjections = polygonA.vertices.map(vertex => perpendicularVector.getProjection(vertex));
            const polygonBProjections = polygonB.vertices.map(vertex => perpendicularVector.getProjection(vertex));

            return Vector.isGapped(
                Math.min(...polygonAProjections), Math.max(...polygonAProjections),
                Math.min(...polygonBProjections), Math.max(...polygonBProjections)
            );
        });
    }

    draw(ctx, color) {
        const initialVertex = this.vertices[0];

        ctx.fillStyle = color;
        ctx.strokeStyle = color;


        ctx.beginPath();

        this.vertices.forEach(function (vertex) {
            ctx.lineTo(vertex.x, vertex.y);
        });

        ctx.lineTo(initialVertex.x, initialVertex.y);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();
    }
}