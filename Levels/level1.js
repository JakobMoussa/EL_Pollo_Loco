let level1;
function initLevel() {
level1 = new Level (
    [
        new backgroundObject('img/5_background/layers/air.png', -720*3),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', -720*3),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', -720*3),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', -720*3),

        new backgroundObject('img/5_background/layers/air.png', -720*2),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', -720*2),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', -720*2),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', -720*2),

        new backgroundObject('img/5_background/layers/air.png', -720),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

        new backgroundObject('img/5_background/layers/air.png', 0),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new backgroundObject('img/5_background/layers/air.png', 720),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

        new backgroundObject('img/5_background/layers/air.png', 2*720),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 2*720),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 2*720),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 2*720),

        new backgroundObject('img/5_background/layers/air.png', 3*720),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 3*720),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 3*720),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', 3*720),
    ],
    
    [
        new cloud(500),
        new cloud(1200),
        new cloud(1700),
        new cloud(2400),
        new cloud(3000),
        new cloud(3600),
    ],
    
    [
        new chicken(700),
        new chicken(1200),
        new chicken(800),
        new chicken(),
        new chicken(),
        new chicken(1000),
        new SmallChicken(),
        new SmallChicken(2200),
        new SmallChicken(2500)
    ],
    
    [
        new Endboss()
    ],

    [
        new Coin(300, 200),
        new Coin(500, 250),
        new Coin(700, 300),
        new Coin(900, 250),
        new Coin(1100, 300),
        new Coin(1300, 200),
        new Coin(1500, 250),
        new Coin(1700, 300),
        new Coin(1900, 250)
    ],
    
    [
        new SalsaBottle(400),
        new SalsaBottle(600),
        new SalsaBottle(800),
        new SalsaBottle(1000),
        new SalsaBottle(1200),
        new SalsaBottle(1400),
        new SalsaBottle(1500),
        new SalsaBottle(1050),
        new SalsaBottle(650),
        new SalsaBottle(900),
        new SalsaBottle(850)
    ]
);
}