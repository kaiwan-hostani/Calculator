let firstNumber = "";
let operater = "";
let secondNumber = "";

for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    let buttonInnerHTML = this.innerHTML;
    console.log(buttonInnerHTML);
    //console.log(document.querySelector(".bi"));

    if (!isNaN(buttonInnerHTML)) {
      if (operater === "") {
        firstNumber += buttonInnerHTML;
      } else {
        secondNumber += buttonInnerHTML;
      }
      updateDisplay();
      //document.querySelector(".text").innerHTML = buttonInnerHTML ;
    } else if (this.classList.contains("back-space")) {
      removeLastCharectar();
    } else if (buttonInnerHTML === ".") {
      addDecimal();
    } else if (
      buttonInnerHTML === "+" ||
      buttonInnerHTML === "-" ||
      buttonInnerHTML === "x" ||
      buttonInnerHTML === "/"
    ) {
      operater = buttonInnerHTML;
      updateDisplay();
    } else if (buttonInnerHTML === "=") {
      let answer;
      switch (operater) {
        case "+":
          answer = Number(firstNumber) + Number(secondNumber);
          break;
        case "-":
          answer = Number(firstNumber) - Number(secondNumber);
          break;
        case "x":
          answer = Number(firstNumber) * Number(secondNumber);
          break;
        case "/":
          if (Number(secondNumber) === 0) {
            alert("can't divide 0");
            clear();
            return;
          } else {
            answer = Number(firstNumber) / Number(secondNumber);
          }
          break;
        default:
          alert("please enter proparty");
      }

      document.querySelector(".text").innerHTML = answer;
      firstNumber = String(answer);
      secondNumber = "";
      operater = "";
    } else if (buttonInnerHTML === "AC") {
      clear();
    }
  });
}

function updateDisplay() {
  let display = firstNumber + " " + operater + " " + secondNumber;
  document.querySelector(".text").innerHTML = display;
}

function addDecimal() {
  if (operater === "") {
    if (!firstNumber.includes(".")) {
      firstNumber = firstNumber === "" ? "0." : firstNumber + ".";
    }
  } else if (!secondNumber.includes(".")) {
    secondNumber = secondNumber === "" ? "0." : secondNumber + ".";
  }

  updateDisplay();
}

function removeLastCharectar() {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operater !== "") {
    operater = "";
  } else if (firstNumber !== "") {
    firstNumber = firstNumber.slice(0, -1);
  }

  updateDisplay();
}

function clear() {
  document.querySelector(".text").innerHTML = "";
  firstNumber = "";
  operater = "";
  secondNumber = "";
}
