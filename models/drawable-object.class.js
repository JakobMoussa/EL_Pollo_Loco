/**
 * DrawableObject class serving as the base class for all drawable game objects.
 * Provides core functionality for loading images, caching sprites, and rendering to canvas.
 * This is the foundation class that other game objects extend from.
 */
class DrawableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img = null;
    imageCache = {};
    
    /** @type {number} Index of the current animation frame */
    currentImage = 0;

    /**
     * Loads a single image from the specified path.
     * Creates a new Image object and sets it as the current image.
     * @param {string} path - Path to the image file
     * @returns {void}
     */
    loadImage(path) {
        const image = new Image();
        image.src = path;
        this.img = image;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * Used for preloading animation frames to ensure smooth playback.
     * @param {string[]} paths - Array of image file paths to load
     * @returns {void}
     */
    loadImages(paths) {
        paths.forEach(path => {
            const image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    /**
     * Draws the object on the canvas.
     * Handles horizontal flipping if otherDirection is true (for left-facing sprites).
     * Uses canvas transformation to flip the image without loading separate mirrored sprites.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    draw(ctx) {
    ctx.save();

        if (this.otherDirection) {
        ctx.translate(this.x + this.width, this.y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        ctx.restore();  
    }

}