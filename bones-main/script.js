document.getElementById('throwDiceButton').addEventListener('click', function() {
    // Генерация случайного числа от 1 до 6
    const result = Math.floor(Math.random() * 6) + 1;

    // Обновление текста с результатом броска
    document.getElementById('diceResult').textContent = `Результат броска: ${result}`;
    
    document.getElementById('throwDiceButton').addEventListener('click', function() {
        // Генерация случайного числа от 1 до 6
        //const result = Math.floor(Math.random() * 6);
        
        // Обновление текста с результатом броска
        
        
        // Получаем тело таблицы
        const tableBody = document.querySelector('#resultTable tbody');
        
        // Проверяем, если первая строка существует
        
    });
    // Получаем изображение кубика
    //const diceFace = document.getElementById('diceFace');
    const zxc = ['1.png','2.png','3.png','4.png','5.png','6.png'];
    // Делаем картинку невидимой для эффекта анимации
    //diceFace.style.opacity = 0;
    
    // Задержка для плавной смены изображения
    setTimeout(function() {
        // Устанавливаем изображение в зависимости от результата
        
        if (tableBody.rows.length > 0) {
            // Получаем первую строку и обновляем её значения
            const firstRow = tableBody.rows[0];
            firstRow.cells[1].textContent = result;  // Обновляем результат в первой строке
        } else {
            // Если строк в таблице нет, добавляем первую строку с результатом
            const newRow = tableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            cell1.textContent = 1; // Порядковый номер
            cell2.textContent = result; // Результат
        }
/*switch(result) {
    case 1:
        diceFace.src = result + '.png';
        break;
    case 2:
        diceFace.src = result + '.png';
        break;
    case 3:
        diceFace.src = result + '.png';
        break;
    case 4:
        diceFace.src = result + '.png';
        break;
    case 5:
        diceFace.src = result + '.png';
        break;
    case 6:
        diceFace.src = result + '.png';
        break;
}*/
        
        // Плавно возвращаем картинку в видимый режим
        diceFace.style.opacity = 1;
    }, 300); // Время для анимации (300 мс)
    
    const diceFace = document.getElementById('diceFace');
    document.getElementById('diceResult').textContent = `Результат броска: ${result}`;
    diceFace.src = result + '.png';
    
    console.log(zxc[result-1],result)
});
