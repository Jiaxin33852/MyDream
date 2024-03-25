// indexScript.js
document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.images-container');
    const buttons = ['btn-terrifying', 'btn-normal', 'btn-interesting'];
    const Width = imagesContainer.offsetWidth;
    const Height = imagesContainer.offsetHeight;

    buttons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', (e) => {
            // clear all image
            imagesContainer.innerHTML = '';
            // determine image type based on button
            const type = buttonId.split('-')[1].charAt(0).toUpperCase() + buttonId.split('-')[1].slice(1);
            loadImages(type);
            // delete title
            document.querySelector('h1').style.display = 'none';
        });
    });

    function loadImages(type) {
        const typeImages = imageData.filter(data => data.type === type);
        const radius = Math.min(Width/2, Height/2);

        typeImages.forEach((data, index) => {
            // calculate x and y
            const theta = (index * 2 * Math.PI) / typeImages.length;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);

            const imageElement = document.createElement('div');
            imageElement.className = 'dream-image';
            imageElement.innerHTML = `
                <div class="image-flipper">
                    <img src="${data.src}" alt="${data.title}">
                    <div class="image-title">${data.title}</div>
                </div>
            `;

            // place as circle
            imageElement.style.transform = `translate(${x}px, ${y}px)`;
            imagesContainer.appendChild(imageElement);

            // make sure hover effect not change
            imageElement.addEventListener('mouseenter', () => {
                imageElement.querySelector('.image-flipper').style.transform = 'rotateY(180deg)';
            });
            imageElement.addEventListener('mouseleave', () => {
                imageElement.querySelector('.image-flipper').style.transform = 'rotateY(0deg)';
            });

            // add click event listener for the image
            imageElement.addEventListener('click', () => {
                showImageAndStory(data);
            });
        });
    }

    function showImageAndStory(data) {
        // clear all images
        imagesContainer.innerHTML = '';
        // create elements for image and story
        const imageDiv = document.createElement('div');
        const storyDiv = document.createElement('div');

        imageDiv.className = 'displayed-image';
        storyDiv.className = 'image-story';

        imageDiv.innerHTML = `<img src="${data.src}" alt="${data.title}" style="width: 100%; height: auto;">`;
        storyDiv.innerHTML = `<p>${data.story}</p>`;

        // layout elements
        imagesContainer.appendChild(imageDiv);
        imagesContainer.appendChild(storyDiv);

        // adjust style for layout
        imagesContainer.style.display = 'flex';
        imagesContainer.style.alignItems = 'center';
        imagesContainer.style.justifyContent = 'space-around';
    }
});
