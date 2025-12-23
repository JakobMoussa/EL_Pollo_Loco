/**
 * Keyboard class managing keyboard and touch input for the game.
 * Tracks the state of various control keys and provides touch control bindings
 * for mobile gameplay.
 */
class Keyboard {
    /**
     * Creates a new Keyboard instance.
     * Initializes all control keys to false (not pressed).
     * @constructor
     */
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
    }    

    /**
     * Initializes touch controls for mobile devices.
     * Binds touch events to on-screen buttons.
     * @returns {void}
     */
    initTouchControls() {
        this.bindBtnsPressEvents();
    }

    /**
     * Binds press events to all touch control buttons.
     * Maps each button ID to its corresponding keyboard key property.
     * @returns {void}
     */
    bindBtnsPressEvents() {
        this.bindTouch("btn-left", "LEFT");
        this.bindTouch("btn-right", "RIGHT");
        this.bindTouch("btn-jump", "SPACE");
        this.bindTouch("btn-throw", "D");
    }

    /**
     * Binds touch events to a specific button element.
     * Sets the corresponding key property to true on touch start,
     * and false on touch end. Stops event propagation to prevent
     * unwanted scrolling or other touch behaviors.
     * @param {string} buttonId - The DOM ID of the button element
     * @param {string} key - The keyboard property name to control (e.g., "LEFT", "SPACE")
     * @returns {void}
     */
    bindTouch(buttonId, key) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        btn.addEventListener("touchstart", (e) => {
            e.stopPropagation();
            this[key] = true;
        });

        btn.addEventListener("touchend", (e) => {
            e.stopPropagation();
            this[key] = false;
        });
    }

}