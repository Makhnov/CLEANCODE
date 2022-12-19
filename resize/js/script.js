let space = "";
let br = "\n";
let resizePage = 0;

const box = document.getElementById('background');
const scene = document.getElementById('scene');

function resize() {

	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;

	let ratio = (width / height) / (16 / 9);

	let widthRatio = width / 1600;
	let heightRatio = height / 900;

	let widthBox = 1;
	let heightBox = 1;

	if (ratio > 1.25) {
		heightBox = widthRatio * Math.sqrt(heightRatio);
		widthBox = heightRatio * 0.975;
	} else if (ratio > 0.75) {
		heightBox = widthRatio * 0.975;
		widthBox = heightRatio * 0.975;
	} else {
		heightBox = widthRatio * 0.975;
		widthBox = (heightRatio * Math.sqrt(widthRatio));
	}

	console.log(
		"Width :" + space + width + br +
		"height :" + space + height + br +
		"ratio :" + space + ratio + br +
		"wRatio :" + space + widthRatio + br +
		"hRatio :" + space + heightRatio + br +
		"wBox :" + space + widthBox + br +
		"hBox :" + space + heightBox + br +
		"BoxW :" + space + Math.round(heightBox * 1600) + br +
		"BoxH :" + space + Math.round(widthBox * 900));

	box.style.transform = "translate(-50%, -50%) scale(" + heightBox + ", " + widthBox + ")";

}

window.onresize = function () {
	resizePage = document.getElementsByClassName('resize').length;
	if (resizePage > 0) {
		let resizeTimer;
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			resize();
		}, 500);
	}
};

