document.querySelectorAll('#go').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('clicked');
    });
});
