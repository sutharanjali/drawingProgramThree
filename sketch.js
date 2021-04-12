//let symmetry = 3;//change to alter number of reflections
let radial = false;

let strokeThickness = 2;
let saveButton;
let clearButton;
let rotSym;
let radSym;
let reflSlider;
let strSlider;
let colorPicker;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  angleMode(DEGREES);
  //strokeWeight(5);

  clearButton = createButton('Clear');
  clearButton.position(width / 40 - clearButton.width / 40, 50);
  clearButton.mousePressed(clearScreen);
  clearButton.class("clearButton");
  text('Clear screen', clearButton.x * 2 + clearButton.width, 75);

  saveButton = createButton('Save');
  saveButton.position(width / 40 - saveButton.width / 40, 100);
  saveButton.mousePressed(saveImg);
  saveButton.class("saveButton");
  text('Save drawing', saveButton.x * 2 + saveButton.width, 125);

  rotationalButton = createButton('Rotational');
  rotationalButton.position(width / 40 - rotationalButton.width / 40, 150);
  rotationalButton.mousePressed(rotateSymmetry);
  rotationalButton.class("rotationalButton");
  text('Use rotational symmetry', rotationalButton.x * 2 + rotationalButton.width, 175);

  radialButton = createButton('Radial');
  radialButton.position(width / 40 - radialButton.width / 40, 200);
  radialButton.mousePressed(radialSymmetry);
  radialButton.class("radialButton");
  text('Use radial symmetry', radialButton.x * 2 + radialButton.width, 225);

  reflSlider = createSlider(2, 15, 6, 1);
  reflSlider.position(width / 40, 250);
  text('Reflections', reflSlider.x * 1.5 + reflSlider.width, 265);

  strSlider = createSlider(1, 5, 2, 1);
  strSlider.position(width / 40, 270);
  text('Brush Size', strSlider.x * 1.5 + strSlider.width, 285);

  colorPicker = createColorPicker('#000000');
  colorPicker.position(width / 40, 300);
  colorPicker.size(40, 40);




}

function draw() {

  let col = colorPicker.color();
  let val = reflSlider.value(); //
  let angle = 360 / val;

  push();
  translate(width / 2, height / 2);
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;
  stroke(col);


  //fill('red');
  //ellipse(0,0, mouseX);


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseIsPressed) {
      for (let i = 0; i < val; i++) {
        rotate(angle);
        let strVal = strSlider.value();
        strokeWeight(strVal);
        line(mx, my, pmx, pmy);

        if (radial == true) {
          push();
          scale(1, -1);
          line(mx, my, pmx, pmy);
          pop();
        }
      }
    }
    if (key === '1') {
      strokeThickness = 1;
    } else if (key === '2') {
      strokeThickness = 2;
    } else if (key === '3') {
      strokeThickness = 3;
    } else if (key === '4') {
      strokeThickness = 4;
    } else if (key === '5') {
      strokeThickness = 5;
    }
  }
  // if(radial == true) {
  //   console.log('symmetry: radial');
  // } else {
  //   console.log('symmetry: rotational');
  // }
  pop();
  noStroke();
  fill(220);
  rect(0, 0, windowWidth, 75);
}


function saveImg() {
  saveCanvas('fileName', 'png');
}

function clearScreen() {
  background(220);
}

function rotateSymmetry() {
  radial = false; //turns on rotational symmetry drawing
}

function radialSymmetry() {
  radial = true; //turns on radial symmetry drawing
}
