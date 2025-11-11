class MovableObject extends DrawableObject {
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 2;
        energy = 100;
    
        applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/ 25)
        }


        isAboveGround() {
            if(this instanceof ThrowableObject) {
                return true;
            } else {
            return this.y < 155;
            }
        }

// 
        isColliding(mo) {
            return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
        }

        hit() {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }

         isHurt() {
          let timePassed = new Date().getTime() - this.lastHit;
           timePassed = timePassed / 1000;
           return timePassed < 5;
        }

        isDead() {
            return this.energy == 0;
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
