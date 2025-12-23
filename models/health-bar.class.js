/**
 * HealthBar class representing the player character's health bar.
 * Extends Bar to inherit base bar functionality.
 * Displays health using a series of pre-rendered images for different health levels.
 * @extends Bar
 */
class HealthBar extends Bar {

    /** 
     * Image paths for different health levels.
     * Images correspond to health percentages: 0%, 20%, 40%, 60%, 80%, 100%
     * @type {string[]} 
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Creates a new HealthBar instance.
     * Loads all health bar images and initializes at full health (100%).
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }    
}