import Blob from './blob.js';
import Player from './player.js';

const canvas = document.getElementById('myCanvas');
canvas.style.border = '1px solid black';
const canvasContext = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 900;

const blobs = Array.from({ length: 100 }, () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    return new Blob(x, y, 10, 'green');
});

const player = new Player(450, 450, 40, 'blue');
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
});

function update() {
    canvasContext.save();

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    centerPlayer();

    drawObjects();

    player.moveTo(mouseX, mouseY, canvas);

    checkCollisions();

    canvasContext.restore();
}

function centerPlayer() {
    const zoom = 40 / (Math.sqrt(player.getArea() / Math.PI) * 0.5);
    canvasContext.translate(canvas.width / 2, canvas.height / 2);
    canvasContext.scale(zoom, zoom);
    canvasContext.translate(-player.x, -player.y);
}

function drawObjects() {
    blobs.forEach((blob) => {
        blob.draw(canvasContext);
    });

    player.draw(canvasContext);
}

function checkCollisions() {
    blobs.forEach((blob) => {
        const dx = player.x - blob.x;
        const dy = player.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius + blob.radius) {
            const newPlayerArea = player.getArea() + blob.getArea();
            player.radius = Math.sqrt(newPlayerArea / Math.PI);

            const newVelocity =
                player.velocity * (player.getArea() / newPlayerArea);
            player.velocity = Math.max(newVelocity, 0.5);

            blobs.splice(blobs.indexOf(blob), 1);
        }
    });
}

setInterval(update, 1000 / 60);
