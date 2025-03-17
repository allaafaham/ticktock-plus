
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
const display = document.getElementById("stopwatch");
display.textContent = "00:00:00";
const lapContainer = document.getElementById("laps");

function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const seconds = Math.floor((currentTime / 1000) % 60);
    const minutes = Math.floor((currentTime / 1000 / 60) % 60);
    const hours = Math.floor(currentTime / 1000 / 60 / 60);
    
    display.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateTime, 100);
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapContainer.innerHTML = ""; // Clear laps
}

function lapTime() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapContainer.appendChild(lapItem);
    }
}

// Update the clock every second 

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let is24Hour = document.getElementById("timeformat").checked; // checks if the toggle is switched to 24h 
    let ampm = "";

    // Check if 24-hour format is not enabled 
    if (!is24Hour) {
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    }

    // Format time (add leading zeros if needed)
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the time
    document.getElementById("clockTime").innerText = `${hours}:${minutes}:${seconds}${ampm}`;
}

// Toggle dark mode

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Update clock every second
setInterval(updateClock, 1000);
// Listen to the toggles if there is changes 
document.getElementById("timeformat").addEventListener("change", updateClock);
document.getElementById("toggleDarkmode").addEventListener("change", toggleDarkMode);
// Eventlisteners for the stopwatch
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", lapTime);

// Initialize clock on page load
updateClock();