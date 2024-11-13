const countdownTimer = document.getElementById('countdown-timer');
const overlay = document.getElementById('overlay');
const countdownElement = document.getElementById('countdown');
let p1InactiveInterval, p2InactiveInterval; // Intervals for player inactivity
let countdownActive = false; // Track if countdown is active
let lastInactivePlayer = null; // Track the last player who triggered inactivity

function startInactiveTimers() {
    p1InactiveInterval = setInterval(() => checkPlayerInactivity(1), 1000);
    p2InactiveInterval = setInterval(() => checkPlayerInactivity(2), 1000);
}

function resetInactiveTimer(player) {
    clearTimeout(player === 1 ? p1InactiveTimeout : p2InactiveTimeout);
    localStorage.setItem(`p${player}time`, 10); // Reset inactivity countdown to 10 seconds
    if (countdownActive) {
        // If countdown is active, restart timers for both players
        startInactiveTimers();
        countdownActive = false;
    }
}

function checkPlayerInactivity(player) {
    if (!isGameActive) return; // Check if game is active
    let time = parseInt(localStorage.getItem(`p${player}time`));
    if (isNaN(time) || time <= 0) {
        if (!countdownActive || lastInactivePlayer !== player) {
            showInactivityCountdown(player);
            lastInactivePlayer = player;
        }
    } else {
        localStorage.setItem(`p${player}time`, time - 1);
    }
}

function showInactivityCountdown(player) {
    if (!isGameActive) return; // Check if game is active
    clearInterval(player === 1 ? p1InactiveInterval : p2InactiveInterval);

    countdownActive = true;
    let count = 5;
    overlay.style.visibility = 'visible';
    countdownElement.innerText = count;

    const interval = setInterval(() => {
        if (count > 0) {
            countdownElement.innerText = count;
            count--;
        } else {
            clearInterval(interval);
            if (!isGameActive) return; // Check if game is still active
            win(); // End the game if the countdown reaches zero
            countdownActive = false;
        }
    }, 1000);
}

// Ensure these functions are accessible in menu.js
window.startInactiveTimers = startInactiveTimers;
window.resetInactiveTimer = resetInactiveTimer;
window.checkPlayerInactivity = checkPlayerInactivity;
window.showInactivityCountdown = showInactivityCountdown;
