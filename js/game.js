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
// let gameStarted = false;
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
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    canvas.style.display = 'block';
    init();
    
    initLevel();
    world = new World(canvas, keyboard);
}

function bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
        if (world && world.keyboard) {
            if (e.keyCode == 39) world.keyboard.RIGHT = true;
            if (e.keyCode == 37) world.keyboard.LEFT = true;
            if (e.keyCode == 38) world.keyboard.UP = true;
            if (e.keyCode == 40) world.keyboard.DOWN = true;
            if (e.keyCode == 32) world.keyboard.SPACE = true;
            if (e.keyCode == 68) world.keyboard.D = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (world && world.keyboard) {
            if (e.keyCode == 39) world.keyboard.RIGHT = false;
            if (e.keyCode == 37) world.keyboard.LEFT = false;
            if (e.keyCode == 38) world.keyboard.UP = false;
            if (e.keyCode == 40) world.keyboard.DOWN = false;
            if (e.keyCode == 32) world.keyboard.SPACE = false;
            if (e.keyCode == 68) world.keyboard.D = false;
        }
    });
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

// function gameOver() {
//     stopAllIntervals();
//     document.getElementById('gameOverScreen').classList.remove('d-none');
//     timer = 0;
//     if (mute == false) {
//         world.character.dead_sound.play();
//     }
//     clearIntervals();
// }

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
    if (world) {
        world.stopAllIntervals?.(); 
        
        if (world.pauseLevelObjects) {
            world.pauseLevelObjects();
        }
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        world = null;
    }
    
    if (window.intervalIds) {
        window.intervalIds.forEach(id => clearInterval(id));
        window.intervalIds = [];
    }
    
    gameStarted = false;
    
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.remove('d-none');
    

    const h1 = document.querySelector('h1');
    if (h1) h1.style.display = 'block';

    document.getElementById('canvas').classList.add('d-none');
    

    keyboard = new Keyboard();
    
}

