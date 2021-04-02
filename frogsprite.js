var fishSprite;
var backgroundSprite;
var foregroundSprite;
var gameStart;
var bottomPipes;
var topPipes;
var scoreKeeper;
var gameOver;
var finalScoreSheet;
var replaySprite;
var smallNumberSprite;
var bigNumberSprite;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function(renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img) {
    fishSprite = [
        new Sprite(img, 42, 131, 31, 33),
        new Sprite(img, 1, 173, 32, 33),
        new Sprite(img, 83, 174, 32, 31),
        new Sprite(img, 120, 130, 33, 29)
    ];
    backgroundSprite = new Sprite(img, 29, 1491, 794, 413);
    foregroundSprite = new Sprite(img, 559, 264, 380, 91);
    gameStart = new Sprite(img, 3, 367, 196, 227);
    bottomPipes = new Sprite(img, 541, 362, 33, 447); // green
    /*  new Sprite(img, 303, 360, 33, 448), green
        new Sprite(img, 337, 360, 33, 448), yellow
        new Sprite(img, 203, 360, 33, 448) red
     ]; */
    topPipes = new Sprite(img, 303, 360, 33, 448); // green
    /*  new Sprite(img, 541, 362, 33, 447), green
        new Sprite(img, 575, 362, 33, 447), yellow
        new Sprite(img, 439, 361, 33, 447) red
     ]; */

    scoreKeeper = new Sprite(img, 0, 255, 494, 62);
    gameOver = new Sprite(img, 151, 127, 323, 65);
    finalScoreSheet = new Sprite(img, 35, 947, 374, 271);
    replaySprite = new Sprite(img, 0, 317, 32, 32);
    //smallNumberSprite = new Sprite(img, 658, 0, 21, 23);
    //bigNumberSprite =  new Sprite(img, 658, 35, 24, 35);
    // smallNumberSprite.draw = function(renderingContext, x, y, num, center, offset) {
    //     num = num.toString();
    //     var step = this.width + 2;
    //     if (center) {
    //         x = center - (num.length * step - 2) / 2;
    //     }
    //     if (offset) {
    //         x += step * (offset - num.length) - 2;
    //     }
    //     for (var i = 0, len = num.length; i < len; i++) {
    //         var n = parseInt(num[i]);
    //         renderingContext.drawImage(img, step * n, this.y, this.width, this.height, x, y, this.width, this.height);
    //         x += step;
    //     }
    // };
    // bigNumberSprite.draw = function(renderingContext, x, y, num, center, offset) {
    //     num = num.toString();
    //     var step = this.width + 2;
    //     if (center) {
    //         x = center - (num.length * step - 2) / 2;
    //     }
    //     if (offset) {
    //         x += step * (offset - num.length) - 2;
    //     }
    //     for (var i = 0, len = num.length; i < len; i++) {
    //         var n = parseInt(num[i]);
    //         renderingContext.drawImage(img, step * n, this.y, this.width, this.height, x, y, this.width, this.height);
    //         x += step;
    //     }
    // };
}
