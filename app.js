const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext('2d');

canvas.width = 450;
canvas.height = 450;

context.strokeStyle = '#2c2c2c'; //this is the line color
context.lineWidth = 2.5; //this is the line size 

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        context.beginPath();  //path is a line
        context.moveTo(x, y); //my mouse position
    } else {
        context.lineTo(x, y); //
        context.stroke();     //stroke
    }
}

function onMouseDown(e) {
    painting = true;
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting)
}