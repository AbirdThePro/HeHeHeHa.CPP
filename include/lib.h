#define WASM_EXPORT extern "C" __attribute__((visibility("default")))

// typedefs
typedef unsigned int uint;
typedef unsigned char uint8_t;
typedef uint Image;
typedef uint Audio;
typedef const char* string;

// structs
struct Color {
    uint8_t r, g, b, a;

    void set(uint8_t r, uint8_t g, uint8_t b, uint8_t a) {
        this->r = r;
        this->g = g;
        this->b = b;
        this->a = a;
    }
};

// string to integer
int stoi(string s) {
    int i;
    i = 0;
    while(*s >= '0' && *s <= '9')
    {
        i = i * 10 + (*s - '0');
        s++;
    }
    return i;
}

extern "C" {
    // imports
    string str(int num);
    void log(string text);

    void setCanvasSize(int width, int height);
    void setTitle(string title);
    void setClearColor(Color* color);
    void clear();

    Image loadImage(string uri);
    void drawImage(Image id, int x, int y);

    Audio loadAudio(string uri);
    void playAudio(Audio id, float speed=1, bool loop=false);
}

// exports
WASM_EXPORT void setup();
WASM_EXPORT void update(int deltaTime);
