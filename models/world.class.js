class World {
    character = null;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new statusBarCoins();
    bottleBar = new statusBarBottle();
    // timer = new Timer();
    throwableObjects = [];
    endbossLifebar = null;
    // isRunning = true;

    constructor(canvas, keyboard) {    
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.endbossLifebarVisible = false;
        this.isRunning = true;
        this.muteButton = new MuteButton();
        this.addCanvasClickListener();

        this.setWorld();

        if (this.level.endboss && this.level.endboss.length > 0) {
            this.endbossLifebar = new EndbossLifebar(this.level.endboss[0].x);
        }

        this.draw();
        this.checkCollision();
        this.checkIfChickenAlive();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(e => e.world = this);
        this.level.endboss[0].world = this;
    }



    // draw() {
    //     if (!this.isRunning) return;
        
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.level.enemies.forEach(enemy => this.addToMap(enemy));

    //     this.ctx.save();
    //     this.ctx.translate(this.camera_x, 0);
        
    //     this.drawDynamicObjects();
        
    //     this.ctx.restore();
        
    //     this.drawStaticObjects();
        
    //     requestAnimationFrame(() => {
    //         this.draw();
    //     });

    // }

    draw() {
        if (!this.isRunning) return;
    
        this.drawFrameId = requestAnimationFrame(() => this.draw());
    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
    
        this.drawDynamicObjects();
    
        if (this.endbossLifebarVisible && this.endbossLifebar) {
            this.endbossLifebar.moveLifebar(this.level.endboss[0].x);
            this.addToMap(this.endbossLifebar);
        }
    
        this.ctx.restore();
        this.drawStaticObjects();
    }
    



    drawDynamicObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.level.enemies);
        

        if (this.level.endboss && this.level.endboss.length > 0) {
            this.addToMap(this.level.endboss[0]);
        }
        
        this.addToMap(this.character);
        
        this.addObjectsToMap(this.throwableObjects);
    }

    drawStaticObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.timer);
        this.muteButton.draw(this.ctx);
        
        if (this.endbossLifebar) {
            this.addToMap(this.endbossLifebar);
        }
    }

    moveCamera() {
        this.camera_x = -this.character.x + (this.canvas.width / 3);
        
        if (this.camera_x > 0) {
            this.camera_x = 0;
        }
        
        const levelEnd = -3000 + this.canvas.width;
        if (this.camera_x < levelEnd) {
            this.camera_x = levelEnd;
        }
    }

    addObjectsToMap(objects) {
        if (!objects || !Array.isArray(objects)) return;
        
        objects.forEach(mo => this.addToMap(mo));
    }

addToMap(mo) {
   if (!mo) return;

     try {
        mo.draw(this.ctx);
    } catch (error) {
        console.warn('Fehler beim Zeichnen von', mo?.constructor?.name, error);
    }
}

flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}

flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
}

    addCanvasClickListener() {
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.muteButton.isClicked(mouseX, mouseY)) {
                this.muteButton.toggleMute();
            }
        });
    }


    checkIfChickenAlive() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy == 0) {
                    this.level.enemies.splice(index, 1);
                }
            });
        }, 1000);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles >= 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.reduceBottlesAmount();
            this.bottleBar.setPercentage(this.character.bottles);
            this.keyboard.D = false;
            this.character.idleTime = 0;
        }
    }

    checkBottleHitsEnemies() {
        // Gehe rückwärts durch das Array, damit wir Elemente sicher entfernen können
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            const bottle = this.throwableObjects[i];
            
            // Prüfe Endboss
            if (this.level.endboss && this.level.endboss.length > 0) {
                const endboss = this.level.endboss[0];
                if (endboss.isColliding(bottle)) {
                    if (endboss.energy > 0) {
                        this.hurtEndboss(bottle, endboss);
                    } else {
                        this.killEnemy(bottle, endboss);
                    }
                    this.throwableObjects.splice(i, 1);
                    continue;
                }
            }
            
            // Prüfe normale Gegner
            for (let j = this.level.enemies.length - 1; j >= 0; j--) {
                const enemy = this.level.enemies[j];
                if (enemy.isColliding(bottle)) {
                    this.killEnemy(bottle, enemy);
                    this.level.enemies.splice(j, 1);
                    this.throwableObjects.splice(i, 1);
                    break;
                }
            }
        }
    }

    // hurtEndboss(bottle, endboss) {
    //     endboss.hit();
    //     bottle.splash();
    //     if (this.endbossLifebar) {
    //         this.endbossLifebar.setPercentage(endboss.energy);
    //     }
    // }

    hurtEndboss(bottle, endboss) {
        endboss.hit();
        bottle.splash();

        this.endbossLifebarVisible = true;
        if (this.endbossLifebar) {
            this.endbossLifebar.setPercentage(endboss.energy);
        }
    }

    killEnemy(bottle, enemy) {
        enemy.isDead();
        bottle.splash();
    }

    checkCollision() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            // Gegner-Kollisionen
            this.level.enemies.forEach((enemy) => {
                this.handleEnemyCollision(enemy);
            });
            
            // Münzen
            for (let i = this.level.coins.length - 1; i >= 0; i--) {
                if (this.character.isColliding(this.level.coins[i])) {
                    this.handleCoinCollision(i);
                }
            }
            
            // Flaschen
            for (let i = this.level.bottles.length - 1; i >= 0; i--) {
                if (this.character.isColliding(this.level.bottles[i]) && this.character.bottles < 100) {
                    this.handleBottleCollision(i);
                }
            }
        }, 50);
    }

    handleEnemyCollision(enemy) {
        if (!this.character.isColliding(enemy)) return;
    
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            enemy.isDead();
            return;
        }
    
        // 👉 IMMER Schaden beim Kontakt (mit Mini-Cooldown)
        const now = Date.now();
        const HIT_DELAY = 200; // ms → je kleiner, desto brutaler 😈
    
        if (enemy.energy > 0 && now - this.character.lastHit > HIT_DELAY) {
            this.character.hit(5);
            this.healthBar.setPercentage(this.character.energy);
        }
    }
    
    handleCoinCollision(index) {
        this.level.coins.splice(index, 1);
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
    }

    handleBottleCollision(index) {
        this.level.bottles.splice(index, 1);
        this.character.collectBottles();
        this.bottleBar.setPercentage(this.character.bottles);
    }

        checkEndbossAttackRange() {
        if (!this.level.endboss || this.level.endboss.length === 0) return;
        
        const endboss = this.level.endboss[0];
        const distanceToEndboss = endboss.x - this.character.x;

        if (Math.abs(distanceToEndboss) < 300 && 
            endboss.energy > 0 && this.character.energy > 0) {
            endboss.attack();
            this.character.hit(15);
            this.healthBar.setPercentage(this.character.energy);
        } else {
            if (endboss.stopAttack) {
                endboss.stopAttack();
            }
        }
    }

    checkFirstEndbossContact() {
        if (!this.level.endboss || this.level.endboss.length === 0) return;
        
        const endboss = this.level.endboss[0];
        const distanceToEndboss = Math.abs(endboss.x - this.character.x);

        if (distanceToEndboss < 400 && !endboss.firstContact) {
            endboss.firstContact = true;
            
            setInterval(() => {
                if (!this.isRunning) return;
                endboss.moveLeft();
                if (this.endbossLifebar) {
                    this.endbossLifebar.moveLifebar(endboss.x);
                }
            }, 500);
        }
    }

    run() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            this.checkThrowObjects();
            this.checkBottleHitsEnemies();
            this.checkFirstEndbossContact();
            this.moveCamera();
        }, 20);
        
        setInterval(() => {
            if (!this.isRunning) return;
            this.checkEndbossAttackRange();
        }, 400);
    }

    stopGame() {
        this.isRunning = false;
    }


showEndscreen(imagePath) {
    const bg = new Image();
    bg.src = "img/5_background/second_half_background.png";

    const overlay = new Image();
    overlay.src = imagePath;

    bg.onload = () => {
       
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);

        overlay.onload = () => {
            const imgWidth = 400;
            const imgHeight = 200;
            const x = (this.canvas.width - imgWidth) / 2;
            const y = (this.canvas.height - imgHeight) / 2;

            this.ctx.drawImage(overlay, x, y, imgWidth, imgHeight);
        };
    };

    this.isRunning = false;
}

    showCustomGameOver() {
    const bg = new Image();
    bg.src = "img/5_background/second_half_background.png";

    const overlay = new Image();
    overlay.src = "img/9_intro_outro_screens/game_over/you_lost.png";

    bg.onload = () => {
        this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);

        overlay.onload = () => {
            const imgWidth = 400;
            const imgHeight = 200;
            const x = (this.canvas.width - imgWidth) / 2;
            const y = (this.canvas.height - imgHeight) / 2;

            this.ctx.drawImage(overlay, x, y, imgWidth, imgHeight);
        };
    };

    this.isRunning = false;
}


    // showCustomWinScreen() {
    //     if (this.gameEnded) return;
    //     this.gameEnded = true;

    //     const bg = new Image();
    //     bg.src = "img/5_background/second_half_background.png";

    //     const overlay = new Image();
    //     overlay.src = "img/You won, you lost/you win.png";

    //     bg.onload = () => {
    //         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //         this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);

    //         overlay.onload = () => {
    //             const imgWidth = 400;
    //             const imgHeight = 200;
    //             const x = (this.canvas.width - imgWidth) / 2;
    //             const y = (this.canvas.height - imgHeight) / 2;

    //             this.ctx.drawImage(overlay, x, y, imgWidth, imgHeight);
    //             this.stopGame();
    //         };
    //     };

    //     // this.isRunning = false;
    // }
    showCustomWinScreen() {
        if (this.gameEnded) return;
        this.gameEnded = true;
    
        const bg = new Image();
        const overlay = new Image();
    
        let bgLoaded = false;
        let overlayLoaded = false;
    
        const tryDraw = () => {
            if (!bgLoaded || !overlayLoaded) return;
    
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);
    
            const imgWidth = 400;
            const imgHeight = 200;
            const x = (this.canvas.width - imgWidth) / 2;
            const y = (this.canvas.height - imgHeight) / 2;
    
            this.ctx.drawImage(overlay, x, y, imgWidth, imgHeight);
    
            this.stopGame(); 
        };
    
        bg.onload = () => { bgLoaded = true; tryDraw(); };
        overlay.onload = () => { overlayLoaded = true; tryDraw(); };
    
        // optional: Fehler sichtbar machen
        bg.onerror = () => console.error("BG konnte nicht geladen werden:", bg.src);
        overlay.onerror = () => console.error("Overlay konnte nicht geladen werden:", overlay.src);
    
        // src erst NACH onload setzen (wichtig!)
        bg.src = "img/5_background/second_half_background.png";
        overlay.src = "img/You won, you lost/you win.png";
    }
    
}