/**
 * EndbossLifebar class representing the health bar for the endboss.
 * Extends Bar to inherit base bar functionality.
 * Displays a custom-styled health bar that follows the endboss and changes color based on health.
 * @extends Bar
 */
class EndbossLifebar extends Bar {
    x = 100;
    y = 70;
    height = 40;
    width = 160;
    
    /** 
     * Image paths for different health states (unused in current implementation).
     * The bar uses custom drawing instead of images.
     * @type {string[]} 
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * Creates a new EndbossLifebar instance.
     * Initializes the lifebar with custom position and dimensions.
     * @constructor
     * @param {number} x - Initial horizontal position of the lifebar
     */
    constructor(x) {
        super();
        this.x = x;
        this.y = 20;
        this.width = 120;
        this.height = 16;
        this.percentage = 100;
    }

    /**
     * Sets the current health percentage.
     * @param {number} percentage - Health percentage (0-100)
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
    }

    /**
     * Moves the lifebar to follow the endboss position.
     * Positions the bar slightly to the left of the endboss center.
     * @param {number} endbossX - Current horizontal position of the endboss
     * @returns {void}
     */
    moveLifebar(endbossX) {
        this.x = endbossX - 50;
    }

    /**
     * Draws the lifebar on the canvas with custom styling.
     * Creates a rounded rectangle with:
     * - Semi-transparent black background
     * - Health-colored fill based on current percentage
     * - Black border outline
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.roundRect(ctx, this.x, this.y, this.width, this.height, 6);
        ctx.fill();

        ctx.fillStyle = this.getHealthColor();
        this.roundRect(ctx, this.x, this.y, this.width * (this.percentage / 100), this.height, 6);
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        this.roundRect(ctx, this.x, this.y, this.width, this.height, 6);
        ctx.stroke();
    }

    /**
     * Creates a rounded rectangle path on the canvas.
     * Uses quadratic curves for smooth rounded corners.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context
     * @param {number} x - X coordinate of the rectangle's top-left corner
     * @param {number} y - Y coordinate of the rectangle's top-left corner
     * @param {number} width - Width of the rectangle
     * @param {number} height - Height of the rectangle
     * @param {number} radius - Radius of the rounded corners
     * @returns {void}
     */
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    /**
     * Determines the health bar color based on current health percentage.
     * - Green (#2ecc71) for health > 60%
     * - Red (#b23137ff) for health between 30-60%
     * - Dark red (#e74c3c) for health < 30%
     * @returns {string} Hex color code for the health bar fill
     */
    getHealthColor() {
        if (this.percentage > 60) return "#2ecc71";   
        if (this.percentage > 30) return "#b23137ff";
        return "#e74c3c";
    }

}