window.intervalIds = [];

window.setStoppableInterval = function(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
};

window.stopAllIntervals = function() {
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];
};

let canvas;
let world;
let keyboard = new Keyboard();
let timer;
let mute = false;
let btnMute = document.getElementById('btnMute');
let wonGame_sound = new Audio('img/audios/win-sounds.wav');
window.gameStarted = false;

function init() {
    canvas = document.getElementById('canvas');
    bindKeyboardEvents();
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.chickenIntervalIds.push(id);
    intervalIds.push(id);
}

function startGame() {
    window.gameStarted = true;
    stopAllIntervals();
    hideMenus();
    prepareCanvas();
    startWorld();
    keyboard.initTouchControls();
}

function prepareCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    canvas.style.display = 'block';
    init();
}

function hideMenus() {
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
}

function startWorld() {
    initLevel();
    world = new World(canvas, keyboard);
}

function bindKeyboardEvents () {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    if (!world || !world.keyboard) return;
    setKeyState(e.keyCode, true);
}

function handleKeyUp(e) {
    if (!world || !world.keyboard) return;
    setKeyState(e.keyCode, false);
}

function setKeyState(keyCode, value) {
    if (keyCode === 39) world.keyboard.RIGHT = value;
    if (keyCode === 37) world.keyboard.LEFT = value;
    if (keyCode === 38) world.keyboard.UP = value;
    if (keyCode === 40) world.keyboard.DOWN = value;
    if (keyCode === 32) world.keyboard.SPACE = value;
    if (keyCode === 68) world.keyboard.D = value;
}

function startTimer() {
    timer = 30;
    setStoppableInterval(() => {
        timer--;
        if (timer == 0) {
            gameOver();
        }
    }, 1000);
}

function toggleMute() {
    if (mute == false) {
        mute = true;
        btnMute.innerHTML = '<img>music.png</img>';
    } else {
        mute = false;
        btnMute.innerHTML = '<img>mute.png</img>';
    }
    btnMute.blur();
}

function wonGame() {
    clearIntervals();
    if (mute == false) {
        wonGame_sound.play();
    }
    setTimeout(() => {
        document.getElementById('wonGameScreen').classList.remove('d-none');
    }, 1500);
}

function clearIntervals() {
    intervalIds.forEach(clearInterval);
}

function restartGame() {
    window.gameStarted = false;
    stopWorld();
    clearIntervalsSafe();
    resetCanvas();
    hideMenus();
    startWorld();
    window.gameStarted = true;
}

function stopWorld() {
    if (!world) return;
    world.destroy();
    world = null;
}


function clearIntervalsSafe() {
    if (!window.intervalIds) return;
    window.intervalIds.forEach(clearInterval);
    window.intervalIds = [];
}

function resetCanvas() {
    canvas.classList.remove('d-none');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}