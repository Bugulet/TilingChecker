
let canvas;
let imageSource = 0;
let imageScale = 1.0;
let imageWidth = 0;
let imageHeight = 0;
let offsetX;
let offsetY;

let oldOffsetX, oldOffsetY;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(100);
    canvas.drop(gotFile);

    offsetX = width / 2;
    offsetY = height / 2;

    oldOffsetX = offsetX;
    oldOffsetY = offsetY;
}

function draw() {
    if (imageSource == 0) {
        background(100);
        fill(255);
        noStroke();
        textSize(24);
        textAlign(CENTER);
        text('Drag an image file onto the canvas.', width / 2, height / 2);
    }
    else {
        background(100);
        imageMode(CENTER);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let imageX = offsetX - imageWidth * imageScale + imageWidth * imageScale * i;
                let imageY = offsetY - imageHeight * imageScale + imageHeight * imageScale * j;
                image(imageSource, imageX, imageY, imageWidth * imageScale, imageWidth * imageSource.height / imageSource.width * imageScale);
            }
        }

    }

}

function gotFile(file) {
    if (file.type === 'image') {
        imageSource = createImg(file.data,()=>{
            //doing a callback if the image is a bit on the large size just to be jure
            imageWidth = width / imageSource.width * imageSource.width / 3;
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
    imageWidth = width / imageSource.width * imageSource.width / 3;
    imageHeight = imageWidth * imageSource.height / imageSource.width;
}

function mousePressed(event) {
    console.log(event);
}

function mouseWheel(event) {


    if (event.delta > 0) {
        imageScale -= 0.1;
    }
    else {
        imageScale += 0.1;
    }

    if (imageScale <= 0.1) {
        imageScale = 0.1;
    }
    console.log(imageScale);
}
