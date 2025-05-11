// Получение элемента баланса
const balanceElement = document.getElementById('balance');

// Инициализация баланса
let balance = 1000;

// Проверка и установка начального баланса из cookies
if (getCookie('balance')) {
    balance = parseInt(getCookie('balance'));
}

// Функция обновления отображаемого баланса
function updateBalance() {
    balanceElement.textContent = balance;
}

// Функция добавления средств
document.getElementById('addButton').addEventListener('click', function () {
    balance += 1000;
    updateBalance();
});

// Функция убавления средств
document.getElementById('subtractButton').addEventListener('click', function () {
    if (balance >= 1000) {
        balance -= 1000;
        updateBalance();
    } else {
        alert('Недостаточно средств!');
    }
});

// Функция сохранения баланса в cookies
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Функция получения cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Функция сохранения баланса в cookies каждую секунду
setInterval(function () {
    setCookie('balance', balance, 1);
}, 1000);

// Обновление отображаемого баланса
updateBalance();
