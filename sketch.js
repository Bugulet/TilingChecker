
let canvas;
let imageSource=0;
let imageScale=1.0;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    
    background(100);
    canvas.drop(gotFile);
}

function draw() {
    if(imageSource==0){
    background(100);
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('Drag an image file onto the canvas.', width / 2, height / 2);
    }
    else{
        background(100);
        imageMode(CENTER);
        image(imageSource, width/2,height/2, imageSource.width*imageScale,imageSource.height*imageScale);
    }

}

function gotFile(file) {
    if (file.type === 'image') {
        imageSource = createImg(file.data).hide();
    } else {
        console.log('Not an image file!');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    print(event.delta);
    
    if(event.delta>0){
        imageScale-=0.1;
    }
    else{
        imageScale+=0.1;
    }
    
  }
