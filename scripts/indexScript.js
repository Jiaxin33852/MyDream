// indexScript.js
document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.images-container');
    const imageElements = []; // to store all image elements
    const radiusX = imagesContainer.offsetWidth * 2.2;
    const radiusY = imagesContainer.offsetHeight / 2; 

    // construct every image elements
    imageData.forEach((data, index) => {
        const imageElement = document.createElement('div');
        imageElement.className = 'dream-image';
        imageElement.innerHTML = `
            <div class="image-flipper">
                <img src="${data.src}" alt="${data.title}">
                <div class="image-title">${data.title}</div>
            </div>
            <div class="image-story">${data.story}</div>
        `;

        // calculate and set up position
        const theta = (index * 2 * Math.PI) / imageData.length; // each angle
        const x = radiusX * Math.cos(theta); 
        const y = radiusY * Math.sin(theta); 
        imageElement.style.transform = `translate(${x}px, ${y}px)`;

        // insert element
        imageElements.push(imageElement);
        imagesContainer.appendChild(imageElement);

        // add click event
        imageElement.addEventListener('click', () => {
            const descriptionEl = imageElement.querySelector('.image-story');

            // switch status
            const isShowing = descriptionEl.style.display !== 'none';
            descriptionEl.style.display = isShowing ? 'none' : 'block';

            // go through all elements, hide all image but the one clicked
            imageElements.forEach((el) => {
                if (el !== imageElement) {
                    el.style.display = isShowing ? 'block' : 'none'; 
                }
            });
        });
    });
});
