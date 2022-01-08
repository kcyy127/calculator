// day/night theme
// animations

let num1 = null, num2 = null, op = null;

const buttons = document.querySelectorAll("[data-type]");
const displayPast = document.querySelector(".past");
const displayCurrent = document.querySelector(".current");

buttons.forEach(button => {
    let temp;

    switch (button.dataset.type) {
        case 'number':
            temp = number;
            break;
        case 'operator':
            temp = operator;
            break;
        case 'equal':
            temp = equal;
            break;
        case 'ac':
            temp = clear;
            break;
        case 'pm':
            temp = plusMinus;
            break;
        case 'percentage':
            temp = percentage;
            break;
        case 'dd':
            temp = deleteDigit;
            break;
        case 'dot':
            temp = dot;
            break;
        default:
            break;
    }

    button.addEventListener('click', temp);
});

document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        const equalBtn = document.querySelector("[data-key='=']");
        equalBtn.click();
        return;
    }
    const btn = document.querySelector(`[data-key='${event.key}']`);
    if (!btn) {
        return;
    }
    btn.click();
})


function operator() {
    const temp = this.textContent;
    console.log(temp);
    if (op == null) {
        op = temp;
        displayPast.textContent = num1 + " " + op;
    } else {
        calculate(temp);
    }

    console.log(num1, op, num2);

}

function equal() {

    if (num1 === null || op === null || num2 === null) {
        console.log("can't calculate");
        return;
    }
    calculate(null);
}

function number() {
    const temp = this.textContent.toString();

    if (op == null) {
        num1 = num1 == null ? temp : num1.toString() + temp;
        displayCurrent.textContent = num1;
    } else {
        num2 = num2 == null ? temp : num2 + temp;
        displayCurrent.textContent = num2;
    }
    console.log(num1, op, num2);
    console.log(typeof(num1), typeof(num2));

}

function calculate(newOp) {
    let res;
    num1 = Number(num1);
    num2 = Number(num2);
    switch (op) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "x":
            res = num1 * num2;
            break;
        case "/":
            if (num2 == 0) {
                alert("Division by zero!");
                return;
            }
            res = num1 / num2;
            break;
        
    }

    displayCurrent.textContent = res;
    if (newOp == null) {
        displayPast.textContent = `${num1} ${op} ${num2} =`;
        op = null;
    } else {
        displayPast.textContent = `${res} ${newOp}`;
        op = newOp;
    }
    num1 = res.toString();
    num2 = null;
}

function clear() {
    num1 = null;
    op = null;
    num2 = null;
    displayCurrent.textContent = Number(num1);
    displayPast.textContent = "";
    console.log(num1, op, num2);
}

function plusMinus() {
    console.log("plusMinus");
    if (num2 != null) {
        num2 = "-" + num2;
        displayCurrent.textContent = num2;
    } else {
        num1 = "-" + num1;
        displayCurrent.textContent = num1;
        if (op != null) {
            displayPast.textContent = num1 + " " + op;
        }
    }
}

function percentage() {
    if (num2 != null) {
        const temp = Number(num2) * 0.01;
        num2 = temp == 0 ? null : temp.toString();
        displayCurrent.textContent = num2;
    } else {
        const temp = Number(num1) * 0.01;
        num1 = temp == 0? null : temp.toString();
        displayCurrent.textContent = Number(num1);
        if (op != null) {
            displayPast.textContent = num1 + " " + op;
        }
    }

}


function deleteDigit() {
    if (num2 != null) {
        const temp = num2.substring(0, num2.length -1);
        num2 = Number(temp) == 0 ? null : temp;
        displayCurrent.textContent = num2;
    } else {
        const temp = num1.substring(0, num1.length - 1);
        num1 = Number(temp) == 0 ? null : temp;
        displayCurrent.textContent = Number(num1);
        if (op != null) {
            displayPast.textContent = num1 + " " + op;
        }
    }
}

function dot() {
    // properties?
    if (num2 != null) {
        if (!num2.includes(".")){
            num2 = num2 + ".";
            displayCurrent.textContent = num2;
        }
        
    } else {
        if (num1 != null && !num1.includes(".")) {
            num1 = num1 + ".";
            displayCurrent.textContent = num1;
            if (op != null) {
                displayPast.textContent = num1 + " " + op;
            }
        }

        
    }
}