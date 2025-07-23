export default class Blob {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(canvasContext) {
        canvasContext.beginPath();
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'black';
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.stroke();
    }
}
