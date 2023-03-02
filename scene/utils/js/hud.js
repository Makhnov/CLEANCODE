const br = '\n';
const space = ' ';
const racine = document.documentElement;
const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque inventore rem fugiat doloremque. Neque eveniet voluptate sequi incidunt cupiditate fugit autem nihil, blanditiis optio veritatispraesentium quam dolorem officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque impedit quibusdam vero veritatis distinctio dignissimos cupiditate nisi doloremque eum provident error atque porro, pariatur corporis. Numquam, unde expedita? Eius, laboriosam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores amet cumque minima, ipsum aut atque soluta harum facere nisi dicta odio eius doloribus quo obcaecati officia quia, voluptas exercitationem sequi!'
const textInfosPortfolio = "Bienvenue sur mon portfolio, j'ai commencé la programmation web en septembre 2022 en rejoignant une formation de développeur web avec l'ADRAR de Lourdes.<br>Tous mes sites, quel que soit le(s) langage(s), sont 100% originaux, il m'arrive de chercher l'inspiration à droite à gauche bien évidemment mais je ne copie jamais la moindre ligne de code. En cliquant sur l'icone du bas dans la navigation de droite vous pouvez aller visiter les sites présentés ici et bien d'autres que j'ai pu faire tout au long de ma formation.<br>Je travaille principalement en HTML, SASS, Javascript, PHP et SQL, j'ai aussi commencé la pratique de divers frameworks (Vue, React, Laravel, Symfony, etc.).<br><br>Mon gitHub : <a href='https://github.com/Makhnov/' target='_blank'>Makhnov</a>"

const startBG = document.getElementById('preHUD');

const li = document.querySelectorAll('li.gauche');
const navGauche = document.getElementsByTagName('nav')[0].children[0];
const navDroite = document.getElementsByTagName('nav')[1];
const scene = document.getElementById('containerView').children;

const waitingMenu = document.getElementById('waitingMenu');
let vitesse1 = getComputedStyle(racine).getPropertyValue('--vitesseEntree');
let vitesse2 = getComputedStyle(racine).getPropertyValue('--vitesseSortie');
let speedIn = parseFloat(vitesse1.replace('s', '')) * 1000;
let speedOut = parseFloat(vitesse2.replace('s', '')) * 1000;
let tempo = false;

const machine = document.getElementById('machine');
const urlGIF = "../../divers/img/loading2sGreen.gif?time=";

const modal = document.getElementById('modal');
const modalBackground = document.getElementById('backgroundModal');
const modalExit = document.getElementById('exitModal');
const modalBox = document.getElementById('containerModal');
const modalTitre = document.getElementById('containerModal').children[0];
const modalResume = document.getElementById('containerModal').children[1];
const modalTexte = document.getElementById('containerModal').children[2];
const captchaButton = document.getElementById('captchaButton');
const captchaInput = document.getElementById('captchaInput');
const captchaImg = document.getElementById('captchaImg');

const skills = document.getElementById('COMPETENCES').children;

function loadingGIF() {
	waitingMenu.style.backgroundImage = `url(${urlGIF + new Date().getTime()})`;
}

let menuSpamm;
let resizeSpamm;

let angle = 0;
let depth = 50;
let iDeg = 20;
let iTemp;
let jTemp;

let tabNav = [false, false, false, false, false];

function refresh() {
	clearScene('all');
	resize();
	startBG.classList.add('anim');
}

window.onresize = function () {
	clearTimeout(resizeSpamm);
	resizeSpamm = setTimeout(function () {
		resize();
	}, 500);
}

function resize() {

	checkWidth();

	let width = racine.clientWidth; // On récupère la largeur de l'écran de l'utilisateur
	let height = racine.clientHeight; // On récupère la hauteur de l'écran de l'utilisateur

	let tpY = width * 0.3 * 8 / 7;

	// console.log('width :' + width);
	// console.log('height :' + height);

	if ((height / tpY) < 1.44) {
		let hMult = (8 * height / (width * 3)).toFixed(2);
		racine.style.setProperty('--hMult', hMult);
	} else {
		racine.style.removeProperty("--hMult");
	}

	if (width < 1000) {
		angle = 60;
		depth = 60;
		iDeg = 30;
	} else if (width < 1400) {
		angle = 70;
		depth = 65;
		iDeg = 20;
	} else if (width < 1800) {
		angle = 80;
		depth = 70;
		iDeg = 10;
	} else {
		angle = 90;
		depth = 75;
		iDeg = -10;
	}

	racine.style.setProperty('--menuAngle', iDeg + 'deg');
	//let iDegree = getComputedStyle(racine).getPropertyValue('--menuAngle');
	//console.log(iDegree);
	racine.style.setProperty('--menuProfondeur', depth + 'px');
	//let depthBar = getComputedStyle(racine).getPropertyValue('--menuPronfondeur');
	//console.log(depthBar);

	navGauche.style.transform = "translateX(2vw) rotateY(" + angle + "deg) translateZ(calc(var(--menuProfondeur)))";
	//waitingMenu.style.width = depth + "px";
	//waitingMenu.style.height = depth + "px";//En +
	//waitingMenu.style.transform = "translate3d(0, 0, -" + depth + "px) rotateY(" + -angle + "deg)";
}

for (let i = 0; i < li.length; i++) {
	let iTemp = i;
	li[i].addEventListener('click', function () {
		clearTimeout(menuSpamm);
		if (spamm(i)) {
			menuAsync(iTemp);
		}
	});
}

function checkTranslateXValue(liIndex) {
	// récupère l'élément li à partir de son index
	const liElement = document.querySelectorAll('li')[liIndex];

	// vérifie si l'élément a une valeur pour la propriété translateX
	const translateXValue = getComputedStyle(liElement).getPropertyValue('transform');

	// retourne la valeur de la propriété translateX si elle existe
	if (translateXValue && translateXValue !== 'none') {
		const translateXMatrix = new WebKitCSSMatrix(translateXValue);
		return translateXMatrix.m41;
	}

	return null; // retourne null si la propriété translateX n'existe pas
}

function spamm(index) {
	const XLi = new WebKitCSSMatrix(getComputedStyle(li[index]).getPropertyValue('transform'));
	if (XLi.m41 < 1000) {
		return true;
	} else {
		return false;
	}
}

async function menuAsync(iTemp) {
	// BEFORE
	//console.log("BEFORE :" + iTemp);
	li[iTemp].classList.add("clicked");
	tabNav[iTemp] = true;

	for (j = 0; j < li.length; j++) {
		if (li[j].classList.contains("clicked") && j !== iTemp) {
			li[j].classList.remove("clicked");
			tabNav[j] = false;
			closingScene(j);
		}
	}

	// TEMPO
	if (tempo) {
		machine.style.display = "none";
		loadingGIF();
		await delayLi(speedOut);
	} else {
		await delayLi(0);
	}
	// FIN TEMPO


	// AFTER
	machine.style.display = "block";
	//console.log("AFTER :" + tabNav);
}

function delayLi(ms) {
	return new Promise((resolve, reject) => {
		menuSpamm = setTimeout(() => {
			for (j = 0; j < tabNav.length; j++) {
				if (!tabNav[j]) {
					scene[j].classList.add("hidden");
					scene[j].classList.remove("anim");
					clearScene(j);
				} else {
					scene[j].classList.remove("hidden");
					scene[j].classList.add("anim");
					tempo = true;
				}

				for (k = 0; k < tabNav.length; k++) {
					if (!tabNav[k]) {
						navDroite.children[0].children[j].children[k].style.visibility = "hidden";
						navDroite.children[0].children[j].children[k].classList.remove('open');
					} else {
						navDroite.children[0].children[j].children[k].style.visibility = "visible";
						navDroite.children[0].children[j].children[k].classList.add('open');
					}
				}
			}
			waitingMenu.style.backgroundImage = "none";
			//blurBG.style.display = "none";
			navDroite.style.display = "grid";
			resolve();
			;
		}, ms
		);
	});
}

function closingScene(index) {
	switch (index) {
		case 0://A PROPOS
			break;
		case 1://PORTFOLIO
			dezoomLivre();
			openBook(false);
			break;
		case 2:
			openCV(false);
			break;
		case 3://COMPETENCES
			openSkills(false);
			break;
		case 4://CONTACT
			openForm(false);
			break;
	}
}

function openSkills(bool) {
	let i = 0;
	let animSpeed = (speedOut / 6000).toFixed(1);

	for (let skill of skills) {
		skill.style.animation = "leaveSkills" + space + animSpeed + "s" + space + "linear" + space + animSpeed * i + "s forwards";
		i++;
	}

	setTimeout(function () {
		for (let skill of skills) {
			skill.style.removeProperty("animation");
		}
	}, speedOut);
}

function openForm(bool) {
	form.style.animation = "leaveContact" + space + (speedOut / 1000) + "s linear" + space + "forwards";

	setTimeout(function () {
		form.style.removeProperty("animation");
	}, speedOut);
}

function clearScene(index) {
	if (typeof index === 'number') {
		const boxes = scene[index].querySelectorAll("input[type=checkbox]");
		for (let box of boxes) {
			box.checked = false;
			box.dispatchEvent(new Event("change"));
		}

		const navboxes = navDroite.children[0].children[index].children[index].querySelectorAll("input[type=checkbox]");
		for (let navBox of navboxes) {
			navBox.checked = false;
			navBox.dispatchEvent(new Event("change"));
		}
	} else {
		const boxes = document.querySelectorAll("input[type=checkbox]");
		for (let box of boxes) {
			box.checked = false;
			box.dispatchEvent(new Event("change"));
		}
	}
}

function checkTabNav() {
	for (let i = 0; i < 5; i++) {
		if (tabNav[i]) {
			return i;
		}
	}
}

function checkWidth() {
	const windowWidth = window.innerWidth;
	const textWidth = modalTexte.offsetWidth;
	if (textWidth + 100 > windowWidth) {
		modalExit.style.display = 'grid';
	} else {
		modalExit.style.display = 'none';
	}
}

function openModal(index) {
	switch (index) {
		case 0://A PROPOS
			break;
		case 1://PORTFOLIO
			modal.style.display = "grid";
			modalTitre.textContent = "PORTFOLIO";
			modalResume.textContent = "Mes créations depuis septembre 2022";
			modalTexte.innerHTML = textInfosPortfolio;
			break;
		case 2://CV
			modal.style.display = "grid";
			modalBox.style.height = "100vh";
			modalBox.style.width = "calc(7000vh / 99)";
			modalBox.style.top = "0";
			modalBox.style.left = "50%";
			modalBox.style.transform = "translate(-50%, 0)";
			modalBox.style.padding = "0";
			modalBox.style.overflow = "hidden";

			modalTitre.style.display = "none";
			modalResume.style.display = "none";

			modalTexte.style.margin = "0";
			modalTexte.style.height = "100vh";
			modalTexte.style.background = "url('../../divers/img/docFront.jpg')";
			modalTexte.style.backgroundSize = "contain";
			checkWidth();
			break;
		case 3://COMPETENCES
			break;
		case 4://CONTACT
			modal.style.display = "grid";
			modalTitre.style.fontSize = "clamp(1.5rem, 2.5vw, 2.5rem)";
			modalTitre.textContent = "Merci pour votre message !";
			modalResume.style.fontSize = "clamp(1.25rem, 2vw, 2rem)";
			modalResume.style.fontWeight = "normal";
			modalResume.textContent = "Pour confirmer votre envoi, veuillez saisir ci-dessous les 4 caractères qui s'affichent à l'écran";
			break;
	}
	modalBackground.value = index;
	modalExit.value = index;
}

function closeModal(e) {
	let index = e.value;
	switch (index) {
		case 0://A PROPOS
			break;
		case 1://PORTFOLIO
			modalTitre.textContent = '';
			modalResume.textContent = '';
			modalTexte.textContent = '';
			break;
		case 2:
			modalBox.style.removeProperty("height");
			modalBox.style.removeProperty("width");
			modalBox.style.removeProperty("top");
			modalBox.style.removeProperty("left");
			modalBox.style.removeProperty("transform");
			modalBox.style.removeProperty("padding");
			modalBox.style.removeProperty("overflow");

			modalTitre.style.removeProperty("display");
			modalResume.style.removeProperty("display");

			modalTexte.style.removeProperty("margin");
			modalTexte.style.removeProperty("height");
			modalTexte.style.removeProperty("background");
			modalTexte.style.removeProperty("background-size");

			break;
		case 3://COMPETENCES
			break;
		case 4://CONTACT
			modal.style.display = "none";
			modalTitre.textContent = '';
			modalResume.textContent = '';
			modalTitre.style.removeProperty("font-size");
			modalResume.style.removeProperty("font-size");
			modalResume.style.removeProperty("font-weight");
			break;
	}
	modal.style.display = "none";
}