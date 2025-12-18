class chicken extends MovableObject {

    y = 380;
    height = 80;
    width = 80;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    chickenIntervalIds = [];
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };

    dead_sound = new Audio('img/audios/chicken die.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 350 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }
 
    animate() {
        this.setStoppableIntervalChicken(() => {
            if (!window.gameStarted) return;
            this.moveLeft();
        }, 1000 / 60);
    
        this.setStoppableIntervalChicken(() => {
            if (!window.gameStarted) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
    
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
    }

    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    isDead() {
        if (!window.mute) {
            this.dead_sound.currentTime = 0;
            this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}