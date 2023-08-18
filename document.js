document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const notesContainer = document.getElementById('notes-container');
    const logoutButton = document.getElementById('logout-button');
    const noteForm = document.getElementById('note-form');
    const notesList = document.getElementById('notes-list');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Verificação de usuário e senha (para este exemplo, usaremos "admin" como usuário e senha)
        if (username === 'admin' && password === 'admin') {
            loginForm.reset();
            loginForm.style.display = 'none';
            notesContainer.style.display = 'block';
            loadNotes();
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    });

    logoutButton.addEventListener('click', () => {
        notesContainer.style.display = 'none';
        loginForm.style.display = 'block';
    });

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const service = document.getElementById('service').value;
        const price = document.getElementById('price').value;
        const date = document.getElementById('date').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const paid = document.getElementById('paid').checked;

        saveNote(service, price, date, paymentMethod, paid);
        noteForm.reset();
        loadNotes();
    });

    function loadNotes() {
        notesList.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${note.service}</span>
                <span>${note.price}</span>
                <span>${note.date}</span>
                <span>${note.paymentMethod}</span>
                <span>${note.paid ? 'Pago' : 'Não Pago'}</span>
            `;
            notesList.appendChild(listItem);
        });
    }

    function saveNote(service, price, date, paymentMethod, paid) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({
            service,
            price,
            date,
            paymentMethod,
            paid
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});
