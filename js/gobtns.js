document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button[id^="go"]');

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
});
