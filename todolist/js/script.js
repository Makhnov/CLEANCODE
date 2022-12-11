/* ------------------------------------ VARIABLES GENERALES ------------------------------------ */

let space =" ";
let br = "\n";

/* ------------------------------------ FONCTION AJOUT ------------------------------------ */

function add() {

    let i = CkCount(CkTask);

    /* --- Définition des éléments principaux --- */
    let texte = document.getElementById('ajout');
    let task = document.getElementById('task');

    /* --- On créé une division --- */
    let div = document.createElement('div');
    task.appendChild(div);

    /* --- On créé dans cette div une tâche (dans un span) dans laquelle on met le texte contenu dans l'input principal --- */
    let span = document.createElement('span');
    span.innerText = texte.value;
    div.appendChild(span);

    /* --- On créé aussi dans la div un bouton associé à la tâche avec un event listener qui lui permettra de supprimer la div parent --- */
    let button = document.createElement('button');
    button.innerText = "+"; 
    button.value = i;
    button.setAttribute('onclick', 'deleteTask(this)');
    div.appendChild(button);

    document.cookie = "task"+i+"="+texte.value+"; expires=Mon, 07 Oct 2030 01:00:00 GMT; path=/";
    texte.value = "";
};

/* ------------------------------------ UTILISATION AVEC TOUCHE ENTREE (Lance la fonction AJOUT) ------------------------------------ */

document.getElementById('ajout').addEventListener("keypress", function(press) {
    if (press.key === "Enter") {
        add();
    }
});

/* --------------- FONCTION SETUP (Utilise les cookies pour recréer les tâches non supprimées lors de la session précédente) --------------- */

function setup() {

    /* --- On récupère un tableau avec les clefs (tabK), un autre avec les valeurs (tabV) et l'élement (bibli) du DOM dans lequel on va les intégrer --- */

    let tabK = Ck(0);
    let tabV = Ck(1);
    
    let bibli = document.getElementById('task');
    let tabTask = [];
    let tabVal =[];

    /* --- On trie le tableau avec les clefs (tabK), pour ne conserver que les "task" (tabTask) --- */

    for (i = 0; i < tabK.length; i++) {
        if (tabK[i].includes("task")) {
            tabTask.push(tabK[i]);
            tabVal.push(tabV[i]);
        }
    }
    
    /* --- On itère le nombre de tâches (tabTask.length) créées précédemment pour les recréer une par une dans le DOM --- */

    for (i = 0; i < tabTask.length; i++) {

        let div = document.createElement('div');
        bibli.appendChild(div);

        let span = document.createElement('span');
        span.innerText = tabVal[i];
        div.appendChild(span);

        let button = document.createElement('button');
        button.innerText = "+";
        button.value = i;
        button.setAttribute('onclick', 'deleteTask(this)')
        div.appendChild(button);

        document.cookie = "task"+i+"="+tabVal[i]+"; expires=Mon, 07 Oct 2030 01:00:00 GMT; path=/";
    }
};

/* FONCTION DELETE */

function deleteTask(x) {

    x.parentNode.remove();
    let position = x.value;
    // button.value = i;

    let tabK = Ck(0);
    let tabV = Ck(1);

    let tabTask = [];
    let tabVal = [];
    let xVal = [];

    for (i = 0; i < tabK.length; i++) {
        if (tabK[i].includes("task")) {
            tabTask.push(tabK[i]);
            tabVal.push(tabV[i]);
            xVal.push(i);
        }
    }

    xVal.pop();
    tabTask.splice(position, 1);
    tabVal.splice(position, 1);

    for (let i = 0;i < xVal.length; i++) {
        let button = document.getElementsByTagName('button');
        button[i].value = i;
    }

    for (let i = 0; i < tabTask.length; i++) {
        document.cookie = "task"+i+"="+tabVal[i]+"; expires=Mon, 07 Oct 2030 01:00:00 GMT; path=/";
    }

    document.cookie = "task"+tabTask.length+"=; expires=Mon, 02 Oct 2000 01:00:00 GMT; path=/";
    console.log(document.cookie);
}