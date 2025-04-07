let input, button;
let numSegments = 6; // valor por defecto
let radius = 100;

function setup() {
  createCanvas(800, 400);
  input = createInput();
  input.position(20, 20);
  input.size(50);

  button = createButton('Dividir');
  button.position(input.x + input.width + 10, 20);
  button.mousePressed(() => {
    let val = int(input.value());
    if (val >= 1) {
      numSegments = val;
    }
  });

  textSize(14);
}

function draw() {
  background(255);

  fill(0);
  text("Número de divisiones:", 20, 15);

  let centers = [width / 4, width / 2, 3 * width / 4];

  drawCircleWithAlgorithm(centers[0], height / 2, radius, numSegments, 'bresenham');
  drawCircleWithAlgorithm(centers[1], height / 2, radius, numSegments, 'dda');
  drawCircleWithAlgorithm(centers[2], height / 2, radius, numSegments, 'punto_pendiente');

  fill(0);
  textAlign(CENTER);
  text("Bresenham", centers[0], height - 20);
  text("DDA", centers[1], height - 20);
  text("Punto-Pendiente", centers[2], height - 20);
}

function drawCircleWithAlgorithm(cx, cy, r, segments, algorithm) {
  noFill();
  stroke(0);
  ellipse(cx, cy, r * 2);

  for (let i = 0; i < segments; i++) {
    let angle = TWO_PI * i / segments;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);

    switch (algorithm) {
      case 'bresenham':
        bresenhamLine(cx, cy, x, y);
        break;
      case 'dda':
        ddaLine(cx, cy, x, y);
        break;
      case 'punto_pendiente':
        puntoPendienteLine(cx, cy, x, y);
        break;
    }
  }
}

function plot(x, y) {
  stroke(0);
  point(x, y);
}

// Bresenham
function bresenhamLine(x0, y0, x1, y1) {
  x0 = int(x0);
  y0 = int(y0);
  x1 = int(x1);
  y1 = int(y1);

  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    plot(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

// DDA
function ddaLine(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = max(abs(dx), abs(dy));
  let xInc = dx / steps;
  let yInc = dy / steps;

  let x = x0;
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    plot(x, y);
    x += xInc;
    y += yInc;
  }
}

// Punto-Pendiente
function puntoPendienteLine(x0, y0, x1, y1) {
  if (abs(x1 - x0) > abs(y1 - y0)) {
    if (x0 > x1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
    }
    let m = (y1 - y0) / (x1 - x0);
    for (let x = x0; x <= x1; x++) {
      let y = y0 + m * (x - x0);
      plot(x, y);
    }
  } else {
    if (y0 > y1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
    }
    let mInv = (x1 - x0) / (y1 - y0);
    for (let y = y0; y <= y1; y++) {
      let x = x0 + mInv * (y - y0);
      plot(x, y);
    }
  }
}
