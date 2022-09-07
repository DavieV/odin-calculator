let numberButtons = document.querySelectorAll('.numbers button')
let operatorButtons = document.querySelectorAll('.operators button')
let screen = document.querySelector('.screen')

let screenVal = ''
let currentNum = ''
let operands = []
let operators = []

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
  currentNum = result
  operands = []
  operators = []

  console.log(operands)
  console.log(operators)
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentNum += button.dataset.num
    screenVal += button.dataset.num
    screen.textContent = screenVal
  })
})

operatorButtons.forEach((button) => {
  let operator = button.dataset.op

  if (operator === 'operate') {
    button.addEventListener('click', () => {
      if (currentNum === '') {
        return
      }
      operands.push(parseInt(currentNum))
      currentNum = ''
      console.log(operands)
      evaluate(operands, operators)
    })
  } else if (operator === 'clear') {
    button.addEventListener('click', () => {
      screenVal = ''
      currentNum = ''
      screen.textContent = screenVal
      operands = []
      operators = []
    })
  } else {
    // Regular operators: +, -, *, ÷
    button.addEventListener('click', () => {
      operands.push(parseInt(currentNum))
      operators.push(operator)

      currentNum = ''
      screenVal += operator

      console.log(operators)
      console.log(operands)
    })
  }
})
