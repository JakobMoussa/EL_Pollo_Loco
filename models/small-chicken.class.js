class SmallChicken extends MovableObject {
    y = 410;
    height = 50;
    width = 50;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    chickenIntervalIds = [];
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };
    dead_sound = new Audio('img/audios/chicken die.mp3');
    
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.speed = 0.15 + Math.random() * 0.28;
        this.x = 600 + Math.random() * 1500;
        this.animate();
    }
 
    animate() {
        setInterval(() => {
            if (!window.gameStarted) return;
            this.moveLeft();
        }, 1000 / 60);
    
        setInterval(() => {
            if (!window.gameStarted) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
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