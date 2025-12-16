class MovableObject extends DrawableObject {
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 2;
        energy = 100;
        lastHit = 0;
        applyGravityInterval;
        offset = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        isColliding(mo) {
            return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        }

        isAboveGround() {
            if(this instanceof ThrowableObject) {
                return true;
            } else {
            return this.y < 155;
            }
        }

        playAnimationOnce(images) {
    if (this.currentImage < images.length) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}

        hit(damage) {
            this.energy -= damage;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }

         isHurt() {
          let timePassed = new Date().getTime() - this.lastHit;
           timePassed = timePassed / 1000;
           return timePassed < 0.3;
        }

     
        isDead() {
            return this.energy <= 0;
        }

        playAnimation(images) {
                let i = this.currentImage % images.length;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
        }
        moveRight() {
            this.x += this.speed;
            this.otherDirection = false;
            // this.walking_sound.play();
        }

        moveLeft() {
            this.x -= this.speed;
        }

        jump() {
            this.speedY = 20;
        }

       


    }
