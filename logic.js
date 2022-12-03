//get container of grid
const container = document.getElementById("sketchPad");

//apply some style to it
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(16,1fr)";
container.style.gridTemplateRows = "repeat(16,1fr)";


//for loop to generate square of div
for(let i = 0; i < 256; i++){
    const square = document.createElement("div");
    square.className = "boxes";
    square.style.backgroundColor = "white";
    square.style.border = "1px solid black";
    container.appendChild(square);
}
