// Components
const screen = document.querySelector('.screen');
const scrSaved = document.querySelector('.calculated');
let scrCurrent = document.querySelector('.current');
const btnPower = document.querySelector('.power');
const btnClear = document.querySelector('.clear');
const btnDel = document.querySelector('.del');
const btnNums = document.querySelectorAll('.num');
const btnOperators = document.querySelectorAll('.operator');
const btnEquals = document.querySelector('.equals');
const btnPlusMinus = document.querySelector('.plusminus');

// Variables
let powerOn, currNum, savedNum, operator;

// Initialize the calculator settings
const initCalculator = () => {
	powerOn = false;
	currNum = '';
	savedNum = '';
	operator = '';
	scrSaved.textContent = savedNum;
	scrCurrent.textContent = currNum;
	screen.classList.remove('screen-on');
};

initCalculator();

// Power on the calculator
btnPower.addEventListener('click', () => {
	if (!powerOn) {
		screen.classList.toggle('screen-on');
		powerOn = !powerOn;
	} else {
		initCalculator();
	}
});

// Handle number inputs
btnNums.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (btn.textContent === '.' && currNum.includes('.')) return;
		handleNumber(e.target.textContent);
	});
});

const handleNumber = (num) => {
	if (powerOn) {
		if (currNum.length < 11) {
			currNum += num;
			scrCurrent.textContent = currNum;
		}
	}
};

// Handle operator inputs
btnOperators.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (currNum === '') {
			return;
		} else if (currNum != '' && savedNum != '') {
			operate(savedNum, currNum, operator);
			console.log(savedNum, currNum, operator);
		}
		handleOperator(e.target.textContent);
	});
});

const handleOperator = (op) => {
	operator = op;
	savedNum = currNum;
	scrSaved.textContent = `${savedNum} ${operator}`;
	currNum = '';
	scrCurrent.textContent = '';
};

// Operations
const add = (a, b) => {
	return a + b;
};

const subtract = (a, b) => {
	return a - b;
};

const multiply = (a, b) => {
	return a * b;
};

const divide = (a, b) => {
	return a / b;
};

btnEquals.addEventListener('click', () => {
	if (powerOn) {
		if (currNum && savedNum) {
			operate(savedNum, currNum, operator);
			savedNum = '';
		}

		return;
	}
});

btnPlusMinus.addEventListener('click', () => {
	if (powerOn) {
		if (currNum != '') {
			let num = Number(currNum);
			num = num * -1;
			currNum = num;
			scrCurrent.textContent = currNum;
		}
		return;
	}
});

const checkResult = (res) => {
	if (res % 2 != 0) {
		scrCurrent.textContent = res.toFixed(2);
	} else {
		scrCurrent.textContent = res;
	}
};

const operate = (num1, num2, operator) => {
	num1 = Number(num1);
	num2 = Number(num2);
	let result;

	switch (operator) {
		case '+':
			result = add(num1, num2);
			checkResult(result);
			break;
		case '-':
			result = subtract(num1, num2);
			checkResult(result);
			break;
		case '/':
			result = divide(num1, num2);
			checkResult(result);
			break;
		case 'x':
			result = multiply(num1, num2);
			checkResult(result);
			break;
	}

	currNum = result;
};

// Clear Screen
const clearScreen = () => {
	currNum = '';
	savedNum = '';
	operator = '';
	scrSaved.textContent = '';
	scrCurrent.textContent = '';
};

btnClear.addEventListener('click', clearScreen);

// Delete Characters
const delCharacter = () => {
	if (powerOn) {
		currNum.length > 0 ? (currNum = currNum.slice(0, -1)) : '';
		scrCurrent.textContent = currNum;
	}
};

btnDel.addEventListener('click', delCharacter);
