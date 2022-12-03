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
        // createGrid(value);
    }
});




function createGrid(value) {
    const size = value * value;

    for (let i = 0; i < size; i++) {
        const square = document.createElement("div");
        square.className = "boxes";
        square.style.backgroundColor = "white";
        square.style.border = "1px solid black";

        square.style.width = "20px";
        square.style.height = "20px";

        container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${value}, 1fr)`;
        container.appendChild(square);
    }
}
