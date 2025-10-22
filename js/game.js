// Zuerst die Klasse definieren
class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
    }
}

// Dann die Variable initialisieren
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('Game initialized');
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) keyboard.RIGHT = true;
    if(e.keyCode == 37) keyboard.LEFT = true;
    if(e.keyCode == 40) keyboard.DOWN = true;
    if(e.keyCode == 38) keyboard.UP = true;
    if(e.keyCode == 32) keyboard.SPACE = true;
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) keyboard.RIGHT = false;
    if(e.keyCode == 37) keyboard.LEFT = false;
    if(e.keyCode == 40) keyboard.DOWN = false;
    if(e.keyCode == 38) keyboard.UP = false;
    if(e.keyCode == 32) keyboard.SPACE = false;
});