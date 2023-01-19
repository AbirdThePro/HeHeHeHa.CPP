clear
clang++ main.cpp -o main.wasm -Iinclude --target=wasm32 -Wall -Os -flto -nostdlib -fvisibility=hidden -ffunction-sections -fdata-sections -std=c++14 -Wl,--strip-all,--export-dynamic,--initial-memory=1048576,-error-limit=0,--lto-O3,-O3,--gc-sections,--no-entry,--allow-undefined
mv main.wasm web
