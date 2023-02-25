let space = " ";
let br = "\n";

let classe;
let styling;

let inputItem = document.getElementsByTagName('input');
let labelItem = document.getElementsByTagName('label');
let h1Item = document.getElementById('titre');


for (i = 0; i < Array.from(inputItem).length; i++) {
	labelItem[i].innerHTML = inputItem[i].name;
}

function modif(n, x) {
	styling = style(n);
	h1Item.style[styling] = value(n, x);
}

function value(n, x) {
	switch (n) {
		case "background":
			valeur = "hsl(" + (3.6 * x) + ", 100%, 50%)";
			break;
		case "padding":
			valeur = (0.05 * x) + "rem";
			break;
		case "height":
			valeur = (5 + (x / 2)) + "vh";
			break;
		case "width":
			valeur = (5 + (x / 2)) + "vw";
			break;
		case "radius":
			valeur = (x / 2) + "%";
			break;
		case "rotate":
			valeur = "rotateZ(" + (-180 + (3.6 * x)) + "deg)";
			break;
	}

	console.log(valeur);
	return valeur;
}

function style(n) {
	switch (n) {
		case "background":
			type = "backgroundColor";
			break;
		case "padding":
			type = "padding";
			break;
		case "height":
			type = "height";
			break;
		case "width":
			type = "width";
			break;
		case "radius":
			type = "borderRadius";
			break;
		case "rotate":
			type = "transform";
			break;
	}

	console.log(type);
	return type;
}

Array.from(inputItem).forEach(input => {
	input.addEventListener("input", function () {
		modif(input.name, input.value);
	});
});



