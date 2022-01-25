import {
  $answerButton,
  $clearButton,
  $numbersWrapper,
  $operatorsWrapper,
  $result
} from "./scripts/elements.js";

let result = "";

let leftOperand = "";
let operator = "";
let rightOperand = "";

const reset = () => {
  leftOperand = "";
  operator = "";
  rightOperand = "";
};

const clearFormula = () => {
  $result.innerText = "";
  reset();
};

$numbersWrapper.addEventListener("click", (event) => {
  if (event.target.className !== "number") {
    return;
  }

  if (operator === "") {
    leftOperand += event.target.innerText;
    if ($result.innerText == 0) {
      $result.innerText = "";
    }
    $result.innerText += event.target.innerText;
  } else {
    if (rightOperand === "") {
      $result.innerText = "";
    }
    rightOperand += event.target.innerText;
    $result.innerText += event.target.innerText;
  }
});

$operatorsWrapper.addEventListener("click", (event) => {
  if (event.target.className !== "operator") {
    return;
  }

  if (result !== "" && leftOperand === "") {
    leftOperand = result;
  }

  operator = event.target.innerText;
});

$clearButton.addEventListener("click", () => {
  clearFormula();
});

$answerButton.addEventListener("click", () => {
  switch (operator) {
    case "+":
      result = Number(leftOperand) + Number(rightOperand);
      break;
    case "-":
      result = Number(leftOperand) - Number(rightOperand);
      break;
    case "*":
      result = Number(leftOperand) * Number(rightOperand);
      break;
    case "/":
      result = Number(leftOperand) / Number(rightOperand);
      if (isFinite(result)) {
        result = Math.floor(result);
      }
      break;
    default:
      break;
  }

  $result.innerText = result;
  reset();
});
