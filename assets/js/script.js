

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

// Update clock every second
setInterval(updateClock, 1000);
// Listen to the toggle if there is changes 
document.getElementById("timeformat").addEventListener("change", updateClock);
// Initialize clock on page load
updateClock();