class ThrowableObject extends MovableObject {
    
        IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
 
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    
    splash_sound = new Audio('img/audios/broken-bottle.mp3');
    bottleIntervalIds = []
       
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 40;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.setStoppableIntervalBottle(() => {
            this.x += 10;
        }, 25);

        this.setStoppableIntervalBottle(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.y >= 290) {
                this.splash();
            }
        }, 70);
    }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/ 25)
    }

    splash() {
        if (!window.mute) {
            this.splash_sound.play();
        }

        setStoppableInterval(() => {
            this.playAnimationOnce(this.IMAGES_SPLASH);
            this.bottleIntervalIds.forEach(clearInterval);
            setTimeout(() => {
                this.x = -4000;
            }, 1000);
        }, 50);
    }

    setStoppableIntervalBottle(fn, time) {
        let id = setInterval(fn, time);
        this.bottleIntervalIds.push(id);
        intervalIds.push(id);
    }
}