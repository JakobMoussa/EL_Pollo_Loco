/**
 * MovableObject class providing physics, collision detection, and animation for game objects.
 * Extends DrawableObject to add movement, gravity, health, and collision functionality.
 * Serves as the base class for characters, enemies, and throwable objects.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed */
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    applyGravityInterval;
    
    /** 
     * Collision box offset to fine-tune hitbox size.
     * Reduces hitbox from sprite edges for more accurate collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Checks if this object is colliding with another movable object.
     * Uses offset values to adjust collision boxes for more precise detection.
     * @param {MovableObject} mo - The movable object to check collision against
     * @returns {boolean} True if objects are colliding, false otherwise
     */
    isColliding(mo) {
            return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Checks if the object is above ground level.
     * ThrowableObjects are always considered above ground.
     * Other objects are above ground when y position is less than 155.
     * @returns {boolean} True if object is above ground, false otherwise
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
                return true;
        } else {
            return this.y < 155;
        }
    }

    /**
     * Plays an animation sequence only once (non-looping).
     * Advances through the image array without wrapping back to start.
     * Useful for one-time animations like death or special attacks.
     * @param {string[]} images - Array of image paths for the animation
     * @returns {void}
     */
    playAnimationOnce(images) {
        if (this.currentImage < images.length) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        }
    }

    /**
     * Applies damage to the object.
     * Reduces energy and records hit time. Prevents energy from going below 0.
     * @param {number} damage - Amount of damage to apply
     * @returns {void}
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
                this.energy = 0;
        } else {
                this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in hurt state.
     * Object is considered hurt for 0.3 seconds after taking damage.
     * @returns {boolean} True if object was hit within the last 0.3 seconds
     */
    isHurt() {
          let timePassed = new Date().getTime() - this.lastHit;
           timePassed = timePassed / 1000;
           return timePassed < 0.3;
   }

   /**
    * Checks if the object is dead (no energy remaining).
    * @returns {boolean} True if energy is 0 or less, false otherwise
    */
   isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays a looping animation sequence.
     * Cycles through the image array continuously using modulo operation.
     * @param {string[]} images - Array of image paths for the animation
     * @returns {void}
     */
    playAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    /**
     * Moves the object to the right.
     * Increases x position and sets direction to face right.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     * Decreases x position. Direction flag should be set separately if needed.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     * Sets upward vertical velocity to initiate jump motion.
     * Gravity will gradually reduce this velocity over time.
     * @returns {void}
     */
    jump() {
        this.speedY = 20;
    }
    }