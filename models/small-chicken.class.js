/**
 * SmallChicken class representing small enemy chickens in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * Smaller and faster than regular chickens, providing varied enemy difficulty.
 * @extends MovableObject
 */
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

    /** 
     * Array storing all interval IDs for this chicken instance.
     * Used to stop all animations when chicken dies.
     * @type {number[]} 
     */
    chickenIntervalIds = [];
    
    /** 
     * Collision detection offset values
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };
    
    dead_sound = new Audio('img/audios/chicken die.mp3');
    
    /**
     * Creates a new SmallChicken instance.
     * Initializes the chicken with default image, loads animation frames,
     * sets random horizontal position and speed, and starts animations.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.speed = 0.15 + Math.random() * 0.28;
        this.x = 600 + Math.random() * 1500;
        this.animate();
    }
 
    /**
     * Starts all animation loops for the small chicken.
     * Sets up intervals for movement (left direction) and walking animation.
     * Only runs when game has started.
     * @returns {void}
     */
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
    
    /**
     * Plays the death animation.
     * Clears all active intervals and displays the dead sprite.
     * @returns {void}
     */
    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
     * Handles the small chicken's death.
     * Plays death sound (if not muted), sets energy to 0, and triggers death animation.
     * @returns {void}
     */
    isDead() {
        if (!window.mute) {
            this.dead_sound.currentTime = 0;
            this.dead_sound.play();
        }
        
        this.energy = 0;
        this.animateDead();
    }
}