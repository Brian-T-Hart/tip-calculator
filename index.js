var totalCost;
var tipPercent;
var totalTip;
var splitWays = 1;
var splitTip;
var tipElement = document.getElementById('total-tip');
var splitTipElement = document.getElementById('split-tip');
var splitWaysElement = document.getElementById('split-ways');
var costElement = document.getElementById('total-cost');
var percentElement = document.getElementById('tip-percent');

function calculateTip(cost, percent) {
	console.log(cost, percent);
	if (cost >= 0 && percent >= 0) {
		console.log("unrounded tip " + (cost * percent / 100));
		totalTip = parseFloat(Math.round(cost * percent) / 100).toFixed(2);
		tipElement.textContent = "Total Tip: $" + totalTip;
	} else {
		tipElement.textContent = "";
	}
}

function calculateSplitTip(tipTotal, numOfPeople) {
	console.log('calculateSplitTip', tipTotal, numOfPeople);
	if (numOfPeople > 1 && totalCost > 0 && tipPercent > 0) {
		splitTip = parseFloat(Math.ceil(tipTotal * 100 / numOfPeople) / 100).toFixed(2);
		splitTipElement.textContent = "Split Tip: $" + splitTip + " per person";
	} else {
		splitTipElement.textContent = "";
	}
}

function setTotalCost() {
	totalCost = parseFloat(event.target.value).toFixed(2);
	console.log("total cost: " + totalCost);
	if (totalCost >= 0) {
		costElement.textContent = "Total Cost: $" + totalCost;
	} else {
		costElement.textContent = "";
	}

	calculateTip(totalCost, tipPercent);
	calculateSplitTip(totalTip, splitWays);
}

function setTip() {
	tipPercent = parseInt(event.target.value);
	if (tipPercent >= 0) {
		percentElement.textContent = "Tip Percent: " + tipPercent + "%";
	} else {
		percentElement.textContent = "";
	}
	
	calculateTip(totalCost, tipPercent);
	calculateSplitTip(totalTip, splitWays);
}

function setSplitWays() {
	console.log(event.target.value);
	splitWays = parseInt(event.target.value);
	if (splitWays > 1) {
		splitWaysElement.textContent = "Tip split " + splitWays + " ways";
	} else {
		splitWaysElement.textContent = "";
	}

	calculateSplitTip(totalTip, splitWays);
}