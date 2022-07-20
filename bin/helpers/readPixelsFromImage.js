"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPixelsFromImage = void 0;
const fs = require("fs");
async function readPixelsFromImage(imagePath) {
    const readStream = fs.createReadStream(imagePath);
    let output = [];
    let pixelArray;
    readStream.on('data', function (chunk) {
        const matchAllPixels = /(\d){9}/g;
        const allPixelData = chunk.toString().match(matchAllPixels);
        if (allPixelData) {
            allPixelData.forEach(pixel => {
                output.push(parseInt(pixel.slice(0, 3)));
                output.push(parseInt(pixel.slice(3, 6)));
                output.push(parseInt(pixel.slice(6, 9)));
            });
        }
    });
    readStream.on('end', () => {
        console.log(`Successfully read file: ${imagePath}`);
    });
    return output;
}
exports.readPixelsFromImage = readPixelsFromImage;
