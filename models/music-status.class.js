class musicStatus extends DrawableObject {
        IMAGES = [
            'img/music-img/music.png',
        ];

           
  constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.IMAGES[0]);
        this.x = 620;
        this.y = 10;
        this.width = 50;
        this.height = 50;

    }
}