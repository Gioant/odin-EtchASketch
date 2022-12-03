//get container of grid
const container = document.getElementById("sketchPad");
const slider = document.getElementById("slider1");
const p = document.getElementById("sizeLbl");

//slider logic
$('.ui.slider').slider({
    min: 5,
    max: 100,
    start: 5,
    step: 5,
    smooth: true,
    onChange: function (value) {
        p.innerHTML = value + "x" + value;
        createGrid(value);
    }
});


//apply some style to it
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(10,1fr)";
container.style.gridTemplateRows = "repeat(10,1fr)";



function createGrid(value) {
    let size = value * value;

    for (let i = 1; i <= size; i++) {
        const square = document.createElement("div");
        square.className = "boxes";
        square.style.backgroundColor = "white";
        square.style.border = "1px solid black";
        container.style.gridTemplateColumns = "repeat(value,1fr)";
        container.style.gridTemplateRows = "repeat(value,1fr)";
        container.appendChild(square);
    }
}

createGrid()