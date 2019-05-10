var totalCost;
var tipPercent;
var totalTip;
var splitWays = 1;
var splitTip;
var tipElement = document.getElementById('total-tip');
var tipInput = document.getElementById('tip-input');
var tipInputContainer = document.getElementById('tip-input-container');
var splitTipElement = document.getElementById('split-tip');
var splitWaysContainer = document.getElementById('split-ways-container');
var splitWaysInput = document.getElementById('split-ways-input');
var costElement = document.getElementById('total-cost');
var percentElement = document.getElementById('tip-percent');

function calculateTip(cost, percent) {
	if (cost >= 0 && percent >= 0) {
		totalTip = parseFloat(Math.round(cost * percent) / 100).toFixed(2);
		tipElement.textContent = "$" + totalTip;
	} else {
		tipElement.textContent = "";
	}
}

function calculateSplitTip(tipTotal, numOfPeople) {
	if (numOfPeople > 1 && totalCost > 0 && tipPercent > 0) {
		splitTip = parseFloat(Math.ceil(tipTotal * 100 / numOfPeople) / 100).toFixed(2);
		splitTipElement.textContent = "$" + splitTip + " each";
	} else {
		splitTipElement.textContent = "";
	}
}

function setTotalCost() {
	let element = event.target;
	totalCost = parseFloat(element.value).toFixed(2);
	if (totalCost >= 0) {
		costElement.textContent = "Bill: $" + totalCost;
	} else {
		costElement.textContent = "";
	}

	calculateTip(totalCost, tipPercent);
	calculateSplitTip(totalTip, splitWays);
}

function setTip(tip) {
	let element = event.target;
	if (tip) {
		tipPercent = tip;
	} else {
		tipPercent = parseInt(element.value);
	}

	if (tipPercent >= 0) {
		percentElement.textContent = "@ " + tipPercent + "%";
	} else {
		percentElement.textContent = "";
	}
	
	calculateTip(totalCost, tipPercent);
	calculateSplitTip(totalTip, splitWays);
}

function setSplitWays() {
	splitWays = parseInt(event.target.value);
	calculateSplitTip(totalTip, splitWays);
}

function toggleElement(el) {
	var element = document.getElementById(el);
	element.classList.contains('hidden') ? element.classList.remove('hidden') : element.classList.add('hidden');
}

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