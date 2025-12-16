class SalsaBottle extends MovableObject {
    height = 80;
    width = 70;
    y = 350;
    BOTTLE_IMAGE = [
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 10,
        left: 20,
        right: 30,
        bottom: 10
    };
    randomImg;

    constructor(x) {
        super();
        this.getRandomImg();
        
      
        if (this.randomImg === 0) {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
        
        if (x !== undefined) {
            this.x = x;
        } else {
            this.x = 300 + Math.random() * 1700;
        }
    }

    getRandomImg() {
        this.randomImg = Math.floor(Math.random() * 2);
    }
}