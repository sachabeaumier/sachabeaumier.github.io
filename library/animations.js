function setup() {
  createCanvas(windowWidth, windowHeight)

  // angleMode(DEGREES)
  // rectMode(CENTER)
}

function draw() {
  // background(10, 20, 30)
  if (mouseIsPressed) {
    fill(112, 107, 148) // 150
  } else {
    fill(143, 148, 107) //255
  }
  ellipse(mouseX, mouseY, 400, 400)
}

// 234, 21, 146

// 21, 234, 109
