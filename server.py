# for running commands
from os import system
from sys import platform
# web server
from flask import Flask, Response

# app class
app = Flask("WASM App **DEBUG** Server")

# stores C++ code to rapidly deploy changes
cpp = ""

# reads all text from specified file and returns it
def readFile(filename:str) -> str:
    try:
        with open(filename, "rb") as file:
            return file.read()
    except FileNotFoundError:
        return f"File {filename} not found"

def webfile(filename:str) -> str:
    try:
        return readFile("web/" + filename)
    except FileNotFoundError:
        return "Resource not found in 'web' directory."

# root page (index)
@app.route("/")
def root() -> str:
    return webfile("index.html")

# dynamic routing (returns resource)
@app.route("/<resourceName>")
def get_resource(resourceName:str) -> str:
    # default mimetype as placeholder
    mimetype = None

    # checks if WASM file is requested
    if resourceName.endswith(".wasm"):
        global cpp
        # checks for changes in the C++ file
        if cpp != readFile("main.cpp"):
            # if the file was modified, recompile it
            if platform == "win32":
                # Windows
                system("compile")
            else:
                # Mac and Linux
                system("bash compile.sh")
        # updates C++ code
        cpp = readFile("main.cpp")
        # updates MIME type to WASM
        mimetype = "application/wasm"
    
    # return the resource
    return Response(webfile(resourceName), 200, mimetype=mimetype)

# starts app
app.run(host="127.0.0.1", port=8080)
