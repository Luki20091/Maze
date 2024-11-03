document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    let isGameActive = false;
    menu();

    startButton.addEventListener('click', startCountdown);

    function startCountdown() {
        let count = 3;

        // Hide start button and show overlay
        startButton.style.display = 'none';
        countdownElement.innerText = count;
        count--;

        const interval = setInterval(() => {
            countdownElement.innerText = count;
            count--;

            if (count < 0) {
                clearInterval(interval);
                overlay.style.visibility = 'hidden';
                isGameActive = true;
            }
        }, 1000);
    }





    document.addEventListener('keydown', (event) => {
        if (isGameActive) {
            moveplayer1(event);
            moveplayer2(event);
        }
    });
});
