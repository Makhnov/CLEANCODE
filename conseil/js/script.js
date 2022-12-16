let space = " ";
let br = "\n";
let resizePage = 0;
let obj;
let editActive = false;
let fullscreenActive = false;
const scene = document.getElementById("salleDuConseil");

class MembresConseil {
	constructor(id, nom, image, titre, role, description) {
		this.id = id;
		this.nom = nom;
		this.image = image;
		this.titre = titre;
		this.role = role;
		this.description = description;
	}

	toString() {
		return "Id :" + space + this.id + space + "- Nom :" + space + this.nom + space + "- Titre :" + space + this.titre + space + "- Role :" + space + this.role + space + "- Description :" + space + this.description + space + "- url(image) :" + space + this.image;
	}

	getNom() {
		return this.nom;
	}

	getTitre() {
		return this.titre;
	}

	getRole() {
		return this.role;
	}

	getDescription() {
		return this.description;
	}

	getImage() {
		return this.image;
	}

	setNom(info) {
		this.nom = info;
	}

	setTitre(info) {
		this.titre = info;
	}

	setRole(info) {
		this.role = info;
	}

	setDescription(info) {
		this.description = info;
	}

	setImage(info) {
		this.image = info;
	}
}

function resize() {


	let ow = window.outerWidth;
	let oh = window.outerHeight;
	let vpw = window.visualViewport.width;
	let vph = window.visualViewport.height;
	let widthTest = document.documentElement.clientWidth;
	let heightTest = document.documentElement.clientHeight;

	let largeur = widthTest / 2560;
	let hauteur = heightTest / 1440;

	if (widthTest / heightTest < 1.25) {
		hauteur = (widthTest * (9 / 16)) / 1440;
	} else if (widthTest / heightTest > 2.5) {
		largeur = (heightTest * (16 / 9)) / 2560;
	}

	console.log(
		"visual height :" + space + vph + space + br +
		"visual width :" + space + vpw + space + br +
		"inner height :" + space + innerHeight + br +
		"inner width :" + space + innerWidth + br +
		"outer height :" + space + oh + br +
		"outer width :" + space + ow + br +
		"Test height :" + space + heightTest + br +
		"Test width :" + space + widthTest + br +
		"Largeur :" + space + largeur + br +
		"Hauteur :" + space + hauteur
	);

	scene.style.transform = "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
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

async function getBdd(n) {
	//récupéation du json
	const list = await fetch('https://makh.fr/conseil/index2.php');
	//convertion en tableau
	const tabTemp = await list.json();
	obj = tabTemp[n];

	let membre = new MembresConseil(n, obj.nom, obj.img, obj.titre, obj.role, obj.description);

	const h1 = document.getElementsByTagName('h1')[0];
	const h2 = document.getElementsByTagName('h2')[0];
	const h3 = document.getElementsByTagName('h3')[0];
	const para = document.getElementsByTagName('p')[0];
	const img = document.getElementById('imageConseil');
	const text = document.getElementById('inputText');

	// console.log(obj);

	let nom = membre.getNom();
	let titre = membre.getTitre();
	let role = membre.getRole();
	let description = membre.getDescription();
	let url = membre.getImage();

	// console.log(membre);
	h1.textContent = nom;
	// console.log(nom);
	h2.textContent = titre;
	// console.log(titre);
	h3.textContent = role;
	// console.log(role);
	para.textContent = description;
	// console.log(description);
	text.value = description;
	img.style.backgroundImage = "url(\'" + url + "\')";
	// console.log(url);
}

function edition() {
	const form = document.getElementsByTagName('form')[0];
	const textArea = document.getElementById('inputText');
	const edit = document.getElementById('edition');
	const logo = document.getElementById('sceneProfil');
	const val = document.getElementById('validation');
	const nav1 = document.getElementsByTagName('nav')[0];
	const nav2 = document.getElementsByTagName('nav')[1];

	editActive = !editActive;

	if (editActive) {
		edit.textContent = "Annuler";
		edit.style.backgroundColor = "rgba(175, 0, 0, 0.25)";
		edit.style.visibility = "visible";
		form.style.clipPath = "inset(0 0 0 0)";
		logo.style.filter = "grayscale(1.25) blur(1px)";
		val.style.opacity = "1";
		nav1.style.transform = "rotateX(180deg)";
		nav2.style.transform = "rotateX(0deg)"

	} else {
		edit.textContent = "Editer";
		edit.style.backgroundColor = "rgba(0, 128, 0, 0.25)";
		edit.style.visibility = "hidden";
		logo.style.clipPath = "inset(0 0 0 0)";
		form.style.clipPath = "inset(50% 50% 50% 50%)";
		logo.style.filter = "none";
		val.style.opacity = "0";
		nav2.style.transform = "rotateX(180deg)";
		nav1.style.transform = "rotateX(0deg)"
	}
}

function validation() {
	const val = document.getElementById('validationPhp');
	const form = document.getElementsByTagName('textarea')[0];
	let str = form.value;
	str = str.replace(/'/g, '’');
	form.value = str;
	val.click();
}

function fullscreenCharacter() {

	const perso = document.getElementById('imageConseil');
	const chateau = document.getElementById('bgConseil');

	fullscreenActive = !fullscreenActive;

	if (fullscreenActive) {
		perso.style.height = "100%";
		perso.style.width = "100%";
		perso.style.setProperty('top', '0', 'important');
		perso.style.setProperty('left', '0', 'important');
		chateau.style.opacity = "1";
		chateau.style.filter = "brightness(1.5) contrast(.5) blur(2px)";
		chateau.style.backgroundSize = "cover";
	} else {
		perso.style.top = "38%";
		perso.style.left = "40%";
		perso.style.height = "60%";
		perso.style.width = "50%";
		chateau.style.opacity = "1";
		chateau.style.filter = "brightness(1)";
		chateau.style.backgroundSize = "cover";
	}
}
