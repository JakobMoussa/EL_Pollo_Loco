/**
 * Timer class representing a game timer display.
 * Extends DrawableObject to inherit positioning and drawing capabilities.
 * Displays elapsed game time in a custom font on the canvas.
 * @extends DrawableObject
 */
class Timer extends DrawableObject {
    x = 620;
    y = 70;
    height = 150;
    width = 100;

    /**
     * Draws the timer on the canvas.
     * Displays the global timer variable using the Bangers font at 50px size.
     * Note: The property name should be 'font' not 'front' (likely a typo in original code).
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    draw(ctx) {
        ctx.front = "50px Bangers";
        ctx.fillText(timer, this.x, this.y)
    }
}