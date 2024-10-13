const canvas = document.createElement("canvas");
const button = document.createElement("button");
const eraser = document.createElement("button");
const input = document.createElement("input");
const slider = document.createElement("input");
const style = document.createElement("style");
style.type = "text/css";
style.textContent = `
  .draw{
     position: fixed;
     bottom: 20px;
     right: 5px;
     border: 2px solid black;
     background: white;
     z-index: 999;
     image-rendering: pixelated;
}

.button {
  position: fixed;
     bottom: 0;
     right: 5px;
     width: 100px;
     border: 2px solid black;
     z-index: 999;
}

.button2 {
  position: fixed;
     bottom: 0;
     right: 105px;
     width: 103px;
     border: 2px solid black;
     z-index: 999;
}

.input {
  position: fixed;
     bottom: 220px;
     right: 5px;
     width: 203px;
     border: 2px solid black;
     z-index: 999;
}

.input {
  position: fixed;
     bottom: 220px;
     right: 5px;
     width: 100px;
     border: 2px solid black;
     z-index: 999;
}
.eraser {
  position: fixed;
     bottom: 220px;
     right: 105px;
     width: 103px;
     height: 27px;
     border: 2px solid black;
     z-index: 999;
}

.stroke {
  position: fixed;
     bottom: 250px;
     right: 5px;
     width: 200px;
     border: 2px solid black;
     z-index: 999;
}
`;
document.head.appendChild(style);
slider.type = "range";
slider.className = "stroke";
slider.min = "1";
slider.max = "10";
slider.value = "2";
document.body.appendChild(slider);
input.type = "color";
input.value = "draw color";
input.className = "input";
document.body.appendChild(input);
eraser.textContent = "Eraser";
eraser.className = "eraser";
document.body.appendChild(eraser);
const ctx = canvas.getContext("2d");
canvas.className = "draw";
canvas.width = 200;
canvas.height = 200;
document.body.appendChild(canvas);
ctx.strokeStyle = "#000";
ctx.lineWidth = 2;
let isDrawing = false;
let history = [];
// dictionary

function drawBackground() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawBackground();

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

// drawing function

const copy = document.createElement("button");
copy.innerText = "Copy";
document.body.appendChild(copy);
copy.className = "button";

function copyCanvasToClipboard() {
  canvas.toBlob((blob) => {
    const clipboardItem = new ClipboardItem({ "image/png": blob });
    navigator.clipboard
      .write([clipboardItem])
      .then(() => {})
      .catch((err) => {
        console.error("could not copy canvas: ", err);
      });
  });
}

copy.addEventListener("click", copyCanvasToClipboard);
//copy function end

const clearButt = document.createElement("button");
clearButt.innerText = "Clear Canvas";
document.body.appendChild(clearButt);
clearButt.className = "button2";

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
}
clearButt.addEventListener("click", clearCanvas);

// haha it says butt!!!!

input.addEventListener("input", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.lineWidth = 2;
});

slider.addEventListener("input", (e) => {
  ctx.lineWidth = e.target.value;
});

eraser.addEventListener("click", () => {
  input.value = "#FFFFFF";
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 5;
});
