document.addEventListener("DOMContentLoaded", function() {
    const raceButton = document.getElementById("race_btn");
    const ccBalance = document.getElementById("cc_balance_value");
    let timerInterval;

    raceButton.addEventListener("click", function() {
        if (raceButton.innerText.includes("START RACE")) {
            startRace();
        }
    });

    function startRace() {
        raceButton.disabled = true;
        raceButton.style.backgroundColor = "darkgray";
        raceButton.innerText = "24:00:00";

        let raceTime = 24 * 60 * 60;
        timerInterval = setInterval(() => {
            raceTime--;
            const hours = String(Math.floor(raceTime / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((raceTime % 3600) / 60)).padStart(2, '0');
            const seconds = String(raceTime % 60).padStart(2, '0');
            raceButton.innerText = `${hours}:${minutes}:${seconds}`;

            if (raceTime <= 0) {
                clearInterval(timerInterval);
                raceButton.disabled = false;
                raceButton.style.backgroundColor = "#F0DB20";
                raceButton.innerText = "START RACE🏁";
            }
        }, 1000);

        let balanceValue = parseInt(ccBalance.innerText);
        balanceValue += 1;
        ccBalance.innerText = balanceValue;
    }
});
