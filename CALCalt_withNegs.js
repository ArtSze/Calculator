//fix stream of operations to utilize last selected operator as opposed to first (waitingForSecondOperand)

const wind = document.querySelector('#window');
const lastOpWindow = document.querySelector('#lastOpWindow');
const numKeys = document.querySelectorAll('.numKey');
const opKeys = document.querySelectorAll('.opKey');
const clearBut = document.querySelector('#clear');
const backspaceBut = document.querySelector('#backspace');
const equalBut =  document.querySelector('#equals')
let prevVal = '';
let newVal = '';
let resultVal = '';
let operator = '';
let displayValue = '';
let opPressed = false;
let negPressed = false;
let decimalPressed = false;
let numPressed = false;


numKeyPress = (e) => {
    let num = e.target.innerHTML;
    if (resultVal){
        displayValue = '';
        updateDisplay(displayValue);
        newVal += num;
        displayValue = newVal;
        updateDisplay(newVal);
        resultVal = '';
        numPressed = true;
    }

    else {
        if (num === '.'){
            if (decimalPressed != true){
                newVal+=num;
                decimalPressed = true;
            }
        }
        else {
            newVal += num;
        }
    displayValue = ` ${newVal} `;
    updateDisplay(displayValue);
    numPressed = true;
    }
}

clearWindow = () => {
    prevVal = '';
    newVal = '';
    resultVal = '';
    operator = '';
    decimalPressed = false;
    opPressed = false;
    numPressed = false;
    negPressed = false;
    displayValue = '0';
    updateDisplay(displayValue);
    lastOpWindow.innerHTML = ``;
}

opKeyPress = (e) => {
    if (numPressed === true){
        if (opPressed === false){
            if (!resultVal){
                prevVal = newVal;
            }

            else {
                prevVal = resultVal;
            }
            newVal = '';
            decimalPressed = false;
            operator = e.target.id;
            resultVal = '';
            displayValue = ` `
            updateDisplay(displayValue);
            opPressed = true;
            negPressed = false;
        }

        else if (opPressed === true){
            if (newVal && prevVal){
                decimalPressed = false;
                negPressed = false;
                resultVal = operate(operator, parseFloat(prevVal), parseFloat(newVal));
                console.log(`opKeyPress called: ${prevVal} ${operator} ${newVal} is ${resultVal}`);
                lastOpWindow.innerHTML = `${prevVal} ${operator} ${newVal}`;
                if (resultVal ==='I can\'t divide by zero! clear me!'){
                    updateDisplay(`nice try! clear me!`);
                }
                else{
                    resultVal = round(resultVal);
                    prevVal = resultVal;
                    displayValue = ` ${resultVal} `;
                    updateDisplay(displayValue);
                    operator = e.target.id;
                    newVal = '';
                    resultVal = '';
                }
            }
            else if (e.target.innerHTML === '-'){
                if (negPressed === false){
                    let num = e.target.innerHTML;
                    newVal += num;
                    updateDisplay(` ${newVal} `);
                    negPressed = true;
                }
            }
        }
    }
    else if (negPressed === false){
        if (e.target.innerHTML === '-'){
            let num = e.target.innerHTML;
            newVal += num;
            updateDisplay(` ${newVal} `);
            negPressed = true;
        } 
    }
    else return;
}

equalPress = () => {
    if (operator && prevVal && newVal){
        decimalPressed = false;
        opPressed = false;
        resultVal = operate(operator, parseFloat(prevVal), parseFloat(newVal));
        console.log(`equalPress called: ${prevVal} ${operator} ${newVal} is ${resultVal}`);
        lastOpWindow.innerHTML = `${prevVal} ${operator} ${newVal}`;
        if (resultVal ==='I can\'t divide by zero! clear me!'){
            updateDisplay(`nice try! clear me!`);
        }
        else {
            resultVal = round(resultVal);
            prevVal = resultVal;
            displayValue = ` ${resultVal}`
            updateDisplay(displayValue);
            newVal = '';
        }
    }
    else {
        return;
    }
}

round = (value) => {
    if (countDecimals(value) > 16){
        return Number(Math.round(value + 'e16') + 'e-16'); 
    }
    else return value;
}

countDecimals = (value) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

updateDisplay = (displayValue) => {
    wind.innerHTML = displayValue;
}

backspace = () => {
    if (newVal){
        newVal = newVal.slice(0, newVal.length-1);
        updateDisplay(` ${newVal} `);
    }
}

operate = (operator, arg1, arg2) => {
    if (operator === '*'){
       return multiply(arg1, arg2)
    }

    if (operator === '/'){
        if (arg2 === 0){
            return 'I can\'t divide by zero! clear me!';
        }
        else {
        return divide(arg1, arg2)
        }
    }

    if (operator === '-'){
        return subtract(arg1, arg2)
    }

    if (operator === '+'){
        return sum(arg1, arg2)
    }

    if (operator === '%'){
        return mod(arg1, arg2)
    }

    if (operator === '^'){
        return exp(arg1, arg2)
    }
}

sum = (a, b) => {
    return a + b;
}

subtract = (a, b) => {
    return a - b
}

divide = (a, b) => {
    return a / b
}

multiply = (a, b) => {
    return a * b;
}

mod = (a, b) => {
    return (a % b + b) % b;
}

exp = (a, b) => {
    return Math.pow(a, b);
}

numKeys.forEach(numKey => numKey.addEventListener('click', numKeyPress));
opKeys.forEach(opKey => opKey.addEventListener('click', opKeyPress));
clearBut.addEventListener('click', clearWindow);
backspaceBut.addEventListener('click', backspace);
equalBut.addEventListener('click', equalPress);