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
    throwableObjects = [];
    endbossLifebar = null;

    constructor(canvas, keyboard) {
        this.initCanvas(canvas, keyboard);
        this.initGameState();
        this.initUI();
        this.setWorld();
        this.initEndbossLifebar();
        this.startLoops();
    }
    
    initCanvas(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.character = new Character();
    }

    initGameState() {
        this.camera_x = 0;
        this.isRunning = true;
        this.gameResult = null;
        this.showRestartButton = false;
    }

    initUI() {
        this.healthBar = new HealthBar();
        this.coinBar = new statusBarCoins();
        this.bottleBar = new statusBarBottle();
        this.muteButton = new MuteButton();
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.addCanvasClickListener();
    }
    
    initEndbossLifebar() {
        if (this.level.endboss?.length) {
            this.endbossLifebar = new EndbossLifebar(this.level.endboss[0].x);
        }
    }
    
    startLoops() {
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

    draw() {
        if (this.isDestroyed) return;
    
        this.drawFrameId = requestAnimationFrame(() => this.draw());
        this.clearCanvas();
        this.drawGameWorld();
        this.drawUI();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawUI() {
        this.drawStaticObjects();
    }

    drawGameWorld() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        if (this.isRunning) this.drawDynamicObjects();
        this.drawEndbossLifebarIfVisible();
        this.ctx.restore();
    }

    drawEndbossLifebarIfVisible() {
        if (!this.endbossLifebar) return;
        if (!this.level.endboss?.length) return;
    
        const endboss = this.level.endboss[0];
        if (endboss.energy <= 0) return;
    
        this.endbossLifebar.x = endboss.x;
        this.endbossLifebar.draw(this.ctx);
    }
    
    drawDynamicObjects() {
        this.drawBackground();
        this.drawCollectables();
        this.drawEnemies();
        this.drawCharacterAndProjectiles();
        this.drawThrowableObjects();
        console.log("Flaschen:", this.throwableObjects.length);

    }

    drawThrowableObjects() {
        this.addObjectsToMap(this.throwableObjects);
    }
    
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }
    
    drawCollectables() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }
    
    drawEnemies() {
        this.addObjectsToMap(this.level.enemies);
        if (this.level.endboss?.length) {
            this.addToMap(this.level.endboss[0]);
        }
    }

    drawCharacterAndProjectiles() {
        this.addToMap(this.character);
    }
    
    drawStaticObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.muteButton.draw(this.ctx);
        if (this.gameResult) {
            this.drawEndscreen(this.ctx);
        }
        if (this.showRestartButton) {
            this.drawRestartButton(this.ctx);
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
        this.canvas.removeEventListener("click", this.handleCanvasClick);
        this.canvas.addEventListener("click", this.handleCanvasClick);
    }
    
    handleCanvasClick(event) {
        const pos = this.getMousePosition(event);
        this.handleMuteClick(pos);
        this.handleRestartClick(pos);
    }

    getMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    handleMuteClick({ x, y }) {
        if (this.muteButton.isClicked(x, y)) {
            this.muteButton.toggleMute();
        }
        console.log("mute click");

    }
    
    handleRestartClick({ x, y }) {
        if (!this.showRestartButton || !this.restartButtonArea) return;
        const { x: bx, y: by, width, height } = this.restartButtonArea;
        if (x >= bx && x <= bx + width && y >= by && y <= by + height) {
            restartGame();
        }
    }
    
    checkIfChickenAlive() {
        this.setStoppableInterval(() => {
            if (!this.isRunning) return;
            
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy == 0) {
                    this.level.enemies.splice(index, 1);
                }
            });
        }, 1000);
    }

    checkThrowObjects() {
        if (!this.isRunning) return;
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
        if (!this.isRunning) return;
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            if (this.handleBottleHit(i)) break;
        }
    }

    handleBottleHit(index) {
        const bottle = this.throwableObjects[index];
        if (!bottle) return false;

        if (this.handleEndbossBottleHit(bottle, index)) return true;
        if (this.handleEnemyBottleHit(bottle, index)) return true;
    
        return false;
    }

    handleEndbossBottleHit(bottle, index) {
        if (!this.level.endboss?.length) return false;
    
        const endboss = this.level.endboss[0];
        if (!endboss.isColliding(bottle)) return false;
    
        this.processEndbossHit(bottle, endboss);
        this.throwableObjects.splice(index, 1);
        return true;
    }
    
    processEndbossHit(bottle, endboss) {
        if (endboss.energy > 0) {
            this.hurtEndboss(bottle, endboss);
        } else {
            this.killEnemy(bottle, endboss);
        }
    }

    handleEnemyBottleHit(bottle, index) {
        for (let j = this.level.enemies.length - 1; j >= 0; j--) {
            const enemy = this.level.enemies[j];
    
            if (enemy.isColliding(bottle)) {
                this.killEnemy(bottle, enemy);
                this.level.enemies.splice(j, 1);
                this.throwableObjects.splice(index, 1);
                return true;
            }
        }
        return false;
    }
    
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
        if (!this.isRunning) return;

        this.setStoppableInterval(() => {
            if (!this.isRunning) return;
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 50);
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(e => this.handleEnemyCollision(e));
    }
    
    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.handleCoinCollision(i);
            }
        }
    }

    checkBottleCollisions() {
        if (this.character.bottles >= 100) return;
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.bottles[i])) {
                this.handleBottleCollision(i);
            }
        }
    }
    
    handleEnemyCollision(enemy) {
        if (!this.character.isColliding(enemy)) return;
    
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            enemy.isDead();
            return;
        }
    
        const now = Date.now();
        const HIT_DELAY = 200;
    
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
        if (this.character.bottles >= 100) return;
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
            
            this.setStoppableInterval(() => {
                if (!this.isRunning) return;
                endboss.moveLeft();
                if (this.endbossLifebar) {
                    this.endbossLifebar.moveLifebar(endboss.x);
                }
            }, 500);
        }
    }

    run() {
        this.setStoppableInterval(() => {
            if (!this.isRunning) return;
            
            this.checkThrowObjects();
            this.checkBottleHitsEnemies();
            this.checkFirstEndbossContact();
            this.moveCamera();
        }, 20);
        
        this.setStoppableInterval(() => {
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
    this.gameResult = "lose";
    this.showRestartButton = true;

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

    this.showRestartButton = true;

}
   
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
    

        bg.onerror = () => console.error("BG konnte nicht geladen werden:", bg.src);
        overlay.onerror = () => console.error("Overlay konnte nicht geladen werden:", overlay.src);
    
        bg.src = "img/5_background/second_half_background.png";
        overlay.src = "img/You won, you lost/you win.png";

        this.isRunning = false;
        this.gameResult = "win";
        this.showRestartButton = true;
    }

    drawRestartButton(ctx) {
        const config = this.getRestartButtonConfig();
        this.setRestartButtonArea(config);
        this.drawRestartButtonBackground(ctx, config);
        this.drawRestartButtonText(ctx, config);
    }

    getRestartButtonConfig() {
        const width = 180;
        const height = 70;
    
        return {
            width,
            height,
            x: this.canvas.width / 2 - width / 2,
            y: this.canvas.height / 2 + 80
        };
    }

    setRestartButtonArea({ x, y, width, height }) {
        this.restartButtonArea = { x, y, width, height };
    }

    drawRestartButtonBackground(ctx, { x, y, width, height }) {
        ctx.save();
    
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 6;
    
        ctx.fillStyle = "#ff6b00";
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, 15);
        ctx.fill();
    
        ctx.restore();
    }

    drawRestartButtonText(ctx, { x, y, width, height }) {
        ctx.save();
    
        ctx.font = "28px Bangers";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("RESTART", x + width / 2, y + height / 2);
    
        ctx.restore();
    }
    
    drawEndscreen(ctx) {
        this.drawEndscreenBackground(ctx);
        this.drawEndscreenOverlay(ctx);
    }

    drawEndscreenBackground(ctx) {
        const bg = new Image();
        bg.src = "img/5_background/second_half_background.png";
        ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawEndscreenOverlay(ctx) {
        const overlay = new Image();
        overlay.src = this.getEndscreenImagePath();
    
        const size = this.getEndscreenImageSize();
        ctx.drawImage(overlay, size.x, size.y, size.width, size.height);
    }
    
    getEndscreenImagePath() {
        return this.gameResult === "win"
            ? "img/You won, you lost/you win.png"
            : "img/You won, you lost/You lost.png";
    }

    getEndscreenImageSize() {
        const width = 400;
        const height = 200;
    
        return {
            width,
            height,
            x: (this.canvas.width - width) / 2,
            y: (this.canvas.height - height) / 2
        };
    }
    
    setStoppableInterval(fn, ms) {
        const id = setInterval(fn, ms);
        window.intervalIds = window.intervalIds || [];
        window.intervalIds.push(id);
    }
    
    destroy() {
        this.canvas.removeEventListener("click", this.handleCanvasClick);
        this.isRunning = false;
    }
    
}
