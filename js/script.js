const imageFileInput = document.querySelector("#image-file-input");
const topTextInput = document.querySelector("#top-text-input");
const bottomTextInput = document.querySelector("#bottom-text-input");
const canvas = document.querySelector("#meme");

const downloadButton = document.querySelector("#download-button");

let image;

imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );

  topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  });

  bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  });
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const canvasWidth = 500;
  const canvasHeight = 500;
  const fontSize = Math.floor(canvasWidth / 10);
  const yOffset = canvasHeight / 25;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let scaledWidth, scaledHeight;
  if (image.width > image.height) {
    scaledWidth = canvasWidth;
    scaledHeight = (canvasWidth / image.width) * image.height;
  } else {
    scaledHeight = canvasHeight;
    scaledWidth = (canvasHeight / image.height) * image.width;
  }

  const x = (canvasWidth - scaledWidth) / 2;
  const y = (canvasHeight - scaledHeight) / 2;

  ctx.drawImage(image, x, y, scaledWidth, scaledHeight);

  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  ctx.textBaseline = "top";
  ctx.strokeText(topText, canvasWidth / 2, yOffset);
  ctx.fillText(topText, canvasWidth / 2, yOffset);

  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, canvasWidth / 2, canvasHeight - yOffset);
  ctx.fillText(bottomText, canvasWidth / 2, canvasHeight - yOffset);
}

downloadButton.addEventListener("click", () => {
  const memeImage = new Image();
  memeImage.src = canvas.toDataURL("image/png");
  memeImage.onload = function () {
    const doubledWidth = memeImage.width * 1.5;
    const doubledHeight = memeImage.height * 1.5;

    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = doubledWidth;
    downloadCanvas.height = doubledHeight;
    const ctx = downloadCanvas.getContext("2d");
    ctx.drawImage(memeImage, 0, 0, doubledWidth, doubledHeight);

    const downloadLink = document.createElement("a");
    downloadLink.href = downloadCanvas.toDataURL("image/png");
    downloadLink.download = "meme.png";
    downloadLink.click();
  };
});
