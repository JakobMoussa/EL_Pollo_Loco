class Coin extends MovableObject {
    height = 100;
    width = 100;
    currentImage = 0;
    
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };

    coinIntervalId = null;

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
       
        this.x = (x !== undefined) ? x : 200 + Math.random() * 1700;
        this.y = (y !== undefined) ? y : 200 + Math.random() * 50;
        
        this.animate();
    }

    animate() {
        this.coinIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
        
        
        if (typeof window.intervalIds !== 'undefined' && Array.isArray(window.intervalIds)) {
            window.intervalIds.push(this.coinIntervalId);
        }
    }
    
    stopCoinAnimation() {
        if (this.coinIntervalId) {
            clearInterval(this.coinIntervalId);
            this.coinIntervalId = null;
        }
    }
}