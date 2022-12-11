/* ------------------ VARIABLES GENERALES ------------------ */

let CkUser = "user";
let CkTask = "task";
let CkVisite = "visites"

/* ------------------ FONCTIONS------------------ */

/* ------------------ CkCount RENVOIE LE NOMBRE DE "Key" (EN ARGUMENT) présentes dans les cookies ------------------ */

function CkCount(key) {

    let cookieTab = document.cookie.split('; ');
    let cookieTemp = "";
    let cookieKeys = [];

    for (i = 0; i < cookieTab.length; i++) {        
        cookieTemp = cookieTab[i].split('=');

        if (cookieTemp[0].includes(key)) {
            cookieKeys.push(cookieTemp[0]);
        }
    }

    return cookieKeys.length;
}

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

/* ------------------ visites() permet d'incrémenter un cookie qui comptabilise le nombre de visites sur le site ------------------ */

function visites() {
    let visites = CkValue(CkVisite);

    if (visites > 0) {
        visites++
    } else  {
        visites = 1;
    }

    document.cookie = "visites="+visites+"; max-age: 86400";
};