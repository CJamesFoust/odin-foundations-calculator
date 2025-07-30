// Operation functions

const add = (a, b) => {
  resultsDisplay.textContent = a + b;
  firstDigit = a + b;
  isFirstOperation = false;
  justOperated = true;
};

const subtract = (a, b) => {
  resultsDisplay.textContent = a - b;
  firstDigit = a - b;
  isFirstOperation = false;
  justOperated = true;
};

const multiply = (a, b) => {
  resultsDisplay.textContent = a * b;
  firstDigit = a * b;
  isFirstOperation = false;
  justOperated = true;
};

const divide = (a, b) => {
  resultsDisplay.textContent = a / b;
  firstDigit = a / b;
  isFirstOperation = false;
  justOperated = true;
};

const percent = (a, b) => {
  resultsDisplay.textContent = (a / 100) * b;
  firstDigit = (a / 100) * b;
  isFirstOperation = false;
  justOperated = true;
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
    case "%":
      return percent(a, b);
    default:
      return console.error(`Sent value not expected: ${o}`, operator);
  }
};

// Context variables
var firstDigit = 0;
var operator = "";
var secondDigit = 0;
var isSecondInputFlag = false;
var justOperated = false;
var isFirstOperation = true;
var secondInputInit = false;

// Front-end variables
var resultsDisplay = document.getElementById("results-display");

// Front-end functions
const digitToInput = (e) => {
  if (justOperated === true) {
    justOperated = false;
    isSecondInputFlag = true;
    resultsDisplay.textContent = e.target.value;
  } else if(secondInputInit === true && isSecondInputFlag === true) {
    secondInputInit = false;
      resultsDisplay.textContent = e.target.value;
    } else {
        resultsDisplay.textContent = `${resultsDisplay.textContent}${e.target.value}`;
    }

};

const createOperator = (e) => {
  if (isFirstOperation === true) {
    firstDigit = parseFloat(resultsDisplay.textContent);
  } else {
    secondDigit = parseFloat(resultsDisplay.textContent);
    operate(firstDigit, operator, secondDigit);
  }

  isSecondInputFlag = true;
  secondInputInit = true;
  operator = e.target.value;
};

// Buttons 'Event Listener' functions and assignment
var buttonsWithValue = document.querySelectorAll(".button--has-value");
buttonsWithValue.forEach((button) => {
  button.addEventListener("click", (e) => {
    digitToInput(e);
  });
});

var buttonWithPeriod = document.querySelector(".button--has-period");
buttonWithPeriod.addEventListener("click", (e) => {
  if (resultsDisplay.textContent.includes(".")) {
    return;
  }
  digitToInput(e);
});

var buttonsWithOperator = document.querySelectorAll(".button--has-operator");
buttonsWithOperator.forEach((button) => {
  button.addEventListener("click", (e) => {
    createOperator(e);
  });
});

var equalsButton = document.querySelector(".button--equals");
equalsButton.addEventListener("click", (e) => {
  if (justOperated === true) {
    operate(firstDigit, operator, secondDigit);
  } else {
    secondDigit = parseFloat(resultsDisplay.textContent);
    isSecondInputFlag = false;
    operate(firstDigit, operator, secondDigit);
  }
  console.log("in equal function", operator, firstDigit, secondDigit);
});

var clearButton = document.querySelector(".button--clear");
clearButton.addEventListener("click", () => {
  firstDigit = 0;
  operator = "";
  secondDigit = 0;
  isFirstOperation = true;
  isSecondInputFlag = false;
  isAdditionalOpFlag = false;
  justOperated = false;
  resultsDisplay.textContent = "";
});

var deleteButton = document.querySelector(".button--delete");
deleteButton.addEventListener("click", () => {
  resultsDisplay.textContent = resultsDisplay.textContent.substring(
    0,
    resultsDisplay.textContent.length - 1
  );
});
