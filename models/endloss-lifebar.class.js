class EndbossLifebar extends Bar {
    x = 100;
    y = 70;
    height = 40;
    width = 160;
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    constructor(x) {
        super();
        this.x = x;
        this.y = 20;
        this.width = 120;
        this.height = 16;
        this.percentage = 100;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }

    moveLifebar(endbossX) {
        this.x = endbossX - 50;
    }

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

    getHealthColor() {
        if (this.percentage > 60) return "#2ecc71";   
        if (this.percentage > 30) return "#b23137ff";
        return "#e74c3c";
    }

}