class DrawableObject {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    img = null;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        const image = new Image();
        image.src = path;
        this.img = image;
    }

    loadImages(paths) {
        paths.forEach(path => {
            const image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        });
    }


    draw(ctx) {
    ctx.save();

    if (this.otherDirection) {
        ctx.translate(this.x + this.width, this.y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        ctx.restore();  
    }

}
