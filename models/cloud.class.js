/**
 * Cloud class representing background clouds in the game.
 * Extends MovableObject to inherit movement capabilities.
 * Clouds move continuously to the left to create a parallax effect.
 * @extends MovableObject
 */
class cloud extends MovableObject { 
    y = 50; 
    width = 500; 
    height = 250; 
    CLOUD_IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates a new Cloud instance.
     * Randomly selects a cloud image, sets random horizontal position,
     * and starts the continuous leftward movement animation.
     * @constructor
     */
    constructor() { 
        super();
        this.loadImage(this.CLOUD_IMAGES[Math.floor(Math.random() * this.CLOUD_IMAGES.length)]);
        this.x = 200 + Math.random() * 2000;
        this.y = 10;
        
        this.animate(); 
    }
    
    /**
     * Starts the cloud animation.
     * Makes the cloud move continuously to the left.
     * @returns {void}
     */
    animate() { 
        this.moveLeft(); 
    } 
}