// --- DOM elements setup ---

let screen = document.querySelector('.screen')
let buttons = document.querySelectorAll('button')
let numberButtons = []
let operatorButtons = []

buttons.forEach((button) => {
  if (button.hasAttribute('data-num')) {
    numberButtons.push(button)
  } else if (button.hasAttribute('data-op')) {
    operatorButtons.push(button)
  }
})

let screenVal = ''
let currentNum = ''
let hasDecimal = false
let operands = []
let operators = []

// --- Functions ---

function operate(op, a, b) {
  if (a === undefined || b === undefined) {
    console.log(`Invalid operands for operator ${op}`)
    return
  }

  if (op === '+') {
    return a + b
  } else if (op === '-') {
    return a - b
  } else if (op === '*') {
    return a * b
  } else if (op === '÷') {
    if (b === 0) {
      alert("Can't divide by zero!")
      return a
    }
    return a / b
  }
}

function evaluate() {
  if (operands.length < 2 || operands.length !== operators.length + 1) {
    return
  }
  let result = operands[0]
  for (let i = 1; i < operands.length; ++i) {
    result = operate(operators[i - 1], result, operands[i])
  }

  screenVal = result.toString()
  screen.textContent = screenVal
  currentNum = result.toString()
  hasDecimal = !Number.isInteger(result)
  operands = []
  operators = []
}

// --- Setup event listeners ---

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentNum += button.dataset.num
    screenVal += button.dataset.num
    screen.textContent = screenVal
  })
})

operatorButtons.forEach((button) => {
  let operator = button.dataset.op
  button.addEventListener('click', () => {
    if (operator === 'operate') {
      if (currentNum === '') {
        return
      }
      operands.push(Number.parseFloat(currentNum))
      currentNum = ''
      evaluate(operands, operators)
    } else if (operator === 'clear') {
      screenVal = ''
      currentNum = ''
      hasDecimal = false
      screen.textContent = screenVal
      operands = []
      operators = []
    } else if (operator === 'delete') {
      if (currentNum !== '') {
        currentNum = currentNum.slice(0, -1)
      }
      if (screenVal !== '') {
        screenVal = screenVal.slice(0, -1)
        screen.textContent = screenVal
      }
    } else if (operator === 'decimal') {
      if (currentNum === '' || hasDecimal) {
        return
      }
      currentNum += '.'
      screenVal += '.'
      screen.textContent = screenVal
      hasDecimal = true
    } else {
      if (currentNum === '') {
        return
      }
      operands.push(Number.parseFloat(currentNum))
      operators.push(operator)

      currentNum = ''
      hasDecimal = false
      screenVal += operator
      screen.textContent = screenVal
    }
  })
})
