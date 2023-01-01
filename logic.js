//get necessary elements from page
const grid = document.getElementById("canvas");
const slider = document.getElementById("slider");
const p = document.getElementById("value");
const body = document.querySelector("body");

//buttons
const btnHover = document.getElementById("btn_hover");
const btnClick = document.getElementById("btn_click");
// const warmBtn = document.getElementById("warm");
// const coldBtn = document.getElementById("cold");
// const rainbowBtn = document.getElementById("rainbow");
// const fadeBtn = document.getElementById("fade");
const customColor = document.getElementById("custom");
// const clearBtn = document.getElementById("clear");

//get all the boxes
const boxes = grid.querySelectorAll(".boxes");

//call function to create grid initially
startingGrid();


//add event listener for slider on change
slider.addEventListener('change', () => {
    //save value of input  slider
    const value = slider.value;

    //change p element to show correct value
    p.innerHTML = value + "x" + value

    //call function to ReSize grid
    resizeGrid(value);
});

btnHover.addEventListener('click', () => {
    btnClick.classList.remove("active");
    btnClick.style.border = "none";
    btnHover.classList.add("active");
    btnHover.style.border = '3px solid greenyellow';
    btnHover.style.borderRadius = '8px';
    setColorEvent('mouseover');
});


btnClick.addEventListener('click', () => {
    btnHover.classList.remove("active");
    btnHover.style.border = "none";
    btnClick.classList.add("active");
    btnClick.style.border = '3px solid greenyellow';
    btnClick.style.borderRadius = '8px';
    setColorEvent('click');
});



//starting grid
function startingGrid() {
    //call function to create grid size of 5
    createGrid(5);
}

//function to create grid
function createGrid(value) {
    const size = value * value;

    //first style the container using product of value
    grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

    //loop until we reach grid size
    for (let i = 0; i < size; i++) {
        const cell = document.createElement('div');
        cell.className = "boxes";
        grid.appendChild(cell);
    }
}


//function to resize grid based on value of slider
function resizeGrid(value) {
    let boxes = grid.querySelectorAll("div");
    //for each box, remove it
    boxes.forEach(box => box.remove());

    //call function to create grid with value
    createGrid(value);
}

//function to change color of grid
function setColorEvent(eventType) {
    // Get all the btn-color buttons
    const colorButtons = document.querySelectorAll('.btn-color');

    // Remove event listeners from all the .boxes elements
    const boxes = $('.boxes');
    boxes.off(eventType);

    // Add event listener to each btn-color button
    colorButtons.forEach(button => {
        button.addEventListener(eventType, event => {
            // Get the clicked button's id
            const clickedButtonId = event.target.id;

            // Set the background color of the .boxes based on the clicked button's id
            switch (clickedButtonId) {
                case 'warm':
                    setWarmColor(boxes, eventType);
                    break;
                case 'cold':
                    setColdColor(boxes, eventType);
                    break;
                case 'rainbow':
                    setRainbowColor(boxes, eventType);
                    break;
                case 'fade':
                    fadeBoxes(boxes, eventType);
                    break;
                case 'erase':
                    // Set background color to default
                    break;
                default:
                    setCustomColor(boxes, eventType);
                    break;
            }
        });
    });
}


//function to change boxes to warm colors
function setWarmColor(boxes, eventType) {
    boxes.each(function (i) {
        $(this).on(eventType, function () {
            const h = Math.random() * 60 // to generate colors from 0 - 60 degrees inclusive (red-yellow)
            $(this).css('background-color', 'hsl(' + Math.random() * 60 + ', 100%, 50%)');
        });
    });
}


//function to change boxes to cold colors
function setColdColor(boxes, eventType) {
    boxes.each(function (i) {
        $(this).on(eventType, function () {
            const h = 210;
            const s = Math.max(70, Math.floor(Math.random() * 100));
            const l = Math.floor(Math.random() * (75 - 50 + 1) + 50);
            $(this).css('background-color', 'hsl(' + h + ', ' + s + '%, ' + l + '%)');
        });
    });
}


//function for rainbow colors
function setRainbowColor(boxes, eventType) {
    boxes.each(function (i) {
        $(this).on(eventType, function () {
            //logic formula to generate a random number for rainbow
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            $(this).css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')');
        });
    });
}


function fadeBoxes(boxes, eventType) {
    boxes.each(function (i) {
        $(this).on(eventType, function () {

            let box = boxes[i];

            let backgroundColor = getComputedStyle(box).getPropertyValue('background-color');

            // Extract the RGB values from the background color string
            let colorArray = backgroundColor.slice(4, -1).split(',');

            // Convert the RGB values from strings to numbers
            for (let i = 0; i < colorArray.length; i++) {
                colorArray[i] = parseInt(colorArray[i]);
            }

            // Check if the background color is already black
            let isBlack = colorArray.every(c => c === 0);
            if (!isBlack) {
                // Gradually darken the background color by subtracting 10% (25.5) from each element
                for (let i = 0; i < colorArray.length; i++) {
                    if (colorArray[i] > 25.5) {
                        colorArray[i] -= 25.5;
                    } else {
                        colorArray[i] = 0;
                    }
                }
            }

            // Join the array elements into a single string
            let colorString = 'rgb(' + colorArray.join(',') + ')';

            // Set the background color of the element
            box.style.backgroundColor = colorString;

        });
    });
}




//function for custom color
function setCustomColor(boxes, eventType) {
    //add event listener on input change for customColor
    customColor.addEventListener('input', event => {
        // Get the chosen color
        const chosenColor = event.target.value;

        // Get all the .boxes elements
        const boxes = grid.querySelectorAll('div');

        // Set the background color of the .boxes elements to the chosen color
        boxes.forEach(box => {
            box.addEventListener(eventType, () => {
                // Set the background color of the .boxes element to the chosen color
                box.style.backgroundColor = chosenColor;
            });
        });
    });
}
