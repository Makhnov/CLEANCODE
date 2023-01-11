/* ------------------------------------ VARIABLES GENERALES ------------------------------------ */

let space =" ";
let br = "\n";
let buttons = document.getElementsByTagName('button');


/* ------------------------------------ FONCTION AJOUT ------------------------------------ */

function add() {

    /* --- Définition des éléments principaux --- */
    let texte = document.getElementById('ajout');
    let task = document.getElementById('task');

    /* --- On créé une division --- */
    let div = document.createElement('div');
    div.value = (buttons.length - 1);
    task.appendChild(div);

    /* --- On créé dans cette div une tâche (dans un span) dans laquelle on met le texte contenu dans l'input principal --- */
    let span = document.createElement('span');
    span.innerText = texte.value;
    div.appendChild(span);

    /* --- On créé aussi dans la div un bouton associé à la tâche avec un event listener qui lui permettra de supprimer la div parent --- */
    let button = document.createElement('button');
    button.innerText = "+";
    button.setAttribute('onclick', 'deleteTask(this)');
    div.appendChild(button);

    document.cookie = "task"+(buttons.length - 1)+"="+texte.value+"; max-age:86400";
};

/* FONCTION DELETE */

function deleteTask(x) {
x.parentNode.remove();
console.log(x.parentNode.value);
// for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
//     if (x)
// }
document.cookie = "task"+(x.parentNode)
}

/* ------------------------------------ UTILISATION AVEC TOUCHE ENTREE (Lance la fonction AJOUT) ------------------------------------ */

document.getElementById('ajout').addEventListener("keypress", function(press) {
    if (press.key === "Enter") {
        add();
    }
});



