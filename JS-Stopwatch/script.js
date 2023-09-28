const timeDispaly = document.querySelector("#timeDisplay")

const startBtn = document.querySelector("#startBtn")
const pauseBtn = document.querySelector("#pauseBtn")
const resetBtn = document.querySelector("#resetBtn")

let startTime = 0;
let elapasedTime = 0;
let currentTime= 0;
let paused = true;
let intervalID;
let hrs =0;
let mins=0;
let secs =0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapasedTime;
        intervalID = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapasedTime =Date.now() - startTime;
        clearInterval(intervalID);

    }
});
resetBtn.addEventListener("click", () => {
     paused = true;
     clearInterval(intervalID);
     startTime = 0;
     elapasedTime = 0;
     currentTime= 0;
     hrs =0;
     mins=0;
     secs =0;
     timeDispaly.textContent = "00:00:00" ;
     
});

function updateTime(){
    elapasedTime =Date.now() - startTime;

    secs = Math.floor((elapasedTime/1000) %60);
    mins = Math.floor((elapasedTime/(1000 * 60)) %60);
    hrs = Math.floor((elapasedTime/(1000 *60 *60)) %60);

    
    secs = pad(secs);
    hrs = pad(hrs);
    mins = pad(mins)
    
    timeDispaly.textContent = `${hrs}:${mins}:${secs}`;
    function pad(unit){
        return(("0") + unit).length > 2 ? unit : "0" +unit ;
    }
}