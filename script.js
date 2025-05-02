// Get the canvas element
var canvas = document.getElementById('fullPageCanvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let y = 0;

// Add an event listener to track the mouse position on the canvas
canvas.addEventListener('mousemove', async function (event) {
  x = event.clientX;
  y = event.clientY;

  // Normalize x and y to range [-4, 4]
  let xMax = canvas.width;
  let yMax = canvas.height;
  let xNew = (x / xMax) * (4 - (-4)) + (-4);
  let yNew = (y / yMax) * (4 - (-4)) + (-4);

  // Run the ONNX model with xNew and yNew
  const outputImage = await runOnnxModel(xNew, yNew);
  drawOutputImage(outputImage, xNew, yNew);
});

async function runOnnxModel(xNew, yNew) {
  // Load the ONNX model
  if (!window.ort) {
    console.error('ONNX Runtime Web (ort) not loaded.');
    return;
  }

  // Create a session and load the model
  const session = await ort.InferenceSession.create('decoder.onnx');

  // Prepare input tensor
  const inputTensor = new ort.Tensor('float32', [xNew, yNew], [1, 2]);

  // Run the model using the correct input name 'onnx::Gemm_0'
  const feeds = { 'onnx::Gemm_0': inputTensor };
  const results = await session.run(feeds);

  // Get the output using the correct output name '11'
  const outputData = results['11'].data;

  return outputData;
}

function drawOutputImage(outputData, xNew, yNew) {
  // Clear the canvas
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the mouse coordinates
  context.fillStyle = '#ffffff';
  context.font = '30px Arial';
  context.fillText('x: ' + xNew.toFixed(2) + ' y: ' + yNew.toFixed(2), 10, 50);

  // Draw the output (28x28) scaled to a larger size (e.g., 280x280)
  const imgWidth = 28;
  const imgHeight = 28;
  const scaledWidth = 280;  // Scale factor of 10
  const scaledHeight = 280;

  const imageData = context.createImageData(imgWidth, imgHeight);

  for (let i = 0; i < outputData.length; i++) {
    const value = outputData[i] * 255; // Assuming the output is in range [0, 1]
    const pixelIndex = i * 4;

    imageData.data[pixelIndex] = value;     // Red
    imageData.data[pixelIndex + 1] = value; // Green
    imageData.data[pixelIndex + 2] = value; // Blue
    imageData.data[pixelIndex + 3] = 255;   // Alpha (fully opaque)
  }

  // Create an off-screen canvas to draw the 28x28 image and scale it
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = imgWidth;
  offscreenCanvas.height = imgHeight;
  const offscreenContext = offscreenCanvas.getContext('2d');
  offscreenContext.putImageData(imageData, 0, 0);

  // Calculate the position to center the scaled image on the canvas
  const xOffset = (canvas.width - scaledWidth) / 2;
  const yOffset = (canvas.height - scaledHeight) / 2;

  // Draw the scaled image onto the main canvas
  context.drawImage(offscreenCanvas, 0, 0, imgWidth, imgHeight, xOffset, yOffset, scaledWidth, scaledHeight);
}
