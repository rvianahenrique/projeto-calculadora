// Variável para armazenar o valor atual do display
let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

// Elemento do display
const display = document.getElementById('display');

// Atualiza o display com o valor atual
function updateDisplay() {
  display.textContent = currentValue;
}

// Adiciona um número ao display
function appendNumber(number) {
  if (shouldResetDisplay) {
    currentValue = number;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && number !== '.') {
      currentValue = number;
    } else if (number === '.' && currentValue.includes('.')) {
      return; // Não permite múltiplos pontos decimais
    } else {
      currentValue += number;
    }
  }
  updateDisplay();
}

// Adiciona um operador
function appendOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
}

// Adiciona decimal
function appendDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

// Limpa o display (botão C)
function clearDisplay() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Apaga o último caractere
function deleteChar() {
  if (currentValue.length === 1 || (currentValue.length === 2 && currentValue[0] === '-')) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

// Realiza o cálculo
function calculate() {
  if (operator === null || previousValue === null) {
    return;
  }

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentValue = 'Erro';
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  // Arredonda para evitar erros de ponto flutuante
  currentValue = String(Math.round(result * 100000000) / 100000000);
  operator = null;
  previousValue = null;
  shouldResetDisplay = true;
  updateDisplay();
}
