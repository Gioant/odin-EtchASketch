//get necessary elements from page
const grid = document.getElementById("canvas");
const slider = document.getElementById("slider");
const p = document.getElementById("value");

startingGrid();


//add event listener for slider on change
slider.addEventListener('change', () => {
    const value = slider.value;

    //change p element to show correct value
    p.innerHTML = value + "x" + value

    //call function to ReSize grid
    resizeGrid(value);
});


//function to create grid
function createGrid(value) {
    const size = value * value;

    //first style the container using product of value
    grid.style.gridTemplateRows = "repeat(value,1fr)";
    grid.style.gridTemplateColumns = "repeat(value,1fr)";

    //loop until we reach grid size
    for (let i = 0; i < size; i++) {
        const cell = document.createElement('div');
        cell.className = "boxes";
        grid.appendChild(cell);
    }
}



//function to resize grid based on value of slider
function resizeGrid(value){
    let boxes = grid.querySelectorAll("div");
    //for each box, remove it
    boxes.forEach(box => box.remove());

    //call function to create grid with value
    createGrid(value);
}