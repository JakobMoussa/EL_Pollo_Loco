class cloud extends MovableObject { 
    y = 50; 
    width = 500; 
    height = 250; 

    CLOUD_IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() { 
        super();
        
        this.loadImage(this.CLOUD_IMAGES[Math.floor(Math.random() * this.CLOUD_IMAGES.length)]);
        
        // Zufällige X-Position über größeren Bereich verteilt
        this.x = 200 + Math.random() * 2000;
        this.y = 10;
        
        this.animate(); 
    }
    
    animate() { 
        this.moveLeft(); 
    } 
}