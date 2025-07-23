import Blob from './blob.js';
import Player from './player.js';

const canvas = document.getElementById('myCanvas');
canvas.style.border = '1px solid black';
const canvasContext = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 900;

const blobs = Array.from({ length: 30 }, () => {
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

    blobs.forEach((blob) => {
        blob.draw(canvasContext);
    });

    player.draw(canvasContext);
    player.moveTo(mouseX, mouseY, canvas);

    canvasContext.restore();
}

function centerPlayer() {
    canvasContext.translate(
        canvas.width / 2 - player.x,
        canvas.height / 2 - player.y
    );
}

setInterval(update, 1000 / 60);
