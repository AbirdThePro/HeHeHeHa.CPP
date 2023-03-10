#include <lib.h>

string title = "Game";
string testImgUri = "heheheha.png";
string testAudioUri = "heheheha.mp3";

float x = 0;
int direction = 1;
float speed = 0.5;
const uint imgWidth = 208;
const uint imgHeight = 300;

struct Color white;

const uint WIDTH = 640;
const uint HEIGHT = 512;

Image testImg;
Audio testAudio;

// runs once at the beginning
WASM_EXPORT void setup() {
    setTitle(title);
    setCanvasSize(WIDTH, HEIGHT);

    white.set(255, 255, 255, 255);
    setClearColor(&white);

    testImg = loadImage(testImgUri);
    testAudio = loadAudio(testAudioUri);
}

// runs every frame update
WASM_EXPORT void update(int deltaTime) {
    clear();

    if (x <= 0) {
        direction = 1;
        playAudio(testAudio, 2);
    }
    if (x >= WIDTH - imgWidth) {
        direction = -1;
        playAudio(testAudio, 2);
    }
    x += speed * direction * deltaTime;

    drawImage(testImg, x, HEIGHT / 2);
}
