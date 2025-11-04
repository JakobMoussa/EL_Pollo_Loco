const level1 = new Level([
        new chicken(), 
        new chicken(), 
        new chicken(),
        new Endboss()
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
    ]


);

