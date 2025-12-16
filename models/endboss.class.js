class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    speed = 1.5;
    alertRange = 400;

    isAlerted = false;
    isAttacking = false;
    deadSoundPlayed = false;
    hasDied = false;
    dead_sound = new Audio('img/audios/win-sounds.wav');
    lastHit = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(world) {
        super();

        this.world = world;
        this.x = 2000;

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.animate();
    }

animate() {

    setInterval(() => {
        if (!this.world || !this.world.character) return;
        if (this.energy <= 0) return;

        let character = this.world.character;
        let distance = Math.abs(this.x - character.x);

        if (distance < this.alertRange) {
            this.isAlerted = true;

            if (!this.isAttacking) {
                this.moveLeft();
            }
        }

    }, 1000 / 60);


    setInterval(() => {
        this.handleAnimation();
    }, 120);
}

    handleAnimation() {

        if (this.energy <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
            this.dead = true;
            return;
        }

        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return;
        }

        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            return;
        }

        if (this.isAlerted) {
            this.playAnimation(this.IMAGES_ALERT);
            return;
        }

        this.playAnimation(this.IMAGES_WALKING);
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
        }
    }

    stopAttack() {
        this.isAttacking = false;
    }

    // hit() {
    //     this.lastHit = Date.now();
    //     this.energy -= 13;

    //     if (this.energy < 0) {
    //         this.energy = 0;
    //     }

    //     if (this.energy === 0 && this.world) {

            // if (!this.deadSoundPlayed) {
            //     this.deadSoundPlayed = true;
            //     if (!window.mute) {
            //         this.dead_sound.currentTime = 0;
            //         this.dead_sound.play();
            //     }
            // }

    //         this.isDead = true;
    //         setTimeout(() => {
    //             this.world.stopGame();
    //             this.world.showCustomWinScreen();
    //         }, 2000);
    //     }
    // }
    hit() {
        if (this.hasDied) return;
    
        this.lastHit = Date.now();
        this.energy -= 13;
    
        if (this.energy < 0) {
            this.energy = 0;
        }
    
        if (this.energy === 0 && this.world) {
            this.hasDied = true;
    
            if (!this.deadSoundPlayed) {
                this.deadSoundPlayed = true;
                if (!window.mute) {
                    this.dead_sound.currentTime = 0;
                    this.dead_sound.play();
                }
            }
    
            setTimeout(() => {
                // this.world.stopGame();
                this.world.showCustomWinScreen();
            }, 1000);
        }
    }
    
    

    isHurt() {
        return (Date.now() - this.lastHit) < 400;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }
}
