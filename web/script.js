// create canvas
const canvas = document.createElement("canvas", {
    "width": 100,
    "height": 100
});
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// memory array
let memoryGlobal;

// clear color
let clearColor = "white";

// gets null-terminated string from memory buffer
function getStr(ptr) {
    let len = new Uint8Array(memoryGlobal.buffer, ptr).findIndex(item => item === 0);
    let arr = new Uint8Array(memoryGlobal.buffer, ptr, len);
    let result = new TextDecoder().decode(arr);
    return result;
}

// gets color from struct in WASM memory buffer
function getColor(ptr) {
    let arr = new Uint8Array(memoryGlobal.buffer, ptr, 4);
    let r = arr[0];
    let g = arr[1];
    let b = arr[2];
    let a = arr[3];
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// convert number to string
function str(num) {
    return num.toString();
}

// print given text to the console
function log(text) {
    console.log(getStr(text));
}

// set canvas size
function setCanvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
}

// set page title
function setTitle(title) {
    document.getElementsByTagName("title")[0].innerText = getStr(title);
}

// sets clear color
function setClearColor(color) {
    clearColor = getColor(color);
    console.log(clearColor);
}

// clears canvas
function clear() {
    let rect = canvas.getBoundingClientRect();
    drawRect(clearColor, 0, 0, rect.width, rect.height);
}

// IMAGE FUNCTIONS

// stores all loaded images
let images = [];

// load image
function loadImage(uri) {
    let img = new Image();
    img.src = getStr(uri);
    img.style.display = "none";
    document.head.appendChild(img);
    images[images.length] = img;
    return images.length - 1;
}

// renders image at coordinates
function drawImage(id, x, y) {
    ctx.drawImage(images[id], x, y);
}

// AUDIO FUNCTIONS

// stores all loaded images
let sounds = [];

// load image
function loadAudio(uri) {
    let audio = new Audio(getStr(uri));
    sounds[sounds.length] = audio;
    return sounds.length - 1;
}

// plays sound
function playAudio(id, speed=1, loop=false) {
    sounds[id].loop = loop;
    sounds[id].playbackRate = speed;
    sounds[id].play();
}

// SHAPE FUNCTIONS

// draws rectangle at position with given size and color
function drawRect(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// sent to WASM
let imports = {
    "env": {
        "str": str,
        "log": log,
        "setCanvasSize": setCanvasSize,
        "setTitle": setTitle,
        "setClearColor": setClearColor,
        "clear": clear,
        "loadImage": loadImage,
        "drawImage": drawImage,
        "loadAudio": loadAudio,
        "playAudio": playAudio
    }
};
// create WASM instance
WebAssembly.instantiateStreaming(fetch("main.wasm"), imports).then(
    (obj) => {
        // unpack imports here
        const { memory, setup, update } = obj.instance.exports;
        console.log(obj.instance.exports);

        memoryGlobal = memory;
        log(memoryGlobal);

        let prevTimePassed = 0;

        // sets up the game
        setup();
        // starts the game loop
        const gameLoop = (timePassed) => {
            update(timePassed - prevTimePassed);
            prevTimePassed = timePassed;
            requestAnimationFrame(gameLoop);
        };
        gameLoop(0);
    }
);
