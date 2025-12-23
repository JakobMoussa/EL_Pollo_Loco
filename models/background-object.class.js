/**
 * BackgroundObject represents a static background image in the game world.
 * It extends MovableObject but does not move by itself.
 */
class backgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * Creates a new BackgroundObject.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of the background.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}