/* jshint esversion: 11 */

//Variables for stopwatch and timer
let stopwatchInterval;
let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let timeLeft = 0;
let isPaused = false;
const audio = new Audio("assets/audio/timerend.mp3"); // Default beep sound
const display = document.getElementById("stopwatch");
display.textContent = "00:00:00";
const lapContainer = document.getElementById("laps");

// Stopwatch functions
function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const milliseconds = Math.floor((currentTime % 1000) / 10); 
    const seconds = Math.floor((currentTime / 1000) % 60);
    const minutes = Math.floor((currentTime / 1000 / 60) % 60);
    const hours = Math.floor(currentTime / 1000 / 60 / 60);
    
    display.textContent = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds + "." + 
        (milliseconds < 10 ? "0" : "") + milliseconds;
}


function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        stopwatchInterval = setInterval(updateTime, 100);
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapContainer.innerHTML = "";
}


function lapTime() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapContainer.appendChild(lapItem);
    }
}

// Timer Functions
function startTimer(duration) {
    clearInterval(timerInterval);
    timeLeft = duration;
    isPaused = false;
    updateTimerDisplay();
    timerInterval = setInterval(countdown, 1000);
}


function countdown() {
    if (timeLeft > 0 && !isPaused) {
        timeLeft--;
        updateTimerDisplay();
    } else if (timeLeft === 0) {
        clearInterval(timerInterval);
        audio.play();
         // Show modal when the timer ends
         var timerEndModal = new bootstrap.Modal(document.getElementById('timerEndModal'));
         timerEndModal.show();
    }
}

function pauseTimer() {
    isPaused = true;
}

function resumeTimer() {
    if (isPaused) {
        isPaused = false;
        clearInterval(timerInterval); // Prevent multiple intervals
        timerInterval = setInterval(countdown, 1000); // Restart the original interval
    }
}


function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById("timer-display").textContent = `${minutes}:${seconds}`;
}

function setPredefinedTime(seconds) {
    startTimer(seconds);
}

function setCustomTime() {
    const inputMinutes = parseInt(document.getElementById("custom-time").value, 10);
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
        startTimer(inputMinutes * 60);
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

 // Function to set the theme based on user selection
function setTheme(theme) {
    switch (theme) {
      case "dark":
        document.body.classList.add("dark-mode");
        break;
      case "cyber":
        document.body.classList.add("cyber-mode");
        break;
      case "retro":
        document.body.classList.add("retro-mode");
        break;
      default:
        document.body.className = "";
      }
  }


// Update clock every second
setInterval(updateClock, 1000);
// Listen to the toggles if there is changes 
document.getElementById("timeformat").addEventListener("change", updateClock);
// Eventlisteners for the stopwatch
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", lapTime);
// Eventlisteners for the timer
document.getElementById("timer-pause").addEventListener("click", pauseTimer);
document.getElementById("timer-resume").addEventListener("click", resumeTimer);
document.getElementById("timer-reset").addEventListener("click", resetTimer);
document.getElementById("timer-1min").addEventListener("click", () => setPredefinedTime(60));
document.getElementById("timer-5min").addEventListener("click", () => setPredefinedTime(300));
document.getElementById("timer-10min").addEventListener("click", () => setPredefinedTime(600));
document.getElementById("set-custom-time").addEventListener("click", setCustomTime);

document.addEventListener("DOMContentLoaded", function() {
    let cookieTheme = localStorage.getItem("theme");

    if (cookieTheme) {
        setTheme(cookieTheme);
        document.getElementById("theme-selector").value = cookieTheme; // Update the dropdown
    }
});


document.getElementById("theme-selector").addEventListener("change", function () {
    document.body.classList.remove("dark-mode", "cyber-mode", "retro-mode");
  
    setTheme(this.value);
  
    localStorage.setItem("theme", this.value);
  });
// Initialize clock on page load
updateClock();