const add = (a, b) => {
  firstInput.textContent = a + b;
  operatorElement.textContent = "";
  secondInput.textContent = "";
  firstDigit = a + b;
  secondDigit = 0;
  operator = "";
};

const subtract = (a, b) => {
  firstInput.textContent = a - b;
  operatorElement.textContent = "";
  secondInput.textContent = "";
  firstDigit = a - b;
  secondDigit = 0;
  operator = "";
};

const multiply = (a, b) => {
  firstInput.textContent = a * b;
  operatorElement.textContent = "";
  secondInput.textContent = "";
  firstDigit = a * b;
  secondDigit = 0;
  operator = "";
};

const divide = (a, b) => {
  firstInput.textContent = a / b;
  operatorElement.textContent = "";
  secondInput.textContent = "";
  firstDigit = a / b;
  secondDigit = 0;
  operator = "";
};

const operate = (a, o, b) => {
  switch (o) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return console.error(`Sent value not expected: ${o}`);
  }
};

var firstDigit = 0;
var operator = "";
var secondDigit = 0;
var focusedInput = "";
var isSecondInputFlag = false;

var inputDisplay = document.getElementById("input-display");
var firstInput = document.getElementById("first-input");
var secondInput = document.getElementById("second-input");
var operatorElement = document.getElementById("operator");

const digitToInput = (e) => {
  if (!isSecondInputFlag) {
    let newValue = `${firstInput.textContent}${e.target.value}`;
    firstInput.textContent = newValue;
  } else {
    let newValue = `${secondInput.textContent}${e.target.value}`;
    secondInput.textContent = newValue;
  }
};

const createOperator = (e) => {
  operator = e.target.value;
  firstDigit = parseFloat(firstInput.textContent);
  operatorElement.textContent = operator;
  isSecondInputFlag = true;
};

var buttonsWithValue = document.querySelectorAll(".button--has-value");
buttonsWithValue.forEach((button) => {
  button.addEventListener("click", (e) => {
    digitToInput(e);
  });
});

var buttonsWithOperator = document.querySelectorAll(".button--has-operator");
buttonsWithOperator.forEach((button) => {
  button.addEventListener("click", (e) => {
    createOperator(e);
  });
});

var equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", (e) => {
  secondDigit = parseFloat(secondInput.textContent);
  isSecondInputFlag = false;
  operate(firstDigit, operator, secondDigit);
});
