document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    const countdownTimer = document.getElementById('countdown-timer');
    isGameActive = false; // Initial state of the game
    isCounting = false; // Initial state of the game
    let p1InactiveInterval, p2InactiveInterval; // Intervals for player inactivity
    menu();

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
            // Update inactivity times in localStorage in saveScore and saveScore2
        }
    });




    function startInactiveTimers() {
        if (isGameActive) {
            p1InactiveInterval = setInterval(() => checkPlayerInactivity(1), 1000);
            p2InactiveInterval = setInterval(() => checkPlayerInactivity(2), 1000);
            isCounting = false;
        }
    }

    function checkPlayerInactivity(player) {
        if (isGameActive && !isCounting) {
            let time = parseInt(localStorage.getItem(`p${player}time`));
            if (isNaN(time) || time <= 0) {
                showInactivityCountdown(player);
            } else {
                localStorage.setItem(`p${player}time`, time - 1);
            }
        }
    }

    function showInactivityCountdown(player) {
        if (isGameActive) {
            clearInterval(player === 1 ? p1InactiveInterval : p2InactiveInterval);
            isCounting = true;

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
                    if (isGameActive) {
                        isCounting = false;
                        win(player); // End the game if the countdown reaches zero
                    }
                }
            }, 1000);
        }
    }

    function menu() {
        countdownElement.classList.remove('p2');
        countdownElement.classList.remove('p1');
        clearInterval(p1InactiveInterval);
        clearInterval(p2InactiveInterval);
        overlay.style.visibility = 'visible';
        startButton.style.display = 'block';
        startButton.focus();
    }
});
