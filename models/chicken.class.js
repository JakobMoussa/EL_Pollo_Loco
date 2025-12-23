/**
 * Chicken class representing an enemy chicken in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * @extends MovableObject
 */
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
     * Creates a new Chicken instance.
     * Initializes the chicken with default image, loads animation frames,
     * sets random horizontal position and speed, and starts animations.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 350 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }
 
    /**
     * Starts all animation loops for the chicken.
     * Sets up intervals for movement (left direction) and walking animation.
     * Only runs when game has started.
     * @returns {void}
     */
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
    
    /**
     * Creates a stoppable interval that can be cleared later.
     * Stores the interval ID in chickenIntervalIds array for cleanup.
     * @param {Function} fn - The function to execute at each interval
     * @param {number} time - The interval time in milliseconds
     * @returns {void}
     */
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
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
     * Handles the chicken's death.
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