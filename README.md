# HeHeHeHa.CPP
## AbirdThePro

<img src="https://i.pinimg.com/736x/ef/26/aa/ef26aa8f9ec60d91a7b9ffa661719a9c.jpg" width="200" height="300">

### Introduction
When you are a game developer and you want your games to be accessible on the web, you want speed to ensure the best possible experience for your end user. However, JavaScript isn't too fast and games can require complex calculations to be done quickly. This is where WebAssembly (**WASM**) comes into play. WASM is a fast language that can run in browsers and interops with JavaScript, but writing WASM in it's text form can be inefficient, and writing bindings can be even harder since you cannot directly access the Document Object Model (**DOM**). HeHeHeHa.CPP aims to streamline the process by using LLVM Clang to compile C++ to WASM. It has bindings for easy access to the canvas and is very fast because most of the work is done in the C++ rather than the JavaScript. HeHeHeHa.CPP is open to contributions and hopefully, it will grow and reach a larger audience. Good luck coding!

### Documentation

#### 1 - Setup and Test

To begin, get [LLVM](https://releases.llvm.org/download.html). It is required to compile the C++. You should also install [Python](https://www.python.org/downloads/) if your system doesn't already have Python 3+. Once LLVM and Python are installed and in your path, clone the repository. Name the cloned version what you want and open the folder. Now, find and run the `server.py` file (double click or use `python server.py`). A Flask server should start up and compile the C++ to WASM. Go to your localhost at port 8080 to see the results. You will be met with a Clash Royale Heheheha face bouncing from side to side. Now that it is working, go back to the folder (and keep the server running). Open `main.cpp` and change the title variable to "My Cool Heheheha". Then, save the changes and reload the webpage in your browser. The code will recompile and the new WASM will be served. The debug server has an auto-recompile feature - whenever WASM is requested, the server checks for changes in `main.cpp`. If it was modified, the code will be compiled and the updated version will be served. **DO NOT** use the debug server for deployment, as it is extremely vunerable to DDoS attacks. Now check the new title of the web page.
#TODO: CONTINUE WORKING
