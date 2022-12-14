//get necessary elements from page
const grid = document.getElementById("canvas");
const slider = document.getElementById("slider");
const p = document.getElementById("value");

//buttons
const btnHover = document.getElementById("btn_hover");
const btnClick = document.getElementById("btn_click");
const warmBtn = document.getElementById("warm");
const coldBtn = document.getElementById("cold");
const rainbowBtn = document.getElementById("rainbow");
const fadeBtn = document.getElementById("fade");
const customInput = document.getElementById("custom");
const clearBtn = document.getElementById("clear");

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


//to store result of which btn was clicked
let btnState;

//add event listener to both buttons and store a result to btnState
btnHover.addEventListener("click", () =>{
    btnState = "Hover";
});

btnClick.addEventListener("click", () => {
    btnState = "Click";
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


//function to check which btn was clicked and add appropriate event listeners
function checker(choice){
    if(btnState === "Hover"){
        //mouse over event
    } else if (btnState === "Click"){
        //click event
    }
}