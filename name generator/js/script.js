const br = "\n";
const space = " ";

const texte = document.getElementsByTagName('input')[0];
const valider = document.getElementsByTagName('button')[0];
const formatter = document.getElementsByTagName('button')[1];
const para = document.getElementsByTagName('p')[0];
const resultat = document.getElementsByTagName('textarea')[0];

let ordre = true;
let vide = true;

texte.onkeyup = function () {
    if (texte.value !== "") {
        vide = false;
        console.log(texte.value);
    } else {
        vide = true;
        console.log("Vide");
    }
}

function format() {
    if (vide) {
        resultat.style.clipPath = "inset(0, 0, 0, 0)";
        console.log(resultat);
        console.log("false");
    } else {
        resultat.style.clipPath = "inset(0 330px 100% 0)";
        console.log(resultat);
        console.log("true");
    }
}

function swap() {
    if (ordre) {
        para.textContent = "Nom, Prénom"
        ordre = !ordre;
    } else {
        para.textContent = "Prénom, Nom"
        ordre = !ordre;
    }
}