class Bar extends DrawableObject {
    x = 50;
    y = 0;
    height = 60;
    width = 200;
    percentage;
    IMAGES = [];

   constructor() {
        super();
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
        resolveImageIndex() {
            if (this.percentage == 100) {
                return 5;
            } else if (this.percentage > 79) {
                return 4;
            } else if (this.percentage > 59) {
                return 3;
            } else if (this.percentage > 39) {
                return 2;
            } else if (this.percentage > 19) {
                return 1;
        } else {
            return 0;
        }
    }

}