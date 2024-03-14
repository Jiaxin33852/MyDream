// indexScript.js
document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.images-container');
    const angle = 360 / imageData.length;
    const radius = Math.min(imagesContainer.offsetWidth, imagesContainer.offsetHeight); // adjust radius here
  
    // construct div element and add it into images-container
    imageData.forEach((data, index) => {
      const imageElement = document.createElement('div');
      imageElement.className = 'dream-image';
      imageElement.innerHTML = `
        <div class="image-flipper">
          <img src="${data.src}" alt="${data.title}">
          <div class="image-title">${data.title}</div>
        </div>
      `;
  
      const theta = (angle * index) * (Math.PI / 180);
      const x = radius * Math.cos(theta) - imageElement.offsetWidth / 2;
      const y = radius * Math.sin(theta) - imageElement.offsetHeight / 2;
  
      imageElement.style.transform = `translate(${x}px, ${y}px)`;
      imagesContainer.appendChild(imageElement);
    });
  });
  