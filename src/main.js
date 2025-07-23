import Blob from './blob.js';

const canvas = document.getElementById('myCanvas');
canvas.style.border = '1px solid black';
const canvasContext = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 900;

const player = new Blob(450, 450, 40, 'blue');
player.draw(canvasContext);
