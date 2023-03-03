const br = '\n';
const brText = '<br>';
const space = ' ';
function PoF() {
	const random = Math.random();
	if (random < 0.5) {
		return -1;
	} else {
		return 1;
	}
}

const nicoMail = "09140@tuta.io"
const textes = [// Bloc de texte (index = ordre du menu)

	"Bienvenue sur mon site perso. Ce site, créé en janvier/février 2023 a pour but de me présenter aux entreprises intéressées par un stagiaire en développement web." + space +
	"J'ai essayé de présenter mes compétences acquises ces derniers mois de manière visuelle et agréable." + space +
	"En plus de la barre de navigation a gauche, vous avez aussi une barre contextuelle à droite adaptée à la section que vous visitez, n'hésitez pas à l'utiliser pour voir les effets." + space +
	"Le site a un rendu totalement différent selon si vous êtes sur PC (> 800 px) ou mobile. Et pour finir, voici un petit descriptif des techniques utilisées : " + brText + brText +
	"<strong>1.</strong> La partie sur laquelle vous êtes (A Propos) est un canvas JS/HTML, l'image est un fichier csv, chaque carré de 5x5px est un objet 'Particule' qui s'anime pour finalement revenir à sa place dédiée." + brText +
	"<strong>2.</strong>La deuxième partie (Portfolio) est un livre animé entièrement en CSS. Javascript s'adapte à la vitesse d'animation pour modifier les pages en conséquence." + space +
	"Les pages qui tournent sont découpées en 7 bandes, chaque bande récupère la même background-image mais avec un positionnement différent afin de donner cet effet de page 'incurvée'." + brText +
	"<strong>3.</strong>Dans la troisième partie (CV) j'ai créé une petite animation CSS pour représenter un présentoir 'futuriste' afin de mettre mon CV en valeur," + space +
	"le CV tourne sur lui même avec un petit jeu de perspective qui fait que le 'dos' du CV est une image différente." + brText +
	"<strong>4.</strong>Dans la partie 4 (Compétences) je présente mes avancées en programmation lors de ma formation. Toujours avec une animation CSS." + brText +
	"<strong>5.</strong>Enfin la partie 5 (Contact) est un formulaire contrôlé doublement (en direct en JS avec informations aux utilisateurs et en backend en php pour éviter tout problème d'injection malveillante)." + space +
	"J'ai aussi créé un captcha perso pour éviter le spamm, bien évidemment tout est fonctionnel et vous pouvez m'envoyer un message !" + brText + brText +
	"Très bonne visite !<br><br> P.S. Mon CV est disponible au téléchargement dans la partie dédiée." + brText + brText +
	"Mon gitHub : <a href='https://github.com/Makhnov/' target='_blank'>Makhnov</a>",

	"Bienvenue sur mon portfolio, j'ai commencé la programmation web en septembre 2022 en rejoignant une formation de développeur web avec l'ADRAR de Lourdes." + brText +
	"Tous mes sites, quel que soit le(s) langage(s), sont 100% originaux, il m'arrive de chercher l'inspiration à droite à gauche bien évidemment mais je ne copie jamais la moindre ligne de code." + space +
	"En cliquant sur l'icone du bas dans la navigation de droite vous pouvez aller visiter les sites présentés ici et bien d'autres que j'ai pu faire tout au long de ma formation." + brText +
	"Je travaille principalement en HTML, SASS, Javascript, PHP et SQL, j'ai aussi commencé la pratique de divers frameworks (Vue, React, Laravel, Symfony, etc.)." + brText + brText +
	"Mon gitHub : <a href='https://github.com/Makhnov/' target='_blank'>Makhnov</a>",

	"TEXTE CV",

	"TEXTE SKILLS",

	"Pour confirmer votre envoi, veuillez saisir ci-dessous les 4 caractères qui s'affichent à l'écran",

	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque inventore rem fugiat doloremque. " + brText +
	"Neque eveniet voluptate sequi incidunt cupiditate fugit autem nihil, blanditiis optio veritatispraesentium quam dolorem officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit." + brText +
	"Neque impedit quibusdam vero veritatis distinctio dignissimos cupiditate nisi doloremque eum provident error atque porro, pariatur corporis." + brText +
	"Numquam, unde expedita? Eius, laboriosam. Lorem ipsum dolor sit amet, consectetur adipisicing elit." + brText +
	"Dolores amet cumque minima, ipsum aut atque soluta harum facere nisi dicta odio eius doloribus quo obcaecati officia quia, voluptas exercitationem sequi!"
]

const racine = document.documentElement;

const theme = document.getElementById('theme');
const startBG = document.getElementById('animHUD');

const skills = document.getElementById('COMPETENCES').children;
const apropos = document.getElementById('APROPOS');

const li = document.querySelectorAll('li.gauche');
const navGauche = document.getElementsByTagName('nav')[0].children[0];
const navDroite = document.getElementsByTagName('nav')[1];

const pp = document.getElementById('pagePrecedente');
pp.addEventListener('mouseover', function () {
	const tooltip = document.getElementById('pagePrecTooltip');
	tooltip.style.opacity = "1";
	if (!pp.listener) {
		pp.listener = true;

		pp.addEventListener("mouseout", function () {
			tooltip.style.opacity = "0";
			pp.listener = false;
		});
	}
});
const scene = document.getElementById('containerView').children;

const waitingMenu = document.getElementById('waitingMenu');
let vitesse1 = getComputedStyle(racine).getPropertyValue('--vitesseEntree');
let vitesse2 = getComputedStyle(racine).getPropertyValue('--vitesseSortie');
let speedIn = parseFloat(vitesse1.replace('s', '')) * 1000;
let speedOut = parseFloat(vitesse2.replace('s', '')) * 1000;

const multivac = document.getElementById('multivac');
const machine = document.getElementById('machine');
const urlGIF = "../../divers/img/loading2.gif?time=";
function loadingGIF() {
	waitingMenu.style.backgroundImage = `url(${urlGIF + new Date().getTime()})`;
}

const modal = document.getElementById('modal');
const modalBackground = document.getElementById('backgroundModal');
const modalExit = document.getElementById('exitModal');
const modalBox = document.getElementById('containerModal');
const modalTitre = document.getElementById('containerModal').children[0];
const modalResume = document.getElementById('containerModal').children[1];
const modalTexte = document.getElementById('containerModal').children[2];
const modalCaptcha = document.getElementById('captcha');

let tempo = false;
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
	validerCheck(form);
	waitingMenu.style.backgroundImage = "none";

	startBG.style.display = "initial";
	setTimeout(() => {
		startBG.style.display = "none";
	}, 2000)

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

	console.log('width :' + width);
	//console.log('height :' + height);

	if ((height / tpY) < 1.44) {
		let hMult = (8 * height / (width * 3)).toFixed(2);
		racine.style.setProperty('--hMult', hMult);
	} else {
		racine.style.removeProperty("--hMult");
	}

	if (width < 800) {
		angle = 30;
		depth = 100;
		iDeg = 55;
	} else if (width < 1000) {
		angle = 40;
		depth = 90;
		iDeg = 45;
	} else if (width < 1400) {
		angle = 50;
		depth = 80;
		iDeg = 35;
	} else {
		angle = 60;
		depth = 70;
		iDeg = 25;
	}

	if (height < 500) {
		navDroite.style.alignItems = "flex-end";
	} else {
		navDroite.style.removeProperty('align-items');
	}

	racine.style.setProperty('--menuAngle', iDeg + 'deg');
	//let iDegree = getComputedStyle(racine).getPropertyValue('--menuAngle');
	//console.log(iDegree);
	racine.style.setProperty('--menuProfondeur', depth + 'px');
	//let depthBar = getComputedStyle(racine).getPropertyValue('--menuPronfondeur');
	//console.log(depthBar);

	navGauche.style.transform = "translateX(1vw) rotateY(" + angle + "deg) translateZ(calc(var(--menuProfondeur)))";
	//waitingMenu.style.width = depth + "px";
	//waitingMenu.style.height = depth + "px";//En +
	//waitingMenu.style.transform = "translate3d(0, 0, -" + depth + "px) rotateY(" + -angle + "deg)";
}

function swapTheme() {
	if (waitingMenu.style.backgroundImage === 'none') {// GO !!!
		theme.classList.remove('start');
		theme.classList.toggle('dark');
		theme.classList.toggle('light');

		if (theme.classList.contains('dark')) {
			racine.style.setProperty('--fontLight', '#fff');
			racine.style.setProperty('--subColorLight', 'rgba(70, 70, 80, 0.5)');
			racine.style.setProperty('--subColor', 'rgb(70, 70, 80)');
			racine.style.setProperty('--mainColor', 'rgb(17, 126, 181)');
			racine.style.setProperty('--mainColor1', 'rgb(31, 162, 227)');
			multivac.children[2].textContent = "Thème clair";
		} else {
			racine.style.setProperty('--fontLight', 'whitesmoke');
			racine.style.setProperty('--subColorLight', 'rgba(39, 48, 52, 0.5)');
			racine.style.setProperty('--subColor', 'rgb(39, 48, 52)');
			racine.style.setProperty('--mainColor', 'rgb(23, 80, 109)');
			racine.style.setProperty('--mainColor1', 'rgb(17, 126, 181)');
			multivac.children[2].textContent = "Thème sombre";
		}
	} else {// WAIT...
	}
}

for (let i = 0; i < li.length; i++) {
	let iTemp = i;
	li[i].addEventListener('click', function () {
		clearTimeout(menuSpamm);
		if (spamm(i)) {
			//console.log(iTemp);
			menuAsync(iTemp);
		}
	});
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
			//console.log(j);
			closingScene(j);
		}
	}

	// TEMPO
	if (tempo) {
		machine.style.display = "none";
		loadingGIF();
		waitingMenu.style.pointerEvents = "auto";
		await delayLi(speedOut);
	} else {
		await delayLi(0);
	}
	// FIN TEMPO

	// AFTER
	machineMenu();
	//console.log("AFTER :" + tabNav);
}

function delayLi(ms) {
	//console.log(ms);
	return new Promise((resolve, reject) => {
		menuSpamm = setTimeout(() => {
			for (j = 0; j < tabNav.length; j++) {
				if (!tabNav[j]) {
					scene[j].classList.add("hidden");
					scene[j].classList.remove("anim");
					scene[j].dispatchEvent(new Event("change"));
					clearScene(j);
				} else {
					tempo = true;
					scene[j].classList.remove("hidden");
					scene[j].classList.add("anim");
					scene[j].dispatchEvent(new Event("change"));
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
			//blurBG.style.display = "none";
			navDroite.style.display = "flex";
			resolve();
			;
		}, ms
		);
	});
}

function closingScene(index) {
	switch (index) {
		case 0://A PROPOS
			listener = false;
			openPixel(false);
			break;
		case 1://PORTFOLIO
			dezoomLivre();
			openBook(false);
			break;
		case 2:// CV
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

	for (let child of form.children) {
		child.style.animation = "leaveContact" + space + (speedOut / 1000) + "s linear" + space + "forwards";
		setTimeout(function () {
			child.style.removeProperty("animation");
		}, speedOut);
	}
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

function machineMenu() {
	let index = checkTabNav();
	waitingMenu.style.backgroundImage = "none";
	waitingMenu.style.removeProperty("pointer-events");
	machine.style.display = "block";
	machine.style.borderRadius = "0";
	let url;
	switch (index) {
		case 0://A PROPOS
			url = "center / contain no-repeat url('../../divers/img/favfolio.png')";
			break;
		case 1://PORTFOLIO
			url = "center / 110% no-repeat url('../../divers/img/favbook.png')";
			break;
		case 2://CV
			url = "center / 100% no-repeat url('../../divers/img/favcv.png')";
			break;
		case 3://COMPETENCES
			url = "left top / 115% no-repeat url('../../divers/img/favskills.png')";
			machine.style.borderRadius = "50%";
			break;
		case 4://CONTACT
			url = "center / 100% no-repeat url('../../divers/img/favmail.png')";
			break;
	}
	machine.style.background = url;
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

function openModal(index, bool) {
	switch (index) {
		case 0://A PROPOS
			//console.log(bool);
			modal.style.display = "grid";
			modalTitre.textContent = "A PROPOS";
			modalResume.textContent = "Site de présentation";
			modalTexte.innerHTML = textes[0];
			break;
		case 1://PORTFOLIO
			modal.style.display = "grid";
			modalTitre.textContent = "PORTFOLIO";
			modalResume.textContent = "Mes créations depuis septembre 2022";
			modalTexte.innerHTML = textes[1];
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

			if (bool) {
				modalTexte.style.background = "url('../../divers/img/cvFront.jpg')";
			} else {
				modalTexte.style.background = "url('../../divers/img/cvBack2.jpg')";
			}

			modalTexte.style.backgroundSize = "contain";
			checkWidth();
			break;
		case 3://COMPETENCES
			break;
		case 4://CONTACT
			modal.style.display = "grid";
			modalCaptcha.style.display = "flex";
			modalTitre.style.fontSize = "clamp(1.5rem, 2.5vw, 2.5rem)";
			modalTitre.textContent = "Merci pour votre message !";
			modalResume.style.fontSize = "clamp(1.25rem, 2vw, 2rem)";
			modalResume.style.fontWeight = "normal";
			modalResume.textContent = textes[4];
			break;
	}
	modalBackground.value = index;
	modalExit.value = index;
}

function closeModal(e) {
	let index = e.value;
	switch (index) {
		case 0://A PROPOS
			modalTitre.textContent = '';
			modalResume.textContent = '';
			modalTexte.textContent = '';
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
			modalCaptcha.style.display = "none";
			modalTitre.textContent = '';
			modalResume.textContent = '';
			modalTitre.style.removeProperty("font-size");
			modalResume.style.removeProperty("font-size");
			modalResume.style.removeProperty("font-weight");
			break;
	}
	modal.style.display = "none";
}