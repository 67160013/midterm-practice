let display = "0";
let operand1 = null;
let operand2 = null;
let operator = null;
let history = [];

// Update display
function updateDisplay() {
  document.getElementById("display").textContent = display;
}

// Append digit
function appendDigit(digit) {
  if (display === "0") {
    display = String(digit);
  } else {
    display += digit;
  }
  updateDisplay();
}

// Append decimal
function appendDecimal() {
  if (!display.includes(".")) {
    display += ".";
    updateDisplay();
  }
}

// Select operator
function selectOperator(op) {
  if (operand1 === null) {
    operand1 = Number(display);
  } else if (operator !== null) {
    calculate();
    operand1 = Number(display);
  }
  operator = op;
  display = "";
}

// Calculate result
function calculate() {
  if (operator === null || display === "") return;

  operand2 = Number(display);

  if (operator === "÷" && operand2 === 0) {
    alert("Cannot divide by zero!");
    clearAll();
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "÷":
      result = operand1 / operand2;
      break;
  }

  history.unshift(`${operand1} ${operator} ${operand2} = ${result}`);
  if (history.length > 10) history.pop();

  display = String(result);
  operand1 = result;
  operator = null;
  operand2 = null;

  updateDisplay();
  updateHistoryDisplay();
}

// Clear all
function clearAll() {
  display = "0";
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
}

// Update history
function updateHistoryDisplay() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  history.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = "• " + item;
    list.appendChild(p);
  });
}

// Event listeners (numbers)
for (let i = 0; i <= 9; i++) {
  document
    .getElementById(`btn-${i}`)
    .addEventListener("click", () => appendDigit(i));
}

// Operators
document
  .getElementById("btn-add")
  .addEventListener("click", () => selectOperator("+"));
document
  .getElementById("btn-subtract")
  .addEventListener("click", () => selectOperator("-"));
document
  .getElementById("btn-multiply")
  .addEventListener("click", () => selectOperator("×"));
document
  .getElementById("btn-divide")
  .addEventListener("click", () => selectOperator("÷"));

document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearAll);

// Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculate();
});
