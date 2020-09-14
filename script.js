const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0,0,0,0]; // captures [minutes,seconds, 100th of second, 1000th of second]
var interval;
var runningTimer = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:
function runtimer(){
    let currentTime = timer[0] + ":" + timer[1] + ":" + timer[2];
    theTimer.innerHTML = currentTime;
    timer[3]++; // incrementing the 1000th of second

    timer[0] = Math.floor((timer[3]/100)/60); // gives minutes
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}




// Start the timer:
function startTime() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !runningTimer){ 
        runningTimer = true;
      interval =  setInterval(runtimer,10);
    }
    console.log(textEnteredLength);
}
// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval); // clears the interval once the text is completely matched.
        testWrapper.style.borderColor = "green";
        
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "orange";
        }
    }
    
}

function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

}


// Reset everything:


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTime, false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);