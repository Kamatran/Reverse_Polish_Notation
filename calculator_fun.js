const buttons = document.querySelectorAll(".numbers"); // calculator buttons
const instructionButton = document.getElementById("show-instruction") // button opening instruction
const leaveInstructionButton = document.getElementById("leave-instruction") // button closing instruction

const calc = document.getElementById("calculation"); // get written calculation
let calculationLine = "";
const image = document.getElementById("joke") // image element
const audio = document.getElementById("audio") // audio element
const element = document.getElementById("joke-source") // source of autio

const instruction = document.getElementById("instruction-container") // instruction-box includes overlay

const operations = "+-/*%"

function parseCalculation(calculation) {
    mulitpy = (num1, num2) => num1 * num2
    sum = (num1, num2) => num1 + num2
    difference = (num1, num2) => num1 - num2
    divide = (num1, num2) => num1 / num2

    let calculationElements = calculation.split(/([-*+%/])/) // without () it won't return special characters
    let current = '';
    let newArray = [];
    for (let element of calculationElements) {
        current = element.split(" ")
        current.forEach(number => newArray.push(number))
    }
    newArray = newArray.filter(element => element !== "")
    let numbersArray = []
    

    let result = 0;
    for (let element of newArray) {

        if (!operations.split("").includes(element)) {
            numbersArray.push(element); // element is number and not operation
        } else { // element is an operation
            let num2 = parseFloat(numbersArray.pop());
            let num1 = parseFloat(numbersArray.pop());
            if (isNaN(num1) || isNaN(num2)) {
                return "ERROR" // to many operations and to little numbers
            }

            if (element === "+") {
                 result = sum(num1, num2);
            } else if (element === "-") {
                result = difference(num1, num2);
            } else if (element === "*") {
                result = mulitpy(num1, num2);
            } else if (element === "/") {
                if (num2 === 0) {
                    result = "ERROR";
                } else {
                    result = divide(num1, num2);
                }
            }
            numbersArray.push(result)
        }
    }
    if (numbersArray.length === 1) { // there is a result
        return numbersArray[0];
    } else if (numbersArray.length === 0) {
        return calculation; // nothing written
    } else {
        return "ERROR" // wrongly written calculation
    }
}

buttons.forEach(button => button.addEventListener("click", (event) => {
    calc.style.color = "white";
    if (event.target.id === "=") {
        let calcResult = parseCalculation(calculationLine);
        calc.textContent = calcResult;

        if (calcResult === 67) { // if funny number, activate image
            setTimeout(() => {
            image.setAttribute("src", "67.gif");
            image.style.display = "flex";
        }, 3000);

        element.setAttribute("src", "67.mp3") // if funny number, activate audio
        audio.load()
        audio.play()
        setTimeout(() => {
            image.style.display = "none";
            audio.pause()
        }, 5000)
        }

        calculationLine = "" // reset calculation line
        if (calcResult === "ERROR") { // if calculation is wrongly written
            instructionButton.style.removeProperty("animation") // delete animation: none
            calc.style.color = "red";
            instructionButton.style["animation-play-state"] = "running"; // activate instruction button animation

            setTimeout(() => instructionButton.style["animation-play-state"] = "paused", 10000) // pause animation after 10s
        }
    } else if (event.target.id === "CE") {
        if (calculationLine) { // if there is calculation
            calculationLine = calculationLine.slice(0, calculationLine.length-1); // delete last element
            calc.textContent = calculationLine;
        } else {
            calculationLine = "";
            calc.textContent = calculationLine;
        }
    } else if (event.target.id === "del") {
        calculationLine = ""; // reset calculation
        calc.textContent = calculationLine;
    } else if (event.target.id === "space") {
        if (calculationLine[calculationLine.length-1] !== " ") { // if there isn't a space already at the end
            calculationLine += " ";
            calc.textContent = calculationLine;
        }
    } else {
        calculationLine += event.target.id;
        calc.textContent = calculationLine;
    }
}))

function eventHandler(event) { // handle instruction button animation
    if (event === "mouseover") {
        instructionButton.style["animation-duration"] = "2s";
    } else if (event === "mouseleave") {
        instructionButton.style["animation-duration"] = "5s";
    } else if (event === "click") {
        instruction.style.display = "flex"; 
        instructionButton.style["animation-play-state"] = "paused";
        instructionButton.style.animation = "none"
    }
}


["mouseover", "mouseleave", "click"].forEach(event => instructionButton.addEventListener(event, () => eventHandler(event))); // handle each event

leaveInstructionButton.addEventListener("click", () => instruction.style.display = "none") // close instruction
