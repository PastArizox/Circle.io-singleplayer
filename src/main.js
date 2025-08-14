import Blob from './blob.js';
import Player from './player.js';

const canvas = document.getElementById('myCanvas');
canvas.style.border = '1px solid black';
const canvasContext = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 900;

const blobs = Array.from({ length: 40 }, createNewBlob);

const player = new Player(450, 450, 10, 'blue');
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

    drawBorders();

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

function drawBorders() {
    canvasContext.beginPath();
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'black';
    canvasContext.rect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fill();
    canvasContext.clip();
    canvasContext.stroke();
}

function drawObjects() {
    blobs.forEach((blob) => {
        blob.draw(canvasContext);
    });

    player.draw(canvasContext);
}

function checkCollisions() {
    checkBorderCollisions();
    checkBlobCollisions();
}

function checkBorderCollisions() {
    if (player.x < 0 || player.x > canvas.width) {
        player.x = Math.max(0, Math.min(player.x, canvas.width));
    }

    if (player.y < 0 || player.y > canvas.height) {
        player.y = Math.max(0, Math.min(player.y, canvas.height));
    }
}

function checkBlobCollisions() {
    blobs.forEach((blob) => {
        const dx = player.x - blob.x;
        const dy = player.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius + blob.radius) {
            absorbBlob(blob);
            blobs.push(createNewBlob());
        }
    });
}

function absorbBlob(blob) {
    const newPlayerArea = player.getArea() + blob.getArea();
    player.radius = Math.sqrt(newPlayerArea / Math.PI);

    const newVelocity = player.velocity * (player.getArea() / newPlayerArea);
    player.velocity = Math.max(newVelocity, 0.5);

    blobs.splice(blobs.indexOf(blob), 1);
}

function createNewBlob() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3 + 5;
    const color = 'green';
    return new Blob(x, y, radius, color);
}

setInterval(update, 1000 / 60);
