export function logRuntime (initialTimeStamp:DOMHighResTimeStamp) {
  let runTime:number = performance.now() - initialTimeStamp;

  console.log(`This process executed in: ${(runTime).toFixed(1)}ms`)
}