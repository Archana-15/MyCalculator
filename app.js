import Calculator from "./calculator.js";

const numberButtons = document.querySelectorAll('[data-number]') // Returns all html element where the attribute is data-number
const operationButtons = document.querySelectorAll('[data-operation]')  //Returns all html element where the attribute is data-operation
const equalsButton = document.querySelector('[data-equals]')  // Returns element where the attribute is data-equals
const deleteButton = document.querySelector('[data-delete]')  // Returns element where the attribute is data-delete
const allClearButton = document.querySelector('[data-all-clear]')  // Returns element where the attribute is data-all-clear
const previousOperandTextElement = document.querySelector('[data-previous-operand]')  // Returns the html where the attribute is data-previous-operand
const currentOperandTextElement = document.querySelector('[data-current-operand]') // Returns the html where the attribute is data-previous-operand

// create object of the calculator class
const objCalculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// When clicked on a number button, It loops through all numbers and capture the number that's clicked and calls the method "appendNumber" and refresh the display
// Event listener for the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        objCalculator.appendNumber(button.innerText)
        objCalculator.updateDisplay()
    })
})

//When clicked on a operation button, It loops through all operations and capture the operator that's clicked and calls the method "chooseOperation" and refresh the display
// Event listener for the operators (+, -, *, /)
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        objCalculator.chooseOperation(button.innerText)
        objCalculator.updateDisplay()
    })
})

//When clicked on equals it calls compute method and refresh the display
// Event listener for the "=" button 
equalsButton.addEventListener('click', button => {
    objCalculator.compute()
    objCalculator.updateDisplay()
})

//When clicked on AC it calls clear method and refresh the display
//Event listener for the all clear button
allClearButton.addEventListener('click', button => {
    objCalculator.clear()
    objCalculator.updateDisplay()
})

//When clicked on DEL it calls deletes method and refresh the display
//Event listener for the delete button 
deleteButton.addEventListener('click', button => {
    objCalculator.delete()
    objCalculator.updateDisplay()
})