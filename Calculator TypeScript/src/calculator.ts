class Calculator {
    private previousOperandTextElement: HTMLElement;
    private currentOperandTextElement: HTMLElement;
    private previousOperand!: string;
    private currentOperand!: string;
    private operation: string | undefined;

    constructor(previousOperandTextElement: HTMLElement, currentOperandTextElement: HTMLElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    public clear(): void {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    public delete(): void {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    public appendNumber(number: string): void {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    public chooseOperation(operation: string): void {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    public compute(): void {
        let computing: number | undefined;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computing = previous + current;
                break;
            case '-':
                computing = previous - current;
                break;
            case '*':
                computing = previous * current;
                break;
            case '÷':
                computing = previous / current;
                break;
            default:
                return;
        }

        this.currentOperand = computing.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    public getDisplayNumber(number: string): string {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay: string;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    public updateDisplay(): void {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const currentButton = document.querySelector('[data-current]') as HTMLElement;
const previousButton = document.querySelector('[data-previous]') as HTMLElement;

const equalsButton = document.querySelector('[data-equals]') as HTMLElement;
const clearButton = document.querySelector('[data-all-clear]') as HTMLElement;
const deleteButton = document.querySelector('[data-delete]') as HTMLElement;

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const calculator = new Calculator(previousButton, currentButton);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent!);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent!);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})