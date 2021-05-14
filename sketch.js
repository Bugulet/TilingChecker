
let canvas;
let imageSource = 0;
let imageScale = 0.2;
let imageWidth = 0;
let imageHeight = 0;
let offsetX;
let offsetY;

let oldOffsetX, oldOffsetY;

let imageCount = 3;

let fullscreen=false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.drop(gotFile);
    oldOffsetX = offsetX;
    oldOffsetY = offsetY;
}

function draw() {
    if (imageSource == 0) {
        background(30);
        fill(255);
        noStroke();
        textSize(40);
        textAlign(CENTER);
        text('Drag an image here', width / 2, height / 2);
    }
    else {
        background(30);
        textAlign(LEFT);
        
        if (fullscreen) {
            imageMode(CORNER);
            imageCount = 3 + 1 / imageScale;
            for (let i = 0; i < imageCount; i++) {
                for (let j = 0; j < imageCount; j++) {
                    let imageX = imageWidth * imageScale * i;
                    let imageY = imageHeight * imageScale * j;
                    image(imageSource, imageX, imageY, imageWidth * imageScale, imageWidth * imageSource.height / imageSource.width * imageScale);
                }
            }
        }
        else{
            imageMode(CENTER);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    
                    let imageX=width/2-imageWidth*imageScale+imageWidth*imageScale*i;
                    let imageY=height/2-imageHeight*imageScale+imageHeight*imageScale*j;
                    image(imageSource, imageX, imageY, imageWidth * imageScale, imageWidth * imageSource.height / imageSource.width * imageScale);
                }         
            }
        }
        textSize(24);
        fill(30,180);
        rect(0,height-60,320,400);
        fill(255);
        text('Scroll to zoom', 0, height-29);
        text('Space bar to fill entire screen',0,height-5);

    }

}

function gotFile(file) {
    if (file.type === 'image') {
        imageSource = createImg(file.data, () => {
            //doing a callback if the image is a bit on the large size just to be sure
            imageWidth = width / imageSource.width * imageSource.width;
            imageHeight = imageWidth * imageSource.height / imageSource.width;
        }).hide();
        console.log("got image");
    } else {
        console.log('Not an image file!');
    }

    windowResized();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    offsetX = width / 2;
    offsetY = height / 2;
    imageWidth = width / imageSource.width * imageSource.width;
    imageHeight = imageWidth * imageSource.height / imageSource.width;
}

function mouseWheel(event) {
    if (event.delta > 0) {
        imageScale *= 0.95;
    }
    else {
        imageScale *= 1.05;
    }

    if (imageScale <= 0.1) {
        imageScale = 0.1;
    }
    console.log(imageScale);
}

function keyPressed() {
    if (keyCode === 32) {
      fullscreen=!fullscreen;
    }
  }
