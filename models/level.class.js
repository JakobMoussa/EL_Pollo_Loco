class Level {
    endboss;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    statusBar;
    level_end_x = 2000;

    constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;  // WICHTIG: Dies ist jetzt der 4. Parameter!
        this.coins = coins;
        this.bottles = bottles;
    }
}


    // constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
    //     this.backgroundObjects = backgroundObjects || [];
    //     this.clouds = clouds || [];
    //     this.enemies = enemies || [];
    //     this.endboss = endboss || []; // Sollte ein Array sein
    //     this.coins = coins || [];
    //     this.bottles = bottles || [];
    // }

    // constructor(endboss, enemies, clouds, backgroundObjects, bottles, coins, statusBar){
    //     this.endboss = endboss;
    //     this.enemies = enemies;
    //     this.clouds = clouds;
    //     this.backgroundObjects = backgroundObjects;
    //     this.bottles = bottles;
    //     this.coins = coins;
    //     this.statusBar = statusBar; 
    // }