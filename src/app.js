var canvas = document.getElementById("bouncingBallCanvas");
var context = canvas.getContext("2d");
var Ball = /** @class */ (function () {
    function Ball(x, y, size, gravity, color) {
        this.x = x;
        this.y = y;
        this.dy = 0; // Vertical speed
        this.size = size;
        this.color = color;
        this.gravity = gravity; // Gravity by difault Earth
        this.bounceFactor = 0.8; // Dampening effect on each bounce
    }
    Ball.prototype.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };
    Ball.prototype.update = function (deltaTime) {
        // Apply speed
        this.dy += this.gravity * deltaTime;
        // Update position
        this.y += this.dy;
        // Bounce upon hitting the bottom
        if (this.y + this.size >= canvas.height) {
            this.y = canvas.height - this.size;
            this.dy = -Math.abs(this.dy) * this.bounceFactor; // Ensure a positive bounce
        }
        // Dampening effect
        if (Math.abs(this.dy) < 0.1) {
            this.dy = 0;
        }
        if (this.x - this.size < 0) {
            this.x = this.size;
        }
        else if (this.x + this.size > canvas.width) {
            this.x = canvas.width - this.size;
        }
    };
    return Ball;
}());
var balls = [];
var gravity = 9.81;
// Event listener for canvas click to create new balls
canvas.addEventListener("click", function (e) {
    var size = Number(document.querySelector("#ballSize").innerHTML);
    var color = document.querySelector("#ballColorInput");
    // Calculate ball position based on click
    var x = e.clientX - canvas.getBoundingClientRect().left;
    var y = e.clientY - canvas.getBoundingClientRect().top;
    // Default size if not specified
    if (size === 0) {
        size = 50;
    }
    // Create a new ball and add it to the array
    var ball = new Ball(x, y, size, gravity, color.value);
    if (balls.length === 15) {
        balls.shift(); // Remove the oldest ball if the limit is reached
    }
    balls.push(ball);
});
var lastTime = performance.now(); //Resolution timestamp in milliseconds
function tick(currentTime) {
    console.log(lastTime);
    var deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
        ball.update(deltaTime);
        ball.draw();
    });
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
var planetBtns = document.querySelectorAll(".gravityPlanets");
var minusBtn = document.querySelector("#minusBtn");
var plusBtn = document.querySelector("#plusBtn");
var sizeBtn = document.querySelector("#ballSize");
// Function for pressing planet buttons and selecting gravity, default 9.81
planetBtns.forEach(function (planetBtn) {
    planetBtn.addEventListener("click", function (e) {
        var target = e.target;
        gravity = Number(target.nextElementSibling.innerHTML);
    });
});
// Function for pressing the radius button minus a number
minusBtn.addEventListener("click", function () {
    var ballSize = Number(document.querySelector("#ballSize").innerHTML);
    // Decrease ball size with a lower limit of 0
    if (ballSize === 0) {
        sizeBtn.textContent = String(0);
    }
    else {
        sizeBtn.textContent = String(ballSize - 1);
    }
});
// Function for pressing the radius button plus a number
plusBtn.addEventListener("click", function () {
    var ballSize = Number(document.querySelector("#ballSize").innerHTML);
    // Increase ball size with an upper limit of 50
    if (ballSize === 50) {
        sizeBtn.textContent = String(ballSize);
    }
    else {
        sizeBtn.textContent = String(ballSize + 1);
    }
});
// The text is divided by letter to rotate the text in a circle
var texts = document.querySelectorAll("h3");
texts.forEach(function (text) {
    text.innerHTML = text.innerHTML
        .split("")
        .map(function (char, i) { return "<span style=\"transform:rotate(".concat(i * 45, "deg)\">").concat(char, "</span>"); })
        .join("");
});
