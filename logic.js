//get necessary elements from page
const container = document.getElementById("sketchPad");
const slider = document.getElementById("slider");
const p = document.getElementById("value");


//add event listener for slider
slider.addEventListener('change', () => {
    const value = slider.value;

    //change p element to show correct value
    p.innerHTML = value + "x" + value

    //call function to ReSize grid

});