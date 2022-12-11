/* ---- On crée nos variables générales ---- */
const br = "\n";
const space = " ";
let supprUsers = true; // Ne pas toujours supprimer le tableau des utilisateurs quand on supprime les éléments du DOM (quand on souhaite juste trier par exemple);
let editActive = false; // Vérifie l'état de la boite d'édition (ouverte/fermée)

/* ---- On crée nos variables d'emplacement pour se repérer dans le DOM existant (HTML) ---- */
const nav = document.getElementById('navBar');
const users = document.getElementById('users');
const input = document.getElementById('edition');
const suppr = document.getElementById('supprimer');
const valider = document.getElementById('valider');

let tabUsers = [];

/* --------------------------------- CREATION DE LA CLASSE UTILISATEUR --------------------------------- */
class Utilisateurs {
    constructor(nom, prenom, age) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    toString() {
        return "Nom :" + space + this.nom + space + "- Prénom :" + space + this.prenom + space + "- Age :" + space + this.age;
    }

    getNom() {
        return this.nom;
    }

    getPrenom() {
        return this.prenom;
    }

    getAge() {
        return this.age;
    }

    setNom(info) {
        this.nom = info;
    }

    setPrenom(info) {
        this.prenom = info;
    }

    setAge(info) {
        this.age = info;
    }

}

/* --------------------------------- CREATION DE LA FONCTION TEST (UNE BASE DE DONNES FICTIVE POUR POUVOIR TESTER LE CODE) --------------------------------- */
function test() {
    let user1 = new Utilisateurs('dupont', 'sophie', '15');
    let user2 = new Utilisateurs('martin', 'thierry', '22');
    let user3 = new Utilisateurs('tran', 'luc', '18');
    let user4 = new Utilisateurs('song', 'phung', '26');
    let user5 = new Utilisateurs('bird', 'adam', '21');
    let user6 = new Utilisateurs('romeo', 'minnie', '45');
    let user7 = new Utilisateurs('atlan', 'ding', '23');
    let user8 = new Utilisateurs('whale', 'luke', '27');
    let user9 = new Utilisateurs('vinkt', 'sue', '44');
    let user10 = new Utilisateurs('den', 'don', '35');

    tabUsers.push(user1);
    tabUsers.push(user2);
    tabUsers.push(user3);
    tabUsers.push(user4);
    tabUsers.push(user5);
    tabUsers.push(user6);
    tabUsers.push(user7);
    tabUsers.push(user8);
    tabUsers.push(user9);
    tabUsers.push(user10);

    console.log(user1.getNom());
    refresh();
}
/* ---- enlever les // ci-dessous pour pouvoir tester le code ---- */
test();

/* --------------------------------- FONCTION QUI CACHE LE BOUTON VALIDER TANT QUE NECESSAIRE --------------------------------- */

/* ---- Bouton "Valider" ---- */
function validerCheck() {
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let age = document.getElementById('age').value;

    if (nom != "" && prenom != "" && age > 0 ) {
        valider.style.visibility = "visible";    
    } else {
        valider.style.visibility = "hidden";    
    }
}

/* --------------------------------- CREATION DE LA FONTION ADD() QUI AJOUTE UN UTILISATEUR AU TABLEAU GENERAL (SE LANCE QUAND ON CLIQUE SUR VALIDER OU SUR ENTREE DANS LE INPUT "#Age") --------------------------------- */
function add() {
    /* ---- Définition des éléments de l'input, on récupère les données entrées par l'administrateur ---- */
    let nom = document.getElementById('nom');
    let prenom = document.getElementById('prenom');
    let age = document.getElementById('age');

    /* ---- Mise en forme ---- */
    nom.value = nom.value.toUpperCase();
    prenom.value = prenom.value.charAt(0).toUpperCase() + prenom.value.slice(1);

    /* ---- On crée l'objet utilisateur ---- */
    let user = new Utilisateurs(nom.value, prenom.value, age.value);

    /* ---- On efface les données dans les inputs ---- */
    nom.value = "";
    prenom.value = "";
    age.value = "";

    /* ---- On rentre l'utilisateur dans le tableau ---- */
    tabUsers.push(user);

    /* ---- On lance la fonction qui va afficher notre nouvel utilisateur dans le DOM ---- */
    affichage();
    validerCheck();
    nom.focus();
}

/* ---- on crée un listener pour valider l'input quand l'admin clique sur "Entrée" depuis le dernier input (Age) ---- */
document.getElementById('age').addEventListener("keypress", function (press) {
    if (press.key === "Enter") {
        add();
    }
});

/* --------------------------------- CREATION DE LA FONCTION affichage (AFFICHE L'UTILISATEUR AJOUTE DANS LE DOM) --------------------------------- */
function affichage() {

    /* ---- On créé une division, on lui donne une classe générique (divUser) et une valeur spécifique (nth occurence de cette même classe) ---- */
    let div = document.createElement('div');
    div.classList.add('divUser');
    let n = document.getElementsByClassName('divUser').length;
    div.value = n;
    users.appendChild(div);

    /* ---- On créé dans cette div trois zones de texte (<p>) dans laquelle on met les informations contenu dans le user créé précédemment ---- */
    /* ---- Pour récupérer les informations directement dans le tableau on sélectionne le "nth" élément (cf § précédent) qui est un objet.
            Une fois l'objet ciblé on utilise nos getters() pour récupèrer les informations, nom, prénom & age que l'on intégre à chacun des <p> créés ---- */

    let p1 = document.createElement('p');
    p1.innerText = tabUsers[n].getNom();
    p1.setAttribute('onclick', 'edit(this)');
    div.appendChild(p1);

    let p2 = document.createElement('p');
    p2.innerText = tabUsers[n].getPrenom();
    p2.setAttribute('onclick', 'edit(this)');
    div.appendChild(p2);

    let p3 = document.createElement('p');
    p3.innerText = tabUsers[n].getAge();
    p3.setAttribute('onclick', 'edit(this)');
    div.appendChild(p3);

    /* ---- On crée, toujours dans la div, un bouton qui servira à supprimer la ligne correspondante (nth ligne) ---- */
    let bouton = document.createElement('button');
    bouton.innerText = "+";
    bouton.value = n;
    bouton.setAttribute('onclick', 'supprLigne(this)');
    div.appendChild(bouton);

}

/* --------------------------------- CREATION DE LA FONCTION SUPPRALL (SUPPRIME TOUS LES UTILISATEURS DU DOM - ET LE TABLEAU DES USERS SI NECESSAIRE) --------------------------------- */
function supprAll() {

    /* on récupère la collection correspondant à tous les éléments avec la classe "divUser" */
    let divs = document.getElementsByClassName('divUser');

    /* on les vire toutes une par une (en sens inverse ofc) */
    for (i = divs.length - 1; i >= 0; i--) {
        divs[i].remove();
    }

    if (supprUsers) {
        tabUsers = [];
    } 

    supprUsers = true;
}

/* --------------------------------- CREATION DE LA FONCTION SUPPRLIGNE (SUPPRIME LA LIGNE CORRESPONDANTE DU DOM ET DU TABLEAU DES USERS) --------------------------------- */
function supprLigne(x) {
    /* ---- on récupère l'identifiant de la ligne ---- */
    let n = x.value;

    /* ---- on supprime l'objet correspondant dans le tableau des users ---- */
    tabUsers.splice(n, 1);
    console.log(n);

    /* ---- On recrée le DOM mis à jour ---- */
    refresh();
}

/* --------------------------------- CREATION DES FONCTIONS DE TRI, NOM, PRENOM et AGE (SUPPRIME LE DOM, MODIFIE LE TABLEAU USERS) --------------------------------- */

/* ---- Tri par nom ---- */
function triNom() {

    tabUsers.sort((a, b) => {

        const nomA = a.nom.toUpperCase();
        const nomB = b.nom.toUpperCase();

        if (nomA < nomB) {
            return -1;
        }
        if (nomA > nomB) {
            return 1;
        }

        return 0;
    });

    refresh();
}

/* ---- Tri par prenom ---- */
function triPrenom() {

    tabUsers.sort((a, b) => {

        const prenomA = a.prenom.toUpperCase();
        const prenomB = b.prenom.toUpperCase();

        if (prenomA < prenomB) {
            return -1;
        }
        if (prenomA > prenomB) {
            return 1;
        }

        return 0;
    });

    refresh();
}

/* ---- Tri par age ---- */
function triAge() {

    tabUsers.sort((a, b) => {

        const ageA = (a.age * 1);
        const ageB = (b.age * 1);

        if (ageA < ageB) {
            return -1;
        }
        if (ageA > ageB) {
            return 1;
        }
        return 0;
    });
    refresh();
}

/* --------------------------------- CREATION DE LA FONCTION REFRESH (RECREE LE DOM USERS QUAND NECESSAIRE, APRES UN TRI PAR EXEMPLE) --------------------------------- */
function refresh() {

    supprUsers = false;
    supprAll();

    for (i = 0; i < tabUsers.length; i++) {

        /* ---- Définition des éléments principaux ---- */
        let nom = tabUsers[i].getNom();
        let prenom = tabUsers[i].getPrenom();
        let age = tabUsers[i].getAge();

        /* ---- On créé une division (on lui donne une classe et une valeur en fonction de sa classe (nth of this class) ---- */
        let div = document.createElement('div');
        div.classList.add('divUser');
        let n = document.getElementsByClassName('divUser').length;
        div.value = n;
        users.appendChild(div);

        /* ---- On créé dans cette div trois zones de texte (dans des p) dans laquelle on met les texte contenu dans les inputs correspondants ---- */
        let p1 = document.createElement('p');
        p1.innerText = nom;
        p1.setAttribute('onclick', 'edit(this)');
        div.appendChild(p1);
    
        let p2 = document.createElement('p');
        p2.innerText = prenom;
        p2.setAttribute('onclick', 'edit(this)');
        div.appendChild(p2);
    
        let p3 = document.createElement('p');
        p3.innerText = age;
        p3.setAttribute('onclick', 'edit(this)');
        div.appendChild(p3);

        /* ---- On crée, toujours dans la div, un bouton qui servira à supprimer la ligne correspondante (nth ligne) ---- */
        let bouton = document.createElement('button');
        bouton.innerText = "+";
        bouton.value = n;
        bouton.setAttribute('onclick', 'supprLigne(this)');
        div.appendChild(bouton);
    }
}

/* --------------------------------- CREATION DE LA FONCTION EDIT (ET DE SES SOUS FONCTIONS) QUI PERMET DE UN ELEMENT DANS LA LISTE --------------------------------- */

/* ---- Edition (onclick sur les <p>) ---- */
function edit(x) {

    /* ---- Lorsque l'utilisateur clique sur un <p> il lancce cette fonction (edit) qui ouvre un input (startEdit) ---- */
    if (!editActive) {
        startEdit(x);
    } else {
        /* ---- La boite se referme (cancelEdit) lorsqu'on clique une deuxième fois, se réouvre la troisième, etc. ---- */
        return cancelEdit();
    }

    /* ---- On supprime le listener précédent (si il existe) ---- */
    input.removeEventListener("keypress", input.listener); 

    /* ---- On crée notre listener (touche entrée) qui valide les modifications du <p> sélectionné ---- */
    const inputListener = function(event) {
        if (event.key == "Enter") {

            let edit = input.value;
            x.textContent = edit; // La nouvelle valeur récupérée dans l'input

            /* ---- La position du paragraphe dans la division parent détermine si la modification se fait sur: le nom(0), du prénom (1), ou de l'age ---- */
            let pPos = Array.from(x.parentNode.children).indexOf(x); 
            
            /* ---- La position de la division parent dans le bloc "users" détermine la position de l'objet concerné dans le tableau des users (tabUsers) ---- */
            let tabPos = Array.from(x.parentNode.parentNode.children).indexOf(x.parentNode) - 1;

            let user = tabUsers[tabPos]; // On récupère l'objet.

            /* ---- On fait un Switch Case pour modifier la valeur sur laquelle l'utilisateur à cliqué ---- */ 
            switch (pPos) {
                case 0:
                    user.setNom(edit);
                    break;

                case 1:
                    user.setPrenom(edit);
                    break;

                case 2:
                    user.setAge(edit);
                    break;

                default:                  
                    break;
              }
            /* ---- On remplace l'objet que l'utilisateur souhaité modifier par le nouvel objet que l'on vient d'éditer ---- */
            tabUsers.splice(tabPos, 1, user);

            return cancelEdit();
        }
    };

    /* ---- On a déclaré une variable pour notre listener (que l'on associe à l'input) ---- */
    input.listener = inputListener;

    /* ---- On ajoute le listener dans le DOM ---- */
    input.addEventListener("keypress", inputListener);
}

/* ---- On ouvre la barre d'input ---- */
function startEdit(x) {   
    /* ---- On récupère les coordonnées du curseur de la souris ---- */
    let mx = event.clientX; 
    let my = event.clientY;

    /* ---- On positionne notre boite d'édition (input)juste en dessous de la souris ---- */
    input.style.transition = "0s";
    input.style.transform = "translate(calc("+(mx)+"px), calc("+(my + 20)+"px))";
    input.style.transition = "0.5s";
    input.style.clipPath = "inset(0 0 0 0)";
    input.style.textAlign = "left";
    suppr.style.visibility = "hidden";
    input.focus(); //On place le curseur dans la boite input pour faciliter l'édition

    /* ---- on prépare la boite input à se refermer au clic suivant ---- */
    editActive = true;
}

/* ---- On ferme la barre d'input, on la clearvalue et on sort du mode édition ---- */
function cancelEdit() {
    /* ---- On efface la valeur de l'input et on la réduit afin qu'elle disparaisse ---- */
    input.value = "";
    input.style.clipPath = "inset(0 150px 30px 0)";
    suppr.style.visibility = "visible";

    editActive = false;
}

