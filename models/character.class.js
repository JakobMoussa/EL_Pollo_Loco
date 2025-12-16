class Character extends MovableObject {
    height = 300;
    y = 155;
    speed = 10;
    world;
    isCharacterAboveGround = false;
    runSoundPlaying = false;
    hurtSoundPlayed = false;

    walking_sound = new Audio('img/audios/running.mp3');
    hurt_sound = new Audio('img/audios/hurt.mp3');
    dead_sound = new Audio('img/audios/dead.mp3');
    run_sound = new Audio('img/audios/running.mp3');
    jump_sound = new Audio('img/audios/jump.mp3');

    bottle_sound;
    coin_sound;
    coins = 0;
    bottles = 0;
    idleTime = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 30
    };

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [  
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.keyboard = null;
    }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    animate() {
        setInterval(() => this.handleCharacterMovement(), 1000 / 60);
        setInterval(() => this.handleIdleAnimation(), 240);
        setInterval(() => this.handleCharacterAnimation(), 50);
        setInterval(() => this.handleCharacterJumpingAnimation(), 150);
    }

    handleCharacterMovement() {
        if (!this.world || !this.world.keyboard) return;
        
        this.walking_sound.pause();
        
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        
        if (this.canJump()) {
            this.jump();
            this.idleTime = 0;
        }
        this.playRunSound();
    }

    handleIdleAnimation() {
        if (!this.world || !this.world.keyboard) return;
        
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && 
            !this.world.keyboard.LEFT && !this.world.keyboard.D && !this.isHurt()) {
            
            if (this.idleTime < 20) {
                this.idleTime++;
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }
    }

handleCharacterAnimation() {
    if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        return;
    }
    if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);

        if (!this.hurtSoundPlayed && !window.mute) {
            this.hurtSoundPlayed = true;
            this.hurt_sound.currentTime = 0;
            this.hurt_sound.play();
        }
        return;
    } else {
        this.hurtSoundPlayed = false;
    }

    if (!this.isAboveGround()) {
        this.isCharacterAboveGround = false;

        if (this.world && this.world.keyboard &&
           (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        return;
    }

    if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
    }
}


    handleCharacterJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    canMoveRight() {
        return this.world && this.world.keyboard && 
        this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

     canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.idleTime = 0;
        if (this.y > 158 && window.mute == false) {
            this.walking_sound.play();
        }
    }
    
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.idleTime = 0;
        if (this.y > 158 && window.mute == false) {
            this.walking_sound.play();
        }
    }

    isOnGround() {
    return this.y >= 155; 
    }

    canJump() {
        return this.world && this.world.keyboard && 
               this.world.keyboard.SPACE && !this.isAboveGround();
    }

    jump() {
        if (!this.jumping_sound) {
            this.jumping_sound = new Audio('img/audios/jump.mp3');
        }
        if (!window.mute) {
            this.jumping_sound.currentTime = 0;
            this.jumping_sound.play();
        }
        this.speedY = 30;
    }

    collectCoins() {
        this.coin_sound = new Audio('img/audios/coins_sounds.mp3');
        if (!window.mute) {
            this.coin_sound.play();
        }
        this.coins += 20;
    }

    collectBottles() {
        this.bottle_sound = new Audio('img/audios/coins_sounds.mp3');
        if (window.mute == false) {
            this.bottle_sound.play();
        }
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    reduceBottlesAmount() {
        this.bottles -= 20;
    }

hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;

    this.lastHit = Date.now();

    if (this.world && this.world.healthBar) {
        this.world.healthBar.setPercentage(this.energy);
    }

    if (this.energy === 0 && this.world) {
        if (!window.mute) {
            this.dead_sound.currentTime = 0;
            this.dead_sound.play();
        }
        this.world.stopGame();
        this.world.showEndscreen("img/You won, you lost/You lost.png");
    }
}


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.3;
    }

    playRunSound() {
    const moving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;

    if (moving && this.isOnGround() && !this.runSoundPlaying) {
        this.runSoundPlaying = true;
        this.walking_sound.loop = true;
        if (!window.mute) {
            this.walking_sound.play();
        }
    } 
    else if (!moving || !this.isOnGround() || window.mute) {
        this.walking_sound.pause();
        this.runSoundPlaying = false;
    }
}

}