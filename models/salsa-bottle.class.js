/**
 * SalsaBottle class representing collectable salsa bottles in the game.
 * Extends MovableObject to inherit base object capabilities.
 * Bottles appear on the ground and can be collected by the player to use as throwable weapons.
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
    height = 80;
    width = 70;
    y = 350;
    
    /** 
     * Available bottle image variations.
     * Two different bottle sprites for visual variety.
     * @type {string[]} 
     */
    BOTTLE_IMAGE = [
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    /** 
     * Collision detection offset values.
     * Creates a smaller hitbox for more forgiving collection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 10,
        left: 20,
        right: 30,
        bottom: 10
    };

    randomImg;

    /**
     * Creates a new SalsaBottle instance.
     * Randomly selects one of two bottle images and sets position.
     * @constructor
     * @param {number} [x] - Horizontal position. If undefined, uses random position between 300-2000
     */
    constructor(x) {
        super();
        this.getRandomImg();
        
        if (this.randomImg === 0) {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
        
        if (x !== undefined) {
            this.x = x;
        } else {
            this.x = 300 + Math.random() * 1700;
        }
    }

    /**
     * Generates a random bottle image index.
     * Sets randomImg to either 0 or 1 for bottle variation.
     * @returns {void}
     */
    getRandomImg() {
        this.randomImg = Math.floor(Math.random() * 2);
    }
}