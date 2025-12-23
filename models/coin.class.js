/**
 * Coin class representing collectable coins in the game.
 * Extends MovableObject to inherit basic object capabilities.
 * Coins play a rotating animation and can be collected by the player.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 100;
    width = 100;
    currentImage = 0;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };

    /** 
     * Interval ID for the coin animation.
     * Used to stop the animation when coin is collected.
     * @type {number|null} 
     */
    coinIntervalId = null;

    /**
     * Creates a new Coin instance.
     * Loads coin images, sets position (uses provided coordinates or random),
     * and starts the rotation animation.
     * @constructor
     * @param {number} [x] - Horizontal position. If undefined, uses random position between 200-1900
     * @param {number} [y] - Vertical position. If undefined, uses random position between 200-250
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
       
        this.x = (x !== undefined) ? x : 200 + Math.random() * 1700;
        this.y = (y !== undefined) ? y : 200 + Math.random() * 50;
        
        this.animate();
    }

    /**
     * Starts the coin rotation animation.
     * Alternates between coin images every 300ms to create spinning effect.
     * Registers interval ID in global intervalIds array for cleanup if available.
     * @returns {void}
     */
    animate() {
        this.coinIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
        
        
        if (typeof window.intervalIds !== 'undefined' && Array.isArray(window.intervalIds)) {
            window.intervalIds.push(this.coinIntervalId);
        }
    }
    
    /**
     * Stops the coin animation.
     * Clears the animation interval and resets the interval ID.
     * Called when coin is collected or needs to be removed from the game.
     * @returns {void}
     */
    stopCoinAnimation() {
        if (this.coinIntervalId) {
            clearInterval(this.coinIntervalId);
            this.coinIntervalId = null;
        }
    }
}