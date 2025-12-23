/**
 * statusBarBottle class representing the bottle inventory status bar.
 * Extends Bar to inherit base bar functionality.
 * Displays the number of collected bottles available for throwing.
 * @extends Bar
 */
class statusBarBottle extends Bar {

/** 
 * Image paths for different bottle collection levels.
 * Images correspond to bottle percentages: 0%, 20%, 40%, 60%, 80%, 100%
 * @type {string[]} 
 */
IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
];

/** @type {number} Current bottle collection percentage (0-100) */
percentage = 0;

    /**
     * Creates a new statusBarBottle instance.
     * Loads all bottle bar images and initializes at 0% (no bottles collected).
     * Positions the bar below the health bar.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;     
        this.y = 100;   
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }
    
   /**
    * Sets the current bottle percentage and updates the displayed image.
    * Automatically selects the appropriate image based on percentage value.
    * @param {number} percentage - Bottle collection percentage (0-100)
    * @returns {void}
    */
   setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves which image index to use based on current percentage.
     * Maps percentage ranges to image indices:
     * - 100% → index 5
     * - 81-99% → index 4
     * - 61-80% → index 3
     * - 41-60% → index 2
     * - 21-40% → index 1
     * - 0-20% → index 0
     * @returns {number} The index of the image to display (0-5)
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}