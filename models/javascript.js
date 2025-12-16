 document.addEventListener('DOMContentLoaded', () => {
    const popup1 = document.getElementById('popup');
    const popup2 = document.getElementById('popup2');
    const btnControls = document.getElementById('controls');
    const btnImpressum = document.getElementById('impressum');
    const closeButtons = document.querySelectorAll('.closePopup');

    function closeAllPopups() {
        popup1.classList.add('hidden');
        popup2.classList.add('hidden');
    }

    btnControls.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
        popup1.classList.remove('hidden');
    });

    btnImpressum.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
        popup2.classList.remove('hidden');
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups();
        });
    });

    document.addEventListener('click', () => {
        closeAllPopups();
    });

    [popup1, popup2].forEach(popup => {
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});