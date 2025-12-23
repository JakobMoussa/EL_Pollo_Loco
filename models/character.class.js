/**
 * Character class representing the player character in the game.
 * Extends MovableObject to inherit movement and physics capabilities.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 300;
    y = 155;
    speed = 10;
    world;
    isCharacterAboveGround = false;
    runSoundPlaying = false;
    hurtSoundPlayed = false;
    walking_sound = new Audio('img/audios/running.mp3');
    hurt_sound = new Audio('img/audios/hurt.mp3');
    dead_sound = new Audio('img/audios/dead.mp3');
    run_sound = new Audio('img/audios/running.mp3');
    jump_sound = new Audio('img/audios/jump.mp3');
    bottle_sound;
    coin_sound;
    coins = 0;
    bottles = 0;
    idleTime = 0;
    
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 30
    };

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [  
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Creates a new Character instance.
     * Initializes the character with default image, loads all animation frames,
     * applies gravity, and starts animation loops.
     * @constructor
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.keyboard = null;
    }

    /**
     * Applies gravity to the character.
     * Continuously updates vertical position and speed based on gravity physics.
     * Runs at 25 FPS.
     * @returns {void}
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Starts all animation loops for the character.
     * Sets up intervals for movement, idle animation, character animation, and jumping animation.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.handleCharacterMovement(), 1000 / 60);
        setInterval(() => this.handleIdleAnimation(), 240);
        setInterval(() => this.handleCharacterAnimation(), 50);
        setInterval(() => this.handleCharacterJumpingAnimation(), 150);
    }

    /**
     * Handles character movement based on keyboard input.
     * Processes left/right movement, jumping, and plays appropriate sounds.
     * Runs at 60 FPS.
     * @returns {void}
     */
    handleCharacterMovement() {
        if (!this.world || !this.world.keyboard) return;
        
        this.walking_sound.pause();
        
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canJump()) {
            this.jump();
            this.idleTime = 0;
        }
        this.playRunSound();
    }

    /**
     * Handles idle animation states.
     * Plays short idle animation initially, then switches to long idle animation after 20 frames.
     * Only plays when character is not moving or performing other actions.
     * @returns {void}
     */
    handleIdleAnimation() {
        if (!this.world || !this.world.keyboard) return;
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && 
            !this.world.keyboard.LEFT && !this.world.keyboard.D && !this.isHurt()) {
            
            if (this.idleTime < 20) {
                this.idleTime++;
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }
    }

    /**
     * Handles character animation state machine.
     * Prioritizes death animation, then hurt, then ground/air animations.
     * Runs at 20 FPS (every 50ms).
     * @returns {void}
     */
    handleCharacterAnimation() {
        if (this.handleDeath()) return;
        if (this.handleHurt()) return;
        if (this.handleGroundAnimation()) return;
        this.handleAirAnimation();
    }

    /**
     * Handles death animation.
     * @returns {boolean} True if character is dead and animation was played, false otherwise
     */
    handleDeath() {
        if (!this.isDead()) return false;
        this.playAnimation(this.IMAGES_DEAD);
        return true;
    }

    /**
     * Handles hurt animation and sound.
     * Resets hurt sound flag when character is no longer hurt.
     * @returns {boolean} True if character is hurt and animation was played, false otherwise
     */
    handleHurt() {
        if (!this.isHurt()) {
            this.hurtSoundPlayed = false;
            return false;
        }

        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
        return true;
    }

    /**
     * Plays the hurt sound effect.
     * Only plays once per hurt state and respects mute setting.
     * @returns {void}
     */
    playHurtSound() {
        if (this.hurtSoundPlayed || window.mute) return;
        this.hurtSoundPlayed = true;
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play();
    }

    /**
     * Handles animation when character is on the ground.
     * Plays walking animation if moving left or right.
     * @returns {boolean} True if character is on ground, false if in air
     */
    handleGroundAnimation() {
        if (this.isAboveGround()) return false;

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        return true;
    }

    /**
     * Handles animation when character is in the air.
     * Plays jumping animation while above ground.
     * @returns {void}
     */
    handleAirAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Handles jumping animation at a specific frame rate.
     * Separate from handleAirAnimation to allow different update frequencies.
     * Runs at approximately 6.67 FPS (every 150ms).
     * @returns {void}
     */
    handleCharacterJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Checks if character can move right.
     * Verifies world exists, keyboard input, and level boundary.
     * @returns {boolean} True if character can move right, false otherwise
     */
    canMoveRight() {
        return this.world && this.world.keyboard && 
        this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if character can move left.
     * Verifies keyboard input and position boundary.
     * @returns {boolean} True if character can move left, false otherwise
     */
     canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves character to the right.
     * Updates direction, resets idle time, and plays walking sound if on ground.
     * @returns {void}
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.idleTime = 0;
        if (this.y > 158 && window.mute == false) {
            this.walking_sound.play();
        }
    }
    
    /**
     * Moves character to the left.
     * Updates direction, resets idle time, and plays walking sound if on ground.
     * @returns {void}
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.idleTime = 0;
        if (this.y > 158 && window.mute == false) {
            this.walking_sound.play();
        }
    }

    /**
     * Checks if character is on the ground.
     * @returns {boolean} True if character's y position is at or below ground level (155)
     */
    isOnGround() {
    return this.y >= 155; 
    }

    /**
     * Checks if character can jump.
     * Verifies world exists, keyboard input (SPACE), and character is on ground.
     * @returns {boolean} True if character can jump, false otherwise
     */
    canJump() {
        return this.world && this.world.keyboard && 
               this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump.
     * Initializes jump sound if needed, plays sound if not muted, and sets upward velocity.
     * @returns {void}
     */
    jump() {
        if (!this.jumping_sound) {
            this.jumping_sound = new Audio('img/audios/jump.mp3');
        }
        if (!window.mute) {
            this.jumping_sound.currentTime = 0;
            this.jumping_sound.play();
        }
        this.speedY = 30;
    }

    /**
     * Collects coins and plays collection sound.
     * Increases coin count by 20.
     * @returns {void}
     */
    collectCoins() {
        this.coin_sound = new Audio('img/audios/coins_sounds.mp3');
        if (!window.mute) {
            this.coin_sound.play();
        }
        this.coins += 20;
    }

    /**
     * Collects bottles and plays collection sound.
     * Increases bottle count by 20, capped at maximum of 100.
     * @returns {void}
     */
    collectBottles() {
        this.bottle_sound = new Audio('img/audios/coins_sounds.mp3');
        if (window.mute == false) {
            this.bottle_sound.play();
        }
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Reduces the bottle count by 20.
     * Called when player uses a bottle (e.g., throws it).
     * @returns {void}
     */
    reduceBottlesAmount() {
        this.bottles -= 20;
    }


    /**
     * Applies damage to the character.
     * Updates health bar, checks for game over condition.
     * @param {number} damage - Amount of damage to apply
     * @returns {void}
     */
    hit(damage) {
        this.applyDamage(damage);
        this.updateHealthBar();
        this.checkGameOver();
    }

    /**
     * Applies damage to character's energy.
     * Prevents energy from going below 0 and records time of hit.
     * @param {number} damage - Amount of damage to apply
     * @returns {void}
     */
    applyDamage(damage) {
        this.energy -= damage;
        if (this.energy < 0) this.energy = 0;
        this.lastHit = Date.now();
    }

    /**
     * Updates the health bar UI to reflect current energy level.
     * @returns {void}
     */
    updateHealthBar() {
        if (this.world?.healthBar) {
            this.world.healthBar.setPercentage(this.energy);
        }
    }

    /**
     * Checks if character is dead and handles game over state.
     * Plays death sound, stops game, and shows game over screen.
     * @returns {void}
     */
    checkGameOver() {
        if (this.energy > 0 || !this.world) return;

        this.playDeathSound();
        this.world.stopGame();
        this.world.showEndscreen("img/You won, you lost/You lost.png");
    }

    /**
     * Plays the death sound effect.
     * Respects mute setting.
     * @returns {void}
     */
    playDeathSound() {
        if (window.mute) return;
        this.dead_sound.currentTime = 0;
        this.dead_sound.play();
    }

    /**
     * Checks if character is currently in hurt state.
     * Character is considered hurt for 0.3 seconds after taking damage.
     * @returns {boolean} True if character was hit within the last 0.3 seconds
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.3;
    }

    /**
     * Manages the running sound playback.
     * Plays looping running sound when moving on ground, pauses when stopped or in air.
     * @returns {void}
     */
    playRunSound() {
    const moving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;

    if (moving && this.isOnGround() && !this.runSoundPlaying) {
        this.runSoundPlaying = true;
        this.walking_sound.loop = true;
        if (!window.mute) {
            this.walking_sound.play();
        }
    } 
        else if (!moving || !this.isOnGround() || window.mute) {
            this.walking_sound.pause();
            this.runSoundPlaying = false;
            }   
        }
}