// // class Coin extends MovableObject {
// //     height = 100;
// //     width = 100;
// //     currenImage = 0;
// //     IMAGES_COIN = [
// //         'img/8_coin/coin_1.png',
// //         'img/8_coin/coin_2.png'
// //     ];

// //      offset = {
// //         top: 30,
// //         left: 30,
// //         right: 60,
// //         bottom: 60
// //     };

// //     coinIntervalId = null;

// //     // constructor() {
// //     //     super().loadImage('img/8_coin/coin_1.png');
// //     //     this.loadImages(this.IMAGES_COIN);
// //     //     this.x = 200 + Math.random() * 1700;
// //     //     this.y = 200 + Math.random() * 50;
// //     //     this.animate();
// //     // }

// //         constructor(x, y) {
// //         super().loadImage('img/8_coin/coin_1.png');
// //         this.loadImages(this.IMAGES_COIN);
        
// //         // Position - entweder übergebene Werte oder random
// //         if (x !== undefined) {
// //             this.x = x;
// //         } else {
// //             this.x = 200 + Math.random() * 1700;
// //         }
        
// //         if (y !== undefined) {
// //             this.y = y;
// //         } else {
// //             this.y = 200 + Math.random() * 50;
// //         }
        
// //         this.animate();
// //     }
// //     // constructor(x, y) {
// //     //     super().loadImage('img/8_coin/coin_1.png');
// //     //     this.loadImages(this.IMAGES_COIN);
        
// //     //     // Position - entweder übergebene Werte oder random
// //     //     if (x !== undefined) {
// //     //         this.x = x;
// //     //     } else {
// //     //         this.x = 200 + Math.random() * 1700;
// //     //     }
        
// //     //     if (y !== undefined) {
// //     //         this.y = y;
// //     //     } else {
// //     //         this.y = 200 + Math.random() * 50;
// //     //     }
        
// //     //     this.animate();
// //     // }


// //     // animate() {
// //     //     setInterval(() => {
// //     //         this.playAnimation(this.IMAGES_COIN);
// //     //     }, 300);
        
// //     //     setStoppableInterval(() => {
// //     //         let i = this.currenImage % this.BOTTLE_IMAGES.length;
// //     //         let path = this.BOTTLE_IMAGES[i];
// //     //         this.img = this.imageCache[path];
// //     //         this.currenImage++;
// //     //     }, 300);
// //     // }

// //     animate() {
// //         setInterval(() => {
// //             this.playAnimation(this.IMAGES_COIN);
// //         }, 300);
        
// //         setStoppableInterval(() => {
// //             let i = this.currenImage % this.BOTTLE_IMAGES.length;
// //             let path = this.BOTTLE_IMAGES[i];
// //             this.img = this.imageCache[path];
// //             this.currenImage++;
// //         }, 300);
// //     }

// //         stopAnimation() {
// //         if (this.coinIntervalId) {
// //             clearInterval(this.coinIntervalId);
// //         }
// //     }
// //     //  animate() {
// //     //     setInterval(() => {
// //     //         this.playAnimation(this.IMAGES_COIN);
// //     //     }, 300);
        
// //     //     setStoppableInterval(() => {
// //     //         let i = this.currenImage % this.BOTTLE_IMAGES.length;
// //     //         let path = this.BOTTLE_IMAGES[i];
// //     //         this.img = this.imageCache[path];
// //     //         this.currenImage++;
// //     //     }, 300);
// //     // }

// //     setStoppableIntervalCoin(fn, time) {
// //         let id = setInterval(fn, time);
// //         this.coinIntervalIds.push(id);
        
// //         // Falls globale intervalIds existiert, auch dort hinzufügen
// //         if (typeof intervalIds !== 'undefined') {
// //             intervalIds.push(id);
// //         }
// //         return id;
// //     }

// //         stopCoinIntervals() {
// //         this.coinIntervalIds.forEach(clearInterval);
// //         this.coinIntervalIds = [];
// //     }
// // }




// /// ------------------------------
// class Coin extends MovableObject {
//     height = 100;
//     width = 100;
//     currentImage = 0;
    
//     IMAGES_COIN = [
//         'img/8_coin/coin_1.png',
//         'img/8_coin/coin_2.png'
//     ];

//     offset = {
//         top: 30,
//         left: 30,
//         right: 60,
//         bottom: 60
//     };

//     coinIntervalId = null;

//     constructor(x, y) {
//         super();
//         this.loadImage('img/8_coin/coin_1.png');
//         this.loadImages(this.IMAGES_COIN);
        
//         // Setze Position mit Standardwerten falls nicht angegeben
//         this.x = (x !== undefined) ? x : 200 + Math.random() * 1700;
//         this.y = (y !== undefined) ? y : 200 + Math.random() * 50;
        
//         // Starte Animation
//         this.animate();
//     }

//     animate() {
//         // Robust: Prüfe verschiedene Möglichkeiten
//         const startAnimation = () => {
//             this.coinIntervalId = setInterval(() => {
//                 this.playAnimation(this.IMAGES_COIN);
//             }, 300);
            
//             // Füge zur globalen intervalIds Liste hinzu falls existiert
//             if (typeof intervalIds !== 'undefined' && Array.isArray(intervalIds)) {
//                 intervalIds.push(this.coinIntervalId);
//             }
//         };
        
//         // Versuche setStoppableInterval zuerst
//         if (typeof setStoppableInterval === 'function') {
//             this.coinIntervalId = setStoppableInterval(() => {
//                 this.playAnimation(this.IMAGES_COIN);
//             }, 300);
//         } 
//         // Dann window.setStoppableInterval
//         else if (typeof window.setStoppableInterval === 'function') {
//             this.coinIntervalId = window.setStoppableInterval(() => {
//                 this.playAnimation(this.IMAGES_COIN);
//             }, 300);
//         }
//         // Fallback: normales setInterval
//         else {
//             startAnimation();
//         }
//     }
    
//     stopCoinAnimation() {
//         if (this.coinIntervalId) {
//             clearInterval(this.coinIntervalId);
//             this.coinIntervalId = null;
//         }
//     }
// }






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