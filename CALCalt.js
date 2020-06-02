//fix for two operators in a row

const wind = document.querySelector('#window');
const numKeys = document.querySelectorAll('.numKey');
const opKeys = document.querySelectorAll('.opKey');
const clearBut = document.querySelector('#clear');
const equalBut =  document.querySelector('#equals')
let prevVal = '';
let newVal = '';
let resultVal = '';
let operator = '';
let opPressed = false;
let decimalPressed = false;
let numPressed = false;


numKeyPress = (e) => {
    let num = e.target.innerHTML;
    if (resultVal){
        newVal += num;
        resultVal = '';
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
    }
    wind.innerHTML = newVal;
    numPressed = true;
}

clearWindow = () => {
    prevVal = '';
    newVal = '';
    resultVal = '';
    operator = '';
    decimalPressed = false;
    opPressed = false;
    numPressed = false;
    wind.innerHTML = '0';
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
            wind.innerHTML = '';
            opPressed = true;
        }

        else if ((opPressed === true) && (newVal && prevVal)){
            decimalPressed = false;
            resultVal = operate(operator, parseFloat(prevVal), parseFloat(newVal));
            console.log(`opKeyPress called: ${prevVal} ${operator} ${newVal} is ${resultVal}`);
            if (resultVal ==='I can\'t divide by zero! clear me!'){
                wind.innerHTML = resultVal;
            }
            else{
                prevVal = resultVal;
                wind.innerHTML = resultVal;
                operator = e.target.id;
                newVal = '';
                resultVal = '';
            }
        }
    }
    else return;
}

equalPress = (e) => {
    if (operator && prevVal && newVal){
        decimalPressed = false;
        opPressed = false;
        resultVal = operate(operator, parseFloat(prevVal), parseFloat(newVal));
        console.log(`equalPress called: ${prevVal} ${operator} ${newVal} is ${resultVal}`);
        
        if (resultVal ==='I can\'t divide by zero! clear me!'){
            wind.innerHTML = resultVal;
        }
        else {
            prevVal = resultVal;
            wind.innerHTML = resultVal;
            newVal = '';
        }
    }
    else {
        return;
    }
}

operate = (operator, arg1, arg2) => {
    if (operator === 'mult'){
       return multiply(arg1, arg2)
    }

    if (operator === 'div'){
        if (arg2 === 0){
            return 'I can\'t divide by zero! clear me!';
        }
        else {
        return divide(arg1, arg2)
        }
    }

    if (operator === 'sub'){
        return subtract(arg1, arg2)
    }

    if (operator === 'add'){
        return sum(arg1, arg2)
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
    return a * b
}

numKeys.forEach(numKey => numKey.addEventListener('click', numKeyPress));
opKeys.forEach(opKey => opKey.addEventListener('click', opKeyPress));
clearBut.addEventListener('click', clearWindow);
equalBut.addEventListener('click', equalPress);