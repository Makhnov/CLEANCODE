const form = document.getElementById('CONTACT'); // On récupère le formulaire dans le DOM
const spans = document.querySelectorAll('#CONTACT div span'); // On récupère tous les spans (collection) dans le DOM
const inputs = document.querySelectorAll('#CONTACT input'); // On récupère tous les inputs (collection) dans le DOM
const valider = document.getElementById('valider');
/* --------------------------------- FONCTION QUI CACHE LE BOUTON VALIDER TANT QUE NECESSAIRE --------------------------------- */

/* ---- Bouton "Valider" ---- */
function validerCheck() {
	let nom = inputs[0].value;
	let email = inputs[1].value;
	let message = inputs[2].value;

	if (nom !== "" && email !== "" && message !== "") {
		valider.children[0].style.visibility = "visible";
	} else {
		valider.children[0].style.visibility = "hidden";
	}
}

/* ---- on crée un listener pour valider l'input quand l'admin clique sur "Entrée" depuis le dernier input (Age) ---- */
document.getElementById('message').addEventListener("keypress", function (press) {
	if (press.key === "Enter") {
		add();
	}
});

// Si un formulaire existe, on "intercepte" la validation du formulaire lors du submit
if (form !== null) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const action = event.submitter.id;
		if (action === 'supprimer') {
			effacer();
		} else if (action === 'valider') {

			let tab = verification(event); // On lance la fonction qui va vérifier le formulaire
			let msgErreur = false;

			for (let i = 0; i < 3; i++) {
				if (typeof (tab[i]) !== "boolean") { // On vérifie les quatre inputs un par un
					msgErreur = true;
				} else { // Si tous les inputs sont valides on ne lance pas la fonction affichage() et le formulaire est validé
					tab[i] = 0;
				}
			}

			if (msgErreur) {
				affichage(tab); // On lance la fonction qui va afficher les erreurs de saisies de l'utilisateur
			} else {
				formOK(event);
			}
		}
	});
}

// Fonctions qui remet le formulaire à zéro (avec un délai)
function effacer() {
	setTimeout(() => {
		for (let i = 0; i < 3; i++) {
			inputs[i].value = "";
			spans[i].innerText = "";
			spans[i].style.opacity = 0;
		}
	}, "10")
}

// Fonction qui affiche les messages d'erreurs (en fonctions du type d'erreur)
function affichage(tab) {

	const vide = [ // On créé les messages d'erreurs en cas de champs vide
		"Veuillez entrer un nom de contact.",
		"Veuillez entrer une adresse e-mail.",
		"Veuillez entrer un message."
	];

	const invalide = [ // On crée les messages d'erreurs en cas de saisie invalide
		"Le nom saisi est invalide !",
		"L'adresse mail saisie est invalide !",
		"Le message saisi est invalide !"
	];

	const erreur = [0, invalide, vide]; // On synthétise les messages d'erreurs dans un seul tableau

	for (let i = 0; i < tab.length; i++) {
		if (tab[i] !== 0) {
			let texte = erreur[tab[i]][i];
			spans[i].innerText = texte;
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
			console.log('nom ok')
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

			return [str, true]; // Le nom entré par l'utilisateur est valide
		} else {
			return [str, false, 1];
		}
	} else {
		return [str, false, 2];
	}
}

// Fonction qui lance le formulaire
function formOK(event) {
	let nom = event.target[0].value; // On récupère la valeur du premier target (input : Nom)
	console.log(event.target);

	if (confirm("Merci " + nom + space + ", confirmez-vous cet envoi ?")) {


		// Récupère les données du formulaire
		const formData = new FormData(form);

		// Crée une requête AJAX
		const xhr = new XMLHttpRequest();
		xhr.open('POST', './utils/php/formulaire.php');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		// Envoie les données du formulaire
		xhr.send(new URLSearchParams(formData).toString());

		// Gère la réponse de la requête
		xhr.onload = function () {
			if (xhr.status === 200) {
				// Traitement de la réponse
				formConfirm(xhr.responseText);
			} else {
				console.log('Erreur lors de la requête.');
			}
		};

	} else {
		//code si non envoyé
	}
}

function formConfirm(tab) {
	console.log(tab);
	effacer();
	openModal(4);
}