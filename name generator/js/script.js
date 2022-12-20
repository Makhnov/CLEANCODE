const br = "\n";
const space = " ";

const texte = document.getElementsByTagName('input')[0];
const valider = document.getElementsByTagName('button')[0];
const formatter = document.getElementsByTagName('button')[1];
const para = document.getElementsByTagName('p')[0];
const resultat = document.getElementsByTagName('textarea')[0];

let ordre = true;
let vide = true;

function inputTexte() {
        if (texte.value !== "") {
        vide = false;
        console.log(texte.value);
    } else {
        vide = true;
        console.log("Vide");
    }
}

texte.onkeyup = inputTexte();

function format() {
    if (!vide && texte.value !== "") {
        resultat.style.clipPath = "inset(0 0 0 0)";
        let tab = texte.value.split(',');
        let str = "values";

        for (i = 0; i < tab.length; i++) {
            if (ordre) {
                str = str.concat(br + "(\'" + tab[i].split(' ')[0] + "," + space + "\'" + tab[i].slice(tab[i].indexOf(' ') + 1) + "\'),");
            } else {
                str = str.concat(br + "(\'" + tab[i].slice(tab[i].indexOf(' ') + 1) + "," + space + "\'" + tab[i].split(' ')[0] + "\'),");
            }
        }

        str = str.slice(0, -1);
        resultat.textContent = str;
    } else {
        resultat.style.clipPath = "inset(0 330px 100% 0)";
        resultat.textContent = "";
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