/**
 * MuteButton class representing an interactive mute/unmute button in the game UI.
 * Provides visual feedback and controls global audio state.
 * Displays as a circular button with speaker icon that changes based on mute state.
 */
class MuteButton {
    /**
     * Creates a new MuteButton instance.
     * Initializes button position and dimensions in the top-right corner.
     * @constructor
     */
    constructor() {
        this.x = 650;
        this.y = 10;
        this.width = 50;
        this.height = 50;
    }

    /**
     * Draws the mute button on the canvas.
     * Renders a circular background with a speaker icon.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    draw(ctx) {
        ctx.save();
        this.drawBackground(ctx);
        this.drawIcon(ctx);
        ctx.restore();
    }

    /**
     * Draws the circular background for the button.
     * Creates a semi-transparent black circle.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    drawBackground(ctx) {
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width / 2,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fill();
    }

    /**
     * Draws the speaker icon on the button.
     * Displays a muted speaker emoji (🔇) when muted,
     * or a sound speaker emoji (🔊) when unmuted.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas
     * @returns {void}
     */
    drawIcon(ctx) {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
    
        ctx.fillText(
            window.mute ? "🔇" : "🔊",
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }
    
    /**
     * Checks if a mouse click occurred within the button's bounds.
     * Used for detecting button clicks for toggling mute state.
     * @param {number} mouseX - X coordinate of the mouse click
     * @param {number} mouseY - Y coordinate of the mouse click
     * @returns {boolean} True if click is within button bounds, false otherwise
     */
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x &&
               mouseX <= this.x + this.width &&
               mouseY >= this.y &&
               mouseY <= this.y + this.height;
    }

    /**
     * Toggles the global mute state.
     * When muting, pauses all audio elements and resets their playback position.
     * Updates the window.mute flag which other game components check.
     * @returns {void}
     */
    toggleMute() {
        window.mute = !window.mute;
    
        if (window.mute) {
            document.querySelectorAll("audio").forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }
    
}