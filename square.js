function calculateSquare() {
    const quantity = document.getElementById('quantity').value;
    if (quantity >= 1 && quantity <= 4) {
        const square = quantity * quantity;
        document.getElementById('result').textContent = `The square of ${quantity} is ${square}.`;
    } else {
        document.getElementById('result').textContent = 'Please enter a number between 1 and 4.';
    }
}

