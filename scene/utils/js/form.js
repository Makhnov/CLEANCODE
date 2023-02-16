const form = document.getElementById('CONTACT'); // On récupère le formulaire dans le DOM
const spans = document.getElementsByTagName('span'); // On récupère tous les spans (collection) dans le DOM
const inputs = document.getElementsByTagName('input'); // On récupère tous les inputs (collection) dans le DOM

// Fonctions qui remettent le formulaire à zéro (avec un délai)
function annuler() {
    setTimeout(() => {
        effacer()
    }, "10")
}
function effacer() {
    for (let i = 0; i < 4; i++) {
        inputs[i].value = "";
        spans[i].innerText = "";
        spans[i].style.opacity = 0;
    }
}

// Si un formulaire existe, on "intercepte" la validation du formulaire lors du submit
if (form !== null) {
    form.addEventListener('submit', (event) => {
        // event.preventDefault();

        let tab = verification(event); // On lance la fonction qui va vérifier le formulaire
        let msgErreur = false;

        for (let i = 0; i < 4; i++) {
            if (typeof (tab[i]) !== "boolean") { // On vérifie les quatre inputs un par un
                msgErreur = true;
            } else { // Si tous les inputs sont valides on ne lance pas la fonction affichage() et le formulaire est validé
                tab[i] = 0;
            }
        }

        if (msgErreur) {
            event.preventDefault(); // On annule la validation du formulaire
            affichage(tab); // On lance la fonction qui va afficher les erreurs de saisies de l'utilisateur
        } else {
            formulaireOK(event);
        }
    });
}

// Fonction qui lance le formulaire
function formulaireOK(event) {
    let nom = event.target[0].value; // On récupère la valeur du premier target (input : Nom)
    let prenom = event.target[1].value; // On récupère la valeur du premier target (input : Prénom)

    if (confirm("Bienvenue " + prenom + space + nom + ", souhaitez-vous envoyer ce formulaire ?")) {
    } else {
        event.preventDefault();
    }
}

// Fonction qui affiche les messages d'erreurs (en fonctions du type d'erreur)
function affichage(tab) {

    const vide = [ // On créé les messages d'erreurs en cas de champs vide
        "Veuillez entrer un nom de famille.",
        "Veuillez entrer un prénom.",
        "Veuillez entrer un âge.",
        "Veuillez entrer une adresse e-mail."];

    const invalide = [ // On crée les messages d'erreurs en cas de saisie invalide
        "Le nom saisi est invalide !",
        "Le prénom saisi est invalide !",
        "L'âge saisi est invalide !",
        "L'adresse mail saisie est invalide !"];

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
    let prenom = event.target[1].value; // Etc.
    let age = event.target[2].value;
    let mail = event.target[3].value;

    let tabNom = verifNom(nom);
    let tabPrenom = verifPrenom(prenom);
    let tabAge = verifAge(age);
    let tabMail = verifMail(mail);

    if (tabNom[1]) { // On rentre dans un tableau le résultat des vérifications pour le Nom (et, le cas échéant, le code d'erreur : tabX[2])
        tab.push(true);
    } else {
        tab.push(tabNom[2]);
    }
    if (tabPrenom[1]) { // On procède de la même façon pour le prénom
        tab.push(true);
    } else {
        tab.push(tabPrenom[2]);
    }
    if (tabAge[1]) { // On procède de la même façon pour l'âge
        tab.push(true);
    } else {
        tab.push(tabAge[2]);
    }
    if (tabMail[1]) { // On procède de la même façon pour l'e-mail
        tab.push(true);
    } else {
        tab.push(tabMail[2]);
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

// Fonction qui vérifie la conformité du prénom : Toutes les lettres, accentuées ou non et les tirets (-)
function verifPrenom(str) {

    if (str !== "") {
        const prenomRegex = /^[a-zA-ZÀ-ÿ\-]+$/;

        // On compare les caractères autorisés à l'input utilisateur
        if (prenomRegex.test(str)) { // On renvoie un tableau avec l'input utilisateur & le résultat de la vérification
            spans[1].innerText = "";
            spans[1].style.opacity = 0;
            return [str, true]; // Le prénom entré par l'utilisateur est valide
        } else {
            return [str, false, 1];
        }
    } else {
        return [str, false, 2];
    }
}

// Fonction qui vérifie la conformité de l'âge: De 1 à 3 caractères numériques (0 => 9) pour un nombre compris entre 0 et 125
function verifAge(str) {

    if (str !== "") {
        let age = 0;
        if (str.length > 0 && str.length < 4) { // On vérifie que l'input est composé de 1 a 3 caractères 
            for (i = (str.length - 1); i >= 0; i--) { // On fait une boucle avec autant d'itérations que de caractères
                if (str[i].charCodeAt() >= 48 && str[i].charCodeAt() <= 57) { // On vérifie que chacun des caractères est bien un chiffre (entre 0 et 9)

                    let rang = parseInt("100".slice(0, str.length - i)); // On note le rang du chiffre actuel (Unités, dizaines ou centaines)
                    age += parseInt(str[i] * rang); // On multiplie le chiffre par le rang, on ajoute ça à l'age
                } else {
                    return [str, false, 1]; // Un des caractères n'est pas un chiffre
                }
            }
        } else {
            return [str, false, 1]; // Il n'y a pas entre 1 et 3 caractères
        }

        if (age >= 0 && age <= 125) {
            spans[2].innerText = "";
            spans[2].style.opacity = 0;
            return [age, true]; // L'age entré par l'utilisateur est valide
        } else {
            return [str, false, 1]; // L'age n'est pas compris entre 0 et 125 ans
        }
    } else {
        return [str, false, 2];
    }
}

// Fonction qui vérifie la conformité du mail : premier bloc, suivi du @, second bloc, suivi du ".", complété par le troisième bloc (lettres uniquement)
function verifMail(str) {

    if (str !== "") {
        const mailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // On compare les caractères autorisés à l'input utilisateur
        if (mailRegex.test(str)) { // On renvoie un tableau avec l'input utilisateur & le résultat de la vérification
            spans[3].innerText = "";
            spans[3].style.opacity = 0;
            return [str, true]; // Le mail entré par l'utilisateur est valide
        } else {
            return [str, false, 1];
        }
    } else {
        return [str, false, 2];
    }
}