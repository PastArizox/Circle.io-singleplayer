import Blob from './blob.js';

export default class Player extends Blob {
    constructor(x, y, radius, color) {
        super(x, y, radius, color);
        this.velocity = 1.5;
    }

    moveTo(targetX, targetY, canvas) {
        const dx = targetX - canvas.width / 2;
        const dy = targetY - canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.x += (dx / distance) * this.velocity;
            this.y += (dy / distance) * this.velocity;
        }
    }
}
