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
    btnHover.classList.add("active");
    setColorEvent('mouseover');
});


btnClick.addEventListener('click', () => {
    btnHover.classList.remove("active");
    btnClick.classList.add("active");
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
                    boxes.each(function (i) {
                        $(this).on(eventType, function () {
                            const h = Math.random() * 60 // to generate colors from 0 - 60 degrees inclusive (red-yellow)
                            $(this).css('background-color', 'hsl(' + Math.random() * 60 + ', 100%, 50%)');
                        });
                    });
                    break;
                case 'cold':
                    boxes.each(function (i) {
                        $(this).on(eventType, function () {
                            const h = 210;
                            const s = Math.max(70, Math.floor(Math.random() * 100));
                            const l = Math.floor(Math.random() * (75 - 50 + 1) + 50);
                            $(this).css('background-color', 'hsl(' + h + ', ' + s + '%, ' + l + '%)');
                        });
                    });
                    break;
                case 'rainbow':
                    boxes.each(function (i) {
                        $(this).on(eventType, function () {
                            //logic formula to generate a random number for rainbow
                            const red = Math.floor(Math.random() * 256);
                            const green = Math.floor(Math.random() * 256);
                            const blue = Math.floor(Math.random() * 256);
                            $(this).css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')');
                        });
                    });
                    break;
                case 'fade':
                    boxes.each(function (i) {
                        $(this).on(eventType, function () {
                            let box = boxes[i]; // Access the DOM element itself
                            let backgroundColor = box.style.backgroundColor;
                            if (backgroundColor.startsWith('rgb')) {
                                $(this).css('background-color', 'hsl(0, 0%, 100%)');
                            } else {
                                // If the box has a background color, gradually add 10% black to it

                                let h = parseInt(colorComponents[0]);
                                let s = parseInt(colorComponents[1]);
                                let l = parseInt(colorComponents[2]) - 10;
                                $(box).css('background-color', 'hsl(' + h + ', ' + s + '%, ' + l + '%)');
                            }
                        });
                    });



                    break;
                case 'erase':
                    // Set background color to default
                    break;
                default:
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
                    break;
            }
        });
    });
}

