const form = document.getElementById('CONTACT'); // On récupère le formulaire dans le DOM
const spans = document.querySelectorAll('#CONTACT div span'); // On récupère tous les spans (collection) dans le DOM
const inputs = document.querySelectorAll('#CONTACT .inputs'); // On récupère tous les inputs (collection) dans le DOM
const labels = document.querySelectorAll('#CONTACT label'); // On récupère tous les labels (collection) dans le DOM
const valider = document.getElementById('valider');
const captchaInput = document.getElementById("captchaInput");
const captchaImg = document.getElementById('captchaImg');

/* --------------------------------- FONCTION QUI CACHE LE BOUTON VALIDER TANT QUE NECESSAIRE --------------------------------- */

/* ---- Bouton "Valider" ---- */
function validerCheck(e) {
	let info = e.value;

	switch (e.id) {
		case 'nom':
			TabCheck = verifNom(info);
			TabCheck[2] = 0;
			break;
		case 'email':
			TabCheck = verifMail(info);
			TabCheck[2] = 1;
			break;
		case 'message':
			TabCheck = verifMessage(info);
			TabCheck[2] = 2;
			break;
		case 'CONTACT':
			let infoNom = inputs[0].children[0].value;
			let infoMail = inputs[1].children[0].value;
			let infoMsg = inputs[2].children[0].value;
			TabCheck1 = verifNom(infoNom);
			TabCheck1[2] = 0;
			TabCheck2 = verifMail(infoMail);
			TabCheck2[2] = 1;
			TabCheck3 = verifMessage(infoMsg);
			TabCheck3[2] = 2;
			labels[TabCheck1[2]].classList.remove(!TabCheck1[1]);
			labels[TabCheck1[2]].classList.add(TabCheck1[1]);
			labels[TabCheck2[2]].classList.remove(!TabCheck2[1]);
			labels[TabCheck2[2]].classList.add(TabCheck2[1]);
			labels[TabCheck3[2]].classList.remove(!TabCheck3[1]);
			labels[TabCheck3[2]].classList.add(TabCheck3[1]);
			break;
	}
	if (e.id !== 'CONTACT') {
		labels[TabCheck[2]].classList.remove(!TabCheck[1]);
		labels[TabCheck[2]].classList.add(TabCheck[1]);
	}
}

/* ---- on crée un listener pour valider l'input quand l'utilisateur clique sur "Entrée" depuis l'input du captcha' ---- */
captchaInput.addEventListener("keypress", function (press) {
	if (press.key === "Enter") {
		verifCaptcha();
	}
});

// Si un formulaire existe, on "intercepte" la validation du formulaire lors du submit
if (form !== null) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const action = event.submitter.id;
		if (action === 'supprimer') {
			console.log('supprimer?');
			effacer();
		} else if (action === 'valider') {

			let tab = verification(event); // On lance la fonction qui va vérifier le formulaire
			let msgErreur = false;

			for (let i = 0; i < 3; i++) {
				if (typeof (tab[i]) !== "boolean") { // On vérifie les inputs un par un
					msgErreur = true;
				} else { // Si tous les inputs sont valides on ne lance pas la fonction affichage() et le formulaire est validé
					tab[i] = 0;
				}
			}

			if (msgErreur) {
				affichage(tab); // On lance la fonction qui va afficher les erreurs de saisies de l'utilisateur
			} else {
				openModal(4);
				captcha();
			}
		}
	});
}

// Fonctions qui remet le formulaire à zéro (avec un délai)
function effacer() {
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			inputs[i].children[0].value = "";
			spans[i].innerText = "";
			spans[i].style.opacity = 0;
		}
	}, "10")
}

// Fonction qui affiche les messages d'erreurs (en fonctions du type d'erreur)
function affichage(tab) {

	const vide = [ // On créé les messages d'erreurs en cas de champs vide
		"Veuillez entrer un nom.",
		"Veuillez entrer un mail.",
		"Veuillez entrer un message."
	];

	const invalide = [ // On crée les messages d'erreurs en cas de saisie invalide
		"Nom invalide !",
		"Adresse invalide !",
		"Pas de caractères spéciaux !" + brText +
		"Sauf :" + space + "<code> : ; , . ? ! - ) ' </code>"
	];

	const erreur = [0, invalide, vide]; // On synthétise les messages d'erreurs dans un seul tableau

	for (let i = 0; i < tab.length; i++) {
		if (tab[i] !== 0) {
			let texte = erreur[tab[i]][i];
			spans[i].innerHTML = texte;
			spans[i].style.opacity = 1;
		}
	}
}

// Fonction qui vérifie l'intégralité des champs du formulaire
function verification(event) {

	let tab = [];
	let nom = event.target[0].value; // On récupère la valeur du premier target (input : nom)
	let email = event.target[1].value; // Etc.
	let message = event.target[2].value;

	let tabNom = verifNom(nom);
	let tabMail = verifMail(email);
	let tabMsg = verifMessage(message);

	if (tabNom[1]) { // On rentre dans un tableau le résultat des vérifications pour le Nom (et, le cas échéant, le code d'erreur : tabX[2])
		tab.push(true);
	} else {
		tab.push(tabNom[2]);
	}
	if (tabMail[1]) { // On procède de la même façon pour le prénom
		tab.push(true);
	} else {
		tab.push(tabMail[2]);
	}
	if (tabMsg[1]) { // On procède de la même façon pour l'âge
		tab.push(true);
	} else {
		tab.push(tabMsg[2]);
	}
	return tab; // On retourne le tableau récapitulatif 
}

// Fonction qui vérifie la conformité du nom : Toutes les lettres, accentuées ou non, les apostrophes('), les espaces ( ) et les tirets (-)
function verifNom(str) {

	if (str !== "") {
		const nomRegex = /^[a-zA-ZÀ-ÿ\'\-\ ]+$/; // On défini les caractères "acceptables"

		// On compare les caractères autorisés à l'input utilisateur
		if (nomRegex.test(str)) { // On renvoie un tableau avec l'input utilisateur & le résultat de la vérification
			spans[0].innerText = "";
			spans[0].style.opacity = 0;
			return [str, true]; // Le nom entré par l'utilisateur est valide
		} else {
			return [str, false, 1];
		}

	} else {
		return [str, false, 2];
	}
}

// Fonction qui vérifie la conformité du mail : premier bloc, suivi du @, second bloc, suivi du ".", complété par le troisième bloc (lettres uniquement)
function verifMail(str) {

	if (str !== "") {
		const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// On compare les caractères autorisés à l'input utilisateur
		if (mailRegex.test(str)) { // On renvoie un tableau avec l'input utilisateur & le résultat de la vérification
			spans[1].innerText = "";
			spans[1].style.opacity = 0;
			return [str, true]; // Le mail entré par l'utilisateur est valide
		} else {
			return [str, false, 1];
		}
	} else {
		return [str, false, 2];
	}
}

// Fonction qui vérifie la conformité du message: De 1 à 3 caractères numériques (0 => 9) pour un nombre compris entre 0 et 125
function verifMessage(str) {
	if (str !== "") {
		const msgRegex = /^[a-zA-ZÀ-ÿ0-9\'\-\s,.():;?!\n\r]+$/; // On défini les caractères "acceptables" pour un message

		// On compare les caractères autorisés à l'input utilisateur
		if (msgRegex.test(str)) { // On renvoie un tableau avec l'input utilisateur & le résultat de la vérification
			spans[2].innerText = "";
			spans[2].style.opacity = 0;

			return [str, true]; // Le message entré par l'utilisateur est valide
		} else {
			return [str, false, 1];
		}
	} else {
		return [str, false, 2];
	}
}

function captcha() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '../../utils/captcha.php');
	xhr.responseType = 'blob';
	xhr.onload = function () {
		const imageUrl = URL.createObjectURL(this.response);
		captchaImg.setAttribute('src', imageUrl);
	};
	xhr.onerror = function () {
		console.error('Erreur lors de la récupération du captcha.');
	};
	xhr.send();
}

async function verifCaptcha() {
	try {
		const response = await fetch("../../utils/verif_captcha.php", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ userInput: captchaInput.value }),
		});

		const result = await response.json();

		if (result) {
			const xhr = new XMLHttpRequest();
			const url = '../../utils/formulaire.php';
			const formData = new FormData(form);
			xhr.open('POST', url, true);
			xhr.send(formData);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					confirmationUserForm();
				}
			}
		} else {
			captcha();
		}
	} catch (error) {
		console.error(error);
	}
}

function confirmationUserForm() {
	console.log('Message envoyé !');
	closeModal(4);
	effacer();
	const confirmP = document.getElementById('confirmP');
	confirmP.classList.add('confirm');
	setTimeout(() => {
		confirmP.classList.remove('confirm');
	}, 5000)
}

function copyEmail(e) {
	navigator.clipboard.writeText(nicoMail);
	const span = e.parentNode.children[1];
	span.textContent = "Adresse mail copiée !";

	if (!e.listener) {
		e.listener = true;

		e.addEventListener("mouseout", function () {
			span.textContent = "Copier mon e-mail";
			e.listener = false;
		});
	}
}

//TO DO
function contactInfos() {
	//openModal(4, true); => Passer openModal(4) du captcha à openModal(4, false).
	console.log('A venir !')
}