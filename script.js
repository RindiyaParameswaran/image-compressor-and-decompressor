

document.getElementById("theme1").innerHTML="<source src='backgroundvideo.mp4'type='video/mp4'>";
//image compression 
function compressImage() {
    const inputElement = document.getElementById('inputImage');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');

    if (inputElement.files.length > 0) {
        const originalFile = inputElement.files[0];
        const originalURL = URL.createObjectURL(originalFile);
        originalImage.src = originalURL;

        // Perform image compression using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Convert the canvas to a data URL with compression
            const compressedDataURL = canvas.toDataURL('image/jpeg', 0.5); // Adjust compression quality here

            // Display the compressed image
            compressedImage.src = compressedDataURL;
        };

        img.src = originalURL;
    } else {
        alert('Please select an image to compress.');
    }
}

function downloadCompressedImage() {
    const compressedImage = document.getElementById('compressedImage');
    const downloadLink = document.createElement('a');
    downloadLink.href = compressedImage.src;
    downloadLink.download = 'compressed_image.jpg';
    downloadLink.click();
}


//end of image compression
//image decompression
function decompressImage() {
    const inputElement = document.getElementById('inputCompressedImage');
    const decompressedCanvas = document.getElementById('decompressedCanvas');
    const decompressionSize = document.getElementById('decompressionSize').value;

    if (inputElement.files.length > 0) {
        const compressedFile = inputElement.files[0];
        const compressedURL = URL.createObjectURL(compressedFile);

        const img = new Image();
        img.onload = function () {
            const ctx = decompressedCanvas.getContext('2d');
            decompressedCanvas.width = img.width;
            decompressedCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };

        img.src = compressedURL;
    } else {
        alert('Please select a compressed image');
    }
}

function downloadDecompressedImage() {
    const decompressedCanvas = document.getElementById('decompressedCanvas');
    const downloadLink = document.createElement('a');
    downloadLink.href = decompressedCanvas.toDataURL('image/jpeg');
    downloadLink.download = 'decompressed_image.jpg';
    downloadLink.click();
}

//image croping
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cropTool = document.getElementById('crop-tool');
const downloadBtn = document.getElementById('download-btn');

let image = null;
let isCropping = false;
let cropStartX, cropStartY, cropWidth, cropHeight;

fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      image = img; // Save the image object for later use
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

canvas.addEventListener('mousedown', function(e) {
  if (image !== null) {
    isCropping = true;
    cropStartX = e.offsetX;
    cropStartY = e.offsetY;
  }
});

canvas.addEventListener('mousemove', function(e) {
  if (isCropping) {
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    cropWidth = currentX - cropStartX;
    cropHeight = currentY - cropStartY;

    cropTool.style.left = cropStartX + 'px';
    cropTool.style.top = cropStartY + 'px';
    cropTool.style.width = cropWidth + 'px';
    cropTool.style.height = cropHeight + 'px';
  }
});

canvas.addEventListener('mouseup', function() {
  isCropping = false;
});

downloadBtn.addEventListener('click', function() {
  if (image !== null && cropWidth > 0 && cropHeight > 0) {
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');

    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;

    croppedCtx.drawImage(image, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    const downloadLink = document.createElement('a');
    downloadLink.href = croppedCanvas.toDataURL('image/png');
    downloadLink.download = 'cropped_image.png';
    downloadLink.click();
  }
});
function decompressImage() {
    const fileInput = document.getElementById('inputImage');
    const originalImage = document.getElementById('originalImage');
    const decompressedImage = document.getElementById('decompressedImage');
    const downloadDecompressed = document.getElementById('downloadDecompressed');
  
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      originalImage.src = event.target.result;
  
      // Check if the file is compressed (you might need a more robust check in reality)
      const isCompressed = file.name.endsWith('.jpg'); // Example: assuming compressed images have '.jpg' extension
  
      if (isCompressed) {
        // Decompression logic or revert to original if already decompressed
        // For now, simply set the decompressed image source to the original image
        decompressedImage.src = originalImage.src;
        downloadDecompressed.href = originalImage.src;
        downloadDecompressed.style.display = 'inline-block';
      } else {
        // Display the original image if it's not a compressed image
        decompressedImage.src = '';
        downloadDecompressed.style.display = 'none';
        alert('The selected image is not compressed.');
      }
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }