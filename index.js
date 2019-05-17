var costElement = document.getElementById('total-cost');
var percentElement = document.getElementById('tip-percent');
var splitWays = 1;
var splitTip;
var splitTipElement = document.getElementById('split-tip');
var splitWaysContainer = document.getElementById('split-ways-container');
var splitWaysInput = document.getElementById('split-ways-input');
var tabPressed = false;
var tipElement = document.getElementById('total-tip');
var tipInput = document.getElementById('tip-input');
var tipInputContainer = document.getElementById('tip-input-container');
var tipPercent;
var totalCost;
var totalTip;

document.addEventListener('keyup', checkTabPress);

function calculateSplitTip(tipTotal, numOfPeople) {
	if (numOfPeople > 1 && totalCost > 0 && tipPercent > 0) {
		splitTip = parseFloat(Math.ceil(tipTotal * 100 / numOfPeople) / 100).toFixed(2);
		splitTipElement.textContent = "$" + splitTip + " each";
	} else {
		splitTipElement.textContent = "";
	}
}

function calculateTip(cost, percent) {
	if (cost >= 0 && percent >= 0) {
		totalTip = parseFloat(Math.round(cost * percent) / 100).toFixed(2);
		tipElement.textContent = "$" + totalTip;
	} else {
		tipElement.textContent = "";
	}
}

// open hidden inputs on tab press to make acccessible with keyboard only
function checkTabPress() {
	if (event.keyCode === 9 && !tabPressed) {
		tabPressed = true;
		tipInputContainer.classList.remove('hidden');
		splitWaysContainer.classList.remove('hidden');
	}
}

// add border color to circle when clicked
function handleCircleBorder(element) {
	var elements = document.querySelectorAll('.circle');
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].classList.contains('focused')) {
			elements[i].classList.remove('focused');
		}
	}
	element.classList.add('focused');
}

function handleDefaultTip(tip) {
	let element = event.target;
	handleCircleBorder(element);
	setTip(tip);
	if (!tipInputContainer.classList.contains('hidden')) {
		tipInput.value = '';
		toggleElement(tipInputContainer.id);
	}
}

function handleOtherTip() {
	let element = event.target;
	handleCircleBorder(element);
	if (tipInputContainer.classList.contains('hidden')) {
		toggleElement(tipInputContainer.id);
	}
}

function handleSplitIt() {
	toggleElement(splitWaysContainer.id);
	if (!splitWaysContainer.classList.contains('hidden')) {
		splitWaysInput.focus();
	}
}

function setTip(tip) {
	let element = event.target;
		if (tip) {
			tipPercent = tip;
		} else {
			let validated = validateInput(element.value, 'integer');
			if (validated) {
				element.classList.contains('error') ? element.classList.remove('error') : null;
				tipPercent = parseInt(element.value);
			} else {
				element.classList.add('error');
			}
		}

		if (tipPercent >= 0) {
			percentElement.textContent = "@ " + tipPercent + "%";
		} else {
			percentElement.textContent = "";
		}
		
		calculateTip(totalCost, tipPercent);
		calculateSplitTip(totalTip, splitWays);
}

function setTotalCost() {
	let element = event.target;
	let validated = validateInput(element.value, 'float');
	if (validated) {
		element.classList.contains('error') ? element.classList.remove('error') : null;
		totalCost = parseFloat(element.value).toFixed(2);
		if (totalCost >= 0) {
			costElement.textContent = "Bill: $" + totalCost;
		} else {
			costElement.textContent = "";
		}

		calculateTip(totalCost, tipPercent);
		calculateSplitTip(totalTip, splitWays);
	} else {
		element.classList.add('error');
	}
}

function setSplitWays() {
	let element = event.target;
	let validated = validateInput(element.value, 'integer');
	if (validated) {
		element.classList.contains('error') ? element.classList.remove('error') : null;
		splitWays = parseInt(event.target.value);
		calculateSplitTip(totalTip, splitWays);
	} else {
		element.classList.add('error');
	}
}

function toggleElement(el) {
	var element = document.getElementById(el);
	element.classList.contains('hidden') ? element.classList.remove('hidden') : element.classList.add('hidden');
}

function validateInput(input, type) {
	var regex;
	var valid;
	if (type === 'float') {
		regex = /^[0-9]\d*(?:\.\d{0,2})?$/;
		valid = regex.test(input);
	}
	if (type === 'integer') {
		regex = /^\d+$/;
		valid = regex.test(input);
	}
	
	if (input.length === 0) {
		valid = true;
	}
	if (input.length > 15) {
		valid = false;
	}
	return valid;
}