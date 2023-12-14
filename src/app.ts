const canvas = document.getElementById(
  "bouncingBallCanvas"
) as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

class Ball {
  x: number;
  y: number;
  dy: number;
  dx: number;
  size: number;
  color: string;
  gravity: number;
  friction: number;
  bounceFactor: number;
  isHorizontal: boolean;

  constructor(
    x: number,
    y: number,
    size: number,
    gravity: number,
    color: string,
    isHorizontal: boolean
  ) {
    this.x = x;
    this.y = y;
    this.dy = 0; // Vertical speed
    this.dx = Math.random() * 10; // Increased horizontal speed
    this.size = size;
    this.color = color;
    this.gravity = gravity; // Gravity by difault Earth
    this.friction = gravity.toFixed().toString().length === 1 ? 0.9995 :
                    gravity.toFixed().toString().length === 2 ? 0.995 : 0.89 // Horizontal friction
    this.bounceFactor = 0.8; // Dampening effect on each bounce
    this.isHorizontal = isHorizontal;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update(deltaTime: number) {
    console.log(this.gravity.toFixed().toString().length);
    
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

    if (this.isHorizontal) {
      // Update position horizontal
      this.x += this.dx;

      // Apply friction
      this.dx *= this.friction;

      // Bounce are reflected after hitting the sides
      if (this.x - this.size < 0) {
        this.dx = Math.abs(this.dx);
      } else if (this.x + this.size > canvas.width) {
        this.dx = -Math.abs(this.dx) * this.bounceFactor;
      }

      if (Math.abs(this.dx) < 0.1) {
        this.dx = 0;
      }
      console.log(this.dx);
    } else {
      if (this.x - this.size < 0) {
        this.x = this.size;
      } else if (this.x + this.size > canvas.width) {
        this.x = canvas.width - this.size;
      }
    }
  }
}

const balls: Ball[] = [];
let gravity: number = 9.81;
let isHorizontal: boolean = false;

// Event listener for canvas click to create new balls
canvas.addEventListener("click", (e) => {
  let size: number = Number(document.querySelector("#ballSize")!.innerHTML);
  const color: HTMLInputElement = document.querySelector("#ballColorInput")!;

  // Calculate ball position based on click
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;

  // Default size if not specified
  if (size === 0) {
    size = 50;
  }

  // Create a new ball and add it to the array
  const ball = new Ball(x, y, size, gravity, color.value, isHorizontal);
  if (balls.length === 15) {
    balls.shift(); // Remove the oldest ball if the limit is reached
  }
  balls.push(ball);
});

let lastTime: number = performance.now();

function tick(currentTime: number) {
  const deltaTime: number = (currentTime - lastTime) / 1000; // Convert to seconds
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update(deltaTime);
    ball.draw();
  });
  lastTime = currentTime;
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

const planetBtns: NodeListOf<Element> =
  document.querySelectorAll(".gravityPlanets");
const minusBtn: Element = document.querySelector("#minusBtn")!;
const plusBtn: Element = document.querySelector("#plusBtn")!;
const radiusBtn: Element = document.querySelector("#ballSize")!;
// const horizontalBtn: Element = document.querySelector("#horizontalBtn")!;

// Function for pressing planet buttons and selecting gravity, default 9.81
planetBtns.forEach((planetBtn) => {
  planetBtn.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    gravity = Number(target.nextElementSibling!.innerHTML);
  });
});

// Function for pressing the radius button minus a number
minusBtn.addEventListener("click", () => {
  const radiusNum: number = Number(
    document.querySelector("#ballSize")!.innerHTML
  );

  // Decrease ball size with a lower limit of 0
  if (radiusNum === 0) {
    radiusBtn.textContent = String(0);
  } else {
    radiusBtn.textContent = String(radiusNum - 1);
  }
});

// Function for pressing the radius button plus a number
plusBtn.addEventListener("click", () => {
  const radiusNum: number = Number(
    document.querySelector("#ballSize")!.innerHTML
  );

  // Increase ball size with an upper limit of 50
  if (radiusNum === 50) {
    radiusBtn.textContent = String(radiusNum);
  } else {
    radiusBtn.textContent = String(radiusNum + 1);
  }
});

// Function for pressing the button on or off horizontal bouncing
// horizontalBtn.addEventListener("click", () => {
//   isHorizontal = !isHorizontal;
// });

// The text is divided by letter to rotate the text in a circle
const texts: NodeListOf<Element> = document.querySelectorAll("h3")!;
texts.forEach((text: Element) => {
  text.innerHTML = text.innerHTML
    .split("")
    .map(
      (char, i) => `<span style="transform:rotate(${i * 50}deg)">${char}</span>`
    )
    .join("");
});
