/* ------------------ VARIABLES GENERALES ------------------ */

let CkUser = "user";

/* ------------------ FONCTIONS------------------ */

/* ------------------ CkValue RENVOIE UNE VALEUR POUR UNE "Key" EN ARGUMENT (ou Undefined) ------------------ */

function CkValue(key) {

    let cookieTab = document.cookie.split('; ');
    let cookieTemp = [];
    let cookieValues = [];
    let cookieKeys = [];

    for (i = 0; i < cookieTab.length; i++) {        
        cookieTemp = cookieTab[i].split('=');
        cookieKeys.push(cookieTemp[0]);
        cookieValues.push(cookieTemp[1]);
    }

    for (i = 0; i < cookieKeys.length; i++) {
        if (cookieKeys[i].includes(key)) {        
            if (isNaN(cookieValues[i] * 1)) {
                return cookieValues[i];
            } else {
                return (cookieValues[i] * 1);
            }
        }
    }
}

/* ------------------ CkKey RENVOIE UNE KEY POUR UNE "Value" EN ARGUMENT (ou Undefined) ------------------ */

function CkKey(value) {

    let cookieTab = document.cookie.split('; ');
    let cookieTemp = [];
    let cookieValues = [];
    let cookieKeys = [];

    for (i = 0; i < cookieTab.length; i++) {        
        cookieTemp = cookieTab[i].split('=');
        cookieKeys.push(cookieTemp[0]);
        cookieValues.push(cookieTemp[1]);
    }

    for (i = 0; i < cookieValues.length; i++) {
        if (cookieValues[i].includes(value)) {        
            if (isNaN(cookieKeys[i] * 1)) {
                return cookieKeys[i];
            } else {
                return (cookieKeys[i] * 1);
            }
        }
    }
}

/* ------------------ Ck RENVOIE UN () DEUX TABLEAUX : Ck() (KEYS), (VALUES) ------------------ */

function Ck(x) {

    let cookieTab = document.cookie.split('; ');
    let cookieTemp = [];
    let cookieValues = [];
    let cookieKeys = [];

    for (i = 0; i < cookieTab.length; i++) {        
        cookieTemp = cookieTab[i].split('=');
        cookieKeys.push(cookieTemp[0]);
        cookieValues.push(cookieTemp[1]);
    }

    let ck = [];
    ck.push(cookieKeys);
    ck.push(cookieValues);

    switch (x) {
        case 0 : case "Keys" : case "keys" : case "Key" : case "key" : case "clef" : case "Clef" : case "clefs" : case "Clefs" :
            ck = cookieKeys;  
            break;

        case 1 : case "Values" : case "values": case "Value" : case "value": case "valeur" : case "Valeur" : case "valeurs" : case "Valeurs" :
            ck = cookieValues;  
            break;
    }

    return ck;
}

function visites() {
    let visites = CkValue(CkVisite);
    let p = document.getElementsByTagName('p')[0];

    if (visites > 0) {
        visites++
    } else  {
        visites = 1;
    }

    document.cookie = "visite="+visites+"; max-age: 86400";
    p.innerHTML = visites;
};


/* ------------------------------------ FONCTION SETUP (COOKIES) ------------------------------------ */

function setup() {

    /* --- On itère le nombre de tâches créées précédemment pour les recréer dans le DOM --- */
    console.log("setup :"+document.cookie)
    let tabK = Ck(0);
    let tabV = Ck(1);

    let bibli = document.getElementById('task');
    let buttons;
    let taskTexte;

    for (i = 0; i < tabK.length; i++) {
        if (tabK[i].includes("task")) {
            let taskPos = (tabK[i].slice(4) *1);
            taskTexte = tabV[i];

            console.log(taskPos+":"+taskTexte);
            let div = document.createElement('div');
            div.value = (buttons.length - 1);
            bibli.appendChild(div);

            let span = document.createElement('span');
            span.innerText = taskTexte;
            div.appendChild(span);

            let button = document.createElement('button');
            button.innerText = "+";
            button.setAttribute('onclick', 'deleteTask(this)')
            div.appendChild(button);

            document.cookie = "task"+taskPos+"="+taskTexte+"; max-age:86400";
        } 
    }
};