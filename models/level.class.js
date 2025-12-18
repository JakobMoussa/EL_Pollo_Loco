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
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
    }
}