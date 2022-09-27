let counter = document.getElementById("counter");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;
let paused = true;

startButton.addEventListener("click" , () =>{

    if(paused)
    {
         timer = setInterval(increase, 1000);
         let current = "s"; 
         paused = false;
    }
   
    function increase()
    {

        seconds++;
        pad
        if(seconds > 59)
        {
            seconds = 0;
            minutes++;
            minutes = pad(minutes);
            counter.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        }else if(minutes > 59)
        {
            seconds = 0;
            minutes = 0;
            hours++;
            counter.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        }
        else{
            counter.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        }
    }

    function pad(unit){
        return ((("0") + unit).length > 2) ? unit : "0" + unit;
    }
});

stopButton.addEventListener("click" , () =>{

    if(!paused)
    {
        clearInterval(timer);
        paused = true;
    }
});

resetButton.addEventListener("click" , () =>{   
     seconds = 0;
     minutes = 0;
     hours = 0;
    counter.innerHTML = "00:00:00";
});

