class MuteButton {
    constructor() {
        this.x = 650;
        this.y = 10;
        this.width = 50;
        this.height = 50;
    }

    draw(ctx) {
        ctx.save();
        this.drawBackground(ctx);
        this.drawIcon(ctx);
        ctx.restore();
    }

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
    
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x &&
               mouseX <= this.x + this.width &&
               mouseY >= this.y &&
               mouseY <= this.y + this.height;
    }

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
