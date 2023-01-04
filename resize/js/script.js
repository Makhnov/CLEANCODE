let space = "";
let br = "\n";
let resizePage = 0;

const box = document.getElementById('background');
const scene = document.getElementById('scene');

function resize() {

	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	let ratio = (width / height) / (16 / 9);

	let widthRatio = (width / 1600) * 0.975;
	let heightRatio = (height / 900) * 0.975;

	if (ratio > 1.2) {
		widthRatio = heightRatio;
	} else if (ratio < 0.8) {
		heightRatio = widthRatio;
	}

	console.log(
		"ratio :" + space + Math.trunc(ratio * 100) / 100 + br +
		"Width :" + space + width + br +
		"height :" + space + height + br +
		"widthRatio :" + space + Math.round(widthRatio * 100) / 100 + br +
		"heightRatio :" + space + Math.round(heightRatio * 100) / 100 + br +
		"BoxW :" + space + Math.round(widthRatio * 1600) + br +
		"BoxHprev :" + space + Math.round(widthRatio * 900) + br +
		"BoxH :" + space + Math.round(heightRatio * 900));

	box.style.transform = "translate(-50%, -50%) scale(" + widthRatio + ", " + heightRatio + ")";
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

