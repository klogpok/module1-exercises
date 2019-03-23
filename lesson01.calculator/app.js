const numbers = Array.from(document.querySelectorAll('.calc-btn-num'));
const operators = Array.from(document.querySelectorAll('.calc-btn-operator'));
const displayValEl = document.querySelector('#calc-display-val');
const clearBtn = document.querySelector('#calc-clear');
const backspaceBtn = document.querySelector('#calc-backspace');
const decimal = document.querySelector('#decimal');
const sign = document.querySelector('#sign');

let displayVal = '0';
const eval = { pendingVal: 0, operation: '', currentVal: null };

const updateDisplayVal = event => {
    const number = event.target.dataset.num;

    if (displayVal === '0') {
        displayVal = '';
    }

    displayVal += number;
    displayValEl.textContent = displayVal;
};

const getResult = () => {
    switch (eval.operation) {
        case '+':
            return (eval.pendingVal + +displayVal).toString();
        case '-':
            return (eval.pendingVal - +displayVal).toString();
        case 'x':
            return (eval.pendingVal * +displayVal).toString();
        case '/':
            return (eval.pendingVal / +displayVal).toFixed(2).toString();
        default:
            return;
    }
};

const updateState = operation => {
    eval.pendingVal = +displayVal;
    eval.operation = operation;
    displayVal = '0';
};

const performOperation = event => {
    const operation = event.target.dataset.operation;

    switch (operation) {
        case '+':
        case '-':
        case 'x':
        case '/':
            updateState(operation);
            break;
        case '=':
            displayVal = getResult();
            displayValEl.textContent = displayVal;
            break;
        default:
            break;
    }
};

numbers.forEach(number => {
    number.addEventListener('click', updateDisplayVal);
});

operators.forEach(number => {
    number.addEventListener('click', performOperation);
});

clearBtn.onclick = () => {
    displayVal = '';
    displayValEl.textContent = '0';
    eval.pendingVal = 0;
    eval.operation = '';
};

backspaceBtn.onclick = () => {
    displayVal = displayVal.slice(0, -1);

    if (displayVal === '') {
        displayVal = '0';
    }
    displayValEl.textContent = displayVal;
};

decimal.onclick = () => {
    if (!displayVal.includes('.')) {
        displayVal = displayVal === '0' ? '0.' : displayVal + '.';
        displayValEl.textContent = displayVal;
    }
};

sign.onclick = () => {
    displayVal = displayVal === '0' ? '-' : '-' + displayVal;
    displayValEl.textContent = displayVal;
};
