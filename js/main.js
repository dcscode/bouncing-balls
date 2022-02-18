const scoreDisplay = document.querySelector('p');

// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {

    constructor(x, y, velX, velY) {
        this. x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

class Ball extends Shape {

    constructor(x, y, velX, velY, color, size, exists) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        exists = true;
        this.exists = exists;
        
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        //is the ball going off the right edge of the canvas
        if ((this.x + this.size) >= width) {
            this.velX = (-this.velX);
        }

        //is the ball going off the left edge of the canvas
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        //is the ball going off the bottom edge of the canvas
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        //is the ball going off the top edge of the canvas
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if(!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

class EvilCircle extends Ball {
    constructor(x, y, color) {
        super(x, y, 20, 20, color, 10, true);
    }

    setControlsPlayer1() {
        window.addEventListener('keydown', (e) => {
            switch (e.key ) {
                case 'a':
                    this.x -= this.velX;
                    break;
                case 'd':
                    this.x += this.velX;
                    break;
                case 'w':
                    this.y -= this.velY;
                    break;
                case 's':
                    this.y += this.velY;
                    break;
        }
    });
    }

    setControlsPlayer2() {
        window.addEventListener('keydown', (e) => {
            switch (e.key ) {
                case 'ArrowLeft':
                    this.x -= this.velX;
                    break;
                case 'ArrowRight':
                    this.x += this.velX;
                    break;
                case 'ArrowUp':
                    this.y -= this.velY;
                    break;
                case 'ArrowDown':
                    this.y += this.velY;
                    break;
        }
    });
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
}

    checkBounds() {
        //is the EvilCirlce going off the right edge of the canvas
        if ((this.x + this.size) >= width) {
            this.x = (-this.size);
        }

        //is the EvilCircle going off the left edge of the canvas
        if ((this.x - this.size) <= 0) {
            this.x = -(this.size);
        }

        //is the EvilCircle going off the bottom edge of the canvas
        if ((this.y + this.size) >= height) {
            this.y = -(this.size);
        }

        //is the EvilCircle going off the top edge of the canvas
        if ((this.y - this.size) <= 0) {
            this.y = -(this.size);
        }

    }

    collisionDetect() {
        for (const ball of balls) {
            if(ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    ballCount -= 1;
                }
            }
        }
    }
}


const balls = [];
const redEvilCircle = new EvilCircle(50, 50, 'red');
const greenEvilCircle = new EvilCircle(30, 30, 'green');
redEvilCircle.setControlsPlayer1();
greenEvilCircle.setControlsPlayer2();
let ballCount = 0;
let feedingTime = setTimeout( () => {
    for(const ball of balls) {
        if(!(ball.exists)) {
            ball.exists = true;
            ballCount += 1;
        }
    }
}, 20000);

while (balls.length < 25) {
    const exists = true;
    const size = random(10, 20);
    const ball = new Ball(
        //ball position always drawn at least one ball width away from the edge of the canvas to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size,
        exists
    );
    ballCount += 1;
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    redEvilCircle.draw();
    redEvilCircle.checkBounds();
    redEvilCircle.collisionDetect();
    greenEvilCircle.draw();
    greenEvilCircle.checkBounds();
    greenEvilCircle.collisionDetect();

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
        }

    requestAnimationFrame(loop);
    scoreDisplay.textContent = `Ball Count: ${ballCount}`;
}

loop();
