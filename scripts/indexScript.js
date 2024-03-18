// indexScript.js
document.addEventListener('DOMContentLoaded', (event) => {
    const imagesContainer = document.querySelector('.images-container');
    const imageElements = []; // 存储所有图片元素的数组
    const angle = 360 / imageData.length;
    const radiusX = imagesContainer.offsetWidth * 2.7;
    const radiusY = imagesContainer.offsetHeight / 3; 

    // 构建每个图片元素并添加到 imagesContainer 中
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

        // 计算和设置图片位置
        const theta = (index * 2 * Math.PI) / imageData.length; // 每张图片的角度
        const x = radiusX * Math.cos(theta); // 椭圆的X坐标
        const y = radiusY * Math.sin(theta); // 椭圆的Y坐标
        imageElement.style.transform = `translate(${x}px, ${y}px)`;

        // 添加图片元素到数组和页面中
        imageElements.push(imageElement);
        imagesContainer.appendChild(imageElement);

        // 为图片元素添加点击事件
        imageElement.addEventListener('click', () => {
            const descriptionEl = imageElement.querySelector('.image-story');

            // 切换当前图片的描述显示状态
            const isShowing = descriptionEl.style.display !== 'none';
            descriptionEl.style.display = isShowing ? 'none' : 'block';

            // 遍历所有图片元素并隐藏除当前点击的这个之外的所有图片元素
            imageElements.forEach((el) => {
                if (el !== imageElement) {
                    el.style.display = isShowing ? 'block' : 'none'; // 当描述显示时显示图片，否则隐藏
                }
            });
        });
    });
});
