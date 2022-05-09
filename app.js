const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 450;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = INITIAL_COLOR; //this is the line color
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5; //this is the line size 

let painting = false;
let filling = false;

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

function handleColorClick(e) {
    const bgColor = e.target.style.backgroundColor;  
    context.strokeStyle = bgColor;
    context.fillStyle = bgColor;
}

function handleRangeChange(e) {
    const strokeSize = e.target.value;
    context.lineWidth = strokeSize;
}

function handleModeClick() {
    if(filling === true) {
        filling = false; 
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click',handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}