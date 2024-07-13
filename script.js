document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('service');
    const quantityInput = document.getElementById('quantity');
    const quantityDisplay = document.getElementById('quantityDisplay');
    const totalDisplay = document.getElementById('totalDisplay');
    const orderForm = document.getElementById('orderForm');

    const prices = {
        like: 15,
        comment: 20,
        share: 25
    };

    function calculateTotal() {
        const service = serviceSelect.value;
        const quantity = quantityInput.value;
        const price = prices[service] || 0;
        const discount = 0.1; // 10%
        const total = quantity * price * (1 - discount);

        quantityDisplay.textContent = `Số lượng cần tăng: ${quantity}`;
        totalDisplay.textContent = `Tổng: ${total.toLocaleString()} VND`;
    }

    serviceSelect.addEventListener('change', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);

    // Initial calculation
    calculateTotal();

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const service = serviceSelect.options[serviceSelect.selectedIndex].text;
        const quantity = quantityInput.value;
        const user = document.getElementById('user').value;
        const notes = document.getElementById('notes').value;
        const total = totalDisplay.textContent;

        const message = `Đơn hàng mới:\n\nDịch Vụ: ${service}\nSố Lượng: ${quantity}\nNick: ${user}\nGhi Chú: ${notes}\n${total}`;

        sendTelegramMessage(message);
    });

    function sendTelegramMessage(message) {
        const botToken = '7109160707:AAENydEkxydQkdLbzFqzdCf2ZFvqgUmIBYI'; 
        const chatId = '5622754217'; 
        console.log('Bot Token:', botToken);
        console.log('Chat ID:', chatId);
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }).then(response => {
            if (response.ok) {
                alert('Đơn hàng đã được gửi!');
            } else {
                alert('Đã xảy ra lỗi khi gửi đơn hàng!');
            }
        }).catch(error => {
            alert('Đã xảy ra lỗi khi gửi đơn hàng!');
            console.error('Error:', error);
        });
    }
});
