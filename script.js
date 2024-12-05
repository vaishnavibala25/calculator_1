const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;

const handleButtonClick = (value) => {
    if (!isNaN(value) || value === '.') {
        // Handle number or decimal point
        currentInput += value;
        display.textContent = currentInput;
    } else if (value === 'C') {
        // Handle clear
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.textContent = '0';
    } else if (value === '=') {
        // Handle equals
        if (firstOperand !== null && operator && currentInput) {
            currentInput = calculate(firstOperand, operator, parseFloat(currentInput)).toString();
            display.textContent = currentInput;
            firstOperand = null;
            operator = '';
        }
    } else {
        // Handle operator
        if (currentInput) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator) {
                firstOperand = calculate(firstOperand, operator, parseFloat(currentInput));
                display.textContent = firstOperand;
            }
            operator = value;
            currentInput = '';
        }
    }
};

const calculate = (a, op, b) => {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
};

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.dataset.value));
});
