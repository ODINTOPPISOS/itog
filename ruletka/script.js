// надписи и цвета на секторах
const prizes = [
  {
    text: "0",
    color: "rgb(25, 133, 17)",
  },
  {
    text: "1",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "2",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "3",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "4",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "5",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "6",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "7",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "8",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "9",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "10",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "11",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "12",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "13",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "14",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "15",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "16",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "17",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "18",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "00",
    color: "rgb(25, 133, 17)",
  },
  {
    text: "19",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "20",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "21",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "22",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "23",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "24",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "25",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "26",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "27",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "28",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "29",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "30",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "31",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "32",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "33",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "34",
    color: "rgb(28, 23, 22)",
  },
  {
    text: "35",
    color: "rgb(125, 27, 12)",
  },
  {
    text: "36",
    color: "rgb(28, 23, 22)",
  },


];

// создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const container = wheel.querySelector(".container");
const betbutton = wheel.querySelector(".betbutton");

// на сколько секторов нарезаем круг
const prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
const prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);

// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;

// расставляем текст по секторам
const createPrizeNodes = () => {
  // обрабатываем каждую подпись
  prizes.forEach(({ text, color, reaction }, i) => {
    // каждой из них назначаем свой угол поворота
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // добавляем код с размещением текста на страницу в конец блока spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // текст при этом уже оформлен нужными стилями
      `<li class="prize" data-reaction=${text} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

// рисуем разноцветные секторы
const createConicGradient = () => {
  // устанавливаем нужное значение стиля у элемента spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // получаем цвет текущего сектора
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};

// создаём функцию, которая нарисует колесо в сборе
const setupWheel = () => {
  // сначала секторы
  createConicGradient();
  // потом текст
  createPrizeNodes();
  // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
  prizeNodes = wheel.querySelectorAll(".prize");
};

// определяем количество оборотов, которое сделает наше колесо
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция запуска вращения с плавной остановкой
const runTickerAnimation = () => {
  // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // анимация язычка, когда его задевает колесо при вращении
  // если появился новый сектор
  if (currentSlice !== slice) {
    // убираем анимацию язычка
    ticker.style.animation = "none";
    // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
    setTimeout(() => ticker.style.animation = null, 10);
    // после того, как язычок прошёл сектор - делаем его текущим 
    currentSlice = slice;
  }
  // запускаем анимацию
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// функция выбора призового сектора
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  alert(prizeNodes[selected].textContent)

};

// отслеживаем нажатие на кнопку
trigger.addEventListener("click", () => {
  // делаем её недоступной для нажатия
  //trigger.disabled = true;
  //betbutton.disabled = true;
  //container.disabled = true;
  // задаём начальное вращение колеса
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // убираем прошлый приз
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
  wheel.classList.add(spinClass);
  // через CSS говорим секторам, как им повернуться
  spinner.style.setProperty("--rotate", rotation);
  // возвращаем язычок в горизонтальную позицию
  ticker.style.animation = "none";
  // запускаем анимацию вращение
  runTickerAnimation();
});

// отслеживаем, когда закончилась анимация вращения колеса
spinner.addEventListener("transitionend", () => {
  // останавливаем отрисовку вращения
  cancelAnimationFrame(tickerAnim);
  // получаем текущее значение поворота колеса
  rotation %= 360;
  // выбираем приз
  selectPrize();
  // убираем класс, который отвечает за вращение
  wheel.classList.remove(spinClass);
  // отправляем в CSS новое положение поворота колеса
  spinner.style.setProperty("--rotate", rotation);
  // делаем кнопку снова активной
  //trigger.disabled = false;
  //betbutton.disabled = false;
  //container.disabled = false;
});

// подготавливаем всё к первому запуску
setupWheel();

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
