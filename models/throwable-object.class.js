/**
 * ThrowableObject class representing bottles that can be thrown by the player.
 * Extends MovableObject to inherit physics and animation capabilities.
 * Features throwing physics with gravity, rotation animation, and splash effects on impact.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    
        IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
 
    /** 
     * Image paths for bottle splash animation on impact.
     * @type {string[]} 
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    
    /** @type {Audio} Bottle breaking/splash sound effect */
    splash_sound = new Audio('img/audios/broken-bottle.mp3');
    
    /** 
     * Array storing all interval IDs for this bottle instance.
     * Used to stop all animations when bottle hits the ground.
     * @type {number[]} 
     */
    bottleIntervalIds = []
       
    /**
     * Creates a new ThrowableObject instance.
     * Initializes the bottle at the specified position, loads animation frames,
     * sets dimensions, and initiates the throw motion.
     * @constructor
     * @param {number} x - Horizontal starting position (typically player's position)
     * @param {number} y - Vertical starting position (typically player's position)
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 40;
        this.throw();
    }

    /**
     * Initiates the bottle throw motion.
     * Sets initial upward velocity, applies gravity, and starts animations.
     * Moves bottle horizontally while playing rotation animation.
     * Triggers splash effect when bottle hits the ground (y >= 290).
     * @returns {void}
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.setStoppableIntervalBottle(() => {
            this.x += 10;
        }, 25);

        this.setStoppableIntervalBottle(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.y >= 290) {
                this.splash();
            }
        }, 70);
    }

    /**
     * Applies gravity to the bottle during flight.
     * Continuously updates vertical position and velocity.
     * Runs at 25 FPS for smooth physics simulation.
     * @returns {void}
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/ 25)
    }

    /**
     * Handles the bottle splash effect on impact.
     * Plays splash sound (if not muted), animates splash effect,
     * clears all bottle intervals, and moves bottle off-screen after animation.
     * @returns {void}
     */
    splash() {
        if (!window.mute) {
            this.splash_sound.play();
        }

        setStoppableInterval(() => {
            this.playAnimationOnce(this.IMAGES_SPLASH);
            this.bottleIntervalIds.forEach(clearInterval);
            setTimeout(() => {
                this.x = -4000;
            }, 1000);
        }, 50);
    }

    /**
     * Creates a stoppable interval that can be cleared later.
     * Stores the interval ID in both bottleIntervalIds and global intervalIds arrays.
     * Allows for proper cleanup when bottle is destroyed or impacts.
     * @param {Function} fn - The function to execute at each interval
     * @param {number} time - The interval time in milliseconds
     * @returns {void}
     */
    setStoppableIntervalBottle(fn, time) {
        let id = setInterval(fn, time);
        this.bottleIntervalIds.push(id);
        intervalIds.push(id);
    }
}