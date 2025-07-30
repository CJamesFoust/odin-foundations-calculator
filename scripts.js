// Operation functions

const operate = (o) => {
  switch (o) {
    case "+":
      return new Promise((resolve, reject) => {
        resolve(firstDigit + secondDigit);
      });
    case "-":
      return new Promise((resolve, reject) => {
        resolve(firstDigit - secondDigit);
      });
    case "*":
      return new Promise((resolve, reject) => {
        resolve(firstDigit * secondDigit);
      });
    case "/":
      return new Promise((resolve, reject) => {
        resolve(firstDigit / secondDigit);
      });
    case "%":
      return new Promise((resolve, reject) => {
        resolve(firstDigit / 100) * secondDigit;
      });
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
  } else if (secondInputInit === true && isSecondInputFlag === true) {
    secondInputInit = false;
    resultsDisplay.textContent = e.target.value;
  } else {
    resultsDisplay.textContent = `${resultsDisplay.textContent}${e.target.value}`;
  }
};

const createOperator = (e) => {
  if (isFirstOperation === true && isSecondInputFlag === false) {
    firstDigit = parseFloat(resultsDisplay.textContent);
    operator = e.target.value;
  } else {
    secondDigit = parseFloat(resultsDisplay.textContent);
    operate(operator)
      .then((result) => {
        firstDigit = parseFloat(result.toFixed(5));
        resultsDisplay.textContent = result.toFixed(5);
        justOperated = true;
        isFirstOperation = false;
        operator = e.target.value;
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  isSecondInputFlag = true;
  secondInputInit = true;
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
equalsButton.addEventListener("click", () => {
  if (justOperated === false) {
    secondDigit = parseFloat(resultsDisplay.textContent);
    isSecondInputFlag = false;
  }
  operate(operator)
    .then((result) => {
      firstDigit = parseFloat(result.toFixed(5));
      resultsDisplay.textContent = result.toFixed(5);
      justOperated = true;
      isSecondInputFlag = true;
      secondInputInit = true;
      isFirstOperation = false;
    })
    .catch((err) => {
      console.log("error", err);
    });
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
  secondInputInit = false;
  resultsDisplay.textContent = "";
});

var deleteButton = document.querySelector(".button--delete");
deleteButton.addEventListener("click", () => {
  resultsDisplay.textContent = resultsDisplay.textContent.substring(
    0,
    resultsDisplay.textContent.length - 1
  );
});
