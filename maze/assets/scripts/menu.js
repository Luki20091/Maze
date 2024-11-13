document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    isGameActive = false; // Initial state of the game

    startButton.addEventListener('click', startCountdown);

    function startCountdown() {
        let count = 3;

        // Hide start button and show overlay
        countdownElement.classList.remove('p2');
        countdownElement.classList.remove('p1');
        startButton.style.display = 'none';
        countdownElement.innerText = count;
        overlay.style.visibility = 'visible';
        count--;

        const interval = setInterval(() => {
            countdownElement.innerText = count;
            count--;

            if (count < 0) {
                clearInterval(interval);
                overlay.style.visibility = 'hidden';
                isGameActive = true; // Game becomes active
                startInactiveTimers(); // Start inactivity timers for both players
            }
        }, 1000);
    }

    document.addEventListener('keydown', (event) => {
        if (isGameActive) {
            moveplayer1(event);
            moveplayer2(event);

            // Reset inactivity timers on player action
            resetInactiveTimer(1);
            resetInactiveTimer(2);
        }
    });

    function menu() {
        isGameActive = false;
        overlay.style.visibility = 'visible';
        startButton.style.display = 'flex';
        countdownElement.classList.remove('p2');
        countdownElement.classList.remove('p1');
        setTimeout(() => startButton.focus(), 10); // Adding a small timeout for focus
    }

    // Exporting functions that need to be used in countdown.js
    window.startInactiveTimers = startInactiveTimers;
    window.resetInactiveTimer = resetInactiveTimer;
    window.menu = menu;
});
