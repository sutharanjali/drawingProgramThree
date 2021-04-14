let radial = false; //allow toggle between rotational vs radial symmetry
let strokeThickness = 2; //set default stroke weight
let saveButton;
let clearButton;
let rotationalButton;
let radialButton;
let reflButton;
let strButton;
let reflSlider; //slider to alter number of reflections
let strSlider; //slider to alter stroke weight
let colorPicker;
var maxDiameter; //max size for circle pulse
var theta;


function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  clearButton = createButton('Clear');
  clearButton.position(width / 40 - clearButton.width / 40, 50);
  clearButton.mousePressed(clearScreen);
  clearButton.class("clearButton");

  saveButton = createButton('Save');
  saveButton.position(width / 40 - saveButton.width / 40, 100);
  saveButton.mousePressed(saveImg);
  saveButton.class("saveButton");

  rotationalButton = createButton('Rotational');
  rotationalButton.position(width / 40 - rotationalButton.width / 40, 150);
  rotationalButton.mousePressed(rotateSymmetry);
  rotationalButton.class("rotationalButton");

  radialButton = createButton('Radial');
  radialButton.position(width / 40 - radialButton.width / 40, 200);
  radialButton.mousePressed(radialSymmetry);
  radialButton.class("radialButton");

  reflButton = createButton('Reflections');
  reflButton.position(width / 40 - reflButton.width / 40, 250)
  reflButton.class("reflButton")
  reflSlider = createSlider(2, 15, 6, 1);
  reflSlider.position(width / 40 + reflButton.width + 20, 260);

  strButton = createButton('Stroke Size');
  strButton.position(width / 40 - strButton.width / 40, 300)
  strButton.class("strButton")
  strSlider = createSlider(1, 5, 2, 1);
  strSlider.position(width / 40 + strButton.width + 20, 310);

  colorPicker = createColorPicker('#000000');
  colorPicker.position(width / 40, 360);
  colorPicker.size(40, 40);

  maxDiameter = 100;
  theta = 0;
}

function draw() {
  background(220, 220, 220, 3);

  var diam = 100 + sin(theta) * maxDiameter; //circle size pulses on sine wave
  fill(158, 252, 255);
  noStroke();
  ellipse(width / 2, height / 2, diam, diam);
  theta += .50;

  let col = colorPicker.color(); //variable to store color picker value
  let val = reflSlider.value(); //store # of reflections value
  let angle = 360 / val; //make reflections

  push();
  translate(width / 2, height / 2); //reflect and draw around center of canvas
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;
  stroke(col); //set stroke color based on color picker value

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseIsPressed) {
      for (let i = 0; i < val; i++) {
        rotate(angle); //draw the rotations/reflections
        let strVal = strSlider.value(); //store stroke weight from slider
        strokeWeight(strVal); //use stroke weight from slider
        line(mx, my, pmx, pmy);
        if (radial == true) { //if radial is true draw using radial symmetry
          push();
          scale(1, -1);
          line(mx, my, pmx, pmy);
          pop();
        }
      }
    }
  }
  pop();
}

function saveImg() { //save image to computer
  saveCanvas('fileName', 'png');
}

function clearScreen() { //clear canvas
  clear();
}

function rotateSymmetry() {
  radial = false; //turns on rotational symmetry drawing
}

function radialSymmetry() {
  radial = true; //turns on radial symmetry drawing
}
