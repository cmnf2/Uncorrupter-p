#!/usr/bin/node

import sharp = require('sharp');
import fs = require('fs');

import { logRuntime } from './helpers/logRuntime';

async function uncorruptImage() {
  let initialTimeStamp = performance.now();
  let commandArgs:string[] = process.argv.slice(2);

  if(commandArgs.length <= 0 || commandArgs.length > 1) {
    console.error(
      "Error: this command can only be run on a single file."
       + "Please retry the command with the filename you wnat to uncorrupt.\n\n"
       + "Example: uncorrupt FILENAME.EXT \n"
    )
  } else {
    const imagePath:string = commandArgs[0]; 
    const readStream: fs.ReadStream = fs.createReadStream(imagePath);
    let output:number[] = [];

    console.log(`Reading file: ${imagePath}...`);
  
    readStream.on('data', function(chunk:Buffer) {
      const matchAllPixels:RegExp = /(\d){9}/g;
      const allPixelData = chunk.toString().match(matchAllPixels);
  
      if(allPixelData) {
        allPixelData.forEach(pixel => {
            output.push(parseInt(pixel.slice(0,3)));
            output.push(parseInt(pixel.slice(3,6)));
            output.push(parseInt(pixel.slice(6,9)));
        });
      }
    });
  
    readStream.on('end', async () => {
      console.log(`Successfully read file: ${imagePath}`);
      const pixelArray:Uint8ClampedArray = new Uint8ClampedArray(output);
      const imageSizeByPixel:number = Math.floor(Math.sqrt(pixelArray.length / 3)); //assumes a square image which may not be correct

      await sharp(pixelArray, {
        sequentialRead: true, raw: {
          width: imageSizeByPixel,
          height: imageSizeByPixel,
          channels: 3
        }
      }).toFile(`uncorrupted--${imagePath}.jpg`)

      console.log(`Generated uncorrupted file: ${imagePath}`);
      logRuntime(initialTimeStamp);
    });
  }
}

uncorruptImage();
