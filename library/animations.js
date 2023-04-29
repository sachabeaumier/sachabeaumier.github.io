// function setup() {
//   createCanvas(windowWidth, windowHeight)

//   // angleMode(DEGREES)
//   // rectMode(CENTER)
// }

// let numBalls = 13
// let spring = 0.1
// let gravity = 0.01
// let friction = -0.9
// let balls = []

// function setup() {
//   createCanvas(windowWidth, windowHeight)
//   for (let i = 0; i < numBalls; i++) {
//     balls[i] = new Ball(random(width), random(height), random(30, 70), i, balls)
//   }
//   noStroke()
//   fill(255, 204)
// }

// function draw() {
//   background(150, 150)
//   balls.forEach((ball) => {
//     ball.collide()
//     ball.move()
//     ball.display()
//   })
// }

// class Ball {
//   constructor(xin, yin, din, idin, oin) {
//     this.x = xin
//     this.y = yin
//     this.vx = 0
//     this.vy = 0
//     this.diameter = din
//     this.id = idin
//     this.others = oin
//   }

//   collide() {
//     for (let i = this.id + 1; i < numBalls; i++) {
//       // console.log(others[i]);
//       let dx = this.others[i].x - this.x
//       let dy = this.others[i].y - this.y
//       let distance = sqrt(dx * dx + dy * dy)
//       let minDist = this.others[i].diameter / 2 + this.diameter / 2
//       //   console.log(distance);
//       //console.log(minDist);
//       if (distance < minDist) {
//         //console.log("2");
//         let angle = atan2(dy, dx)
//         let targetX = this.x + cos(angle) * minDist
//         let targetY = this.y + sin(angle) * minDist
//         let ax = (targetX - this.others[i].x) * spring
//         let ay = (targetY - this.others[i].y) * spring
//         this.vx -= ax
//         this.vy -= ay
//         this.others[i].vx += ax
//         this.others[i].vy += ay
//       }
//     }
//   }

//   move() {
//     this.vy += gravity
//     this.x += this.vx
//     this.y += this.vy
//     if (this.x + this.diameter / 2 > width) {
//       this.x = width - this.diameter / 2
//       this.vx *= friction
//     } else if (this.x - this.diameter / 2 < 0) {
//       this.x = this.diameter / 2
//       this.vx *= friction
//     }
//     if (this.y + this.diameter / 2 > height) {
//       this.y = height - this.diameter / 2
//       this.vy *= friction
//     } else if (this.y - this.diameter / 2 < 0) {
//       this.y = this.diameter / 2
//       this.vy *= friction
//     }
//   }

//   display() {
//     ellipse(this.x, this.y, this.diameter, this.diameter)
//   }
// }

let w
let columns
let rows
let board
let next

function setup() {
  // Set simulation framerate to 10 to avoid flickering
  frameRate(10)
  createCanvas(windowWidth, windowHeight)
  w = 20
  // Calculate columns and rows
  columns = floor(width / w)
  rows = floor(height / w)
  // Wacky way to make a 2D array is JS
  board = new Array(columns)
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows)
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns)
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows)
  }
  init()
}

function draw() {
  background(255)
  generate()
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) fill(0)
      else fill(255)
      stroke(0)
      rect(i * w, j * w, w - 1, w - 1)
    }
  }
}

// reset board when mouse is pressed
function mousePressed() {
  init()
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0
      // Filling the rest randomly
      else board[i][j] = floor(random(2))
      next[i][j] = 0
    }
  }
}

// The process of creating the new generation
function generate() {
  // Loops and checks neighbours
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Adds state within 3x3 perimeter
      let neighbors = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j]
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y]
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0 // Loneliness
      else if (board[x][y] == 1 && neighbors > 3)
        next[x][y] = 0 // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3)
        next[x][y] = 1 // Reproduction
      else next[x][y] = board[x][y] // Stasis
    }
  }

  // Swap!
  let temp = board
  board = next
  next = temp
}
