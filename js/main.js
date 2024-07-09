document.addEventListener("DOMContentLoaded", function() {
    const raceButton = document.getElementById("race_btn");
    const boostButton = document.getElementById("boost_btn");
    const nitroButton = document.getElementById("nitro_btn");
    const ccBalance = document.querySelector("#cc_balance p");
    let timerInterval;

    // Initialize the counter and buttons from localStorage
    function initialize() {
        // Initialize cc_balance from localStorage
        const storedCounter = localStorage.getItem("cc_balance");
        if (storedCounter) {
            ccBalance.innerText = storedCounter;
        } else {
            ccBalance.innerText = "0";
        }

        // Initialize button states from localStorage
        const buttonState = JSON.parse(localStorage.getItem("buttonState")) || {};
        if (buttonState.boost) {
            disableButton(boostButton);
        }

        const raceEndTime = localStorage.getItem("raceEndTime");
        if (raceEndTime) {
            const remainingTime = Math.floor((new Date(raceEndTime).getTime() - new Date().getTime()) / 1000);
            if (remainingTime > 0) {
                disableButton(raceButton);
                startRace(remainingTime);
            } else {
                enableButton(raceButton);
                raceButton.innerText = "START RACE🏁";
            }
        }
    }

    // Update the counter in localStorage
    function updateCounter() {
        const currentBalance = parseInt(ccBalance.innerText);
        ccBalance.innerText = currentBalance + 1;
        localStorage.setItem("cc_balance", ccBalance.innerText);
    }

    // Record button press in localStorage
    function recordButtonPress(buttonType) {
        let buttonPresses = JSON.parse(localStorage.getItem("buttonPresses")) || {};
        if (!buttonPresses[buttonType]) {
            buttonPresses[buttonType] = 0;
        }
        buttonPresses[buttonType] += 1;
        localStorage.setItem("buttonPresses", JSON.stringify(buttonPresses));
    }

    // Disable a button and save its state
    function disableButton(button) {
        button.disabled = true;
        button.style.backgroundColor = "darkgray";
        button.style.color = "gray"; // Optionally set color to gray for disabled effect
        button.style.pointerEvents = "none"; // Disable pointer events to prevent clicks
    }

    // Enable a button and reset its state
    function enableButton(button) {
        button.disabled = false;
        button.style.backgroundColor = "#F0DB20";
        button.style.color = "#000000"; // Optionally set color back to normal
        button.style.pointerEvents = "auto"; // Enable pointer events
    }

    raceButton.addEventListener("click", function() {
        if (raceButton.innerText.includes("START RACE")) {
            startRace(24 * 60 * 60);
            recordButtonPress("race");
        }
    });

    boostButton.addEventListener("click", function() {
        if (!boostButton.disabled) {
            disableButton(boostButton);
            recordButtonPress("boost");
        }
    });

    nitroButton.addEventListener("click", function() {
        recordButtonPress("nitro");
    });

    function startRace(duration) {
        raceButton.disabled = true;
        raceButton.style.backgroundColor = "darkgray";
        raceButton.innerText = formatTime(duration);

        const raceEndTime = new Date(new Date().getTime() + duration * 1000);
        localStorage.setItem("raceEndTime", raceEndTime);

        let raceTime = duration;
        timerInterval = setInterval(() => {
            raceTime--;
            raceButton.innerText = formatTime(raceTime);

            if (raceTime <= 0) {
                clearInterval(timerInterval);
                enableButton(raceButton);
                raceButton.innerText = "START RACE🏁";
                localStorage.removeItem("raceEndTime");
            }
        }, 1000);

        updateCounter();
    }

    function formatTime(seconds) {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    // Initialize the page
    initialize();
});
