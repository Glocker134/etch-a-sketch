function setAreaProperties(val) {
  const target = document.getElementById("container");
  let calWidth = defWidth / val;
  let calHeight = defHeight / val;
  target.style.cssText = `
    display: grid;
    grid-template-columns: repeat(${val}, ${calWidth}px);
    grid-template-rows: repeat(${val}, ${calHeight}px);
    `;
}

function createGrid(val = 16) {
  setAreaProperties(val);
  const parent = document.getElementById("container");
  for (var x = 1; x <= val ** 2; x++) {
    var para = document.createElement("div");
    para.className = "cell";
    para.style.cssText = `
        background-color: #FFF;
        width: calc(${defWidth} / ${val})px;
        height: calc(${defHeight} / ${val})px;
        border: 1px solid black;
        padding: 0.2em;
      }`;
    parent.appendChild(para);
    switch (isActive()) {
      case 0:
      case 1: setBlack();
        break;
      case 2: setChroma();
        break;
      case 3: setGrayScale();
    }
  }
}

function isActive() {
  if (blackActive && !(chromaActive) && !(grayScaleActive)) return 1;
  else if (chromaActive && !(blackActive) && !(grayScaleActive)) return 2;
  else if (grayScaleActive && !(chromaActive) && !(blackActive)) return 3;
  else return 0;
}

function addBlack() {
  this.style.backgroundColor = "rgb(0, 0, 0)";
}

function addChroma() {
  this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, $Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
}

function addGrayScale() {
  var test = this.style.backgroundColor;
  var fixed = test.replace(/[^0-9$,]/g, "");
  var pos = 0;
  let aux = "";
  while (fixed[pos] !== ",") {
    aux += fixed[pos];
    pos++
  }
  let ans = parseInt(aux, 10);
  if (grayValues.indexOf(test) == -1) ans = 255;
  else if (ans <= 26) ans = 0;
  else ans -= 26;
  this.style.backgroundColor = `rgb(${ans}, ${ans}, ${ans})`;
}

function setChroma() {
  let child = document.getElementsByClassName("cell");
  for (var x = 0; x < child.length; x++) {
    if (blackActive) child[x].removeEventListener("mouseenter", addBlack, false);
    else if (grayScaleActive) child[x].removeEventListener("mouseenter", addGrayScale, false);
    child[x].addEventListener("mouseenter", addChroma);
  }
  chromaActive = true;
  blackActive = false;
  grayScaleActive = false;
}

function setGrayScale() {
  let child = document.getElementsByClassName("cell");
  for (var x = 0; x < child.length; x++) {
    if (blackActive) child[x].removeEventListener("mouseenter", addBlack, false);
    else if (chromaActive) child[x].removeEventListener("mouseenter", addChroma, false);
    child[x].addEventListener("mouseenter", addGrayScale);
  }
  grayScaleActive = true;
  blackActive = false;
  chromaActive = false;
}

function setBlack() {
  let child = document.getElementsByClassName("cell");
  for (var x = 0; x < child.length; x++) {
    if (chromaActive) child[x].removeEventListener("mouseenter", addChroma, false);
    else if (grayScaleActive) child[x].removeEventListener("mouseenter", addGrayScale, false);
    child[x].addEventListener("mouseenter", addBlack);
  }
  blackActive = true;
  chromaActive = false;
  grayScaleActive = false;
}

function deleteGrid() {
  let child = document.getElementsByClassName("cell");
  for (var x = child.length - 1; x >= 0; x--) {
    document.getElementById("container").removeChild(child[x]);
  }
}

function resetGrid() {
  if (confirm("Are you sure you want to delete the canvas and start again?")) {
    let size = prompt("Please type the size of the canvas");
    // data parsing for non-numbers?
    if (size == "") size = 16;
    deleteGrid();
    setAreaProperties(size);
    createGrid(size);
  }
}

const grayValues = ["rgb(255, 255, 255)", "rgb(229, 229, 229)", "rgb(203, 203, 203)",
  "rgb(177, 177, 177)", "rgb(151, 151, 151)", "rgb(125, 125, 125)", "rgb(99, 99, 99)",
  "rgb(73, 73, 73)", "rgb(47, 47, 47)", "rgb(21, 21, 21)", "rgb(0, 0, 0)"];
const defWidth = 600;
const defHeight = 600;
let blackActive = false;
let chromaActive = false;
let grayScaleActive = false;

createGrid();

var button = document.getElementById("reset");
var chroma = document.getElementById("chroma");
var grayscale = document.getElementById("grayscale");
var black = document.getElementById("black");
button.addEventListener("click", resetGrid);
chroma.addEventListener("click", setChroma);
grayscale.addEventListener("click", setGrayScale);
black.addEventListener("click", setBlack);