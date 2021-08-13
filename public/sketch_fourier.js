let t = 0;
let wave = [];

function setup() {
  let canvas = createCanvas(1230, 200);
  canvas.parent("sketch_div");
}

function draw() {
  background(100);
  translate(200, 100);
  let prev_x = 0;
  let prev_y = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i <= 5; i++) {
    prev_x = x;
    prev_y = y;
    let n = i * 2 + 1;
    let rad = 50 * (4 / (n * PI));

    x += rad * cos(n * t);
    y += rad * sin(n * t);

    stroke(200);
    noFill();
    ellipse(prev_x, prev_y, rad * 2);

    fill(255);
    ellipse(x, y, 8);
    line(prev_x, prev_y, x, y);
  }

  wave.unshift(y);
  translate(100, 0);
  line(x - 100, y, 0, wave[0]);
  fill(255);
  stroke(255);

  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  if (wave.length > 800) {
    wave.pop();
  }

  t += 0.05;
}
