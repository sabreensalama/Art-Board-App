
// Attach a mousedown, mousemove, and mouseup event listener to the canvas DOM
// on mousedown, get the mouse coordinates, and use the moveTo() method to position your drawing cursor and the beginPath() method to begin a new drawing path.
// on mousemove, continuously add a new point to the path with lineTo(), and color the last segment with stroke().
// on mouseup, set a flag to disable the drawing

var freehand = document.getElementById("ab-freehand")
var line = document.getElementById("ab-line")
var rect = document.getElementById("ab-rect")
var circle = document.getElementById("ab-circle")
var eraser = document.getElementById("ab-eraser")
var fillcolor = document.getElementById("fill-color")
var strokecolor = document.getElementById("stroke-color")
var mycanvas = document.getElementById("my-canvas")
var rectBound = mycanvas.getBoundingClientRect();
var ctx = mycanvas.getContext('2d')
var mode = null
var nStartX = 0;
var nStartY = 0;
const canvasx = rectBound.left
const canvasy = rectBound.top
var last_mousex = 0
var last_mousey = 0
//line
var bIsDrawing = false

let cx, cy;
let circleClicked = false;
let rectClicked = false;

mycanvas.addEventListener('mousedown', setPosition)
function setPosition(e) {
  if (mode == 'line') {
    //get current position
    const last_mousex = e.clientX - canvasx;
    const last_mousey = e.clientY - canvasy;
    ctx.beginPath(); // begin
    ctx.lineWidth = 5;
    ctx.moveTo(last_mousex, last_mousey);
  } else if (mode == 'rect') {
    rectClicked = true;
    last_mousex = e.clientX - canvasx;
    last_mousey = e.clientY - canvasy;
    ctx.beginPath();

  } else if (mode == 'circle') {
    circleClicked = true;
    cx = e.clientX - canvasx;
    cy = e.clientY - canvasy;
    ctx.beginPath();
  }


}
mycanvas.addEventListener('mousemove', drawshape)
function drawshape(e) {


  if (mode == 'rect') {
    if (rectClicked){
    // get the current mouse position
    mouseX = e.clientX - rectBound.left;
    mouseY = e.clientY - rectBound.top;
    // on starting vs current mouse position
    var width = mouseX - last_mousex;
    var height = mouseY - last_mousey;
  } }else if (mode == 'circle') {
    if (circleClicked) {
      var x = e.clientX - canvasx;
      var y = e.clientY - canvasy;
      const radius = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)

      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}



mycanvas.addEventListener('mouseup', mouseUp)

function mouseUp(e) {
  //todisable drawing
  if (mode === 'line') {
    const mousex = e.clientX - canvasx;
    const mousey = e.clientY - canvasy;
    ctx.lineTo(mousex, mousey); // to
    ctx.stroke(); // draw it!
    ctx.closePath();
  } else if (mode === 'rect') {

    mouseX = e.clientX - rectBound.left;
    mouseY = e.clientY - rectBound.top;
    // on starting vs current mouse position
    var width = mouseX - last_mousex;
    var height = mouseY - last_mousey;
    ctx.rect(last_mousex, last_mousey, width, height);
    ctx.stroke();
  } else if (mode === 'circle') {
    circleClicked = false;
    ctx.closePath();
  }

}


line.addEventListener('click', lineFunction)
function lineFunction() {
  mode = 'line'
}


rect.addEventListener('click', drawRectangle)
function drawRectangle() {

  mode = 'rect'

}


// onmousedown save that point as center
// omousemove calculate the distance to center and use as radius
// omouseup stop the operation/animation

circle.addEventListener('click', drawCircle)
function drawCircle() {
  mode = 'circle'
}


eraser.addEventListener('click', eraserFun);
function eraserFun() {
  ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
}


fillcolor.addEventListener('change', changeColor)
function changeColor(e) {
  var color = e.target.value;
  console.log(color)
  ctx.fillStyle = color
}
// //
strokecolor.addEventListener('change', changeStrokeColor)
function changeStrokeColor(e) {
  let color = e.target.value;
  console.log(color)
  ctx.strokeStyle = color
}



