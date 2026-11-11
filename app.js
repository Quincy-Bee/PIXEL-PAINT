
const canvas = document.querySelector('#canvas');
const inpColor = document.querySelector('#inp-c');
const button = document.querySelector('button');

let color = '#FF0000';
let isDrawing = false;

// Create the pixel canvas
function createCanvas() {
    canvas.innerHTML = '';

    for (let i = 0; i < 6400; i++) {
        const pixel = document.createElement('div');

        pixel.classList.add('pixel');

        canvas.appendChild(pixel);
    }
}

// Paint an individual pixel
function paintPixel(e) {
    const pixel = e.target;

    if (pixel.classList.contains('pixel')) {
        pixel.style.backgroundColor = color;
    }
}

// Start drawing when mouse is pressed
canvas.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains('pixel')) {
        isDrawing = true;
        canvas.setPointerCapture(e.pointerId);
        paintPixel(e);
    }
});

// Continue drawing while holding the mouse button
canvas.addEventListener('pointermove', (e) => {
    if (!isDrawing) return;

    const element = document.elementFromPoint(
        e.clientX,
        e.clientY
    );

    if (element && element.classList.contains('pixel')) {
        element.style.backgroundColor = color;
    }
});

// Stop drawing when the pointer is released
function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointercancel', stopDrawing);
canvas.addEventListener('lostpointercapture', stopDrawing);

// Update selected brush color
inpColor.addEventListener('input', (e) => {
    color = e.target.value;
});

// Clear canvas
button.addEventListener('click', () => {
    createCanvas();
});

// Prevent unwanted browser behavior
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Initialize canvas
createCanvas();
