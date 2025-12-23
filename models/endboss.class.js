/**
 * Endboss class representing the final boss enemy in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * Features multiple states: idle, alerted, walking, attacking, hurt, and dead.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    speed = 1.5;
    alertRange = 400;
    isAlerted = false;
    isAttacking = false;
    deadSoundPlayed = false;
    hasDied = false;
    dead_sound = new Audio('img/audios/win-sounds.wav');
    
    lastHit = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Image paths for alert animation frames (when player detected) */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    /** @type {string[]} Image paths for attack animation frames */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} Image paths for hurt animation frames */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Image paths for death animation frames */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates a new Endboss instance.
     * Initializes the boss with a reference to the game world,
     * sets starting position, loads all animation frames, and starts animation loops.
     * @constructor
     * @param {World} world - Reference to the game world object
     */
    constructor(world) {
        super();

        this.world = world;
        this.x = 2000;

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }

    /**
     * Starts all animation loops for the endboss.
     * Initializes both movement and sprite animation intervals.
     * @returns {void}
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }

    /**
     * Starts the movement update loop.
     * Runs at 60 FPS to update boss position and behavior.
     * @returns {void}
     */
    startMovementLoop() {
        setInterval(() => this.updateMovement(), 1000 / 60);
    }

    /**
     * Updates the boss's movement state.
     * Checks if character is in range and moves towards them if alerted.
     * @returns {void}
     */
    updateMovement() {
        if (!this.canAct()) return;

        if (this.isCharacterInRange()) {
            this.isAlerted = true;
            this.moveTowardsCharacter();
        }
    }

    /**
     * Checks if the boss can perform actions.
     * Requires world, character, and positive energy (not dead).
     * @returns {boolean} True if boss can act, false otherwise
     */
    canAct() {
        return this.world && this.world.character && this.energy > 0;
    }

    /**
     * Checks if the character is within the boss's alert range.
     * @returns {boolean} True if character is close enough to trigger alert
     */
    isCharacterInRange() {
        const distance = Math.abs(this.x - this.world.character.x);
        return distance < this.alertRange;
    }

    /**
     * Moves the boss towards the character.
     * Only moves if not currently attacking.
     * @returns {void}
     */
    moveTowardsCharacter() {
        if (!this.isAttacking) {
            this.moveLeft();
        }
    }

    /**
     * Starts the sprite animation loop.
     * Updates animation frames every 120ms (~8.3 FPS).
     * @returns {void}
     */
    startAnimationLoop() {
        setInterval(() => this.handleAnimation(), 120);
    }

    /**
     * Handles animation state machine with priority order.
     * Prioritizes death, then hurt, then attack, then walking, then idle.
     * @returns {void}
     */
    handleAnimation() {
        if (this.handleDeath()) return;
        if (this.handleHurt()) return;
        if (this.handleAttack()) return;
        if (this.handleWalking()) return;
        this.handleIdle();
    }

    /**
     * Handles death animation.
     * @returns {boolean} True if boss is dead and animation was played
     */
    handleDeath() {
        if (this.energy > 0) return false;
        this.playAnimation(this.IMAGES_DEAD);
        return true;
    }

    /**
     * Handles hurt animation.
     * @returns {boolean} True if boss is hurt and animation was played
     */
    handleHurt() {
        if (!this.isHurt()) return false;
        this.playAnimation(this.IMAGES_HURT);
        return true;
    }

    /**
     * Handles attack animation.
     * @returns {boolean} True if boss is attacking and animation was played
     */
    handleAttack() {
        if (!this.isAttacking) return false;
        this.playAnimation(this.IMAGES_ATTACK);
        return true;
    }

    /**
     * Handles walking animation.
     * Only plays if boss is alerted and has positive speed.
     * @returns {boolean} True if walking animation was played
     */
    handleWalking() {
        if (!this.isAlerted || this.speed <= 0) return false;
        this.playAnimation(this.IMAGES_WALKING);
        return true;
    }

    /**
     * Handles idle state animation.
     * Plays alert animation if alerted, otherwise plays walking animation.
     * @returns {void}
     */
    handleIdle() {
        if (this.isAlerted) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
    
    /**
     * Initiates an attack.
     * Sets the attacking flag to true.
     * @returns {void}
     */
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
        }
    }

    /**
     * Stops the current attack.
     * Resets the attacking flag to false.
     * @returns {void}
     */
    stopAttack() {
        this.isAttacking = false;
    }

    /**
     * Handles damage when boss is hit.
     * Applies damage and checks for death condition.
     * Does nothing if boss has already died.
     * @returns {void}
     */
    hit() {
        if (this.hasDied) return;
    
        this.applyDamage();
        this.checkDeath();
    }

    /**
     * Applies damage to the boss's energy.
     * Reduces energy by 13 points and records hit time.
     * Prevents energy from going below 0.
     * @returns {void}
     */
    applyDamage() {
        this.lastHit = Date.now();
        this.energy -= 13;
        if (this.energy < 0) this.energy = 0;
    }

    /**
     * Checks if the boss has died and handles death sequence.
     * Plays death sound and triggers win screen after delay.
     * @returns {void}
     */
    checkDeath() {
        if (this.energy > 0 || !this.world) return;
    
        this.hasDied = true;
        this.playDeathSound();
        this.triggerWinScreen();
    }

    /**
     * Plays the death/victory sound effect.
     * Only plays once and respects mute setting.
     * @returns {void}
     */
    playDeathSound() {
        if (this.deadSoundPlayed || window.mute) return;
        this.deadSoundPlayed = true;
        this.dead_sound.currentTime = 0;
        this.dead_sound.play();
    }

    /**
     * Triggers the win screen after a 1-second delay.
     * Gives player time to see the boss's death animation.
     * @returns {void}
     */
    triggerWinScreen() {
        setTimeout(() => {
            this.world.showCustomWinScreen();
        }, 1000);
    }
    
    /**
     * Checks if the boss is currently in hurt state.
     * Boss is considered hurt for 400ms after taking damage.
     * @returns {boolean} True if boss was hit within the last 400ms
     */
    isHurt() {
        return (Date.now() - this.lastHit) < 400;
    }

    /**
     * Moves the boss to the left.
     * Updates position and ensures boss faces right direction.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the boss to the right.
     * Updates position and ensures boss faces right direction.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }
}