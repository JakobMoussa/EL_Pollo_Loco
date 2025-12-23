/**
 * Bar is a base class for all status bars (health, coins, bottles).
 */
class Bar extends DrawableObject {
    x = 50;
    y = 0;
    height = 60;
    width = 200;
    percentage;
    IMAGES = [];

    /**
     * Creates a new Bar.
     */
    constructor() {
        super();
    }

    /**
     * Sets the percentage value of the bar and updates its image.
     * @param {number} percentage - Value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} Image index.
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        if (this.percentage > 79) return 4;
        if (this.percentage > 59) return 3;
        if (this.percentage > 39) return 2;
        if (this.percentage > 19) return 1;
        return 0;
    }
}
