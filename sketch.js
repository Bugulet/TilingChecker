
let canvas;
let imageSource = 0;
let imageScale = 0.33333;
let imageWidth = 0;
let imageHeight = 0;
let offsetX;
let offsetY;

let oldOffsetX, oldOffsetY;

let imageCountX=3;
let imageCountY=3;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(100);
    canvas.drop(gotFile);

    // offsetX = width / 2;
    // offsetY = height / 2;

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
        //push();

        background(100);
        imageCountX=3+1/imageScale;
        imageCountY=3+1/imageScale;
        //
        //translate(-imageWidth * imageScale/2,-imageHeight * imageScale/2);

        for (let i = 0; i < imageCountX; i++) {
            for (let j = 0; j < imageCountY; j++) {
                let imageX =imageWidth * imageScale * i;
                let imageY =imageHeight * imageScale * j;

                // imageX-=(imageWidth * imageScale*imageCountX)/2;
                // imageY-=(imageHeight * imageScale*imageCountY)/2;
                image(imageSource, imageX, imageY, imageWidth * imageScale, imageWidth * imageSource.height / imageSource.width * imageScale);
            }
        }

        //pop();

    }

}

function gotFile(file) {
    if (file.type === 'image') {
        imageSource = createImg(file.data,()=>{
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
    imageWidth = width / imageSource.width * imageSource.width ;
    imageHeight = imageWidth * imageSource.height / imageSource.width;
}

function mousePressed(event) {
    console.log(event);
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
