class cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.y = 10;
        this.animate();

    }

    animate() {
        this.moveLeft();
    }

}