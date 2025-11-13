    // document.addEventListener('DOMContentLoaded', () => {
    //     const controls = document.getElementById('controls');
    //     const popup = document.getElementById('popup');
    //     const closePopup = document.getElementById('closePopup');
    //     const impressum = document.getElementById('impressum');
    //     const popup1 = document.getElementById('popup1');

    //     controls.impressum.addEventListener('click', (e) => {
    //         e.stopPropagation();
    //         popup.style.display = 'block';

    //         e.stopPropagation();
    //         popup1.style.display = 'block';
    //     });

    //     closePopup.addEventListener('click', () => {
    //         popup.style.display = 'none';
    //         popup1.style.display = 'none';
    //     });

    //     document.addEventListener('click', () => {
    //         popup.style.display = 'none';
    //         popup1.style.display = 'none';
    //     });

    //     popup.popup1.addEventListener('click', (e) => {
    //         e.stopPropagation();
    //     });
    // });

    document.addEventListener('DOMContentLoaded', () => {
    const popup1 = document.getElementById('popup');
    const popup2 = document.getElementById('popup2');
    const btnControls = document.getElementById('controls');
    const btnImpressum = document.getElementById('impressum');
    const closeButtons = document.querySelectorAll('.closePopup');

    // Funktion zum Schließen aller Popups
    function closeAllPopups() {
        popup1.classList.add('hidden');
        popup2.classList.add('hidden');
    }

    // Button "Controls" klick
    btnControls.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
        popup1.classList.remove('hidden');
    });

    // Button "Impressum" klick
    btnImpressum.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
        popup2.classList.remove('hidden');
    });

    // Klick auf X (Close)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups();
        });
    });

    // Klick außerhalb -> schließt Popups
    document.addEventListener('click', () => {
        closeAllPopups();
    });

    // Klick innerhalb eines Popups -> schließt NICHT
    [popup1, popup2].forEach(popup => {
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

