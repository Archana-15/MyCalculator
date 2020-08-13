class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)// It deletes the last number from currend operand
    }

    appendNumber(number) {
        //console.log("Append:  " + this.currentOperand.toString() + " --" + number.toString());

        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()

        // The parseFloat() function parses a string and returns a floating point number.
        //The split() method is used to split a string into an array of substrings, and returns the new array.

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        console.log(this.currentOperand);
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//Event listeners
const numberButtons = document.querySelectorAll('[data-number]') // Returns all html element where the attribute is data-number
const operationButtons = document.querySelectorAll('[data-operation]')  //Returns all html element where the attribute is data-operation
const equalsButton = document.querySelector('[data-equals]')  // Returns element where the attribute is data-equals
const deleteButton = document.querySelector('[data-delete]')  // Returns element where the attribute is data-delete
const allClearButton = document.querySelector('[data-all-clear]')  // Returns element where the attribute is data-all-clear
const previousOperandTextElement = document.querySelector('[data-previous-operand]')  // Returns the html where the attribute is data-previous-operand
const currentOperandTextElement = document.querySelector('[data-current-operand]') // Returns the html where the attribute is data-previous-operand

// create object of the calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// When clicked on a number button, It loops through all numbers and capture the number that's clicked and calls the method "appendNumber" and refresh the display
// Event listener for the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//When clicked on a operation button, It loops through all operations and capture the operator that's clicked and calls the method "chooseOperation" and refresh the display
// Event listener for the operators (+, -, *, /)
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//When clicked on equals it calls compute method and refresh the display
// Event listener for the "=" button 
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//When clicked on AC it calls clear method and refresh the display
//Event listener for the all clear button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//When clicked on DEL it calls deletes method and refresh the display
//Event listener for the delete button 
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})