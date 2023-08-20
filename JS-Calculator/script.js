var theParent = document.querySelector(".calculator");// the hack 

let buttons = document.querySelectorAll(".btn")
const allclr = document.getElementById("all-clear")
const dlt = document.getElementById("del")
let outputscreen = document.getElementById("output-screen")
const calc = document.querySelector(".equal")


//the interesting code
function display(e){
    if(e.target !== e.currentTarget ){
        var clickedItem = e.target.value;
        // console.log(clickedItem);
        if(clickedItem === "=" || clickedItem ==="AC" || clickedItem === "DE"){
            outputscreen.value = outputscreen.value;
            }
        else{
            outputscreen.value += clickedItem;
        }
    }

}

function calculate(){
    try{
        outputscreen.value = eval(outputscreen.value);
    }
    catch(err){
        alert("Invalid Entry");
    }
}


function allClear (){
    outputscreen.value = "";
}

function del(){
    outputscreen.value = outputscreen.value.slice(0, -1);
}

allclr.addEventListener("click", allClear)

dlt.addEventListener("click", del);

calc.addEventListener("click", calculate)

theParent.addEventListener("click", display , false)

