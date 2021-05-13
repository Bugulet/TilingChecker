
let canvas;
function setup() {
    // create canvas
    canvas = createCanvas(windowWidth,windowHeight);
    background(100);
    // Add an event for when a file is dropped onto the canvas
    canvas.drop(gotFile);
  }
  
  function draw() {
      background(100);
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    noLoop();
  }
  
  function gotFile(file) {
    // If it's an image file
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      const img = createImg(file.data).hide();
      // Draw the image onto the canvas
      image(img, 0, 0, width, height);
    } else {
      console.log('Not an image file!');
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  