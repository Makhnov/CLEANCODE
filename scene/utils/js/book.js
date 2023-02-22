const nextP = document.getElementById('nextPage');
const prevP = document.getElementById('previousPage');
const pageD = document.getElementById('pageD');
const pageG = document.getElementById('pageG');
const livre = document.getElementById('livre');
const readBook = document.getElementById('readBook');
const iconBook = document.getElementById('openBook');

const vitessePage = getComputedStyle(racine).getPropertyValue('--vitessePage');
const vPage = parseFloat(vitessePage.replace('s', '')) * 990;

let pageSpamm = true;

let pageNow = 0;
let tabPages = [
	'../../divers/img/pf-videos.jpg', '../../divers/img/pf-videos-specs.jpg',
	'../../divers/img/pf-rando.jpg', '../../divers/img/pf-rando-specs.jpg',
	'../../divers/img/pf-conseil.jpg', '../../divers/img/pf-conseil-specs.jpg',
	'../../divers/img/pf-fuzzy.jpg', '../../divers/img/pf-fuzzy-specs.jpg',
	'../../divers/img/pf-admin.jpg', '../../divers/img/pf-admin-specs.jpg',
	'../../divers/img/pf-sphere.jpg', '../../divers/img/pf-sphere-specs.jpg',
	'../../divers/img/pf-pendu.jpg', '../../divers/img/pf-pendu-specs.jpg',
	'../../divers/img/pf-apps.jpg', '../../divers/img/pf-apps-specs.jpg',
];

function openBook(bool) {
	if (pageSpamm) {
		readBook.checked = !readBook.checked;
		iconBook.classList.toggle('closed');
		if (readBook.checked) {
			iconBook.children[0].style.zIndex = "110";
			if (bool) {// CLIC FERMETURE
				tempo = false;
			} else {//FROM HUD
				racine.style.setProperty('--zoomLivre', '-200px');
			}
		} else {
			iconBook.children[0].style.zIndex = "90";
			if (bool) {// CLIC OUVERTURE
				tempo = true;
			}
		}
	}
}

function pageSuivante(e) {
	let zInd = window.getComputedStyle(livre).getPropertyValue("z-index");
	if (pageSpamm && zInd > 20) {
		pageSpamm = false;
		pageD.classList.add('anim');
		pageAsync(e);
	}
}

function pagePrecedente(e) {
	let zInd = window.getComputedStyle(livre).getPropertyValue("z-index");
	if (pageSpamm && zInd > 20) {
		pageSpamm = false;
		pageG.classList.add('anim');
		pageAsync(e);
	}
}

function setImage(pos, url) {
	url = "url('" + url + "')";
	//console.log(pos + " " + url);

	switch (pos) {
		case 0:
			racine.style.setProperty('--imageG1', url);
			break;
		case 1:
			racine.style.setProperty('--imageG2', url);
			break;
		case 2:
			racine.style.setProperty('--imageM1', url);
			break;
		case 3:
			racine.style.setProperty('--imageM2', url);
			break;
		case 4:
			racine.style.setProperty('--imageD1', url);
			break;
		case 5:
			racine.style.setProperty('--imageD2', url);
			break;
	}
}

async function pageAsync(e) {
	// BEFORE
	//console.log(e);

	//IN-BETWEEN
	await delayPage(e);

	// AFTER
	pageNow += parseInt(e.classList[2]);
	//console.log(2 * (pageNow % 8));
	for (let i = 0; i < 6; i++) {
		setImage(i, tabPages[(2 * (pageNow % 8) + i) % 16]);
	}
	pageD.classList.remove('anim');
	pageG.classList.remove('anim');
	pageSpamm = true;
}

function delayPage(e) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(e);
		}, vPage
		);
	});
}

function zoomLivre() {
	racine.style.setProperty('--livreLargeur', 'clamp(200px, 90vh, 45vw)')
	racine.style.setProperty('--zoomLivre', '0');
	racine.style.setProperty('--inclinaisonLivre', '0deg');
	racine.style.setProperty('--justifyLivre', '0vw');
	racine.style.setProperty('--alignLivre', '-3vh');
	racine.style.setProperty('--rotationLivre', '0deg');
	//livre.style.top = "-6vh";
	// livre.style.left = "-5vw";
}

function dezoomLivre() {
	racine.style.setProperty('--livreLargeur', 'clamp(300px, 50vh, 25vw)');
	racine.style.setProperty('--zoomLivre', '-30vw');
	racine.style.setProperty('--inclinaisonLivre', '-6deg');
	racine.style.setProperty('--rotationLivre', '40deg');
	racine.style.setProperty('--justifyLivre', '0vw');
	racine.style.setProperty('--alignLivre', '-6vh');
	//livre.style.removeProperty("top");
	// livre.style.removeProperty("left");
}

function variables() {
	let zoom = parseFloat(getComputedStyle(racine).getPropertyValue('--zoomLivre').replace('px', ''));
	let angle = parseFloat(getComputedStyle(racine).getPropertyValue('--inclinaisonLivre').replace('deg', ''));
	let posX = parseFloat(getComputedStyle(racine).getPropertyValue('--positionLivre').replace('vw', ''));

	console.log('zoom : ' + zoom);
	console.log('angle : ' + angle);
	console.log('posX : ' + posX);
}

function portfolioInfos() {
	openModal(1);
}

function portfolioPlus() {
	window.open("https://makh.fr/", "_blank");
}