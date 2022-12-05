//get necessary elements from page
const grid = document.getElementById("canvas");
const slider = document.getElementById("slider");
const p = document.getElementById("value");


//add event listener for slider
slider.addEventListener('change', () => {
    const value = slider.value;

    //change p element to show correct value
    p.innerHTML = value + "x" + value

    //call function to ReSize grid

});


function createGrid() {

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = "boxes";
        cell.style.gridTemplateColumns = "repeat(value,1fr)";
        cell.style.gridTemplateRows = "repeat(value,1fr)";
        grid.appendChild(cell);
    }
}

createGrid();