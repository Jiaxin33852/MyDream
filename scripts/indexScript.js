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
            document.querySelector('h2').style.display = 'none';
        });
    });

    function loadImages(type) {
        const horizon = document.querySelector('Horizon');
        const road = document.querySelector('Road');
        if (horizon) horizon.parentNode.removeChild(horizon);
        if (road) road.parentNode.removeChild(road);
        //reset background to black
        document.body.style.backgroundColor = 'black';
        document.documentElement.style.backgroundColor = 'black';
        document.body.style.backgroundImage = ``;

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
        // set background to transparent so the image can show
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        // set background as image
        document.body.style.backgroundImage = `url('${data.src}')`;
        document.body.style.backgroundSize = '100% 100%';

        // clear all other image
        imagesContainer.innerHTML = '';

        // display story
        const storyDiv = document.createElement('div');
        storyDiv.className = 'image-story';
        storyDiv.innerHTML = `<marquee behavior="scroll" direction="up" style="height:600px;">${data.story}</marquee>`;

        imagesContainer.appendChild(storyDiv);

        imagesContainer.style.display = 'flex';
        imagesContainer.style.alignItems = 'center';
        imagesContainer.style.justifyContent = 'center';
        imagesContainer.style.height = '100vh';
    }
});

