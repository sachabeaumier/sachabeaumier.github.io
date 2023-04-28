// function setup() {
//   createCanvas(windowWidth, windowHeight)

//   // angleMode(DEGREES)
//   // rectMode(CENTER)
// }

// function draw() {
//   // background(10, 20, 30)
//   if (mouseIsPressed) {
//     fill(112, 107, 148) // 150
//   } else {
//     fill(143, 148, 107) //255
//   }
//   ellipse(mouseX, mouseY, 400, 400)
// }

// 234, 21, 146

// 21, 234, 109

let numBalls = 13
let spring = 0.1
let gravity = 0.01
let friction = -0.9
let balls = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width), random(height), random(30, 70), i, balls)
  }
  noStroke()
  fill(255, 204)
}

function draw() {
  background(150, 150)
  balls.forEach((ball) => {
    ball.collide()
    ball.move()
    ball.display()
  })
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin
    this.y = yin
    this.vx = 0
    this.vy = 0
    this.diameter = din
    this.id = idin
    this.others = oin
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x
      let dy = this.others[i].y - this.y
      let distance = sqrt(dx * dx + dy * dy)
      let minDist = this.others[i].diameter / 2 + this.diameter / 2
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx)
        let targetX = this.x + cos(angle) * minDist
        let targetY = this.y + sin(angle) * minDist
        let ax = (targetX - this.others[i].x) * spring
        let ay = (targetY - this.others[i].y) * spring
        this.vx -= ax
        this.vy -= ay
        this.others[i].vx += ax
        this.others[i].vy += ay
      }
    }
  }

  move() {
    this.vy += gravity
    this.x += this.vx
    this.y += this.vy
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2
      this.vx *= friction
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2
      this.vx *= friction
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2
      this.vy *= friction
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2
      this.vy *= friction
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }
}
