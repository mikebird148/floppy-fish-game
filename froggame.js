
// There is a tutorial on youTube for this project I can reference if I need

var frames = 0;
var score = 0;
var best = 0;
var fish;
var pipes;
var canvas;
var renderingContext;
var width;
var height;
var states = {
    Splash: 0, Game: 1, Score: 2
};
var replayButton;
var currentState;
var foregroundPosition = 0;

function main() {
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    document.body.appendChild(canvas);
    fish = new Fish();
    pipes = new PipeCollection();
    loadGraphics();
}

function PipeCollection(){
    this._pipes = [];
    this.reset = function(){
        this._pipes =[];
    };
    this.add = function(){
        this._pipes.push(new Pipe());
    };

    this.update = function(){
        if (frames % 100 === 0){
            this.add();
        }

        for (var i = 0, len = this._pipes.length; i < len; i++){ //iterate through the array of corals and update each
            var pipe = this._pipes[i]; //the current coral
            if (i === 0){ // if this is the leftmost coral, it is the only coral that the fish can collide with
                pipe.detectCollision(); //so, determine if the fish has collided with this leftmost coral
            }
            pipe.x -= 2; //each frame, move each coral two pixels to the left. Higher/lower values change the movement speed.
            if (pipe.x < -pipe.width){
                this._pipes.splice(i, 1);
                i--;
                len--;
            }
        }
    };

    this.draw = function() {
        for (var i = 0, len = this._pipes.length; i < len; i++) {
            var pipe = this._pipes[i];
            pipe.draw();
        }
    };
}

function Pipe() {
    this.x = 500;
    this.y = height - (bottomPipes.height + foregroundSprite.height + 120 + 200 * Math.random());
    this.width = bottomPipes.width;
    this.height = bottomPipes.height;

    this.detectCollision = function () {
        // intersection
        var cx = Math.min(Math.max(fish.x, this.x), this.x + this.width);
        var cy1 = Math.min(Math.max(fish.y, this.y), this.y + this.height);
        var cy2 = Math.min(Math.max(fish.y, this.y + this.height + 80), this.y + 2 * this.height + 80);
        // closest difference
        var dx = fish.x - cx;
        var dy1 = fish.y - cy1;
        var dy2 = fish.y - cy2;
        // vector length
        var d1 = dx * dx + dy1 * dy1;
        var d2 = dx * dx + dy2 * dy2;
        var r = fish.radius * fish.radius;
        // determine intersection
        if (r > d1 || r > d2) {
            currentState = states.Score;
        }
    };

        this.draw = function () {
            bottomPipes.draw(renderingContext, this.x, this.y);
            topPipes.draw(renderingContext, this.x, this.y + 80 + this.height);
            score += this.x === fish.x ? 1 : 0;
            $("#score").text("Your Score: " + score);
            console.log(score);
        }
}

    function Fish() {
        this.frame = 0;
        this.animation = [0, 1, 2, 3];
        this.x = 170;
        this.y = 0;
        this.rotation = 0;
        this.radius = 14;
        this.velocity = 0;
        this.gravity = 0.25;
        this._jump = 4.6;

        this.jump = function () {
            this.velocity = -this._jump;
        };

        this.update = function () {
            var n = currentState === states.Splash ? 10 : 5;
            this.frame += frames % n === 0 ? 1 : 0;
            this.frame %= this.animation.length;
            if (currentState === states.Splash) {
                this.updateIdleFish();
            } else {
                this.updatePlayingFish();
            }
        };

        this.updateIdleFish = function () {
            this.y = height - 250 + 5 * Math.cos(frames / 9);
            this.rotation = 0;
        };

        this.updatePlayingFish = function () {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y >= height - foregroundSprite.height) {
                this.y = height - foregroundSprite.height;
                if (currentState === states.Game) {
                    currentState = states.Score;
                }
                this.velocity = this._jump;
            }
            if (this.y <= 15) {
                currentState = states.Score;
            }
            if (this.velocity >= this._jump) {
                this.frame = 1;
                this.rotation = Math.min(Math.PI / 4, this.rotation + 0.3); // -1 after this.rotation (after image)
            } else {
                this.rotation = -7; //-20000, -14;
            }
        };

        this.draw = function (renderingContext) {
            renderingContext.save();
            renderingContext.translate(this.x, this.y);
            renderingContext.rotate(this.rotation);
            var n = this.animation[this.frame];

            // this next group is just to see the collision detection
                // renderingContext.beginPath();
                // renderingContext.arc(0, 0, this.radius, 0, 2 * Math.PI);
                // renderingContext.stroke();
                // renderingContext.fill(); // this shows the collision detection area


            fishSprite[n].draw(renderingContext, -16, -16);
            renderingContext.restore();
        }
    }

    function windowSetup() {
        width = window.innerWidth;
        height = window.innerHeight;
        var inputEvent = "touchstart";
        if (width >= 500) {
            width = 500;
            height = 500;
            inputEvent = "mousedown";
        }
        // Create a listener on the input event.
        document.addEventListener(inputEvent, onpress);
    }

    function onpress(evt) {
        switch (currentState) {
            case states.Splash:
                currentState = states.Game;
                fish.jump();
                break;
            case states.Game:
                fish.jump();
                break;
            case states.Score:
                var mX = evt.offsetX, mY = evt.offsetY;
                if (replayButton.x < mX && mX < replayButton.x + replayButton.width && replayButton.y < mY && mY < replayButton.y + replayButton.height) {
                    pipes.reset();
                    currentState = states.Splash;
                    score = 0;
                }
                break;
        }
    }

    function canvasSetup() {
        canvas = document.createElement("canvas");
        canvas.style.border = "15px solid #f2d900";
        canvas.width = width;
        canvas.height = height;
        renderingContext = canvas.getContext("2d");
    }

    function loadGraphics() {
        // Initiate the sprite sheet
        var img = new Image();
        img.src = "images/final-frog-spritesheet2.png";
        img.onload = function () {
            initSprites(this);
            replayButton = {
                x: (width - replaySprite.width + 67) / 2,
                y: height - 60,
                width: replaySprite.width,
                height: replaySprite.height
            };
            gameLoop();
        };
    }

    function gameLoop() {
        update();
        render();

        window.requestAnimationFrame(gameLoop);
    }

    function update() {
        frames++;
        if (currentState !== states.Score) {
            foregroundPosition = (foregroundPosition - 2) % 14;
        } else {
            best = Math.max(best, score);
            $("#best").text("High Score: " + best);
        }
        if (currentState === states.Game) {
            pipes.update();
        }
        fish.update();
    }

    function render() {
        renderingContext.fillRect(0, 0, canvas.width, canvas.height);
        backgroundSprite.draw(renderingContext, -40, 0);
        backgroundSprite.draw(renderingContext, backgroundSprite.width - 40, height - backgroundSprite.height);
        pipes.draw(renderingContext);
        fish.draw(renderingContext);
        foregroundSprite.draw(renderingContext, foregroundPosition, height - 90);
        foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - 90);
        var width2 = width / 2;
        if (currentState === states.Splash) {
            gameStart.draw(renderingContext, 150, 110);
        }
        if (currentState === states.Score) {
            gameOver.draw(renderingContext, 90, 25);
            //finalScoreSheet.draw(renderingContext, 64, 114);
            //smallNumberSprite.draw(renderingContext, width2 - 330, height - 297, score, null, 10);
            //smallNumberSprite.draw(renderingContext, width2 - 330, height - 178, best, null, 10);
        } else {
            //bigNumberSprite.draw(renderingContext, width2, 20, score, width2);
        }

        scoreKeeper.draw(renderingContext, 3, height - 76);
        replaySprite.draw(renderingContext, replayButton.x, replayButton.y);
    }
