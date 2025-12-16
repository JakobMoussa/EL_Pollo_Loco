class Timer extends DrawableObject {
    x = 620;
    y = 70;
    height = 150;
    width = 100;


    draw(ctx) {
        ctx.front = "50px Bangers";
        ctx.fillText(timer, this.x, this.y)
    }
}