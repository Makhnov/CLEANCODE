const space = ' ';
const br = '\n';
const bv = document.getElementById('accueil');
const pop = document.getElementsByClassName('popup');

function bienvenue() {

	let screenWidth = document.documentElement.clientWidth;
	let screenHeight = document.documentElement.clientHeight;
	let ratio = (screenWidth / screenHeight);

	let width = 40;
	let height = 50;

	console.log(ratio);

	if (screenWidth < 700) {
		console.log(screenWidth);
		width = 75;
	}

	if (screenHeight < 400) {
		console.log(screenWidth);
		height = 85;
	}

	if (ratio < 0.45) {
		height *= 0.75;
	} else if (ratio > 4) {
		width *= 0.75;
	}

	bv.style.height = '100vh';
	bv.style.width = '100vw';
	pop[0].style.height = height + 'vh';
	pop[0].style.width = width + 'vw';
}

bienvenue();

('Entrez le nom exact de votre base de données ci-dessous :' + br + '(sans espaces, guillemets, apostrophes, etc.)');