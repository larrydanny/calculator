// create class
class Calculator {
  constructor(previousInputTextElement, currentInputTextElement) {
    this.previousInputTextElement = previousInputTextElement;
    this.currentInputTextElement = currentInputTextElement;
    this.clearAll();
  }

  clearAll() {
    this.currentInput = "";
    this.previousInput = "";
    this.operator = undefined;
  }

  appendNumber(number) {
    console.log(this.currentInput);

    if (number === "." && this.currentInput.toString().includes(".")) return; // only once add "."
    this.currentInput = this.currentInput.toString() + number.toString(); // convert string cos not to add number
  }

  selectOperator(operator) {
    if (!this.currentInput) return;
    if (this.previousInput) {
      this.calculate();
    }
    this.operator = operator;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  calculate() {
    const previousValue = parseFloat(this.previousInput);
    const currentValue = parseFloat(this.currentInput);
    if (isNaN(previousValue) || isNaN(currentValue)) return;
    switch (this.operator) {
      case "÷":
        this.currentInput = previousValue / currentValue;
        break;
      case "*":
        this.currentInput = previousValue * currentValue;
        break;
      case "-":
        this.currentInput = previousValue - currentValue;
        break;
      case "+":
        this.currentInput = previousValue + currentValue;
        break;
      default:
        return;
    }
    this.operator = undefined;
    this.previousInput = "";
  }

  displayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    const integerDisplay = isNaN(integerDigits)
      ? ""
      : integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0
        });

    return decimalDigits != null
      ? `${integerDisplay}.${decimalDigits}`
      : integerDisplay;
  }

  updateDisplay() {
    this.currentInputTextElement.innerText = this.displayNumber(
      this.currentInput
    );
    this.previousInputTextElement.innerText = this.operator
      ? `${this.displayNumber(this.previousInput)} ${this.operator}`
      : this.displayNumber(this.previousInput);
  }

  delete() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
  }
}

$(document).ready(function() {
  // get selected values
  const numberButtons = document.querySelectorAll("[data-number]");
  const operatorButtons = document.querySelectorAll("[data-operator]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearButton = document.querySelector("[data-all-clear]");
  const previousInputTextElement = document.querySelector(
    "[data-previous-input]"
  );
  const currentInputTextElement = document.querySelector(
    "[data-current-input]"
  );

  // create class instance
  const calculator = new Calculator(
    previousInputTextElement,
    currentInputTextElement
  );

  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
      calculator.selectOperator(button.innerText);
      calculator.updateDisplay();
    });
  });

  equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });

  allClearButton.addEventListener("click", () => {
    calculator.clearAll();
    calculator.updateDisplay();
  });
});
