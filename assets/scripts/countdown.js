document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    const countdownTimer = document.getElementById('countdown-timer');
    isGameActive = false; // Initial state of the game
    let p1InactiveInterval, p2InactiveInterval; // Intervals for player inactivity
    menu();

    startButton.addEventListener('click', startCountdown);

    function startCountdown() {
        let count = 3;

        // Hide start button and show overlay
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

            // Update inactivity times in localStorage in saveScore and saveScore2
        }
    });

    function startInactiveTimers() {
        p1InactiveInterval = setInterval(() => checkPlayerInactivity(1), 1000);
        p2InactiveInterval = setInterval(() => checkPlayerInactivity(2), 1000);
    }

    function checkPlayerInactivity(player) {
        let time = parseInt(localStorage.getItem(`p${player}time`));
        if (isNaN(time) || time <= 0) {
            showInactivityCountdown(player);
        } else {
            localStorage.setItem(`p${player}time`, time - 1);
        }
    }

    function showInactivityCountdown(player) {
        clearInterval(player === 1 ? p1InactiveInterval : p2InactiveInterval);

        let count = 5;
        overlay.style.visibility = 'visible';
        countdownElement.classList.add(player === 1 ? 'p1' : 'p2');
        countdownElement.classList.remove(player === 1 ? 'p2' : 'p1');
        countdownElement.innerText = count;
        count--;

        const interval = setInterval(() => {
            countdownElement.innerText = count;
            count--;

            let playerTime = parseInt(localStorage.getItem(`p${player}time`));
            if (playerTime > 0) {
                clearInterval(interval);
                overlay.style.visibility = 'hidden';
                startInactiveTimers(); // Restart the timers
                return;
            }

            if (count < 0) {
                clearInterval(interval);
                win(); // End the game if the countdown reaches zero
            }
        }, 1000);
    }

    function menu() {
        overlay.style.visibility = 'visible';
        startButton.style.display = 'flex';
        startButton.focus();
        countdownElement.classList.remove('p2');
        countdownElement.classList.remove('p1');
    }
});
