document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button[id^="go"]');
    const ccBalance = document.querySelector("#cc_balance p");

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

    buttons.forEach((button, index) => {
        const buttonId = `goButtonClicked_${index}`;

        // Проверка состояния кнопки в localStorage
        if (localStorage.getItem(buttonId) === 'true') {
            button.classList.add('clicked');
            button.disabled = true;
        }

        // Обработчик события для каждой кнопки
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращение перехода по ссылке
            button.classList.add('clicked');
            button.disabled = true;
            localStorage.setItem(buttonId, 'true');
        });
    });
    initialize();
});
