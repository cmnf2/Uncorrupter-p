"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRuntime = void 0;
function logRuntime(initialTimeStamp) {
    let runTime = performance.now() - initialTimeStamp;
    console.log(`This process executed in: ${(runTime).toFixed(1)}ms`);
}
exports.logRuntime = logRuntime;
