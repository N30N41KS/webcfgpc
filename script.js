function calculate() {
    // Получаем элементы по их ID
    const cpuSelect = document.getElementById('cpu');
    const gpuSelect = document.getElementById('gpu');
    const ramSelect = document.getElementById('ram');
    const motherSelect = document.getElementById('mother');
    const psuSelect = document.getElementById('psu');
    const caseSelect = document.getElementById('case');
    const coolSelect = document.getElementById('cool');
    const totalElement = document.getElementById('total');

    // Преобразуем значения в числа (используем 0, если ничего не выбрано)
    const cpuPrice = parseInt(cpuSelect.value) || 0;
    const gpuPrice = parseInt(gpuSelect.value) || 0;
    const ramPrice = parseInt(ramSelect.value) || 0;
    const motherPrice = parseInt(motherSelect.value) || 0;
    const psuPrice = parseInt(psuSelect.value) || 0;
    const casePrice = parseInt(caseSelect.value) || 0;
    const coolPrice = parseInt(coolSelect.value) || 0;

    
    // Считаем сумму
    const totalPrice = cpuPrice + gpuPrice + ramPrice + motherPrice + psuPrice + casePrice + coolPrice;

    // Выводим результат с разделением тысяч для красоты (например, 100 000)
    totalElement.innerText = totalPrice.toLocaleString('ru-RU');
}


    function addToCart() {
        // 1. Собираем данные со страницы
        const cpuEl = document.getElementById('cpu');
        const gpuEl = document.getElementById('gpu');
        const ramEl = document.getElementById('ram');
        const motherEl = document.getElementById('mother');
        const psuEl = document.getElementById('psu');
        const caseEl = document.getElementById('case');
        const coolEl = document.getElementById('cool');
        const price = document.getElementById('total').innerText;
    
        // Проверка: выбрал ли пользователь хоть что-то
        if (price === "0") {
            alert("Сначала выберите комплектующие!");
            return;
        }
    
        // 2. Создаем объект сборки
        const myPc = {
            cpu: cpuEl.options[cpuEl.selectedIndex].text,
            gpu: gpuEl.options[gpuEl.selectedIndex].text,
            ram: ramEl.options[ramEl.selectedIndex].text,
            mother: motherEl.options[motherEl.selectedIndex].text,
            psu: psuEl.options[psuEl.selectedIndex].text,
            case: caseEl.options[caseEl.selectedIndex].text,
            cool: coolEl.options[coolEl.selectedIndex].text,
            total: price,
        };
    
        // 3. Получаем старый список из памяти или создаем пустой массив
        let cart = JSON.parse(localStorage.getItem('my_pc_cart')) || [];
    
        // 4. Добавляем новую сборку в список
        cart.push(myPc);
    
        // 5. Сохраняем обратно в память браузера
        localStorage.setItem('my_pc_cart', JSON.stringify(cart));
    
        alert("Сборка успешно сохранена в корзину!");
        
    // 3. ПЕРЕХОДИМ В КОРЗИНУ (Добавь эту строку)
    window.location.href = 'cart.html';
}
   
function processOrder() {
    const data = JSON.parse(localStorage.getItem('my_pc_cart')) || [];
    if (data.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    // Считаем итоговую сумму еще раз для проверки
    const finalPrice = data.reduce((sum, item) => {
        const price = parseInt(item.total.toString().replace(/\s/g, '')) || 0;
        return sum + price;
    }, 0);

    // Здесь мы имитируем переход к оплате
    const confirmOrder = confirm(`Общая сумма заказа: ${finalPrice.toLocaleString()} ₽. Перейти к оплате?`);
    
    if (confirmOrder) {
        alert("Заявка принята! Сейчас мы перенаправим вас на страницу оплаты (в реальности тут был бы переход на банк).");
        
        // Очищаем корзину после "оплаты"
        localStorage.removeItem('my_pc_cart');
        window.location.href = "index.html"; // Возвращаем на главную
    }
}
